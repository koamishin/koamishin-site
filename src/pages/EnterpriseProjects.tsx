import React, { useEffect, useRef } from "react";
import { Building2, LockKeyhole, ShieldCheck } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { gsap } from "@/lib/gsap";

interface EnterpriseProject {
  name: string;
  category: string;
  visibility: string;
  deploymentType: string;
  distributedTo?: string;
  description: string;
  features: string[];
  techStack: string[];
  scope: string;
  type: string;
}

const enterpriseProjects: EnterpriseProject[] = [
  {
    name: "KoAkademy",
    category: "Data Center System",
    visibility: "Private / Non-OSS",
    deploymentType: "Private Deployment",
    distributedTo: "Koamishin",
    description:
      "A private enterprise system for managing data center operations, internal workflows, and controlled infrastructure records.",
    features: [
      "Private deployment model",
      "Internal operations dashboard",
      "Infrastructure and record management",
      "Role-based access controls",
    ],
    techStack: ["Laravel", "Filament", "Livewire", "MySQL", "Tailwind CSS"],
    scope: "Enterprise",
    type: "Private",
  },
];

const EnterpriseProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.12,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Enterprise Solution Projects - Koamishin.com</title>
        <meta
          name="description"
          content="Private and non-OSS enterprise systems by Koamishin, including internal deployments and company-distributed solutions."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://koamishin.com/enterprise-projects"
        />
        <meta
          property="og:title"
          content="Enterprise Solution Projects - Koamishin.com"
        />
        <meta
          property="og:description"
          content="Private and non-OSS enterprise systems by Koamishin, including internal deployments and company-distributed solutions."
        />
        <meta
          property="og:image"
          content="https://koamishin.com/og-image.png"
        />
        <meta property="og:site_name" content="Koamishin.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://koamishin.com/enterprise-projects"
        />
        <meta
          name="twitter:title"
          content="Enterprise Solution Projects - Koamishin.com"
        />
        <meta
          name="twitter:description"
          content="Private and non-OSS enterprise systems by Koamishin, including internal deployments and company-distributed solutions."
        />
        <meta
          name="twitter:image"
          content="https://koamishin.com/og-image.png"
        />
        <link
          rel="canonical"
          href="https://koamishin.com/enterprise-projects"
        />
      </Helmet>

      <section
        ref={containerRef}
        className="relative w-full px-6 py-28 md:px-12 md:py-40"
      >
        <div className="mx-auto max-w-6xl">
          {/* ── Header ── */}
          <div ref={headerRef}>
            <div className="mb-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
              <ShieldCheck className="h-3 w-3" />
              <span>Private Enterprise Index</span>
            </div>

            <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
              {/* Title */}
              <div className="max-w-2xl">
                <h1 className="font-serif text-5xl font-bold leading-[0.9] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                  Enterprise
                  <br />
                  <em className="font-light not-italic opacity-60">solution</em>
                  <br />
                  projects
                </h1>
                <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
                  Private, non-OSS systems built for internal operations,
                  company distribution, and controlled enterprise deployment.
                </p>
              </div>

              {/* Stats — minimal, separated by hairlines */}
              <div className="flex items-end gap-8 pb-1 md:gap-10">
                <div>
                  <p className="font-serif text-5xl font-bold leading-none text-foreground">
                    {enterpriseProjects.length}
                  </p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                    Systems
                  </p>
                </div>
                <div className="mb-3 h-10 w-px bg-border/60" />
                <div>
                  <p className="font-serif text-5xl font-bold leading-none text-foreground">
                    0
                  </p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                    Public Repos
                  </p>
                </div>
                <div className="mb-3 h-10 w-px bg-border/60" />
                <div>
                  <p className="font-serif text-5xl font-bold leading-none text-foreground">
                    1
                  </p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                    Company
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-20 h-px w-full bg-border/50" />

          {/* ── Projects ── */}
          <div className="flex flex-col">
            {enterpriseProjects.map((project, index) => (
              <article
                key={project.name}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
              >
                {/* Row label */}
                <div className="mb-10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-muted-foreground/40">
                      {String(index + 1).padStart(2, "0")} /{" "}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="border border-border/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                      {project.visibility}
                    </span>
                    <span className="border border-primary/30 bg-primary/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-primary">
                      {project.deploymentType}
                    </span>
                  </div>
                </div>

                {/* Two-column layout */}
                <div className="grid gap-12 md:grid-cols-[1fr_340px] lg:grid-cols-[1fr_400px]">
                  {/* Left — name, description, capabilities */}
                  <div>
                    <h2 className="font-serif text-6xl font-bold leading-none tracking-tight text-foreground md:text-7xl lg:text-8xl">
                      {project.name}
                    </h2>

                    <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="mt-12">
                      <p className="mb-6 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/60">
                        Enterprise Capabilities
                      </p>
                      <ul className="grid gap-4 sm:grid-cols-2">
                        {project.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-3 text-sm text-foreground/70"
                          >
                            <span className="h-px w-5 shrink-0 bg-primary/50" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right — metadata panel */}
                  <div className="divide-y divide-border/50 border border-border/50">
                    {/* Company distribution */}
                    <div className="flex items-start gap-3.5 p-5">
                      <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60" />
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
                          Company Distribution
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-foreground">
                          Distributed to: {project.distributedTo ?? "Internal"}
                        </p>
                      </div>
                    </div>

                    {/* Access model */}
                    <div className="flex items-start gap-3.5 p-5">
                      <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60" />
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
                          Access Model
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-foreground">
                          Non-OSS, private system
                        </p>
                      </div>
                    </div>

                    {/* Built with */}
                    <div className="p-5">
                      <p className="mb-3.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
                        Built With
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="border border-border/60 px-2.5 py-1 text-xs text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Scope + Type */}
                    <div className="grid grid-cols-2 divide-x divide-border/50">
                      <div className="p-5">
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
                          Scope
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-foreground">
                          {project.scope}
                        </p>
                      </div>
                      <div className="p-5">
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">
                          Type
                        </p>
                        <p className="mt-1.5 text-sm font-medium text-foreground">
                          {project.type}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {index !== enterpriseProjects.length - 1 && (
                  <div className="my-20 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
                )}
              </article>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-20 border-t border-border/40 pt-8 text-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
              Private projects are listed without repository or documentation
              links.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default EnterpriseProjects;
