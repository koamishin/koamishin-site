import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Github,
  Twitter,
  Linkedin,
  Globe,
  MapPin,
  Database,
  Users,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";

gsap.registerPlugin(ScrollTrigger);

interface Artisan {
  id: string;
  name: string;
  username: string;
  roles: string[];
  bio: string;
  image: string;
  location: string;
  company?: string;
  stats: {
    repos: number;
    followers: number;
    contributions: string;
  };
  tech: string[];
  socials: {
    github: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

const artisans: Artisan[] = [
  {
    id: "001",
    name: "Jaymark",
    username: "jayreid017",
    roles: ["UI/UX Designer", "QA Engineer"],
    bio: "Building with purpose. Contributing to the Koamishin ecosystem to empower developers worldwide.",
    image: "https://avatars.githubusercontent.com/u/253629901?v=4&s=1024",
    location: "Global",
    stats: {
      repos: 4,
      followers: 0,
      contributions: "Active",
    },
    tech: ["Figma", "React", "Testing"],
    socials: {
      github: "https://github.com/jayreid017",
    },
  },
  {
    id: "002",
    name: "SorenOutis",
    username: "SorenOutis",
    roles: [
      "Full Stack Developer",
      "Graphic Designer ",
      "Network Administrator",
    ],
    bio: "Crafting code with precision. Dedicated to open source excellence and community growth.",
    image: "https://avatars.githubusercontent.com/u/156742647?v=4&s=1024",
    location: "Remote",
    stats: {
      repos: 4,
      followers: 0,
      contributions: "Core",
    },
    tech: ["Laravel", "Vue", "System Arch"],
    socials: {
      github: "https://github.com/SorenOutis",
      website: "https://ob.koamishin.com",
    },
  },
  {
    id: "003",
    name: "Louis",
    username: "Rui-Zen",
    roles: [
      "Full Stack Engineer",
      "Technical Lead",
      "System Administrator",
      "DevOps",
    ],
    bio: "Just a Chill Writer. Bringing creativity, clarity, and chill vibes to the codebase.",
    image: "https://avatars.githubusercontent.com/u/195420898?v=4&s=1024",
    location: "Koamishin Org",
    company: "Koamishin",
    stats: {
      repos: 6,
      followers: 1,
      contributions: "Lead",
    },
    tech: ["PHP", "TypeScript", "Writing"],
    socials: {
      github: "https://github.com/Rui-Zen",
      website: "https://rui.koamishin.com",
    },
  },
];

const Team: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".artisan-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "expo.out",
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Team - Koamishin.com</title>
        <meta
          name="description"
          content="Meet the core team behind Koamishin - passionate developers building high-quality open source Laravel applications."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://koamishin.com/team" />
        <meta property="og:title" content="Our Team - Koamishin.com" />
        <meta
          property="og:description"
          content="Meet the core team behind Koamishin - passionate developers building high-quality open source Laravel applications."
        />
        <meta
          property="og:image"
          content="https://koamishin.com/og-image.png"
        />
        <meta property="og:site_name" content="Koamishin.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://koamishin.com/team" />
        <meta name="twitter:title" content="Our Team - Koamishin.com" />
        <meta
          name="twitter:description"
          content="Meet the core team behind Koamishin - passionate developers building high-quality open source Laravel applications."
        />
        <meta
          name="twitter:image"
          content="https://koamishin.com/og-image.png"
        />
        <link rel="canonical" href="https://koamishin.com/team" />
      </Helmet>

      <div
        ref={containerRef}
        className="min-h-screen bg-background pt-32 pb-32"
      >
        <div className="container mx-auto px-6 md:px-12">
          <header
            ref={headerRef}
            className="mb-24 text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-primary/20 bg-primary/5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                Operatives
              </span>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl font-bold tracking-tight text-foreground mb-8">
              The Core Team
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              The architects behind the infrastructure.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artisans.map((artisan, index) => (
              <div
                key={artisan.id}
                className="artisan-card group relative h-full"
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
              >
                <div className="relative h-full overflow-hidden rounded-xl border border-border bg-card/50 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5">
                  <div className="absolute top-6 left-6 z-20">
                    <div className="font-mono text-xs font-bold text-white/80 bg-black/50 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                      ID: {artisan.id}
                    </div>
                  </div>

                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                    <img
                      src={artisan.image}
                      alt={artisan.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 grayscale"
                    />

                    <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between gap-2 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 text-xs text-white">
                        <Database className="h-3 w-3 text-primary" />
                        <span>{artisan.stats.repos} Repos</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10 text-xs text-white">
                        <Users className="h-3 w-3 text-primary" />
                        <span>{artisan.stats.followers} FLW</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 pt-6 relative">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="font-serif text-3xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {artisan.name}
                        </h2>
                        <p className="font-mono text-xs text-muted-foreground">
                          @{artisan.username}
                        </p>
                      </div>
                      {artisan.company && (
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground border border-border px-2 py-1 rounded">
                          <Building2 className="h-3 w-3" />
                          {artisan.company}
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3 text-sm font-medium text-primary">
                        {artisan.roles.map((role, idx) => (
                          <span key={role} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {role}
                            {idx < artisan.roles.length - 1 && (
                              <span className="text-muted-foreground/50">
                                •
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {artisan.bio}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {artisan.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="bg-secondary/50 hover:bg-secondary text-[10px]"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {artisan.location}
                      </div>

                      <div className="flex gap-3">
                        {artisan.socials.github && (
                          <a
                            href={artisan.socials.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {artisan.socials.twitter && (
                          <a
                            href={artisan.socials.twitter}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                        {artisan.socials.linkedin && (
                          <a
                            href={artisan.socials.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                        {artisan.socials.website && (
                          <a
                            href={artisan.socials.website}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Globe className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 border-t border-border pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-muted-foreground opacity-60">
            <div className="font-mono text-xs uppercase tracking-widest">
              Koamishin Network // Verified Personnel
            </div>
            <div className="font-mono text-xs uppercase tracking-widest">
              Total Strength: {artisans.length}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
