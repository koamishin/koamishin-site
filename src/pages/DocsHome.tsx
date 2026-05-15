import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Book, ArrowRight, Package, Github } from "lucide-react";
import { docsConfig, type DocProject } from "@/config/docsConfig";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { Helmet } from "react-helmet-async";
import { getDefaultPage, getVersion } from "@/config/docsConfig";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

function ProjectCard({ project, index }: { project: DocProject; index: number }) {
    const [latestVersion, setLatestVersion] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (project.githubRepo) {
            import("@/services/GitHubService").then(({ GitHubService }) => {
                const [owner, repo] = project.githubRepo.split("/");
                GitHubService.fetchLatestRelease(owner, repo)
                    .then((release) => {
                        if (release) {
                            setLatestVersion(release.tagName);
                        }
                    })
                    .finally(() => setLoading(false));
            });
        } else {
            setLoading(false);
        }
    }, [project.githubRepo]);

    const defaultVersion = getVersion(project, project.defaultVersion);
    const defaultPage = defaultVersion ? getDefaultPage(project, defaultVersion) : "introduction";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
        >
            <Card className="group h-full transition-all duration-300 hover:shadow-lg hover:border-primary/30 bg-card/50 backdrop-blur-sm flex flex-col">
                <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <Package className="h-5 w-5" />
                        </div>
                        <div className="flex gap-2">
                            {project.type && (
                                <Badge variant="secondary" className="font-mono text-xs bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                                    {project.type}
                                </Badge>
                            )}
                            {loading ? (
                                <Skeleton className="h-5 w-16 rounded-full" />
                            ) : latestVersion ? (
                                <Badge variant="outline" className="font-mono text-xs">
                                    {latestVersion}
                                </Badge>
                            ) : (
                                project.versions.slice(0, 1).map((v) => (
                                    <Badge key={v.version} variant="outline" className="font-mono text-xs">
                                        {v.label}
                                    </Badge>
                                ))
                            )}
                        </div>
                    </div>
                    <CardTitle className="font-serif text-xl group-hover:text-primary transition-colors">
                        {project.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground line-clamp-2">
                        {project.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex items-center justify-between">
                    <Button asChild variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent">
                        <Link
                            to={`/docs/${project.slug}/${project.defaultVersion}/${defaultPage}`}
                            className="flex items-center gap-2 text-primary"
                        >
                            View Documentation
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <a
                            href={`https://github.com/${project.githubRepo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${project.name} on GitHub`}
                        >
                            <Github className="h-5 w-5" />
                        </a>
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export function DocsHome() {
    return (
        <>
            <Helmet>
                <title>Documentation - Koamishin.com</title>
                <meta name="description" content="Browse documentation for Koamishin open source projects including CMS, POS, and business systems built with Laravel." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://koamishin.com/docs" />
                <meta property="og:title" content="Documentation - Koamishin.com" />
                <meta property="og:description" content="Browse documentation for Koamishin open source projects including CMS, POS, and business systems built with Laravel." />
                <meta property="og:image" content="https://koamishin.com/og-image.png" />
                <meta property="og:site_name" content="Koamishin.com" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://koamishin.com/docs" />
                <meta name="twitter:title" content="Documentation - Koamishin.com" />
                <meta name="twitter:description" content="Browse documentation for Koamishin open source projects including CMS, POS, and business systems built with Laravel." />
                <meta name="twitter:image" content="https://koamishin.com/og-image.png" />
                <link rel="canonical" href="https://koamishin.com/docs" />
            </Helmet>

            <div className="min-h-screen bg-background">
                <Header />

                <main className="container mx-auto px-4 py-16">
                    {/* Hero section */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 mb-6 backdrop-blur">
                            <Book className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-muted-foreground">Documentation</span>
                        </div>

                        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-4">
                            Explore Our <span className="text-primary">Docs</span>
                        </h1>

                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            Comprehensive documentation for all Koamishin open source projects.
                            Get started quickly with our guides and API references.
                        </p>
                    </motion.div>

                    {/* Projects grid */}
                    <motion.div
                        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {docsConfig.map((project, index) => (
                            <ProjectCard key={project.slug} project={project} index={index} />
                        ))}
                    </motion.div>


                    {/* Empty state for when no projects */}
                    {docsConfig.length === 0 && (
                        <div className="text-center py-16">
                            <Book className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <h2 className="text-xl font-semibold text-foreground mb-2">No Documentation Yet</h2>
                            <p className="text-muted-foreground">
                                Documentation for our projects will be available soon.
                            </p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

export default DocsHome;
