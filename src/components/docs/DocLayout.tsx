import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { DocSidebar } from "./DocSidebar";
import { getProject, getVersion, getDefaultPage, flattenSectionPages } from "@/config/docsConfig";
import { TableOfContents } from "./TableOfContents";
import { ThemeToggle } from "@/components/ThemeToggle";

interface DocLayoutProps {
    children: React.ReactNode;
}

export function DocLayout({ children }: DocLayoutProps) {
    const { project: projectSlug, version: versionSlug, "*": page } = useParams();
    const navigate = useNavigate();

    const project = projectSlug ? getProject(projectSlug) : undefined;
    const version = project && versionSlug ? getVersion(project, versionSlug) : undefined;

    const handleVersionChange = (newVersion: string) => {
        if (project) {
            const newVersionData = getVersion(project, newVersion);
            if (newVersionData) {
                const defaultPage = getDefaultPage(project, newVersionData);
                navigate(`/docs/${project.slug}/${newVersion}/${defaultPage}`);
            }
        }
    };

    if (!project || !version) {
        return (
            <div className="min-h-screen bg-background/65 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-4">Documentation Not Found</h1>
                    <Link to="/docs" className="text-primary hover:underline">
                        ← Back to Documentation
                    </Link>
                </div>
            </div>
        );
    }

    // Find current page title
    let currentPageTitle = page;
    for (const section of version.sections) {
        const pages = flattenSectionPages(section);
        const foundPage = pages.find((p) => p.slug === page);
        if (foundPage) {
            currentPageTitle = foundPage.title;
            break;
        }
    }

    return (
        <div className="min-h-screen bg-background/65">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
                <div className="flex h-16 items-center justify-between px-4 lg:px-8">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-2">
                            <span className="font-serif text-xl font-bold text-foreground">
                                Koamishin<span className="text-primary">.</span><span className="font-mono">com</span>
                            </span>
                        </Link>

                        {/* Breadcrumb */}
                        <nav className="hidden md:flex items-center gap-1 text-sm text-muted-foreground">
                            <ChevronRight className="h-4 w-4" />
                            <Link to="/docs" className="hover:text-foreground transition-colors">
                                Docs
                            </Link>
                            <ChevronRight className="h-4 w-4" />
                            <Link
                                to={`/docs/${project.slug}/${version.version}/${getDefaultPage(project, version)}`}
                                className="hover:text-foreground transition-colors"
                            >
                                {project.name}
                            </Link>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-foreground">{currentPageTitle}</span>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            <div className="flex container max-w-screen-2xl mx-auto">
                {/* Sidebar */}
                <div className="hidden lg:block w-72 shrink-0 border-r border-border h-[calc(100vh-4rem)] sticky top-16">
                    <DocSidebar
                        project={project}
                        version={version}
                        currentPage={page}
                        onVersionChange={handleVersionChange}
                    />
                </div>

                {/* Mobile Sidebar (integrated in DocSidebar component but we need to pass props) */}
                <div className="lg:hidden">
                    <DocSidebar
                        project={project}
                        version={version}
                        currentPage={page}
                        onVersionChange={handleVersionChange}
                    />
                </div>

                {/* Main content */}
                <main className="flex-1 min-w-0">
                    <div className="container max-w-4xl py-8 px-6 lg:px-10 mx-auto">
                        {children}
                    </div>
                </main>

                {/* Right Sidebar - Table of Contents */}
                <aside className="hidden xl:block w-64 shrink-0 py-8 px-4 border-l border-border h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
                    <TableOfContents />
                </aside>
            </div>
        </div>
    );
}

export default DocLayout;
