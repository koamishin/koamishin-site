import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowUpRight, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const TechGridBackground: React.FC = () => (
  <svg className="absolute inset-0 w-full h-full text-primary/[0.03] stroke-current pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
        <circle cx="40" cy="40" r="1" className="fill-primary/20" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

const TechLogoLaravel: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M8.5 4L3 7v10l5.5 3L14 17V7L8.5 4z M15.5 7L21 10v7l-5.5 3 M14 11.5l7-3.5 M3 7.5l5.5 3 M8.5 10.5V17" />
  </svg>
);

const TechLogoReact: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <ellipse rx="10" ry="4.5" transform="rotate(0 12 12)" cx="12" cy="12" />
    <ellipse rx="10" ry="4.5" transform="rotate(60 12 12)" cx="12" cy="12" />
    <ellipse rx="10" ry="4.5" transform="rotate(120 12 12)" cx="12" cy="12" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const TechLogoVue: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 3l10 17L22 3h-4l-8 13.5L6 3H2z" />
    <path d="M6.5 3l5.5 9.5L17.5 3h-3l-2.5 4.5L9.5 3H6.5z" />
  </svg>
);

const About: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const mediaGridRef = useRef<HTMLDivElement>(null);
  const statsPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cinematic Staggered Entrance for Company Header on Scroll
      gsap.fromTo(".reveal-header-el",
        { opacity: 0, y: 50, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 2. Parallax sliding for the Media Grid on scroll
      gsap.fromTo(mediaGridRef.current,
        { scale: 0.95, opacity: 0, y: 80 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mediaGridRef.current,
            start: "top 85%",
            end: "top 30%",
            scrub: 1
          }
        }
      );

      // 3. Stats bottom panel scale-up cinematic reveal
      gsap.fromTo(statsPanelRef.current,
        { scale: 0.94, opacity: 0, y: 70 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: statsPanelRef.current,
            start: "top 88%",
            end: "top 45%",
            scrub: 1.2
          }
        }
      );

      // 4. Staggered counting or reveal for the giant stats numbers
      gsap.fromTo(".stat-num",
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.12,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsPanelRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 5. Infinite floating drift on the internal abstract geometry
      gsap.to(".floating-mesh", {
        y: -15,
        rotation: 3,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background py-24 md:py-32 border-b border-border/30 select-none"
    >
      
      {/* ─── Continuous Immersive Geometric Depth Background ─── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <TechGridBackground />
        
        {/* Subtle, physical coordinate ticks intersecting the screen */}
        <div className="absolute top-1/4 left-12 w-24 h-[1px] bg-primary/10" />
        <div className="absolute top-1/4 left-12 w-[1px] h-24 bg-primary/10" />
        <div className="absolute bottom-1/4 right-12 w-24 h-[1px] bg-primary/10" />
        <div className="absolute bottom-1/4 right-12 w-[1px] h-24 bg-primary/10" />

        {/* Muted decorative geometric washes */}
        <div className="absolute right-[8%] top-[15%] w-80 h-80 bg-primary/[0.02] rounded-full blur-[100px]" />
        <div className="absolute left-[5%] bottom-[15%] w-[500px] h-[500px] bg-primary/[0.01] rounded-full blur-[130px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-[1360px] xl:max-w-[1480px]">
        
        {/* ─── 1. TWO-COLUMN HEADER ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 items-start">
          
          <div className="lg:col-span-5 flex flex-col items-start reveal-header-el">
            {/* Tech tag */}
            <div className="mb-4 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>Company Profile // 企業概要</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-foreground">
              A premium digital agency for <br />
              <span className="bg-gradient-to-r from-primary via-rose-500 to-primary bg-clip-text text-transparent italic font-light pr-2">custom business systems</span>.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pt-8 reveal-header-el">
            <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
              Koamishin is a dedicated development firm specializing in high-performance web applications and business systems. We build robust backend solutions using the Laravel framework, paired with interactive, responsive SPAs built on Vue and React. Our focus balances enterprise core security with creative open-source utilities built to elevate software stability and velocity.
            </p>
          </div>

        </div>

        {/* ─── 2. THREE-COLUMN GRID (Col 1 & 2: Large main image, Col 3: Split cards) ─── */}
        <div ref={mediaGridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          
          {/* Main Large Image (Spans 2 columns on lg screens) */}
          <div className="lg:col-span-2 relative aspect-[16/10] md:aspect-[16/9.5] w-full border border-border/25 bg-card/[0.15] backdrop-blur-md rounded-2xl overflow-hidden shadow-xl p-8 flex flex-col justify-between group">
            
            {/* Corner architectural crosses */}
            <div className="absolute top-4 left-4 h-4.5 w-4.5 border-t border-l border-primary/20" />
            <div className="absolute top-4 right-4 h-4.5 w-4.5 border-t border-r border-primary/20" />
            <div className="absolute bottom-4 left-4 h-4.5 w-4.5 border-b border-l border-primary/20" />
            <div className="absolute bottom-4 right-4 h-4.5 w-4.5 border-b border-r border-primary/20" />

            {/* Glowing radial core */}
            <div className="absolute w-72 h-72 bg-primary/5 blur-[90px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />

            {/* Abstract geometric schematic mockup */}
            <div className="floating-mesh absolute inset-0 m-12 border border-dashed border-border/15 flex items-center justify-center rounded-lg select-none pointer-events-none">
              <svg className="w-[85%] h-[85%] text-primary/15" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="0.8">
                {/* Simulated dashboard charts */}
                <rect x="10" y="10" width="40" height="35" rx="3" className="stroke-primary/20" />
                <rect x="60" y="10" width="130" height="35" rx="3" className="stroke-border/20" />
                <line x1="20" y1="28" x2="40" y2="28" />
                <line x1="20" y1="35" x2="35" y2="35" />
                
                {/* Dynamic graph nodes */}
                <circle cx="80" cy="27" r="2" className="fill-primary" />
                <circle cx="110" cy="20" r="2" className="fill-primary" />
                <circle cx="140" cy="30" r="2" className="fill-primary" />
                <circle cx="170" cy="15" r="2" className="fill-primary" />
                <path d="M80 27 L110 20 L140 30 L170 15" strokeOpacity="0.4" />

                {/* Databases mapping */}
                <rect x="10" y="55" width="55" height="35" rx="3" className="stroke-border/20" />
                <rect x="75" y="55" width="55" height="35" rx="3" className="stroke-border/20" />
                <rect x="140" y="55" width="50" height="35" rx="3" className="stroke-primary/20" />
                <line x1="65" y1="72" x2="75" y2="72" strokeDasharray="2,2" />
                <line x1="130" y1="72" x2="140" y2="72" strokeDasharray="2,2" />
              </svg>
            </div>

            {/* Label overlays */}
            <div className="relative z-10 flex justify-between items-start w-full">
              <span className="font-mono text-[8px] text-muted-foreground/50 uppercase tracking-[0.3em]">System Topology</span>
              <span className="font-mono text-[8px] text-primary/60 uppercase tracking-widest">laravel-vue-integration // stable</span>
            </div>

            <div className="relative z-10 flex flex-col items-start">
              <span className="font-mono text-[9px] text-primary uppercase tracking-widest mb-1.5">Database Modeling</span>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground">Scalable Systems Architecture</h3>
            </div>

          </div>

          {/* Right Column: Split between Breakout Card and Secondary Image */}
          <div className="flex flex-col gap-8 justify-between h-full w-full">
            
            {/* Muted Breakout Card */}
            <div className="flex-1 rounded-2xl border border-border/25 bg-muted/40 p-6 flex flex-col justify-between backdrop-blur-md relative overflow-hidden group shadow-md">
              <TechGridBackground />

              {/* Invertible Logo on Dark Mode */}
              <div className="flex justify-between items-start relative z-10">
                <div className="flex h-10 w-10 items-center justify-center bg-background rounded-xl border border-border/30 dark:invert transition-all">
                  <span className="font-serif text-base font-bold text-foreground select-none">小</span>
                </div>
                <div className="rounded-full bg-primary/10 border border-primary/15 px-2.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-primary">
                  Core Packages
                </div>
              </div>

              <div className="my-6 relative z-10">
                <h4 className="font-serif text-lg font-bold text-foreground mb-2">Enterprise Core Packages</h4>
                <p className="text-xs md:text-sm font-light leading-relaxed text-muted-foreground">
                  We develop custom open-source packages and developer toolkits that streamline integration, speed up deployment, and enforce robust security standards across our applications.
                </p>
              </div>

              <Button variant="outline" size="sm" className="w-full h-10 rounded-xl relative z-10 border-border/40 hover:border-primary/45 transition-colors uppercase font-mono text-[9px] tracking-widest group">
                <span className="flex items-center justify-center gap-1.5">
                  Learn More
                  <ArrowUpRight className="h-3.5 w-3.5 text-primary opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Button>

            </div>

            {/* Secondary Image Card */}
            <div className="relative h-[180px] lg:h-[210px] w-full border border-border/25 bg-card/[0.15] backdrop-blur-md rounded-2xl overflow-hidden shadow-md flex flex-col justify-between p-5 group">
              <TechGridBackground />
              
              {/* Spinning technical geometry */}
              <div className="absolute right-4 bottom-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none select-none">
                <svg className="w-24 h-24 animate-spin-slow text-primary" viewBox="0 0 100 100">
                  <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
                </svg>
              </div>

              <div className="relative z-10 flex justify-between items-start w-full">
                <span className="font-mono text-[7.5px] text-muted-foreground/45 uppercase tracking-widest">Frontend Modules</span>
                <Sparkles className="h-3.5 w-3.5 text-primary/40 group-hover:text-primary transition-colors" />
              </div>

              <div className="relative z-10">
                <span className="font-mono text-[8px] text-primary uppercase tracking-wider block mb-1">Interactive UI</span>
                <h4 className="font-serif text-base font-bold text-foreground">Modular Frontends</h4>
              </div>
            </div>

          </div>

        </div>

        {/* ─── 3. CENTERED PARTNER LOGO STRIP ─── */}
        <div className="w-full border-t border-b border-border/20 py-8 mb-16 flex flex-col items-center justify-center">
          <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/50 mb-6">Our Core Technology Stack</span>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-40 hover:opacity-65 transition-opacity duration-300">
            <div className="flex items-center gap-2.5">
              <TechLogoLaravel className="h-6 w-6 text-foreground" />
              <span className="font-serif font-bold text-sm tracking-wide text-foreground">Laravel</span>
            </div>
            <div className="flex items-center gap-2.5">
              <TechLogoReact className="h-5 w-5 text-foreground" />
              <span className="font-serif font-bold text-sm tracking-wide text-foreground">React</span>
            </div>
            <div className="flex items-center gap-2.5">
              <TechLogoVue className="h-5.5 w-5.5 text-foreground" />
              <span className="font-serif font-bold text-sm tracking-wide text-foreground">Vue.js</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4.5 w-4.5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="font-serif font-bold text-sm tracking-wide text-foreground">Tailwind CSS</span>
            </div>
          </div>
        </div>

        {/* ─── 4. BOTTOM SECTION: MUTED ROUNDED ACHIEVEMENTS PANEL ─── */}
        <div ref={statsPanelRef} className="rounded-[24px] md:rounded-[32px] border border-border/20 bg-muted/30 p-8 md:p-12 lg:p-16 backdrop-blur-md relative overflow-hidden shadow-2xl">
          <TechGridBackground />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            <div className="lg:col-span-5 flex flex-col items-start">
              <div className="mb-4 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-primary">
                <Trophy className="h-3.5 w-3.5" />
                <span>Our Impact // 実績</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Our Core Metrics
              </h3>
            </div>

            <div className="lg:col-span-7">
              <p className="text-sm md:text-base font-light leading-relaxed text-muted-foreground">
                We measure our success by the reliability of our systems, the performance of our APIs, and our continuous contributions to the open-source developer ecosystem.
              </p>
            </div>

          </div>

          {/* Four-Column Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-12 border-t border-border/15 pt-12 relative z-10">
            
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="stat-num font-serif text-4xl md:text-5xl font-bold text-primary mb-2 block">50+</span>
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-muted-foreground/60 mb-1 block">Systems Developed</span>
              <span className="text-xs font-light text-muted-foreground/75 leading-tight">Custom business applications built & deployed</span>
            </div>

            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="stat-num font-serif text-4xl md:text-5xl font-bold text-foreground mb-2 block">99.9%</span>
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-muted-foreground/60 mb-1 block">SLA Guaranteed</span>
              <span className="text-xs font-light text-muted-foreground/75 leading-tight">Production server uptime on active installations</span>
            </div>

            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="stat-num font-serif text-4xl md:text-5xl font-bold text-foreground mb-2 block">12+</span>
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-muted-foreground/60 mb-1 block">Open-Source Packages</span>
              <span className="text-xs font-light text-muted-foreground/75 leading-tight">Reusable Laravel and frontend packages</span>
            </div>

            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="stat-num font-serif text-4xl md:text-5xl font-bold text-primary mb-2 block">150k+</span>
              <span className="font-mono text-[8.5px] uppercase tracking-widest text-muted-foreground/60 mb-1 block">Total Downloads</span>
              <span className="text-xs font-light text-muted-foreground/75 leading-tight">Active installations across our public tools</span>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default About;
