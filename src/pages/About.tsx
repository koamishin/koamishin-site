import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Network, Sparkles, UserCircle, Users, Code, ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const JapanesePattern: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2"/>
    <path d="M0 100C0 72.3858 22.3858 50 50 50C77.6142 50 100 72.3858 100 100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2"/>
  </svg>
);

const KamonIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="50" cy="50" r="45" />
    <path d="M50 5 L50 95 M5 50 L95 50" strokeOpacity="0.5"/>
    <rect x="25" y="25" width="50" height="50" transform="rotate(45 50 50)" strokeOpacity="0.5"/>
  </svg>
);

const VerticalJapanese: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <div className={`flex flex-col items-center font-serif leading-tight ${className}`} style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
    {text.split("").map((char, i) => (
      <span key={i} className="my-1">{char}</span>
    ))}
  </div>
);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const essenceRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      );

      const visionItems = visionRef.current?.querySelectorAll(".vision-item");
      if (visionItems) {
        gsap.fromTo(
          visionItems,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: visionRef.current,
              start: "top 75%",
            },
          }
        );
      }

      const essenceCards = essenceRef.current?.querySelectorAll(".essence-card");
      if (essenceCards) {
        gsap.fromTo(
          essenceCards,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: essenceRef.current,
              start: "top 70%",
            },
          }
        );
      }

      gsap.fromTo(
        ctaRef.current,
        { scale: 0.95, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-background py-32 md:py-48">
      
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-30">
        <JapanesePattern className="absolute right-[5%] top-[10%] h-96 w-96 text-primary opacity-10 -rotate-12" />
        <JapanesePattern className="absolute left-[-10%] bottom-[10%] h-[500px] w-[500px] text-primary opacity-5 rotate-45" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div ref={headerRef} className="mx-auto mb-32 max-w-5xl text-center relative">
          <div className="mb-8 flex items-center justify-center gap-4">
            <KamonIcon className="h-6 w-6 text-primary/80" />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-primary">
              Who We Are
            </span>
            <KamonIcon className="h-6 w-6 text-primary/80" />
          </div>

          <h2 className="mb-10 font-serif text-5xl font-bold leading-[1.1] tracking-tighter text-foreground md:text-7xl">
            A dynamic collective of <br/>
            <span className="italic text-primary relative inline-block">
              artisans
              <span className="absolute -right-12 -top-6 text-sm not-italic text-muted-foreground opacity-50 hidden md:block">
                 <VerticalJapanese text="職人" />
              </span>
            </span>.
          </h2>

          <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-muted-foreground">
            Koamishin is committed to building and sharing high-quality, open-source Laravel applications. 
            From versatile CMS platforms to efficient business systems, our tools are built to empower.
          </p>
        </div>

        <div ref={visionRef} className="mb-40 grid gap-8 md:grid-cols-2 lg:gap-16">
          
          <div className="vision-item group relative overflow-hidden border border-border/60 bg-background/50 p-10 hover:border-primary/50 transition-all duration-500">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
               <VerticalJapanese text="ビジョン" className="text-5xl font-bold text-foreground" />
            </div>
            
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary rounded-sm">
                 <Users className="h-6 w-6" />
              </div>
              <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">01 / Vision</span>
            </div>
            
            <h3 className="mb-6 font-serif text-3xl font-medium leading-tight">
              An ecosystem where developers thrive.
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground font-light">
              We envision a collaborative world where accessible, reliable resources drive progress. 
              Where barriers to entry are lowered, and innovation is a shared pursuit.
            </p>
          </div>

          <div className="vision-item group relative overflow-hidden border border-border/60 bg-background/50 p-10 hover:border-primary/50 transition-all duration-500">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
               <VerticalJapanese text="ミッション" className="text-5xl font-bold text-foreground" />
            </div>
            
            <div className="mb-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary rounded-sm">
                 <Code className="h-6 w-6" />
              </div>
              <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">02 / Mission</span>
            </div>
            
            <h3 className="mb-6 font-serif text-3xl font-medium leading-tight">
              Delivering 100% open-source solutions.
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground font-light">
              Meticulously documented, community-powered, and designed to evolve. 
              We empower creators to build, iterate, and succeed together.
            </p>
          </div>
        </div>

        <div ref={essenceRef} className="mb-40">
          <div className="mb-20 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 block">Etymology</span>
            <h3 className="font-serif text-4xl font-bold text-foreground md:text-6xl">The Essence of Our Name</h3>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="essence-card group relative overflow-hidden border-t-2 border-primary/20 bg-card/10 p-12 transition-all hover:bg-card/30">
              <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 blur-[50px] transition-all group-hover:bg-primary/10" />
              
              <div className="mb-8 flex justify-between items-start">
                <Network className="h-10 w-10 text-primary" />
                <span className="font-serif text-7xl font-bold text-foreground/5 group-hover:text-primary/10 transition-colors">小網</span>
              </div>
              
              <h4 className="mb-2 font-serif text-3xl font-bold">Koami</h4>
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-primary">Small Net / Intricate Mesh</p>
              <p className="text-lg font-light leading-relaxed text-muted-foreground">
                Symbolizing the interconnected networks of developers worldwide—woven together like threads in a web, 
                supporting one another to create and sustain innovative business projects.
              </p>
            </div>

            <div className="essence-card group relative overflow-hidden border-t-2 border-primary/20 bg-card/10 p-12 transition-all hover:bg-card/30">
              <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 blur-[50px] transition-all group-hover:bg-primary/10" />
              
              <div className="mb-8 flex justify-between items-start">
                <Sparkles className="h-10 w-10 text-primary" />
                <span className="font-serif text-7xl font-bold text-foreground/5 group-hover:text-primary/10 transition-colors">新</span>
              </div>
              
              <h4 className="mb-2 font-serif text-3xl font-bold">Shin</h4>
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-primary">Renewal / Innovation</p>
              <p className="text-lg font-light leading-relaxed text-muted-foreground">
                Representing our drive to pioneer fresh ideas. It's about constant evolution: refining code, 
                solving emerging challenges, and pushing boundaries to deliver cutting-edge solutions.
              </p>
            </div>
          </div>

          <div className="essence-card mt-24 text-center">
            <div className="inline-block relative max-w-4xl mx-auto px-8">
              <span className="absolute left-0 top-0 text-9xl text-primary/5 font-serif leading-none -translate-x-1/2 -translate-y-1/2">“</span>
              <p className="relative z-10 text-2xl italic leading-relaxed text-foreground/90 font-serif">
                Koamishin isn't just a label—it's a philosophy that guides our work, ensuring every project strengthens the developer community.
              </p>
            </div>
          </div>
        </div>

        <div ref={ctaRef} className="relative mx-auto max-w-5xl border border-border bg-background p-12 md:p-20 shadow-2xl shadow-black/5">
           <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
           <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
           <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
           <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

           <div className="flex flex-col items-center text-center">
             <div className="mb-8 rounded-full bg-primary/10 p-4 text-primary">
                <UserCircle className="h-12 w-12" />
             </div>
             
             <h3 className="mb-6 font-serif text-4xl font-bold md:text-5xl">Meet the Collective</h3>
             
             <p className="mb-12 max-w-xl text-lg text-muted-foreground font-light leading-relaxed">
               The dedicated minds and contributors who are building the future of our open-source ecosystem.
             </p>
             
             <div className="flex flex-col w-full max-w-md gap-4 sm:flex-row">
               <Button 
                 asChild 
                 size="lg" 
                 className="group relative h-14 w-full overflow-hidden rounded-sm bg-primary text-primary-foreground hover:bg-primary/90"
               >
                 <a href="/team" className="flex items-center justify-center gap-2">
                   <div className="absolute inset-0 w-[200%] translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[100%]" />
                   <span>View Artisans</span>
                   <ArrowRight className="h-4 w-4" />
                 </a>
               </Button>
               
               <Button 
                 asChild 
                 variant="outline" 
                 size="lg" 
                 className="h-14 w-full rounded-sm border-primary/20 hover:bg-primary/5 hover:text-primary hover:border-primary/50 transition-all"
               >
                  <a href="https://github.com/Koamishin" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2">
                    <Github className="h-4 w-4" /> 
                    <span>Contribute</span>
                  </a>
               </Button>
             </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default About;
