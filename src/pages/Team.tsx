import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  ExternalLink,
  Github,
  MapPin,
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
    roles: [
      "Full Stack Developer",
      "Graphic Designer",
      "Network Administrator",
    ],
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
    roles: [
      "Full Stack Engineer",
      "Technical Lead",
      "System Administrator",
      "DevOps",
    ],
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
  const containerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const rosterRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSectionPaused, setIsSectionPaused] = useState(false);

  const activeArtisan = artisans[activeIndex];
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
    if (isSectionPaused) return;

    const interval = window.setInterval(() => {
      selectProfile((activeIndexRef.current + 1) % artisans.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isSectionPaused, selectProfile]);

  const handleSectionBlur = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setIsSectionPaused(false);
      }
    },
    []
  );

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
        className="relative min-h-screen overflow-hidden bg-background/65 pt-4 pb-8 lg:pt-5"
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
          <header className="team-reveal mx-auto mb-4 max-w-4xl text-center lg:mb-4">
            <h1 className="font-serif text-4xl font-bold leading-[1.02] text-foreground md:text-5xl lg:text-[3.25rem] xl:text-[3.6rem]">
              Meet the team.
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
              The people behind Koamishin build open-source tools, product
              interfaces, docs, and systems that keep each project moving.
            </p>
          </header>

          <section
            className="team-reveal team-parallax-soft grid gap-3 lg:h-[calc(100vh-230px)] lg:min-h-[460px] lg:grid-cols-[290px_minmax(0,1fr)] lg:items-stretch xl:grid-cols-[315px_minmax(0,1fr)]"
            aria-label="Koamishin team profiles"
            onMouseEnter={() => setIsSectionPaused(true)}
            onMouseLeave={() => setIsSectionPaused(false)}
            onFocusCapture={() => setIsSectionPaused(true)}
            onBlurCapture={handleSectionBlur}
          >
            <aside className="rounded-lg border border-border bg-card/65 p-2.5 shadow-xl shadow-primary/5 backdrop-blur-md lg:h-full lg:min-h-0">
              <div className="mb-2 flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-serif text-base font-bold text-foreground">
                    Team
                  </h2>
                </div>
                <div className="rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {activeIndex + 1}/{artisans.length}
                </div>
              </div>

              <div
                ref={rosterRef}
                className="grid grid-cols-[repeat(4,minmax(210px,1fr))] gap-2.5 overflow-x-auto pb-2 lg:h-[calc(100%-40px)] lg:grid-cols-1 lg:grid-rows-4 lg:overflow-visible lg:pb-0"
              >
                {artisans.map((artisan, index) => {
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={artisan.id}
                      type="button"
                      data-profile-index={index}
                      onClick={() => selectProfile(index)}
                      aria-pressed={isActive}
                      aria-label={`${isActive ? "Current profile" : "View profile"}: ${artisan.name}`}
                      className={cn(
                        "group grid min-w-[210px] grid-cols-[46px_1fr] gap-2.5 rounded-md border p-2 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:min-w-0 lg:content-center",
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
                          <span className="truncate font-serif text-[15px] font-bold leading-tight text-foreground">
                            {artisan.name}
                          </span>
                          <span
                            className={cn(
                              "h-1.5 w-1.5 shrink-0 rounded-full",
                              isActive ? "bg-primary" : "bg-muted-foreground/30"
                            )}
                          />
                        </div>
                        <p className="line-clamp-1 text-xs leading-relaxed text-muted-foreground">
                          {artisan.roles[0]}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          <Badge
                            variant="outline"
                            className="rounded-md border-primary/20 bg-primary/5 px-2 py-0 text-[9px] text-primary"
                          >
                            {artisan.stats.contributions}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="max-w-full truncate rounded-md border-border/80 px-2 py-0 text-[9px] text-muted-foreground"
                          >
                            {artisan.statusLabel}
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
              <div className="relative z-10 grid h-full min-h-0 gap-0 xl:grid-cols-[minmax(340px,0.92fr)_1.08fr]">
                <div
                  ref={portraitRef}
                  className="group/portrait relative min-h-[260px] overflow-hidden border-b border-border bg-muted/35 xl:min-h-0 xl:border-b-0 xl:border-r"
                >
                  <img
                    key={activeArtisan.image}
                    src={activeArtisan.image}
                    alt={activeArtisan.name}
                    className="h-full min-h-[260px] w-full object-cover grayscale transition duration-700 group-hover/portrait:grayscale-0 xl:min-h-0"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
                  <div className="profile-swap absolute bottom-4 left-4 right-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
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
                  </div>
                </div>

                <div className="flex min-h-[440px] flex-col p-4 md:p-5 lg:min-h-0 lg:overflow-y-auto xl:p-5">
                  <div className="profile-swap mb-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="font-serif text-3xl font-bold leading-none text-foreground md:text-4xl xl:text-[2.7rem]">
                        {activeArtisan.name}
                      </h2>
                      <p className="mt-1.5 text-sm text-muted-foreground">
                        {activeArtisan.roles[0]}
                      </p>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {activeArtisan.focus}
                      </p>
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

                  <p className="profile-swap mb-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {activeArtisan.bio}
                  </p>

                  <div className="profile-swap mb-3 flex flex-wrap gap-2">
                    {activeArtisan.roles.slice(0, 2).map((role) => (
                      <span
                        key={role}
                          className="rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs font-medium text-foreground"
                      >
                        {role}
                      </span>
                    ))}
                  </div>

                  <div className="profile-swap mb-4">
                    <div className="flex flex-wrap gap-2">
                      {activeArtisan.tech.slice(0, 3).map((tech) => (
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

                  <div className="profile-swap mb-4 grid gap-2 sm:grid-cols-3">
                    {[
                      {
                        label: "Repos",
                        value: activeArtisan.stats.repos,
                      },
                      {
                        label: "Followers",
                        value: activeArtisan.stats.followers,
                      },
                      {
                        label: "Status",
                        value: activeArtisan.stats.contributions,
                      },
                    ].map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-md border border-border bg-background/45 px-3 py-2"
                      >
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {metric.label}
                        </div>
                        <div className="mt-0.5 truncate text-base font-semibold text-foreground">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="profile-swap mb-4">
                    <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                      <BriefcaseBusiness className="h-3.5 w-3.5 text-primary" />
                      Featured work
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {activeArtisan.featuredWork.map((work) => {
                        const isExternal = /^https?:\/\//.test(work.href);

                        return (
                          <a
                            key={work.label}
                            href={work.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noreferrer" : undefined}
                            className="group flex min-w-0 items-center justify-between gap-3 rounded-md border border-border bg-background/45 px-3 py-2 text-sm text-foreground transition hover:border-primary/35 hover:bg-background/75"
                          >
                            <span className="truncate">{work.label}</span>
                            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition group-hover:text-primary" />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  <div className="profile-swap mt-auto grid gap-3 border-t border-border pt-4 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {activeArtisan.location}
                      </span>
                      {activeArtisan.company && (
                        <span>
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

          <section className="team-reveal mt-4 rounded-lg border border-border bg-card/65 p-4 shadow-xl shadow-primary/5 backdrop-blur-md md:flex md:items-center md:justify-between md:gap-6">
            <div className="min-w-0">
              <h2 className="font-serif text-xl font-bold text-foreground">
                Explore what the team is building.
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Browse shipped projects, read the docs, or inspect the
                open-source work behind Koamishin.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 md:mt-0 md:justify-end">
              <Button asChild variant="outline" className="rounded-md">
                <a href="/#projects">
                  <BriefcaseBusiness className="mr-2 h-4 w-4" />
                  Projects
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-md">
                <a href="/docs">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Docs
                </a>
              </Button>
              <Button asChild className="rounded-md">
                <a
                  href="https://github.com/Koamishin"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Team;
