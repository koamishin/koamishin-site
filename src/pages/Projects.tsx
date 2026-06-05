import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Github, BookOpen, ArrowUpRight, Rocket, GraduationCap, Package, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { docsConfig } from '@/config/docsConfig';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Rocket: <Rocket className="h-8 w-8" />,
  GraduationCap: <GraduationCap className="h-8 w-8" />,
  Package: <Package className="h-8 w-8" />,
  Gamepad2: <Gamepad2 className="h-8 w-8" />,
};

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const projectsData = docsConfig.map(project => ({
    icon: project.icon ? iconMap[project.icon] : <Package className="h-8 w-8" />,
    title: project.name,
    status: project.status,
    shortDescription: project.description,
    longDescription: project.longDescription || project.description,
    features: project.features || [],
    techStack: project.techStack || [],
    repoUrl: `https://github.com/${project.githubRepo}`,
    docsUrl: `/docs/${project.slug}/${project.defaultVersion}/introduction`
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current?.children || [],
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Projects animation
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(item,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full py-32 md:py-48 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-24 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <Package className="h-3.5 w-3.5" />
            <span>Our Craft</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            Building the foundations of modern{' '}
            <span className="bg-gradient-to-r from-primary via-rose-500 to-primary bg-clip-text text-transparent italic font-light">
              web artisans
            </span>
          </h2>
          <p className="text-base md:text-xl font-light leading-relaxed text-muted-foreground max-w-2xl mx-auto">
            Explore our open-source contributions. From robust starter kits to specialized management systems,
            each project is crafted with care and built to last.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {projectsData.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => itemsRef.current[index] = el}
              className="group relative"
            >
              <div className={`flex flex-col gap-10 ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}>
                <div className="md:w-1/3 flex flex-col items-center">
                  <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-2xl border border-primary/20 bg-card shadow-xl shadow-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-2">
                    <div className="text-primary">{project.icon}</div>
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-primary" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-primary" />
                  </div>
                  {project.status && (
                    <Badge variant="outline" className="mt-6 border-primary/30 bg-primary/5 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-primary">
                      {project.status}
                    </Badge>
                  )}
                </div>

                <div className="md:w-2/3">
                  <h3 className="font-serif text-3xl md:text-4xl font-bold mb-6">{project.title}</h3>
                  <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground mb-8">{project.longDescription}</p>

                  <div className="mb-10 border-l-2 border-primary/20 pl-6">
                    <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-foreground/60">Key Features</h4>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary/70" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <Button asChild size="lg" className="h-12 px-8 border border-primary bg-primary text-primary-foreground hover:bg-primary/90">
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub Repository
                      </a>
                    </Button>
                    {project.docsUrl && (
                      <Button asChild variant="outline" size="lg" className="h-12 px-8 border-foreground/20 hover:bg-muted">
                        <a href={project.docsUrl} className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          Documentation
                          <ArrowUpRight className="h-4 w-4 opacity-50" />
                        </a>
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 text-muted-foreground" />
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

              {index !== projectsData.length - 1 && (
                <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <p className="mb-6 font-serif text-2xl italic text-muted-foreground">"Open source is the heartbeat of innovation."</p>
          <Button asChild variant="link" className="text-xl text-primary underline-offset-8">
            <a href="https://github.com/Koamishin" target="_blank" rel="noopener noreferrer">
              Explore all repositories on GitHub →
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
