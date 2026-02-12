// Documentation configuration
// Supports hierarchical navigation with nested page groups

/**
 * Represents a single documentation page
 * The slug can be a simple name (e.g., "introduction") or a path (e.g., "getting-started/installation")
 */
export interface DocPage {
    title: string;
    slug: string;
    /** Optional description for hover tooltips or previews */
    description?: string;
    /** Optional badge to display next to the page title (e.g., "New", "Beta") */
    badge?: string;
}

/**
 * Represents a group of related pages (e.g., a folder like "getting-started/")
 * This enables hierarchical navigation in the sidebar
 */
export interface DocPageGroup {
    type: "group";
    title: string;
    /** The path prefix for all pages in this group (e.g., "getting-started") */
    path: string;
    pages: DocPage[];
    /** Optional: whether this group is collapsed by default in the sidebar */
    defaultOpen?: boolean;
    /** Optional description for the group */
    description?: string;
}

/**
 * Represents a section in the documentation sidebar
 * Can contain either flat pages or nested page groups for better organization
 */
export interface DocSection {
    title: string;
    /** Items can be either individual pages or page groups */
    items: (DocPage | DocPageGroup)[];
    /** Optional: whether this section is collapsed by default */
    defaultOpen?: boolean;
}

/**
 * @deprecated Use DocSection with items instead
 * Legacy interface for backward compatibility during migration
 */
export interface DocSectionLegacy {
    title: string;
    pages: DocPage[];
}

/**
 * Represents a version of the documentation
 */
export interface DocVersion {
    version: string;
    label: string;
    /** URL-friendly identifier for this version */
    slug: string;
    sections: DocSection[];
    /** Optional: banner message to show for this version (e.g., "This is an old version") */
    banner?: string;
}

/**
 * Represents a documentation project
 */
export interface DocProject {
    name: string;
    slug: string;
    description: string;
    longDescription?: string;
    type: "Starter Kit" | "Package" | "Core";
    status?: "Work in progress" | "Archived" | "Active";
    icon?: string;
    features?: string[];
    techStack?: string[];
    githubRepo: string;
    versions: DocVersion[];
    defaultVersion: string;
}

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard to check if an item is a DocPageGroup
 */
export function isPageGroup(item: DocPage | DocPageGroup): item is DocPageGroup {
    return "type" in item && item.type === "group";
}

/**
 * Type guard to check if an item is a DocPage
 */
export function isPage(item: DocPage | DocPageGroup): item is DocPage {
    return !isPageGroup(item);
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Flattens all pages from a section into a single array
 * Useful for searching, generating sitemaps, etc.
 */
export function flattenSectionPages(section: DocSection): DocPage[] {
    const pages: DocPage[] = [];

    for (const item of section.items) {
        if (isPageGroup(item)) {
            // For groups, prepend the group path to each page slug
            for (const page of item.pages) {
                pages.push({
                    ...page,
                    slug: `${item.path}/${page.slug}`,
                });
            }
        } else {
            pages.push(item);
        }
    }

    return pages;
}

/**
 * Gets all pages from a version as a flat array with full paths
 */
export function flattenVersionPages(version: DocVersion): DocPage[] {
    return version.sections.flatMap(flattenSectionPages);
}

/**
 * Finds a page in a version by its full slug path
 */
export function findPageBySlug(version: DocVersion, slug: string): DocPage | undefined {
    for (const section of version.sections) {
        for (const item of section.items) {
            if (isPageGroup(item)) {
                const page = item.pages.find(p => `${item.path}/${p.slug}` === slug);
                if (page) {
                    return { ...page, slug: `${item.path}/${page.slug}` };
                }
            } else if (item.slug === slug) {
                return item;
            }
        }
    }
    return undefined;
}

/**
 * Gets the display title for a page by its slug
 * Returns the slug itself if no matching page is found
 */
export function getPageTitle(version: DocVersion, slug: string): string {
    const page = findPageBySlug(version, slug);
    return page?.title ?? slug.split("/").pop() ?? slug;
}

/**
 * Checks if a slug represents an active page for highlighting in navigation
 * Handles both exact matches and child paths for grouped pages
 */
export function isActivePage(item: DocPage | DocPageGroup, currentSlug: string): boolean {
    if (isPage(item)) {
        return item.slug === currentSlug;
    }
    // For groups, check if current slug starts with the group path
    return currentSlug.startsWith(`${item.path}/`) || currentSlug === item.path;
}

/**
 * Gets all slugs from a section for generating static paths
 */
export function getSectionSlugs(section: DocSection): string[] {
    const slugs: string[] = [];

    for (const item of section.items) {
        if (isPageGroup(item)) {
            for (const page of item.pages) {
                slugs.push(`${item.path}/${page.slug}`);
            }
        } else {
            slugs.push(item.slug);
        }
    }

    return slugs;
}

/**
 * Gets all slugs from a version for generating static paths
 */
export function getVersionSlugs(version: DocVersion): string[] {
    return version.sections.flatMap(getSectionSlugs);
}

// ============================================================================
// Configuration
// ============================================================================

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
                slug: "v1",
                sections: [
                    {
                        title: "Getting Started",
                        defaultOpen: true,
                        items: [
                            { title: "Introduction", slug: "introduction" },
                            { title: "Installation", slug: "installation" },
                            { title: "Local Development", slug: "local-development" },
                        ],
                    },
                    {
                        title: "Building Your App",
                        defaultOpen: true,
                        items: [
                            { title: "Architecture", slug: "architecture" },
                            { title: "Customization", slug: "customization" },
                            { title: "Examples", slug: "examples" },
                        ],
                    },
                    {
                        title: "Deployment",
                        defaultOpen: false,
                        items: [
                            { title: "CI/CD & Docker", slug: "deployment" },
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
                slug: "v1",
                sections: [
                    {
                        title: "Getting Started",
                        defaultOpen: true,
                        items: [
                            { title: "Introduction", slug: "introduction" },
                            { title: "Installation", slug: "installation" },
                        ],
                    },
                    {
                        title: "Core Concepts",
                        defaultOpen: true,
                        items: [
                            { title: "Features", slug: "features" },
                            { title: "Architecture", slug: "architecture" },
                        ],
                    },
                ],
            },
        ],
    },
];

// ============================================================================
// Legacy Compatibility Functions
// ============================================================================

/**
 * Gets a project by its slug
 */
export function getProject(slug: string): DocProject | undefined {
    return docsConfig.find((p) => p.slug === slug);
}

/**
 * Gets a version by its version string
 */
export function getVersion(project: DocProject, version: string): DocVersion | undefined {
    return project.versions.find((v) => v.version === version);
}

/**
 * Gets the default page slug for a version
 * Returns the first available page
 */
export function getDefaultPage(_project: DocProject, version: DocVersion): string {
    const firstSection = version.sections[0];
    if (!firstSection) return "introduction";

    const firstItem = firstSection.items[0];
    if (!firstItem) return "introduction";

    if (isPageGroup(firstItem)) {
        const firstGroupPage = firstItem.pages[0];
        return firstGroupPage ? `${firstItem.path}/${firstGroupPage.slug}` : "introduction";
    }

    return firstItem.slug || "introduction";
}

/**
 * Converts a section to legacy format for backward compatibility
 * @deprecated Use the new structure directly
 */
export function sectionToLegacy(section: DocSection): DocSectionLegacy {
    return {
        title: section.title,
        pages: flattenSectionPages(section),
    };
}

// ============================================================================
// Navigation Helpers for Sidebar
// ============================================================================

/**
 * Gets the initial open sections state for the sidebar
 * Returns an array of section titles that should be open by default
 */
export function getInitialOpenSections(version: DocVersion): string[] {
    const openSections: string[] = [];

    for (const section of version.sections) {
        if (section.defaultOpen !== false) {
            openSections.push(section.title);
        }

        // Also check for open groups within sections
        for (const item of section.items) {
            if (isPageGroup(item) && item.defaultOpen) {
                openSections.push(`${section.title}::${item.title}`);
            }
        }
    }

    return openSections;
}

/**
 * Gets the initial open groups state for a section
 * Returns an array of group paths that should be open by default
 */
export function getInitialOpenGroups(section: DocSection): string[] {
    return section.items
        .filter(isPageGroup)
        .filter(g => g.defaultOpen)
        .map(g => g.path);
}
