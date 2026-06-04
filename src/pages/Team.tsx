import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Database,
  ExternalLink,
  Github,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { cn } from "@/lib/utils";

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
  const detailRef = useRef<HTMLDivElement>(null);
  const rosterRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeArtisan = artisans[activeIndex];
  const totals = useMemo(
    () => ({
      members: artisans.length,
      repos: artisans.reduce((total, artisan) => total + artisan.stats.repos, 0),
      skills: Array.from(new Set(artisans.flatMap((artisan) => artisan.tech)))
        .length,
    }),
    []
  );

  const selectProfile = useCallback((nextIndex: number) => {
    if (nextIndex === activeIndexRef.current || isAnimatingRef.current) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const source = thumbnailRefs.current[nextIndex];
    const target = portraitRef.current;

    if (reducedMotion || !source || !target) {
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      return;
    }

    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const sourceImage = source.querySelector("img");
    const clone = document.createElement("img");

    isAnimatingRef.current = true;
    clone.src = artisans[nextIndex].image;
    clone.alt = artisans[nextIndex].name;
    clone.setAttribute("aria-hidden", "true");
    clone.style.position = "fixed";
    clone.style.left = `${sourceRect.left}px`;
    clone.style.top = `${sourceRect.top}px`;
    clone.style.width = `${sourceRect.width}px`;
    clone.style.height = `${sourceRect.height}px`;
    clone.style.objectFit = "cover";
    clone.style.borderRadius = getComputedStyle(source).borderRadius;
    clone.style.filter = sourceImage
      ? getComputedStyle(sourceImage).filter
      : "grayscale(1)";
    clone.style.pointerEvents = "none";
    clone.style.zIndex = "120";
    clone.style.boxShadow = "0 18px 60px hsl(225 28% 14% / 0.18)";

    document.body.appendChild(clone);

    gsap
      .timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          clone.remove();
          isAnimatingRef.current = false;
        },
      })
      .to(clone, {
        left: targetRect.left,
        top: targetRect.top,
        width: targetRect.width,
        height: targetRect.height,
        borderRadius: getComputedStyle(target).borderRadius,
        duration: 0.65,
      })
      .to(
        clone,
        {
          filter: "grayscale(0)",
          duration: 0.22,
          ease: "power2.out",
        },
        0.34
      )
      .call(
        () => {
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
        },
        undefined,
        0.42
      )
      .to(
        clone,
        {
          opacity: 0,
          scale: 1.015,
          duration: 0.2,
          ease: "power2.out",
        },
        0.52
      );
  }, []);

  const goToProfile = (direction: "next" | "previous") => {
    const current = activeIndexRef.current;
    const nextIndex =
      direction === "next"
        ? (current + 1) % artisans.length
        : (current - 1 + artisans.length) % artisans.length;

    selectProfile(nextIndex);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      selectProfile((activeIndexRef.current + 1) % artisans.length);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [selectProfile]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".team-reveal",
        { y: 28, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
        }
      );

      gsap.to(backgroundRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".team-parallax-soft", {
        yPercent: -6,
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
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".profile-swap",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.38,
          ease: "power2.out",
          stagger: 0.04,
        }
      );
    }, detailRef);

    return () => ctx.revert();
  }, [activeIndex]);

  useEffect(() => {
    const activeButton = rosterRef.current?.querySelector<HTMLButtonElement>(
      `[data-profile-index="${activeIndex}"]`
    );

    activeButton?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
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
        className="relative min-h-screen overflow-hidden bg-background pt-6 pb-10 lg:pt-8"
      >
        <div
          ref={backgroundRef}
          className="pointer-events-none absolute inset-x-0 top-0 h-[760px] opacity-80"
        >
          <div className="absolute left-1/2 top-8 h-[540px] w-[540px] -translate-x-1/2 rounded-full border border-primary/10" />
          <div className="absolute left-[7%] top-44 h-40 w-40 rounded-lg border border-border/70 bg-card/25 blur-sm" />
          <div className="absolute right-[8%] top-28 h-64 w-64 rounded-full bg-primary/[0.04] blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.12]" />
        </div>

        <div className="container relative z-10 mx-auto px-5 md:px-8 lg:px-12">
          <header className="team-reveal mx-auto mb-5 max-w-5xl text-center lg:mb-6">
            <h1 className="mb-3 font-serif text-4xl font-bold leading-[1.02] text-foreground md:text-5xl lg:text-5xl xl:text-6xl">
              The people behind the systems.
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
              A compact engineering collective shaped by product thinking, backend discipline, interface craft, and open-source delivery.
            </p>
          </header>

          <section className="team-reveal team-parallax-soft grid gap-4 lg:h-[calc(100vh-240px)] lg:min-h-[500px] lg:grid-cols-[320px_minmax(0,1fr)] lg:items-stretch xl:grid-cols-[350px_minmax(0,1fr)]">
            <aside className="rounded-lg border border-border bg-card/65 p-3 shadow-xl shadow-primary/5 backdrop-blur-md lg:h-full lg:min-h-0">
              <div className="mb-2.5 flex items-end justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                    Roster
                  </span>
                  <h2 className="font-serif text-lg font-bold text-foreground">
                    Select Profile
                  </h2>
                </div>
                <div className="rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {activeIndex + 1}/{artisans.length}
                </div>
              </div>

              <div
                ref={rosterRef}
                className="grid grid-cols-[repeat(4,minmax(220px,1fr))] gap-3 overflow-x-auto pb-2 lg:h-[calc(100%-48px)] lg:grid-cols-1 lg:grid-rows-4 lg:overflow-visible lg:pb-0"
              >
                {artisans.map((artisan, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={artisan.id}
                      type="button"
                      data-profile-index={index}
                      onClick={() => selectProfile(index)}
                      className={cn(
                        "group grid min-w-[220px] grid-cols-[52px_1fr] gap-3 rounded-md border p-2 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:min-w-0 lg:content-center",
                        isActive
                          ? "border-primary/55 bg-primary/7 shadow-md shadow-primary/10"
                          : "border-border bg-background/45 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-background/75"
                      )}
                    >
                      <div
                        ref={(el) => {
                          thumbnailRefs.current[index] = el;
                        }}
                        className="relative aspect-square overflow-hidden rounded-md border border-border bg-muted"
                      >
                        <img
                          src={artisan.image}
                          alt={artisan.name}
                          className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                        />
                      </div>

                      <div className="min-w-0 self-center">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="truncate font-serif text-base font-bold leading-tight text-foreground">
                            {artisan.name}
                          </span>
                          <span
                            className={cn(
                              "h-1.5 w-1.5 shrink-0 rounded-full",
                              isActive ? "bg-primary" : "bg-muted-foreground/30"
                            )}
                          />
                        </div>
                        <p className="mb-1 truncate font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                          @{artisan.username}
                        </p>
                        <p className="line-clamp-1 text-xs leading-relaxed text-muted-foreground lg:line-clamp-2">
                          {artisan.roles.join(" / ")}
                        </p>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          <Badge
                            variant="outline"
                            className="rounded-md border-primary/20 bg-primary/5 px-2 py-0 text-[9px] text-primary"
                          >
                            {artisan.stats.contributions}
                          </Badge>
                          {artisan.company && (
                            <Badge
                              variant="secondary"
                              className="rounded-md px-2 py-0 text-[9px]"
                            >
                              {artisan.company}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>

            <div
              ref={detailRef}
              className="relative overflow-hidden rounded-lg border border-border bg-card/70 shadow-2xl shadow-primary/5 backdrop-blur-md lg:h-full lg:min-h-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-secondary/20" />
              <div className="relative z-10 grid h-full min-h-0 gap-0 xl:grid-cols-[minmax(280px,0.75fr)_1.25fr]">
                <div
                  ref={portraitRef}
                  className="relative min-h-[300px] overflow-hidden border-b border-border bg-muted/35 xl:min-h-0 xl:border-b-0 xl:border-r"
                >
                  <img
                    key={activeArtisan.image}
                    src={activeArtisan.image}
                    alt={activeArtisan.name}
                    className="h-full min-h-[300px] w-full object-cover grayscale transition duration-700 hover:grayscale-0 xl:min-h-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
                  <div className="profile-swap absolute bottom-5 left-5 right-5">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge className="rounded-md bg-primary text-primary-foreground">
                        ID {activeArtisan.id}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="rounded-md border-white/20 bg-black/35 text-white backdrop-blur-md"
                      >
                        {activeArtisan.stats.contributions}
                      </Badge>
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
                      Active Profile
                    </p>
                  </div>
                </div>

                <div className="flex min-h-[500px] flex-col p-5 md:p-6 lg:min-h-0 lg:overflow-y-auto xl:p-6">
                  <div className="profile-swap mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                        @{activeArtisan.username}
                      </p>
                      <h2 className="font-serif text-4xl font-bold leading-none text-foreground md:text-5xl">
                        {activeArtisan.name}
                      </h2>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="rounded-md"
                        aria-label="View previous profile"
                        onClick={() => goToProfile("previous")}
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="rounded-md"
                        aria-label="View next profile"
                        onClick={() => goToProfile("next")}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="profile-swap mb-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    {activeArtisan.bio}
                  </p>

                  <div className="profile-swap mb-4 flex flex-wrap gap-2">
                    {activeArtisan.roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-md border border-border bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground"
                      >
                        {role}
                      </span>
                    ))}
                  </div>

                  <div className="profile-swap mb-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-md border border-border bg-background/50 p-3">
                      <Database className="mb-2 h-4 w-4 text-primary" />
                      <div className="font-serif text-2xl font-bold">
                        {activeArtisan.stats.repos}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Repos
                      </div>
                    </div>
                    <div className="rounded-md border border-border bg-background/50 p-3">
                      <Users className="mb-2 h-4 w-4 text-primary" />
                      <div className="font-serif text-2xl font-bold">
                        {activeArtisan.stats.followers}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Followers
                      </div>
                    </div>
                    <div className="rounded-md border border-border bg-background/50 p-3">
                      <ShieldCheck className="mb-2 h-4 w-4 text-primary" />
                      <div className="font-serif text-2xl font-bold">
                        {activeArtisan.stats.contributions}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        Status
                      </div>
                    </div>
                  </div>

                  <div className="profile-swap mb-5">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      Core Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {activeArtisan.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="rounded-md bg-secondary/55 text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="profile-swap mt-auto grid gap-4 border-t border-border pt-5 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {activeArtisan.location}
                      </span>
                      {activeArtisan.company && (
                        <span className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-primary" />
                          {activeArtisan.company}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button asChild className="rounded-md">
                        <a
                          href={activeArtisan.socials.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          GitHub
                        </a>
                      </Button>
                      {activeArtisan.socials.website && (
                        <Button asChild variant="outline" className="rounded-md">
                          <a
                            href={activeArtisan.socials.website}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Portfolio
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="team-reveal mt-5 grid gap-3 border-t border-border pt-5 md:grid-cols-3">
            <div className="rounded-md border border-border bg-card/50 p-4">
              <div className="font-serif text-3xl font-bold text-foreground">
                {totals.members}
              </div>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Core Members
              </p>
            </div>
            <div className="rounded-md border border-border bg-card/50 p-4">
              <div className="font-serif text-3xl font-bold text-foreground">
                {totals.repos}
              </div>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Public Repos
              </p>
            </div>
            <div className="rounded-md border border-border bg-card/50 p-4">
              <div className="font-serif text-3xl font-bold text-foreground">
                {totals.skills}
              </div>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Shared Skills
              </p>
            </div>
          </section>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 text-muted-foreground md:flex-row">
            <div className="font-mono text-xs uppercase tracking-widest">
              Koamishin Network // Verified Personnel
            </div>
            <a
              href="https://github.com/Koamishin"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors hover:text-primary"
            >
              GitHub Network
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
