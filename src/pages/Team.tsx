import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Code2,
  Database,
  ExternalLink,
  Github,
  Linkedin,
  MapPin,
  ShieldCheck,
  Twitter,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

gsap.registerPlugin(ScrollTrigger);

type LenisScroller = {
  scrollTo: (
    target: HTMLElement,
    options?: { offset?: number; duration?: number }
  ) => void;
};

type WindowWithLenis = { lenis?: LenisScroller };

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

const getPortfolioLabel = (url: string) => {
  try {
    const host = new URL(url).hostname;
    return host.replace(/^www\./, "");
  } catch {
    return url;
  }
};

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
      "Graphic Designer",
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
    location: "Koamishin",
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
  {
    id: "004",
    name: "Angelika",
    username: "elyashzyl",
    roles: ["Developer", "Koamishin Contributor"],
    bio: "Contributing thoughtful work to the Koamishin ecosystem and helping the team build with care.",
    image: "https://avatars.githubusercontent.com/elyashzyl?s=1024",
    location: "Remote",
    stats: {
      repos: 0,
      followers: 0,
      contributions: "Active",
    },
    tech: ["React", "TypeScript", "Laravel"],
    socials: {
      github: "https://github.com/elyashzyl",
      website: "https://ely.koamishin.com/",
    },
  },
];

const Team: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const rosterRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeArtisan = artisans[activeIndex];
  const totalRepos = useMemo(
    () => artisans.reduce((total, artisan) => total + artisan.stats.repos, 0),
    []
  );
  const coreDisciplines = useMemo(
    () => Array.from(new Set(artisans.flatMap((artisan) => artisan.tech))).length,
    []
  );

  const scrollToRoster = () => {
    const target = rosterRef.current;
    if (!target) return;

    const lenis = (window as unknown as WindowWithLenis).lenis;

    if (lenis) {
      lenis.scrollTo(target, { offset: -96, duration: 1.2 });
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 48, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        featureRef.current,
        { y: 72, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.15,
        }
      );

      gsap.fromTo(
        ".team-metric",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.25,
        }
      );

      gsap.fromTo(
        ".artisan-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rosterRef.current,
            start: "top 82%",
          },
        }
      );

      gsap.to(backgroundRef.current, {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".parallax-slow", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".parallax-fast", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!featureRef.current) return;

    const card = featureRef.current;
    const rotateX = gsap.quickTo(card, "rotationX", {
      duration: 0.45,
      ease: "power3.out",
    });
    const rotateY = gsap.quickTo(card, "rotationY", {
      duration: 0.45,
      ease: "power3.out",
    });

    const handleMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      rotateX(y * -5);
      rotateY(x * 5);
    };

    const handleLeave = () => {
      rotateX(0);
      rotateY(0);
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".active-profile-detail",
      { y: 12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
        stagger: 0.04,
      }
    );
  }, [activeIndex]);

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
        className="relative min-h-screen overflow-hidden bg-background pt-32 pb-28"
      >
        <div
          ref={backgroundRef}
          className="pointer-events-none absolute inset-x-0 top-0 h-[760px] opacity-70"
        >
          <div className="absolute left-1/2 top-8 h-[560px] w-[560px] -translate-x-1/2 rounded-full border border-primary/10" />
          <div className="absolute left-[8%] top-40 h-48 w-48 rounded-full border border-border/70 bg-card/30 blur-sm" />
          <div className="absolute right-[7%] top-24 h-64 w-64 rounded-full bg-primary/[0.045] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.13]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 md:px-12">
          <header
            ref={headerRef}
            className="mx-auto mb-16 max-w-5xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                Koamishin Team
              </span>
            </div>
            <h1 className="mb-8 font-serif text-5xl font-bold leading-[1.02] tracking-tight text-foreground md:text-7xl lg:text-8xl">
              The people behind the systems.
            </h1>
            <p className="mx-auto max-w-3xl text-base font-light leading-relaxed text-muted-foreground md:text-xl">
              A compact engineering collective shaped by product thinking, backend discipline, interface craft, and open-source delivery.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                onClick={scrollToRoster}
                className="h-11 rounded-md px-5 text-xs uppercase tracking-widest"
              >
                <ArrowDown className="mr-2 h-4 w-4" />
                View Roster
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-md px-5 text-xs uppercase tracking-widest"
              >
                <a href="https://github.com/Koamishin" target="_blank" rel="noreferrer">
                  GitHub Network
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </header>

          <section className="mb-24 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
            <div
              ref={featureRef}
              className="parallax-slow relative overflow-hidden rounded-lg border border-border bg-card/70 p-6 shadow-xl shadow-primary/5 backdrop-blur-md md:p-8 lg:p-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-secondary/20" />
              <div className="relative z-10 grid gap-8 md:grid-cols-[220px_1fr] md:items-center">
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[220px] overflow-hidden rounded-md border border-border bg-muted">
                  <img
                    key={activeArtisan.image}
                    src={activeArtisan.image}
                    alt={activeArtisan.name}
                    className="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                      Active Profile
                    </span>
                  </div>
                </div>

                <div>
                  <div className="active-profile-detail mb-4 flex flex-wrap items-center gap-3">
                    <Badge variant="outline" className="rounded-md border-primary/25 bg-primary/5 text-primary">
                      ID {activeArtisan.id}
                    </Badge>
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      @{activeArtisan.username}
                    </span>
                  </div>
                  <h2 className="active-profile-detail mb-4 font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
                    {activeArtisan.name}
                  </h2>
                  <p className="active-profile-detail mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {activeArtisan.bio}
                  </p>
                  <div className="active-profile-detail mb-8 flex flex-wrap gap-2">
                    {activeArtisan.roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-md border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                  <div className="active-profile-detail grid gap-3 sm:grid-cols-3">
                    <div className="rounded-md border border-border bg-background/50 p-4">
                      <Database className="mb-3 h-4 w-4 text-primary" />
                      <div className="font-serif text-2xl font-bold">{activeArtisan.stats.repos}</div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Repos
                      </div>
                    </div>
                    <div className="rounded-md border border-border bg-background/50 p-4">
                      <Users className="mb-3 h-4 w-4 text-primary" />
                      <div className="font-serif text-2xl font-bold">{activeArtisan.stats.followers}</div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Followers
                      </div>
                    </div>
                    <div className="rounded-md border border-border bg-background/50 p-4">
                      <ShieldCheck className="mb-3 h-4 w-4 text-primary" />
                      <div className="font-serif text-2xl font-bold">{activeArtisan.stats.contributions}</div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Status
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <aside className="parallax-fast grid gap-4 rounded-lg border border-border bg-muted/35 p-5 backdrop-blur-sm md:grid-cols-3 lg:grid-cols-1">
              <div className="team-metric rounded-md border border-border bg-card/60 p-5">
                <BriefcaseBusiness className="mb-5 h-5 w-5 text-primary" />
                <div className="font-serif text-4xl font-bold">{artisans.length}</div>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Core Members
                </p>
              </div>
              <div className="team-metric rounded-md border border-border bg-card/60 p-5">
                <Database className="mb-5 h-5 w-5 text-primary" />
                <div className="font-serif text-4xl font-bold">{totalRepos}</div>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Public Repos
                </p>
              </div>
              <div className="team-metric rounded-md border border-border bg-card/60 p-5">
                <Code2 className="mb-5 h-5 w-5 text-primary" />
                <div className="font-serif text-4xl font-bold">{coreDisciplines}</div>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  Shared Skills
                </p>
              </div>
            </aside>
          </section>

          <div ref={rosterRef} className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                Interactive Roster
              </span>
              <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-5xl">
                Select a profile
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
              Click a team member to inspect their focus, portfolio, public work, and role in the Koamishin network.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {artisans.map((artisan, index) => (
              <button
                key={artisan.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="artisan-card group relative h-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
              >
                <div
                  className={`relative h-full overflow-hidden rounded-lg border bg-card/65 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 ${
                    activeIndex === index
                      ? "border-primary/60 shadow-xl shadow-primary/10"
                      : "border-border"
                  }`}
                >
                  <div className="absolute top-6 left-6 z-20">
                    <div className="rounded-md border border-white/10 bg-black/50 px-3 py-1 font-mono text-xs font-bold text-white/80 backdrop-blur-md">
                      ID: {artisan.id}
                    </div>
                  </div>

                  {artisan.socials.website && (
                    <a
                      href={artisan.socials.website}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(event) => event.stopPropagation()}
                      className="absolute top-6 right-6 z-20 flex items-center gap-1.5 rounded-md bg-primary/90 px-3 py-1.5 font-mono text-xs font-semibold text-primary-foreground shadow-lg shadow-primary/25 backdrop-blur-md transition-colors hover:bg-primary"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Portfolio
                    </a>
                  )}

                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent" />
                    <img
                      src={artisan.image}
                      alt={artisan.name}
                      className="h-full w-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />

                    <div className="absolute bottom-4 left-4 right-4 z-20 flex translate-y-4 justify-between gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                        <Database className="h-3 w-3 text-primary" />
                        <span>{artisan.stats.repos} Repos</span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-md border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                        <Users className="h-3 w-3 text-primary" />
                        <span>{artisan.stats.followers} FLW</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative p-6 pt-5">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="mb-1 font-serif text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                          {artisan.name}
                        </h3>
                        <p className="font-mono text-xs text-muted-foreground">
                          @{artisan.username}
                        </p>
                      </div>
                      {artisan.company && (
                        <div className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground">
                          <Building2 className="h-3 w-3" />
                          {artisan.company}
                        </div>
                      )}
                    </div>

                    <div className="mb-6">
                      <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-primary">
                        {artisan.roles.map((role, idx) => (
                          <span key={role} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {role}
                            {idx < artisan.roles.length - 1 && (
                              <span className="text-muted-foreground/50">/</span>
                            )}
                          </span>
                        ))}
                      </div>
                      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {artisan.bio}
                      </p>
                    </div>

                    {artisan.socials.website && (
                      <a
                        href={artisan.socials.website}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        className="mb-6 flex items-center gap-2 rounded-md border border-primary/30 bg-primary/5 px-4 py-2.5 transition-all hover:border-primary/50 hover:bg-primary/10 group/link"
                      >
                        <ExternalLink className="h-4 w-4 shrink-0 text-primary" />
                        <span className="truncate font-mono text-sm text-primary">
                          {getPortfolioLabel(artisan.socials.website)}
                        </span>
                      </a>
                    )}

                    <div className="mb-8 flex flex-wrap gap-2">
                      {artisan.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="rounded-md bg-secondary/50 text-[10px] hover:bg-secondary"
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
                            onClick={(event) => event.stopPropagation()}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {artisan.socials.twitter && (
                          <a
                            href={artisan.socials.twitter}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Twitter className="h-4 w-4" />
                          </a>
                        )}
                        {artisan.socials.linkedin && (
                          <a
                            href={artisan.socials.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-border pt-10 text-muted-foreground md:flex-row">
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
