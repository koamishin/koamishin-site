import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

/* ─── Decorative SVG Components ─── */
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

/* ─── Laser Grid & Flare Sweep Cinematic Intro Overlay ─── */
const LaserGridIntroOverlay: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalLinesRef = useRef<SVGGElement>(null);
  const verticalLinesRef = useRef<SVGGElement>(null);
  const kPathRef = useRef<SVGPathElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tl = gsap.timeline({
      onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.pointerEvents = "none";
        onComplete?.();
      }
    });

    // Calculate length of the geometric K path
    if (kPathRef.current) {
      const length = kPathRef.current.getTotalLength();
      gsap.set(kPathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1
      });
    }

    if (ringRef.current) {
      const length = ringRef.current.getTotalLength();
      gsap.set(ringRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    }

    if (reducedMotion) {
      gsap.set(containerRef.current, { opacity: 1 });
      gsap.set(kPathRef.current, { strokeDashoffset: 0, opacity: 1 });
      gsap.set(ringRef.current, { strokeDashoffset: 0 });
      gsap.set(progressRef.current, { scaleX: 1 });
      gsap.set([wordmarkRef.current, statusRef.current], { opacity: 1, y: 0 });
      tl.to(overlayRef.current, { opacity: 0, delay: 0.35, duration: 0.25 });
      return () => { tl.kill(); };
    }

    tl.set(containerRef.current, { clipPath: "inset(0 0 0 0%)" })
    .fromTo(".intro-frame-line",
      { scaleX: 0, opacity: 0, transformOrigin: "center center" },
      { scaleX: 1, opacity: 1, duration: 0.75, ease: "power3.out", stagger: 0.06 }
    )
    .fromTo(".intro-corner-mark",
      { opacity: 0, scale: 0.82 },
      { opacity: 1, scale: 1, duration: 0.55, ease: "power3.out", stagger: 0.04 },
      "-=0.5"
    )
    // 1. Weave Grid Lines: Horizontal lines slide left-to-right, vertical lines top-to-bottom
    .fromTo(horizontalLinesRef.current?.querySelectorAll("line") || [],
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 0.85, ease: "power2.inOut", stagger: 0.07 },
      "-=0.35"
    )
    .fromTo(verticalLinesRef.current?.querySelectorAll("line") || [],
      { scaleY: 0, transformOrigin: "center top" },
      { scaleY: 1, duration: 0.85, ease: "power2.inOut", stagger: 0.07 },
      "-=0.72"
    )
    .to(ringRef.current, {
      strokeDashoffset: 0,
      duration: 1.15,
      ease: "power3.inOut"
    }, "-=0.55")
    // 2. Draw the geometric glowing "K" laser line
    .to(kPathRef.current, {
      strokeDashoffset: 0,
      duration: 1.15,
      ease: "power3.inOut"
    }, "-=0.75")
    .fromTo(wordmarkRef.current,
      { y: 12, opacity: 0, filter: "blur(6px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.65, ease: "power3.out" },
      "-=0.35"
    )
    .fromTo(statusRef.current,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
      "-=0.45"
    )
    .fromTo(progressRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1.25, ease: "power2.inOut" },
      "-=0.6"
    )
    // Add brief intense glow to the formed K
    .to(".intro-k-glow-core", {
      opacity: 0.8,
      duration: 0.4,
      repeat: 1,
      yoyo: true,
      ease: "sine.inOut"
    }, "-=0.2")
    // 3. Cinematic Match Transition: Anamorphic Lens Flare sweeps from Left to Right,
    // physically clipping/wiping the overlay container itself in sync with the flare!
    .set(flareRef.current, { opacity: 1 })
    .fromTo(flareRef.current,
      { x: "-10vw" },
      { x: "110vw", duration: 1.25, ease: "power4.inOut" }
    )
    // Synchronized mask wipe of the overlay container (clipPath inset)
    .fromTo(containerRef.current,
      { clipPath: "inset(0 0 0 0%)" },
      { clipPath: "inset(0 0 0 100%)", duration: 1.25, ease: "power4.inOut" },
      "<"
    )
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.4");

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] bg-transparent flex items-center justify-center pointer-events-auto">
      
      {/* Container holding the visual elements that physically wipes out of view */}
      <div ref={containerRef} className="absolute inset-0 flex items-center justify-center overflow-hidden bg-background text-foreground dark:bg-[#050609]">
        
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(36,42,55,0.11)_1px,transparent_1px),linear-gradient(0deg,rgba(36,42,55,0.09)_1px,transparent_1px)] bg-[size:72px_72px] opacity-45 dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px)] dark:opacity-20" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(36,42,55,0.07)_50%,transparent_100%)] bg-[length:100%_9px] opacity-[0.12] dark:bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.045)_50%,transparent_100%)] dark:opacity-[0.08]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,191,150,0.22)_0%,rgba(150,166,120,0.12)_34%,transparent_68%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(146,166,151,0.15)_0%,rgba(80,40,76,0.08)_34%,transparent_68%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-background via-background/80 to-transparent dark:from-black/70 dark:via-black/30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent dark:from-black/80 dark:via-black/30" />

        <div className="pointer-events-none absolute inset-8 hidden border border-primary/10 md:block" />
        <div className="intro-frame-line pointer-events-none absolute left-1/2 top-10 hidden h-px w-[min(72rem,78vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/35 to-transparent md:block" />
        <div className="intro-frame-line pointer-events-none absolute bottom-10 left-1/2 hidden h-px w-[min(72rem,78vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent md:block" />
        <div className="intro-corner-mark pointer-events-none absolute left-8 top-8 hidden h-12 w-12 border-l border-t border-primary/35 md:block" />
        <div className="intro-corner-mark pointer-events-none absolute right-8 top-8 hidden h-12 w-12 border-r border-t border-primary/35 md:block" />
        <div className="intro-corner-mark pointer-events-none absolute bottom-8 left-8 hidden h-12 w-12 border-b border-l border-primary/25 md:block" />
        <div className="intro-corner-mark pointer-events-none absolute bottom-8 right-8 hidden h-12 w-12 border-b border-r border-primary/25 md:block" />

        <div className="relative flex w-full max-w-2xl flex-col items-center justify-center px-6">
          <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.42em] text-primary/55">
            Initializing studio network
          </div>
          
          {/* Weaving thread grid & glowing K SVG */}
          <svg viewBox="0 0 100 100" className="h-52 w-52 text-primary drop-shadow-[0_0_24px_rgba(80,128,105,0.32)] dark:drop-shadow-[0_0_24px_rgba(146,166,151,0.28)] md:h-64 md:w-64">
            
            {/* Horizontal Loom lines */}
            <g ref={horizontalLinesRef} stroke="currentColor" strokeWidth="0.45" strokeOpacity="0.16" fill="none">
              <line x1="5" y1="12" x2="95" y2="12" />
              <line x1="5" y1="20" x2="95" y2="20" />
              <line x1="5" y1="35" x2="95" y2="35" />
              <line x1="5" y1="50" x2="95" y2="50" />
              <line x1="5" y1="65" x2="95" y2="65" />
              <line x1="5" y1="80" x2="95" y2="80" />
              <line x1="5" y1="88" x2="95" y2="88" />
            </g>

            {/* Vertical Loom lines */}
            <g ref={verticalLinesRef} stroke="currentColor" strokeWidth="0.45" strokeOpacity="0.16" fill="none">
              <line x1="12" y1="5" x2="12" y2="95" />
              <line x1="20" y1="5" x2="20" y2="95" />
              <line x1="35" y1="5" x2="35" y2="95" />
              <line x1="50" y1="5" x2="50" y2="95" />
              <line x1="65" y1="5" x2="65" y2="95" />
              <line x1="80" y1="5" x2="80" y2="95" />
              <line x1="88" y1="5" x2="88" y2="95" />
            </g>

            {/* Geometric guide circle */}
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.35" strokeOpacity="0.12" fill="none" />
            <circle ref={ringRef} cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="0.65" strokeOpacity="0.36" fill="none" />
            <circle cx="50" cy="50" r="27" stroke="currentColor" strokeWidth="0.35" strokeOpacity="0.16" strokeDasharray="2,5" fill="none" />

            {/* Single continuous geometric K laser thread path */}
            <path
              ref={kPathRef}
              d="M 35 15 L 35 85 M 35 50 L 70 15 M 35 50 L 70 85"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="intro-k-glow-core opacity-0"
            />
            
            {/* Glowing intersection anchor */}
            <circle cx="35" cy="50" r="2.4" className="intro-k-glow-core opacity-0" fill="currentColor" />
          </svg>

          <div ref={wordmarkRef} className="mt-5 text-center opacity-0">
            <div className="font-serif text-3xl font-bold leading-none text-foreground md:text-4xl">
              Koamishin
            </div>
            <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.42em] text-primary/55">
              Open source Laravel systems
            </div>
          </div>

          <div ref={statusRef} className="mt-8 w-full max-w-md opacity-0">
            <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
              <span>Weaving Loom Network</span>
              <span>Koamishin.com</span>
            </div>
            <div className="h-px overflow-hidden rounded-full bg-primary/15">
              <div ref={progressRef} className="h-full w-full origin-left bg-gradient-to-r from-primary/30 via-foreground/80 to-primary/40" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[8px] uppercase tracking-[0.22em] text-primary/45">
              <span>Routes</span>
              <span className="text-center">Docs</span>
              <span className="text-right">Studio</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Horizontal Anamorphic Lens Flare */}
      <div
        ref={flareRef}
        className="absolute top-0 bottom-0 w-32 -translate-x-1/2 flex items-center justify-center opacity-0 pointer-events-none z-50"
        style={{ left: 0 }}
      >
        {/* Soft horizontal glowing wings */}
        <div className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-primary/65 to-transparent blur-md" />
        
        {/* Intense white laser core line */}
        <div className="absolute inset-y-0 w-[2px] bg-white shadow-[0_0_22px_rgba(146,166,151,0.95),0_0_48px_rgba(255,255,255,0.55)]" />
      </div>

    </div>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const [introDone, setIntroDone] = useState(false);

  // Set initial hidden state immediately when component mounts
  useEffect(() => {
    gsap.set(titleRef.current?.children || [], { opacity: 0, y: 40 });
    if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 0, y: 25 });
    if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 0, y: 25 });
    if (indicatorRef.current) gsap.set(indicatorRef.current, { opacity: 0, y: -20 });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only animate hero content after intro is done
      if (!introDone) return;

      // Initial animation when component loads
      const tl = gsap.timeline();

      tl.to(titleRef.current?.children || [],
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.15 },
        0.15
      )
      .to(subtitleRef.current,
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        0.6
      )
      .to(ctaRef.current,
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
        0.8
      );

      // Scroll indicator bounce animation
      if (indicatorRef.current) {
        gsap.to(indicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 1.4
          }
        );
        gsap.to(indicatorRef.current,
          {
            y: 10,
            duration: 1.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 2
          }
        );
      }

      // Scroll-triggered animations for hero exit
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (contentRef.current) {
            gsap.to(contentRef.current, {
              y: progress * 200,
              opacity: 1 - progress,
              scale: 1 - progress * 0.1,
              duration: 0.1,
              ease: "none"
            });
          }
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [introDone]);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection && (window as any).lenis) {
      (window as any).lenis.scrollTo(aboutSection);
    } else if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <LaserGridIntroOverlay onComplete={() => setTimeout(() => setIntroDone(true), 50)} />

      <section
        ref={containerRef}
        className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-24"
      >
        <div
          ref={contentRef}
          className="max-w-7xl w-full mx-auto text-center relative z-10"
        >
          <div ref={titleRef} className="mb-6">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-4">
              <span className="block">Building</span>
              <span className="block bg-gradient-to-r from-primary via-rose-500 to-primary bg-clip-text text-transparent italic font-light">
                Custom Systems
              </span>
              <span className="block">& Open Source</span>
            </h1>
          </div>

          <p
            ref={subtitleRef}
            className="text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            We engineer secure, high-performance web applications and reusable packages.
            Specialized in Laravel backend services paired with interactive React and Vue user interfaces.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
            <Button asChild size="lg" className="h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-primary/10">
              <a href="#about" onClick={handleExploreClick} className="flex items-center gap-2">
                Explore Our Craft
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div
          ref={indicatorRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
