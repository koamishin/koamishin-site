export interface GitHubRepoDetails {
    stars: number;
    forks: number;
    openIssues: number;
    description: string;
    url: string;
}

export interface GitHubRelease {
    tagName: string;
    name: string;
    publishedAt: string;
    url: string;
}

const getHeaders = () => {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const headers: HeadersInit = {
        "Accept": "application/vnd.github.v3+json",
    };
    if (token && token !== "your_token_here") {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
};

export const GitHubService = {
    async fetchRepoDetails(owner: string, repo: string): Promise<GitHubRepoDetails | null> {
        try {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
                headers: getHeaders()
            });
            if (!response.ok) return null;
            const data = await response.json();
            return {
                stars: data.stargazers_count,
                forks: data.forks_count,
                openIssues: data.open_issues_count,
                description: data.description,
                url: data.html_url,
            };
        } catch (error) {
            console.error("Failed to fetch repo details:", error);
            return null;
        }
    },

    async fetchLatestRelease(owner: string, repo: string): Promise<GitHubRelease | null> {
        try {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
                headers: getHeaders()
            });
            if (!response.ok) return null;
            const data = await response.json();
            return {
                tagName: data.tag_name,
                name: data.name,
                publishedAt: data.published_at,
                url: data.html_url,
            };
        } catch (error) {
            console.error("Failed to fetch latest release:", error);
            return null;
        }
    },

    async fetchKoamishinStats(): Promise<{ modules: number; artisans: number } | null> {
        try {
            const reposResponse = await fetch("https://api.github.com/orgs/koamishin/repos?per_page=100", {
                headers: getHeaders()
            });
            let modulesCount = 0;
            
            if (reposResponse.ok) {
                const repos = await reposResponse.json();
                const filteredRepos = repos.filter((repo: any) => 
                    repo.topics && (
                        repo.topics.includes("koamishin-projects") || 
                        repo.topics.includes("packages")
                    )
                );
                modulesCount = filteredRepos.length;
            }

            const membersResponse = await fetch("https://api.github.com/orgs/koamishin/members?per_page=100", {
                headers: getHeaders()
            });
            
            let artisansCount = 0;
            if (membersResponse.ok) {
                const members = await membersResponse.json();
                artisansCount = members.length;
            } else {
                 const publicMembersResponse = await fetch("https://api.github.com/orgs/koamishin/public_members?per_page=100", {
                    headers: getHeaders()
                });
                if (publicMembersResponse.ok) {
                    const members = await publicMembersResponse.json();
                    artisansCount = members.length;
                }
            }

            return {
                modules: modulesCount,
                artisans: artisansCount
            };

        } catch (error) {
            console.error("Failed to fetch Koamishin stats:", error);
            return null;
        }
    }
};
