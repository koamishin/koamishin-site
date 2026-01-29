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

export const GitHubService = {
    async fetchRepoDetails(owner: string, repo: string): Promise<GitHubRepoDetails | null> {
        try {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
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
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
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
    }
};
