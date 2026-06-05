import React from "react";
import {
  ExternalLink,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

interface Artisan {
  id: string;
  name: string;
  username: string;
  roles: string[];
  bio: string;
  focus: string;
  image: string;
  location: string;
  company?: string;
  statusLabel: string;
  stats: {
    repos: number;
    followers: number;
    contributions: string;
  };
  tech: string[];
  featuredWork: {
    label: string;
    href: string;
  }[];
  socials: {
    github: string;
    website?: string;
  };
}

const artisans: Artisan[] = [
  {
    id: "001",
    name: "Jaymark",
    username: "jayreid017",
    roles: ["UI/UX Designer", "QA Engineer"],
    bio: "Designs with care and tests with patience.",
    focus: "Interface systems, usability passes, and quality review.",
    image: "https://avatars.githubusercontent.com/u/253629901?v=4&s=1024",
    location: "Global",
    statusLabel: "Available for design QA",
    stats: {
      repos: 4,
      followers: 0,
      contributions: "Active",
    },
    tech: ["Figma", "React", "Testing"],
    featuredWork: [
      {
        label: "GitHub profile",
        href: "https://github.com/jayreid017",
      },
      {
        label: "Koamishin interface review",
        href: "/#projects",
      },
    ],
    socials: {
      github: "https://github.com/jayreid017",
    },
  },
  {
    id: "002",
    name: "SorenOutis",
    username: "SorenOutis",
    roles: ["Full Stack Developer", "Graphic Designer", "Network Administrator"],
    bio: "Shapes full-stack work with a visual eye.",
    focus: "Full-stack builds, infrastructure flow, and visual systems.",
    image: "https://avatars.githubusercontent.com/u/156742647?v=4&s=1024",
    location: "Remote",
    statusLabel: "Core platform contributor",
    stats: {
      repos: 4,
      followers: 0,
      contributions: "Core",
    },
    tech: ["Laravel", "Vue", "System Arch"],
    featuredWork: [
      {
        label: "Portfolio",
        href: "https://ob.koamishin.com",
      },
      {
        label: "Koami Starter Kit docs",
        href: "/docs/koami-starter-kit/v1/introduction",
      },
    ],
    socials: {
      github: "https://github.com/SorenOutis",
      website: "https://ob.koamishin.com",
    },
  },
  {
    id: "003",
    name: "Louis",
    username: "Rui-Zen",
    roles: ["Full Stack Engineer", "Technical Lead", "System Administrator", "DevOps"],
    bio: "Keeps systems clear, steady, and shippable.",
    focus: "Technical direction, deployment paths, and system reliability.",
    image: "https://avatars.githubusercontent.com/u/195420898?v=4&s=1024",
    location: "Koamishin",
    company: "Koamishin",
    statusLabel: "Leading architecture",
    stats: {
      repos: 6,
      followers: 1,
      contributions: "Lead",
    },
    tech: ["PHP", "TypeScript", "Writing"],
    featuredWork: [
      {
        label: "Portfolio",
        href: "https://rui.koamishin.com",
      },
      {
        label: "Koamishin projects",
        href: "/#projects",
      },
    ],
    socials: {
      github: "https://github.com/Rui-Zen",
      website: "https://rui.koamishin.com",
    },
  },
  {
    id: "004",
    name: "Angelika",
    username: "elyashzyl",
    roles: ["Developer", "Koamishin Contributor"],
    bio: "Builds thoughtful pieces for the Koamishin ecosystem.",
    focus: "React interfaces, Laravel features, and ecosystem support.",
    image: "https://avatars.githubusercontent.com/elyashzyl?s=1024",
    location: "Remote",
    statusLabel: "Active contributor",
    stats: {
      repos: 0,
      followers: 0,
      contributions: "Active",
    },
    tech: ["React", "TypeScript", "Laravel"],
    featuredWork: [
      {
        label: "Portfolio",
        href: "https://ely.koamishin.com/",
      },
      {
        label: "GitHub profile",
        href: "https://github.com/elyashzyl",
      },
    ],
    socials: {
      github: "https://github.com/elyashzyl",
      website: "https://ely.koamishin.com/",
    },
  },
];

const Team: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Team - Koamishin.com</title>
        <meta
          name="description"
          content="Meet the Koamishin team building minimalist developer systems, open-source tools, interfaces, and documentation."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://koamishin.com/team" />
        <meta property="og:title" content="Team - Koamishin.com" />
        <meta
          property="og:description"
          content="Meet the Koamishin team building minimalist developer systems, open-source tools, interfaces, and documentation."
        />
        <meta property="og:image" content="https://koamishin.com/og-image.png" />
        <meta property="og:site_name" content="Koamishin.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://koamishin.com/team" />
        <meta name="twitter:title" content="Team - Koamishin.com" />
        <meta
          name="twitter:description"
          content="Meet the Koamishin team building minimalist developer systems, open-source tools, interfaces, and documentation."
        />
        <meta name="twitter:image" content="https://koamishin.com/og-image.png" />
        <link rel="canonical" href="https://koamishin.com/team" />
      </Helmet>

      <div className="relative min-h-[calc(100svh-5rem)] bg-background/75">
        <section className="container relative mx-auto grid min-h-[calc(100svh-5rem)] gap-6 px-5 py-5 md:px-8 lg:px-12">
          <header className="grid gap-3 pb-3 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                Koamishin / Team
              </p>
              <h1 className="mt-2 max-w-3xl font-serif text-4xl font-bold leading-none text-foreground md:text-5xl">
                Minimal developer systems, built by a small team.
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
              All members, roles, and shipped work in one quiet index.
            </p>
          </header>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {artisans.map((artisan) => (
              <article
                key={artisan.id}
                className="group min-h-[calc(100svh-17rem)] rounded-sm outline-none [perspective:1400px]"
                tabIndex={0}
              >
                <div className="relative h-full min-h-[calc(100svh-17rem)] rounded-sm transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
                  <div className="absolute inset-0 overflow-hidden rounded-sm bg-muted [backface-visibility:hidden]">
                    <img
                      src={artisan.image}
                      alt={artisan.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] group-focus-within:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <h2 className="mt-1 font-serif text-3xl font-bold leading-none text-white">
                        {artisan.name}
                      </h2>
                      <p className="mt-2 text-sm text-white/70">
                        {artisan.roles[0]}
                      </p>
                    </div>
                  </div>

                  <div className="absolute inset-0 overflow-hidden rounded-sm bg-card [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <img
                      src={artisan.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/78 to-background/20" />
                    <div className="absolute inset-0 flex flex-col justify-end gap-4 p-4 backdrop-blur-[1px]">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                        @{artisan.username}
                      </p>
                      <p className="mt-1 font-serif text-3xl font-bold leading-none text-foreground">
                        {artisan.name}
                      </p>
                      <p className="mt-2 text-sm font-medium text-foreground">
                        {artisan.roles[0]}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {artisan.focus} {artisan.bio}
                      </p>
                    </div>

                    <div>
                      <p className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Stack
                      </p>
                      <p className="text-xs leading-relaxed text-primary">
                        {artisan.tech.join(" / ")}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <Button asChild size="sm" className="rounded-full">
                        <a href={artisan.socials.github} target="_blank" rel="noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </a>
                      </Button>
                      {artisan.socials.website && (
                        <Button asChild size="sm" variant="ghost" className="rounded-full">
                          <a href={artisan.socials.website} target="_blank" rel="noreferrer">
                            Site
                            <ExternalLink className="ml-2 h-3.5 w-3.5" />
                          </a>
                        </Button>
                      )}
                    </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Team;
