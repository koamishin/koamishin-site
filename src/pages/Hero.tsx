import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const VerticalText: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <div className={`flex flex-col items-center justify-center font-serif leading-none tracking-widest ${className}`} style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
    {text.split("").map((char, i) => (
      <span key={i} className="my-1 block">{char}</span>
    ))}
  </div>
);

const LaravelLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 50 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M49.5 13.5L27.5 0L5.5 13.5V40.5L27.5 54L49.5 40.5V13.5Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1"/>
    <path d="M27.5 15L15 22.5V37.5L27.5 45L40 37.5V22.5L27.5 15Z" fill="currentColor" fillOpacity="0.2"/>
  </svg>
);

const GlowingOrb: React.FC<{ className?: string; color?: string }> = ({ className, color = "primary" }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.to(ref.current, { scale: 1.2, opacity: 0.6, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, []);
  return (
    <div ref={ref} className={`absolute rounded-full blur-3xl ${className}`} style={{ background: `radial-gradient(circle, var(--${color}) 0%, transparent 70%)` }} />
  );
};

const DataStream: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = containerRef.current?.querySelectorAll(".data-line");
      if (lines && lines.length > 0) {
        gsap.to(lines, { y: "100%", duration: 20, repeat: -1, ease: "none", stagger: { amount: 10, from: "random" } });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={containerRef} className="absolute right-0 top-0 h-full w-40 overflow-hidden opacity-10 pointer-events-none hidden lg:block">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="data-line absolute top-[-100%] left-0 w-full text-[9px] font-mono leading-none text-primary whitespace-nowrap" style={{ left: `${i * 15}%` }}>
          {Array.from({ length: 25 }).map(() => Math.floor(Math.random() * 16).toString(16)).join(" ")}
        </div>
      ))}
    </div>
  );
};

/* ─── Laser Grid & Flare Sweep Cinematic Intro Overlay ─── */
const LaserGridIntroOverlay: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalLinesRef = useRef<SVGGElement>(null);
  const verticalLinesRef = useRef<SVGGElement>(null);
  const kPathRef = useRef<SVGPathElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    // 1. Weave Grid Lines: Horizontal lines slide left-to-right, vertical lines top-to-bottom
    tl.fromTo(horizontalLinesRef.current?.querySelectorAll("line") || [],
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: 1.0, ease: "power2.inOut", stagger: 0.1 }
    )
    .fromTo(verticalLinesRef.current?.querySelectorAll("line") || [],
      { scaleY: 0, transformOrigin: "center top" },
      { scaleY: 1, duration: 1.0, ease: "power2.inOut", stagger: 0.1 },
      "-=0.8"
    )
    // 2. Draw the geometric glowing "K" laser line
    .to(kPathRef.current, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power3.inOut"
    }, "-=0.4")
    // Add brief intense glow to the formed K
    .to(".intro-k-glow-core", {
      opacity: 0.8,
      duration: 0.4,
      repeat: 1,
      yoyo: true,
      ease: "sine.inOut"
    }, "-=0.2")
    // 3. Cinematic Match Transition: Anamorphic Lens Flare sweeps from Left to Right,
    // physically clipping/wiping the overlay out of view in sync with the flare!
    .set(flareRef.current, { opacity: 1 })
    .fromTo(flareRef.current,
      { x: "-10vw" },
      { x: "110vw", duration: 1.6, ease: "power4.inOut" }
    )
    // Synchronized mask wipe of the overlay container itself (clipPath inset)
    .fromTo(containerRef.current,
      { clipPath: "inset(0 0 0 0%)" },
      { clipPath: "inset(0 0 0 100%)", duration: 1.6, ease: "power4.inOut" },
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
      <div ref={containerRef} className="absolute inset-0 bg-[#07080c] flex items-center justify-center overflow-hidden">
        
        {/* Subtle background tech grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.015)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative flex flex-col items-center justify-center scale-100 md:scale-110">
          
          {/* Weaving thread grid & glowing K SVG */}
          <svg viewBox="0 0 100 100" className="w-56 h-56 text-primary drop-shadow-[0_0_12px_rgba(239,68,68,0.25)]">
            
            {/* Horizontal Loom lines */}
            <g ref={horizontalLinesRef} stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.12" fill="none">
              <line x1="5" y1="20" x2="95" y2="20" />
              <line x1="5" y1="35" x2="95" y2="35" />
              <line x1="5" y1="50" x2="95" y2="50" />
              <line x1="5" y1="65" x2="95" y2="65" />
              <line x1="5" y1="80" x2="95" y2="80" />
            </g>

            {/* Vertical Loom lines */}
            <g ref={verticalLinesRef} stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.12" fill="none">
              <line x1="20" y1="5" x2="20" y2="95" />
              <line x1="35" y1="5" x2="35" y2="95" />
              <line x1="50" y1="5" x2="50" y2="95" />
              <line x1="65" y1="5" x2="65" y2="95" />
              <line x1="80" y1="5" x2="80" y2="95" />
            </g>

            {/* Geometric guide circle */}
            <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="3,5" fill="none" />

            {/* Single continuous geometric K laser thread path */}
            <path
              ref={kPathRef}
              d="M 35 15 L 35 85 M 35 50 L 70 15 M 35 50 L 70 85"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="opacity-0"
            />
            
            {/* Glowing intersection anchor */}
            <circle cx="35" cy="50" r="2.5" className="intro-k-glowing-glow opacity-0" fill="currentColor" />
          </svg>

          <div className="mt-8 font-mono text-[9px] uppercase tracking-[0.4em] text-primary/45 animate-pulse">
            Weaving Loom Network // Koamishin.com
          </div>
        </div>
      </div>

      {/* Cinematic Horizontal Anamorphic Lens Flare */}
      <div
        ref={flareRef}
        className="absolute top-0 bottom-0 w-24 -translate-x-1/2 flex items-center justify-center opacity-0 pointer-events-none z-50"
        style={{ left: 0 }}
      >
        {/* Soft horizontal glowing wings */}
        <div className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-primary/60 to-transparent blur-md" />
        
        {/* Intense white laser core line */}
        <div className="absolute inset-y-0 w-[2px] bg-white shadow-[0_0_20px_#ef4444,0_0_40px_rgba(239,68,68,0.8)]" />
      </div>

    </div>
  );
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseX: number;
  baseY: number;
}

/* ─── Main Hero ─── */
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const masterContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [introDone, setIntroDone] = useState<boolean>(false);
  const entrancePlayedRef = useRef<boolean>(false);

  // 1. Fluid Canvas Particle Network (The Thread Loom)
  // Transitioning from mesh into a guided vertical trail as user scrolls into About section
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const particleCount = 40;
    let scrollProgress = 0;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 1.5 + 1.0,
          baseX: x,
          baseY: y
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");
      
      const nodeColor = isDark ? "rgba(239, 68, 68, 0.45)" : "rgba(220, 38, 38, 0.35)";
      const lineColor = isDark ? "rgba(239, 68, 68, 0.08)" : "rgba(220, 38, 38, 0.06)";
      const trailColor = isDark ? "rgba(239, 68, 68, 0.2)" : "rgba(220, 38, 38, 0.15)";

      // Ambient background grid blueprint
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.01)" : "rgba(0, 0, 0, 0.01)";
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw continuous guided waterfall line when scrolling down to create a seamless link
      if (scrollProgress > 0.05) {
        ctx.strokeStyle = trailColor;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 12]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      particles.forEach((p, idx) => {
        // Morph logic: As user scrolls, draw particles towards a vertical waterfall trail in the center
        if (scrollProgress > 0.1) {
          const targetX = canvas.width / 2 + Math.sin(p.baseY * 0.01 + idx) * 30;
          const targetY = p.y + (0.5 * scrollProgress); // Slow slide downward

          p.x += (targetX - p.x) * 0.06;
          p.y += (targetY - p.y) * 0.06;
        } else {
          // Normal floating orbit behavior
          p.x += p.vx;
          p.y += p.vy;
        }

        // Wrap boundaries
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Interactive mouse push
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            p.x += dx * -0.005;
            p.y += dy * -0.005;
          }
        }

        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connection lines
      ctx.lineWidth = 0.7;
      const maxDistance = 150 * (1 - scrollProgress * 0.4); // Dissolve network connection range on scroll to focus on the trail
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.6;
            ctx.strokeStyle = lineColor.replace(/[\d.]+\)$/, `${alpha})`);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress = self.progress;
      }
    });

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      scrollTrigger.kill();
      cancelAnimationFrame(animationId);
    };
  }, []);

  // 2. 3D Parallax Mousemove & ScrollTrigger Connections
  useEffect(() => {
    if (!introDone) return;
    if (entrancePlayedRef.current) return;
    entrancePlayedRef.current = true;

    const ctx = gsap.context(() => {
      // Clean, immediate soft reveal on guide indicator
      gsap.fromTo(".scroll-guide-indicator",
        { opacity: 0, y: -10 },
        { opacity: 0.6, y: 0, repeat: -1, yoyo: true, duration: 1.5, ease: "sine.inOut" }
      );

      // Cinematic Exit Scroll Trigger: Shrinks, lifts, blurs, and dissolves the entire rounded shell
      gsap.to(masterContentRef.current, {
        scale: 0.88,
        y: -150,
        opacity: 0,
        filter: "blur(18px)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Fade out background canvas particles on scroll
      gsap.to(canvasRef.current, {
        opacity: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Staggered geometric collage disintegration on scroll
      gsap.to(".geom-rect-1", {
        y: -220,
        x: -40,
        rotation: -15,
        opacity: 0,
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true }
      });
      gsap.to(".geom-rect-2", {
        y: -300,
        x: 40,
        rotation: 20,
        opacity: 0,
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true }
      });
      gsap.to(".geom-rect-3", {
        y: -180,
        x: 20,
        rotation: 35,
        opacity: 0,
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true }
      });
      gsap.to(".geom-rect-4", {
        y: -250,
        x: -30,
        rotation: -25,
        opacity: 0,
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true }
      });

      // Mouse interactive drift for the geometry collage
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;

        gsap.to(".geom-rect-1", { x: x * 0.4, y: y * 0.4, duration: 1.2, ease: "power2.out" });
        gsap.to(".geom-rect-2", { x: -x * 0.6, y: -y * 0.6, duration: 1.2, ease: "power2.out" });
        gsap.to(".geom-rect-3", { x: -x * 0.2, y: y * 0.3, duration: 1.5, ease: "power2.out" });
        gsap.to(".geom-rect-4", { x: x * 0.5, y: -y * 0.2, duration: 1.5, ease: "power2.out" });

        // Drift background floating visual assets at staggered speeds
        gsap.to(".floating-icon", {
          x: x * 0.6,
          y: y * 0.6,
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.15
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, [introDone]);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!(window as any).lenis) {
      const el = document.getElementById("about");
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Cinematic Camera-Push / Zoom Portal Timeline
    const tl = gsap.timeline();

    // Scale up and disperse the 4 geometric shapes outwards like a doorway/gate opening
    tl.to(".geom-rect-1", { x: -350, y: -250, scale: 1.5, opacity: 0, duration: 1.3, ease: "power2.inOut" }, 0);
    tl.to(".geom-rect-2", { x: 350, y: 350, scale: 1.5, opacity: 0, duration: 1.3, ease: "power2.inOut" }, 0);
    tl.to(".geom-rect-3", { x: 350, y: -250, scale: 1.5, opacity: 0, duration: 1.3, ease: "power2.inOut" }, 0);
    tl.to(".geom-rect-4", { x: -350, y: 350, scale: 1.5, opacity: 0, duration: 1.3, ease: "power2.inOut" }, 0);

    // Zoom the main contained rounded shell card to simulate entering the portal
    tl.to(masterContentRef.current, { 
      scale: 1.08, 
      opacity: 0.15, 
      filter: "blur(12px)", 
      duration: 1.3, 
      ease: "power2.inOut" 
    }, 0);

    // Smoothly glide viewport down to About section using Lenis
    (window as any).lenis.scrollTo("#about", {
      duration: 1.8,
      easing: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, // Smooth custom cubic bezier
      onComplete: () => {
        // Reset properties once scroll ends so they are available if the user scrolls back up
        gsap.set([".geom-rect-1", ".geom-rect-2", ".geom-rect-3", ".geom-rect-4"], { clearProps: "all" });
        gsap.set(masterContentRef.current, { clearProps: "all" });
      }
    });
  };

  return (
    <>
      <LaserGridIntroOverlay onComplete={() => setIntroDone(true)} />

      <section
        ref={containerRef}
        className="relative min-h-screen w-full bg-background flex flex-col justify-center border-b border-border/40 select-none overflow-hidden"
      >
        {/* Background Loom Grid & Morphing Particles */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-65" />
        </div>

        {/* Elegant, balanced backdrop studio lighting with Glowing Orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <GlowingOrb className="w-96 h-96 left-[10%] top-[20%]" color="primary" />
          <GlowingOrb className="w-80 h-80 right-[15%] bottom-[25%]" color="secondary" />
          <GlowingOrb className="w-64 h-64 left-[30%] bottom-[10%]" color="primary" />

          {/* Floating brand icons */}
          <div className="floating-icon absolute left-[5%] top-[15%] opacity-30">
            <JapanesePattern className="h-72 w-72 text-primary rotate-12" />
          </div>
          <div className="floating-icon absolute right-[8%] bottom-[15%] opacity-20">
            <LaravelLogo className="h-56 w-56 text-primary -rotate-12" />
          </div>
          <div className="floating-icon absolute left-[20%] bottom-[8%] opacity-25">
            <KamonIcon className="h-40 w-40 text-primary" />
          </div>
        </div>

        <div className="vertical-decor absolute right-12 top-24 hidden h-[400px] flex-col items-center justify-start gap-8 font-serif text-2xl font-bold text-primary/15 lg:flex pointer-events-none">
          <VerticalText text="創造" />
          <div className="h-16 w-[1px] bg-primary/20"></div>
          <VerticalText text="調和" />
          <div className="h-16 w-[1px] bg-primary/20"></div>
          <VerticalText text="未来" />
        </div>

        <div ref={overlayRef} className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-background/40 to-background opacity-0 pointer-events-none" />
        <DataStream />

        {/* Main Container: Rounded Shell enclosing the split module */}
        <div ref={masterContentRef} className="mx-auto w-[94%] max-w-[1360px] xl:max-w-[1480px] rounded-[24px] md:rounded-[36px] border border-border/40 bg-card/15 backdrop-blur-md overflow-hidden relative p-8 md:p-14 lg:p-16 xl:p-20 z-10 shadow-2xl transition-all duration-300">
          
          {/* Subtle background tech grid */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />

          {/* 2-Column Split Module */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: Editorial Text Stack (shifts from centered on mobile to left-aligned on lg screens) */}
            <div className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left relative z-20">
              
              {/* Short Release Label */}
              <div className="reveal-badge mb-5 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 font-mono text-[9px] uppercase tracking-[0.25em] text-primary">
                <Sparkles className="h-3 w-3 animate-pulse" />
                <span>Laravel + Vue / React</span>
              </div>

              {/* Bold Editorial Headline */}
              <h1 className="reveal-title mb-6 font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-foreground">
                Building <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-primary via-rose-500 to-primary bg-clip-text text-transparent italic font-light pr-2">Custom Systems</span> <br />
                & Open Source.
              </h1>

              {/* Muted Paragraph explaining our objective */}
              <p className="reveal-desc mb-10 text-base md:text-lg font-light leading-relaxed text-muted-foreground max-w-lg">
                We engineer secure, high-performance web applications and reusable packages. Specialized in Laravel backend services paired with interactive React and Vue user interfaces.
              </p>

              {/* Single Primary Button with Leading Arrow */}
              <Button asChild size="lg" className="reveal-cta h-12 rounded-none px-7 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs tracking-wider uppercase transition-all duration-300 group shadow-lg shadow-primary/10">
                <a href="#about" onClick={handleExploreClick} className="flex items-center">
                  <ArrowRight className="mr-2.5 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  Explore Our Craft
                </a>
              </Button>

            </div>

            {/* RIGHT COLUMN: The Abstract Geometry Collage Frame */}
            <div className="lg:col-span-6 flex items-center justify-center relative z-10 w-full">
              
              {/* Tall Frame hosting the abstract geometry */}
              <div className="relative w-full h-[400px] lg:h-[480px] bg-muted/[0.03] border border-border/25 rounded-2xl overflow-hidden shadow-inner p-6">
                
                {/* Hairline decorative borders inside the frame representing architectural alignment axes */}
                <div className="absolute inset-y-0 left-1/3 border-l border-border/10 pointer-events-none" />
                <div className="absolute inset-x-0 top-1/4 border-t border-border/10 pointer-events-none" />
                
                {/* Rectangle 1: Top-Left Anchor (glowing primary accent wash) */}
                <div className="geom-rect-1 absolute top-8 left-8 w-[45%] h-[35%] rounded-[16px] border border-primary/20 bg-primary/[0.04] backdrop-blur-xs flex items-center justify-center">
                  <JapanesePattern className="h-2/3 w-2/3 text-primary/10" />
                </div>

                {/* Rectangle 2: Bottom-Right Anchor (clean structural card with shadow) */}
                <div className="geom-rect-2 absolute bottom-8 right-8 w-[48%] h-[42%] rounded-[20px] border border-border/40 bg-card/45 shadow-lg backdrop-blur-md" />

                {/* Rectangle 3: Top-Right Anchor (slanted shared accent wash) */}
                <div className="geom-rect-3 absolute top-12 right-12 w-[32%] h-[22%] rounded-[12px] border border-primary/15 bg-primary/[0.08] backdrop-blur-2xs rotate-6" />

                {/* Rectangle 4: Bottom-Left Anchor (slanted container) */}
                <div className="geom-rect-4 absolute bottom-12 left-12 w-[34%] h-[32%] rounded-[14px] border border-border/40 bg-card/20 -rotate-12 flex items-center justify-center">
                  <KamonIcon className="h-1/2 w-1/2 text-primary/10" />
                </div>

                {/* Subtle digital coordinates showcasing craft energy */}
                <span className="absolute bottom-4 left-4 font-mono text-[7.5px] text-muted-foreground/35 uppercase tracking-widest">Comp. Scale // 1.096</span>
                <span className="absolute top-4 right-4 font-mono text-[7.5px] text-muted-foreground/35 uppercase tracking-widest">Negative Space Grid</span>

              </div>

            </div>

          </div>

        </div>

      {/* Seamless Floating Scroll Guide (Guides the eye straight down the Waterfall trail into About) */}
      <div className="scroll-guide-indicator absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer pointer-events-none opacity-60">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
        <ChevronDown className="h-4 w-4 text-primary" />
      </div>

    </section>
    </>
  );
};

export default Hero;



