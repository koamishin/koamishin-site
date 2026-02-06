import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, Layers, ArrowUpRight, Github, BookOpen, Rocket, GraduationCap, Package, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { docsConfig } from "@/config/docsConfig";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Rocket: <Rocket className="h-10 w-10 text-primary" />,
  GraduationCap: <GraduationCap className="h-10 w-10 text-primary" />,
  Package: <Package className="h-10 w-10 text-primary" />,
  Gamepad2: <Gamepad2 className="h-10 w-10 text-primary" />,
};

interface Project {
  icon: React.ReactNode;
  title: string;
  status?: "Work in progress" | "Archived" | "Active";
  shortDescription: string;
  longDescription: string;
  features: string[];
  techStack: string[];
  repoUrl: string;
  docsUrl?: string;
}

const projectsData: Project[] = docsConfig.map(project => ({
  icon: project.icon ? iconMap[project.icon] : <Package className="h-10 w-10 text-primary" />,
  title: project.name,
  status: project.status,
  shortDescription: project.description,
  longDescription: project.longDescription || project.description,
  features: project.features || [],
  techStack: project.techStack || [],
  repoUrl: `https://github.com/${project.githubRepo}`,
  docsUrl: `/docs/${project.slug}/${project.defaultVersion}/introduction`
}));

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      itemsRef.current.forEach((item) => {
        if (!item) return;

        const icon = item.querySelector(".project-icon");
        const title = item.querySelector(".project-title");
        const desc = item.querySelector(".project-desc");
        const features = item.querySelector(".project-features");
        const actions = item.querySelector(".project-actions");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(icon, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" })
          .fromTo(title, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, "-=0.3")
          .fromTo(desc, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, "-=0.3")
          .fromTo(features, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
          .fromTo(actions, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3");
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-background py-32 md:py-48">
      <div className="container mx-auto px-6 md:px-12">
        
        <div ref={headerRef} className="mx-auto mb-32 max-w-4xl text-center relative">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-primary/50" />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Our Craft
            </span>
            <span className="h-[1px] w-8 bg-primary/50" />
          </div>
          
          <h2 className="mb-8 font-serif text-5xl font-bold leading-[1.1] tracking-tighter text-foreground md:text-7xl">
            Building the foundations of modern <span className="italic text-primary">web artisans</span>.
          </h2>
          
          <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-muted-foreground">
            Explore our open-source contributions. From robust starter kits to specialized management systems, 
            each project is crafted with care and built to last.
          </p>
        </div>

        <div className="flex flex-col gap-32">
          {projectsData.map((project, index) => (
            <div 
              key={project.title} 
              ref={(el) => {
                  itemsRef.current[index] = el;
              }}
              className="group relative"
            >
              <div className="absolute -left-12 top-0 hidden font-serif text-6xl font-bold text-foreground/5 lg:block" style={{ writingMode: "vertical-rl" }}>
                 第{["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"][index % 10]}章
              </div>

              {index !== projectsData.length - 1 && (
                <div className="absolute left-8 top-full h-32 w-[1px] bg-gradient-to-b from-border to-transparent md:left-1/2 md:-ml-[0.5px]" />
              )}

              <div className={`flex flex-col gap-12 md:flex-row ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                
                <div className="flex flex-col items-start md:w-1/3 md:items-center">
                  <div className="project-icon relative z-10 flex h-32 w-32 items-center justify-center rounded-sm border border-primary/20 bg-background shadow-2xl shadow-primary/10 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                    {project.icon}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary"></div>
                  </div>
                  {project.status && (
                    <Badge variant="outline" className="mt-6 border-primary/30 bg-primary/5 px-4 py-1 font-mono text-xs uppercase tracking-widest text-primary">
                      {project.status}
                    </Badge>
                  )}
                </div>

                <div className="md:w-2/3">
                  <h3 className="project-title mb-6 font-serif text-4xl font-bold md:text-5xl">
                    {project.title}
                  </h3>
                  
                  <p className="project-desc mb-8 text-lg font-light leading-relaxed text-muted-foreground">
                    {project.longDescription}
                  </p>

                  <div className="project-features mb-10 border-l-2 border-primary/20 pl-6">
                    <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-foreground/60">Key Features</h4>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="project-actions flex flex-wrap gap-4">
                    <Button asChild size="lg" className="h-12 rounded-none px-8 border border-primary bg-primary text-primary-foreground hover:bg-primary/90">
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Github className="h-4 w-4" /> GitHub Repository
                      </a>
                    </Button>
                    
                    {project.docsUrl && (
                      <Button asChild variant="outline" size="lg" className="h-12 rounded-none px-8 border-foreground/20 hover:bg-muted">
                        <a href={project.docsUrl} className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" /> Documentation <ArrowUpRight className="h-4 w-4 opacity-50" />
                        </a>
                      </Button>
                    )}
                  </div>

                  <div className="project-actions mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      <span className="font-mono text-xs uppercase tracking-wider">Built With:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="relative">
                          {tech}
                          {i !== project.techStack.length - 1 && <span className="ml-2 opacity-30">/</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-48 text-center">
           <p className="mb-6 font-serif text-2xl italic text-muted-foreground">"Open source is the heartbeat of innovation."</p>
           <Button asChild variant="link" className="text-xl text-primary underline-offset-8">
             <a href="https://github.com/Koamishin" target="_blank" rel="noopener noreferrer">
               Explore all repositories on GitHub &rarr;
             </a>
           </Button>
        </div>

      </div>
    </section>
  );
};

export default Projects;
