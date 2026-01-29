import { Link } from "react-router-dom";
import { ChevronDown, Menu, Book, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import { type DocProject, type DocVersion } from "@/config/docsConfig";
import React from "react";

interface DocSidebarProps {
    project: DocProject;
    version: DocVersion;
    currentPage?: string;
}

import { AnimatePresence, motion } from "framer-motion";

// ...

function SidebarNav({ project, version, currentPage }: DocSidebarProps) {
    const [openSections, setOpenSections] = React.useState<string[]>(
        version.sections.map((s) => s.title)
    );

    const toggleSection = (title: string) => {
        setOpenSections((prev) =>
            prev.includes(title)
                ? prev.filter((t) => t !== title)
                : [...prev, title]
        );
    };

    return (
        <nav className="space-y-2">
            {version.sections.map((section) => (
                <div key={section.title} className="space-y-1">
                    <button
                        onClick={() => toggleSection(section.title)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold text-foreground hover:bg-accent transition-colors"
                    >
                        {section.title}
                        <motion.div
                            initial={false}
                            animate={{ rotate: openSections.includes(section.title) ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="h-4 w-4" />
                        </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                        {openSections.includes(section.title) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="border-l border-border pl-3 space-y-1 py-1 ml-3">
                                    {section.pages.map((page) => {
                                        const isActive = currentPage === page.slug;
                                        return (
                                            <Link
                                                key={page.slug}
                                                to={`/docs/${project.slug}/${version.version}/${page.slug}`}
                                                className={cn(
                                                    "block rounded-md px-3 py-2 text-sm transition-colors",
                                                    isActive
                                                        ? "bg-primary/10 text-primary font-medium"
                                                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                                )}
                                            >
                                                {page.title}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </nav>
    );
}

interface DocSidebarFullProps extends DocSidebarProps {
    onVersionChange: (version: string) => void;
}

function SidebarContent({ project, version, currentPage, onVersionChange }: DocSidebarFullProps) {
    return (
        <div className="flex h-full flex-col">
            {/* Project header */}
            <div className="border-b border-border p-4">
                <Link to="/docs" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
                    <Book className="h-4 w-4" />
                    <span className="text-sm">All Docs</span>
                </Link>
                <h2 className="font-serif font-bold text-lg text-foreground">{project.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>

                {/* Version selector */}
                {project.versions.length > 1 && (
                    <div className="mt-3">
                        <Select value={version.version} onValueChange={onVersionChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select version" />
                            </SelectTrigger>
                            <SelectContent>
                                {project.versions.map((v) => (
                                    <SelectItem key={v.version} value={v.version}>
                                        {v.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1 p-4">
                <SidebarNav project={project} version={version} currentPage={currentPage} />
            </ScrollArea>

            {/* Footer links */}
            <div className="border-t border-border p-4">
                <a
                    href="https://github.com/koamishin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ExternalLink className="h-4 w-4" />
                    View on GitHub
                </a>
            </div>
        </div>
    );
}

export function DocSidebar({ project, version, currentPage, onVersionChange }: DocSidebarFullProps) {
    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:flex w-72 shrink-0 border-r border-border bg-background/50 backdrop-blur-sm">
                <SidebarContent
                    project={project}
                    version={version}
                    currentPage={currentPage}
                    onVersionChange={onVersionChange}
                />
            </aside>

            {/* Mobile sidebar */}
            <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                    <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                    <SidebarContent
                        project={project}
                        version={version}
                        currentPage={currentPage}
                        onVersionChange={onVersionChange}
                    />
                </SheetContent>
            </Sheet>
        </>
    );
}

export default DocSidebar;
