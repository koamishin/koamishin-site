import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

/* ─── Laser Grid & Flare Sweep Cinematic Intro Overlay ─── */
const LaserGridIntroOverlay: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const completeIntro = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      onComplete?.();
    };

    const tl = gsap.timeline({
      onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.pointerEvents = "none";
      }
    });

    const letters = wordmarkRef.current?.querySelectorAll(".intro-letter") || [];
    const tagline = wordmarkRef.current?.querySelector(".intro-tagline");
    const taglineTarget = tagline ? [tagline] : [];
    const offsets = [
      { x: -150, y: -80, rotate: -18 },
      { x: 120, y: -90, rotate: 16 },
      { x: -130, y: 85, rotate: 14 },
      { x: 145, y: 70, rotate: -16 },
      { x: 0, y: -130, rotate: 10 },
      { x: -170, y: 10, rotate: -12 },
      { x: 170, y: 8, rotate: 12 },
      { x: 70, y: 120, rotate: -10 },
      { x: -80, y: 115, rotate: 10 },
    ];

    gsap.set(wordmarkRef.current, { opacity: 1, scale: 1, transformOrigin: "50% 50%" });
    gsap.set(letters, {
      opacity: 0,
      x: (index) => offsets[index % offsets.length].x,
      y: (index) => offsets[index % offsets.length].y,
      rotate: (index) => offsets[index % offsets.length].rotate,
      filter: "blur(8px)",
    });
    gsap.set(taglineTarget, { opacity: 0, y: 6 });

    if (reducedMotion) {
      gsap.set(containerRef.current, { opacity: 1 });
      gsap.set(letters, { opacity: 1, x: 0, y: 0, rotate: 0, filter: "blur(0px)" });
      gsap.set(taglineTarget, { opacity: 1, y: 0 });
      gsap.set(progressRef.current, { scaleX: 1 });
      gsap.set(statusRef.current, { opacity: 1, y: 0 });
      tl.call(completeIntro);
      tl.to(overlayRef.current, { opacity: 0, delay: 0.35, duration: 0.25 });
      return () => { tl.kill(); };
    }

    tl.set(containerRef.current, { clipPath: "inset(0 0 0 0%)" })
    .to(letters, {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      filter: "blur(0px)",
      duration: 1.45,
      ease: "power4.out",
      stagger: {
        each: 0.11,
        from: "random",
      },
    })
    .to(taglineTarget, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.16")
    .fromTo(statusRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.45, ease: "power2.out" },
      "-=0.25"
    )
    .fromTo(progressRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1.15, ease: "power2.inOut" },
      "-=0.15"
    )
    .to(statusRef.current, {
      y: -8,
      opacity: 0,
      duration: 0.18,
      ease: "power2.in"
    }, "+=0.45")
    .call(completeIntro)
    .to(wordmarkRef.current, {
      scale: 12,
      opacity: 0,
      duration: 1.05,
      ease: "power4.inOut"
    }, "-=0.08")
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.out"
    }, "-=0.28");

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-background pointer-events-auto">
      <div ref={containerRef} className="absolute inset-0 flex items-center justify-center overflow-hidden text-foreground">
        <div className="relative flex w-full max-w-sm flex-col items-center justify-center px-6">
          <div ref={wordmarkRef} className="text-center">
            <div className="font-serif text-4xl font-bold uppercase leading-none text-foreground md:text-5xl">
              {"KOAMISHIN".split("").map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  className="intro-letter inline-block [transform-origin:50%_70%]"
                >
                  {letter}
                </span>
              ))}
            </div>
            <div className="intro-tagline mt-2 font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
              Minimal developer systems
            </div>
          </div>

          <div ref={statusRef} className="mt-7 w-full max-w-48 opacity-0">
            <div className="h-px overflow-hidden bg-border">
              <div ref={progressRef} className="h-full w-full origin-left bg-primary" />
            </div>
            <div className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
              Loading
            </div>
          </div>
        </div>
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
  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

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
      <LaserGridIntroOverlay onComplete={handleIntroComplete} />

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
