import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DocLayout } from "@/components/docs/DocLayout";
import { mdxComponents } from "@/components/docs/MDXComponents";
import { getProject, getVersion, getDefaultPage } from "@/config/docsConfig";
import { AlertCircle, Github, GitFork } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamic MDX content loader - using eager loading for better error handling
const mdxModules = import.meta.glob("../docs/**/*.mdx");


function ErrorDisplay({ error, project, version }: { error: string; project?: string; version?: string }) {
    return (
        <DocLayout>
            <div className="text-center py-16">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h1 className="text-3xl font-bold font-serif text-foreground mb-4">Error Loading Page</h1>
                <p className="text-muted-foreground mb-6">{error}</p>
                {project && version && (
                    <Link
                        to={`/docs/${project}/${version}`}
                        className="text-primary hover:underline"
                    >
                        ← Back to {project} documentation
                    </Link>
                )}
            </div>
        </DocLayout>
    );
}

function NotFound({ project, version }: { project?: string; version?: string }) {
    return (
        <DocLayout>
            <div className="text-center py-16">
                <h1 className="text-3xl font-bold font-serif text-foreground mb-4">Page Not Found</h1>
                <p className="text-muted-foreground mb-6">
                    The documentation page you're looking for doesn't exist.
                </p>
                {project && version && (
                    <Link
                        to={`/docs/${project}/${version}`}
                        className="text-primary hover:underline"
                    >
                        ← Back to {project} documentation
                    </Link>
                )}
            </div>
        </DocLayout>
    );
}

// Error boundary component
class MDXErrorBoundary extends React.Component<
    { children: React.ReactNode; fallback: React.ReactNode },
    { hasError: boolean; error: Error | null }
> {
    constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

// Type for MDX component that accepts components prop
type MDXComponentType = React.ComponentType<{ components?: Record<string, React.ComponentType<any>> }>;

export function DocsPage() {
    const { project: projectSlug, version: versionSlug, "*": pagePath } = useParams();
    const [MDXContent, setMDXContent] = useState<MDXComponentType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Handle redirect if no page specified
    const projectData = projectSlug ? getProject(projectSlug) : undefined;
    const versionData = projectData && versionSlug ? getVersion(projectData, versionSlug) : undefined;

    // If no page path, redirect to default page
    if (projectData && versionData && !pagePath) {
        const defaultPage = getDefaultPage(projectData, versionData);
        return <Navigate to={`/docs/${projectSlug}/${versionSlug}/${defaultPage}`} replace />;
    }

    // Find current page title for meta
    let pageTitle = pagePath?.split("/").pop() || "Documentation";
    if (versionData) {
        for (const section of versionData.sections) {
            const foundPage = section.pages.find((p) => p.slug === pagePath);
            if (foundPage) {
                pageTitle = foundPage.title;
                break;
            }
        }
    }

    // Dynamic import of MDX content
    useEffect(() => {
        async function loadMDX() {
            if (!projectSlug || !versionSlug || !pagePath) {
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            // Try both path formats
            const possiblePaths = [
                `../docs/${projectSlug}/${versionSlug}/${pagePath}.mdx`,
            ];

            let loader: (() => Promise<unknown>) | undefined;

            for (const path of possiblePaths) {
                if (mdxModules[path]) {
                    loader = mdxModules[path];
                    break;
                }
            }

            if (!loader) {
                console.log("Available MDX modules:", Object.keys(mdxModules));
                console.log("Tried paths:", possiblePaths);
                setError("Documentation page not found");
                setLoading(false);
                return;
            }

            try {
                const module = await loader() as { default: React.ComponentType };
                setMDXContent(() => module.default);
            } catch (err) {
                console.error("Error loading MDX:", err);
                setError(err instanceof Error ? err.message : "Failed to load documentation");
            } finally {
                setLoading(false);
            }
        }

        loadMDX();
    }, [projectSlug, versionSlug, pagePath]);

    const [repoDetails, setRepoDetails] = useState<any>(null);
    const [latestRelease, setLatestRelease] = useState<any>(null);

    // Fetch GitHub Data
    useEffect(() => {
        if (projectData?.githubRepo) {
            import("@/services/GitHubService").then(({ GitHubService }) => {
                const [owner, repo] = projectData.githubRepo.split("/");
                GitHubService.fetchRepoDetails(owner, repo).then(setRepoDetails);
                GitHubService.fetchLatestRelease(owner, repo).then(setLatestRelease);
            });
        }
    }, [projectData?.githubRepo]);

    if (!projectData || !versionData) {
        return <NotFound />;
    }

    if (loading) {
        return (
            <DocLayout>
                <div className="space-y-4 py-8">
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-6 w-2/3" />
                    <div className="space-y-2 pt-8">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>
                </div>
            </DocLayout>
        );
    }

    if (error) {
        return <ErrorDisplay error={error} project={projectSlug} version={versionSlug} />;
    }

    if (!MDXContent) {
        return <NotFound project={projectSlug} version={versionSlug} />;
    }

    return (
        <>
            <Helmet>
                <title>{pageTitle} - {projectData.name} | Koamishin Docs</title>
                <meta name="description" content={`${pageTitle} documentation for ${projectData.name}`} />
            </Helmet>

            <DocLayout>
                <motion.article
                    className="max-w-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Project Header with GitHub Stats */}
                    {pagePath === "introduction" && (
                        <div className="mb-8 border-b pb-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
                                        {projectData.name}
                                    </h1>
                                    <p className="text-xl text-muted-foreground">
                                        {projectData.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {latestRelease && (
                                        <a href={latestRelease.url} target="_blank" rel="noopener noreferrer">
                                            <Badge variant="default" className="text-sm px-3 py-1 hover:bg-primary/80">
                                                {latestRelease.tagName}
                                            </Badge>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {repoDetails && (
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <a href={repoDetails.url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-foreground transition-colors">
                                        <Github className="mr-1 h-4 w-4" />
                                        {repoDetails.stars} stars
                                    </a>
                                    <span className="flex items-center">
                                        <GitFork className="mr-1 h-4 w-4" />
                                        {repoDetails.forks} forks
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <MDXErrorBoundary
                        fallback={
                            <ErrorDisplay
                                error="Failed to render documentation content"
                                project={projectSlug}
                                version={versionSlug}
                            />
                        }
                    >
                        <MDXContent components={mdxComponents} />
                    </MDXErrorBoundary>
                </motion.article>
            </DocLayout>
        </>
    );
}

export default DocsPage;

