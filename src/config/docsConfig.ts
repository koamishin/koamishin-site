// Documentation configuration
export interface DocPage {
    title: string;
    slug: string;
}

export interface DocSection {
    title: string;
    pages: DocPage[];
}

export interface DocVersion {
    version: string;
    label: string;
    sections: DocSection[];
}

export interface DocProject {
    name: string;
    slug: string;
    description: string; // Used as short description
    longDescription?: string;
    type: "Starter Kit" | "Package" | "Core";
    status?: "Work in progress" | "Archived" | "Active";
    icon?: string; // Icon name to map in component
    features?: string[];
    techStack?: string[];
    githubRepo: string; // "owner/repo"
    versions: DocVersion[];
    defaultVersion: string;
}

export const docsConfig: DocProject[] = [
    {
        name: "KoamiStarterKit",
        slug: "koami-starter-kit",
        description: "A opinionated modern Laravel 12 starter kit with Vue 3, Inertia.js, and Tailwind CSS.",
        longDescription: "KoamiStarterKit is the ultimate starting point for modern Laravel applications. It combines the robustness of Laravel 12 with the reactivity of Vue 3 and Inertia.js, styled with Tailwind CSS. It comes pre-configured with authentication, user management, and essential developer tools.",
        type: "Starter Kit",
        status: "Active",
        icon: "Rocket",
        features: [
            "Laravel 12 & Vue 3 Integration",
            "Inertia.js for SPA-like experience",
            "Tailwind CSS 4 styling",
            "Pre-built Authentication & Profile Management"
        ],
        techStack: ["Laravel", "Vue.js", "Inertia.js", "Tailwind CSS", "Vite", "TypeScript"],
        githubRepo: "koamishin/KoamiStarterKit",
        defaultVersion: "v1",
        versions: [
            {
                version: "v1",
                label: "v1.0",
                sections: [
                    {
                        title: "Getting Started",
                        pages: [
                            { title: "Introduction", slug: "introduction" },
                            { title: "Installation", slug: "installation" },
                        ],
                    },
                    {
                        title: "Core Concepts",
                        pages: [
                            { title: "Architecture", slug: "architecture" },
                            { title: "Features", slug: "features" },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: "KoaScholarships",
        slug: "koa-scholarships",
        description: "A comprehensive scholarship management system for students and administrators.",
        longDescription: "KoaScholarships streamlines the scholarship application and management process. It provides a dedicated portal for students to apply and track status, while administrators get a powerful dashboard for managing applications, funds, and approvals.",
        type: "Starter Kit",
        status: "Active",
        icon: "GraduationCap",
        features: [
            "Student Application Portal",
            "Admin Dashboard for Application Review",
            "Fund & Budget Management",
            "Automated Email Notifications"
        ],
        techStack: ["Laravel", "Filament", "Livewire", "Tailwind CSS", "MySQL"],
        githubRepo: "koamishin/KoaScholarships",
        defaultVersion: "v1",
        versions: [
            {
                version: "v1",
                label: "v1.0",
                sections: [
                    {
                        title: "Getting Started",
                        pages: [
                            { title: "Introduction", slug: "introduction" },
                            { title: "Installation", slug: "installation" },
                        ],
                    },
                    {
                        title: "Core Concepts",
                        pages: [
                            { title: "Features", slug: "features" },
                            { title: "Architecture", slug: "architecture" },
                        ],
                    },
                ],
            },
        ],
    },
];

export function getProject(slug: string): DocProject | undefined {
    return docsConfig.find((p) => p.slug === slug);
}

export function getVersion(project: DocProject, version: string): DocVersion | undefined {
    return project.versions.find((v) => v.version === version);
}

export function getDefaultPage(_project: DocProject, version: DocVersion): string {
    const firstSection = version.sections[0];
    const firstPage = firstSection?.pages[0];
    return firstPage?.slug || "introduction";
}
