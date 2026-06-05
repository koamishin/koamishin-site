import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
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
    // physically clipping/wiping the overlay out of view in sync with the flare!
    .set(flareRef.current, { opacity: 1 })
    .fromTo(flareRef.current,
      { x: "-10vw" },
      { x: "110vw", duration: 1.25, ease: "power4.inOut" }
    )
    // Synchronized mask wipe of the overlay container itself (clipPath inset)
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

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseX: number;
  baseY: number;
}

const studioPanels = [
  {
    kicker: "01",
    title: "Made to Fit",
    copy: "Workflows shaped around the way your team already thinks, not the other way around.",
    accent: "from-primary/30 to-emerald-300/20",
  },
  {
    kicker: "02",
    title: "Quietly Strong",
    copy: "Interfaces that stay simple on the surface while carrying serious structure underneath.",
    accent: "from-rose-400/25 to-primary/20",
  },
  {
    kicker: "03",
    title: "Shared by Default",
    copy: "Reusable foundations, open packages, and habits that make the next build easier.",
    accent: "from-sky-300/25 to-violet-400/20",
  },
];

const studioNotes = ["Custom systems", "Open source craft", "Laravel foundations"];

/* ─── Main Hero ─── */
const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const masterContentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [introDone, setIntroDone] = useState<boolean>(false);
  const [activePanel, setActivePanel] = useState(0);
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
        scale: 0.92,
        y: -120,
        opacity: 0,
        filter: "blur(10px)",
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

      // Staggered dashboard cards lift away on scroll
      gsap.to(".dashboard-card", {
        y: -80,
        opacity: 0,
        stagger: 0.04,
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: true }
      });

      // Mouse interactive drift for the geometry collage
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;

        gsap.to(".dashboard-card", {
          x: x * 0.08,
          y: y * 0.08,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.025
        });

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

    // Lift the dashboard cards away like the surface is opening into the next section
    tl.to(".dashboard-card", { y: -90, scale: 0.96, opacity: 0, duration: 1.1, stagger: 0.04, ease: "power2.inOut" }, 0);

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
        gsap.set(".dashboard-card", { clearProps: "all" });
        gsap.set(masterContentRef.current, { clearProps: "all" });
      }
    });
  };

  const handleDashboardMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };

  return (
    <>
      <LaserGridIntroOverlay onComplete={() => setIntroDone(true)} />

      <section
        ref={containerRef}
        className="relative isolate min-h-screen w-full bg-background/45 flex flex-col justify-center border-b border-border/40 select-none overflow-hidden"
      >
        {/* Background Loom Grid & Morphing Particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-20 mix-blend-screen pointer-events-none" />
        </div>

        {/* Quiet brand geometry above the fluid layer */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
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

        <div ref={overlayRef} className="absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-background/40 to-background opacity-0 pointer-events-none" />

        {/* Main Container: Rounded Shell enclosing the dashboard module */}
        <div
          ref={masterContentRef}
          onMouseMove={handleDashboardMouseMove}
          className="mx-auto w-[94%] max-w-[1360px] xl:max-w-[1480px] rounded-[18px] md:rounded-[24px] border border-border/50 bg-card/55 backdrop-blur-xl overflow-hidden relative p-6 md:p-10 lg:p-12 xl:p-14 z-10 shadow-2xl shadow-primary/5 transition-transform duration-500 will-change-transform"
        >
          
          {/* Subtle background tech grid */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--spotlight-x,50%)_var(--spotlight-y,50%),color-mix(in_oklch,var(--primary)_18%,transparent),transparent_32%)] opacity-60 pointer-events-none transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-primary/[0.04] pointer-events-none" />

          {/* 2-Column Split Module */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
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
              <p className="reveal-desc mb-8 text-base md:text-lg font-light leading-relaxed text-muted-foreground max-w-lg">
                We engineer secure, high-performance web applications and reusable packages. Specialized in Laravel backend services paired with interactive React and Vue user interfaces.
              </p>

              {/* Single Primary Button with Leading Arrow */}
              <div className="reveal-cta flex flex-col gap-5 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="h-12 rounded-md px-7 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs tracking-wider uppercase transition-all duration-300 group shadow-lg shadow-primary/10">
                  <a href="#about" onClick={handleExploreClick} className="flex items-center">
                    <ArrowRight className="mr-2.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    Explore Our Craft
                  </a>
                </Button>
                <div className="flex items-center gap-3 text-left">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Studio note</p>
                    <p className="text-sm font-medium text-foreground">Simple outside, deeply considered inside.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex w-full max-w-xl flex-wrap gap-2">
                {studioNotes.map((note) => (
                  <span key={note} className="rounded-full border border-border/45 bg-background/45 px-3.5 py-2 text-xs text-muted-foreground backdrop-blur-sm">
                    {note}
                  </span>
                ))}
              </div>

            </div>

            {/* RIGHT COLUMN: Kakaiba studio board */}
            <div className="lg:col-span-6 flex items-center justify-center relative z-10 w-full">
              
              <div className="relative w-full min-h-[430px] lg:min-h-[500px] overflow-hidden rounded-xl border border-border/45 bg-background/50 p-5 shadow-2xl shadow-primary/5 backdrop-blur-xl">
                <div className="absolute inset-5 rounded-lg border border-border/30 pointer-events-none" />
                <div className="absolute -right-12 top-14 h-48 w-48 rounded-full border border-primary/20 pointer-events-none" />
                <div className="absolute bottom-10 left-8 h-24 w-24 rotate-12 rounded-md border border-border/35 bg-card/30 pointer-events-none" />

                <div className="dashboard-card relative z-10 ml-auto flex w-[56%] min-w-[230px] rotate-2 flex-col justify-between rounded-lg border border-border/45 bg-card/70 p-5 shadow-xl shadow-primary/5 backdrop-blur-md transition-all duration-500 hover:rotate-0 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Koamishin</span>
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </div>
                  <div className="mt-12">
                    <p className="font-serif text-6xl font-bold italic leading-none text-foreground">K</p>
                    <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
                      A small mark for work that feels intentional, durable, and a little unexpected.
                    </p>
                  </div>
                </div>

                <div className="dashboard-card relative z-20 -mt-10 w-[68%] min-w-[260px] rounded-lg border border-border/45 bg-background/80 p-5 shadow-2xl shadow-primary/5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1">
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${studioPanels[activePanel].accent} opacity-70 pointer-events-none`} />
                  <div className="relative">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{studioPanels[activePanel].kicker} / selected thought</p>
                    <h2 className="mt-4 font-serif text-4xl font-bold text-foreground">{studioPanels[activePanel].title}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{studioPanels[activePanel].copy}</p>
                  </div>
                </div>

                <div className="relative z-30 mt-5 grid gap-2">
                  {studioPanels.map((panel, index) => {
                    const isActive = activePanel === index;
                    return (
                      <button
                        key={panel.title}
                        type="button"
                        onMouseEnter={() => setActivePanel(index)}
                        onClick={() => setActivePanel(index)}
                        className={`dashboard-card group flex items-center justify-between rounded-md border px-4 py-3 text-left transition-all duration-300 hover:-translate-y-0.5 ${isActive ? "border-primary/45 bg-card/80 shadow-lg shadow-primary/10" : "border-border/40 bg-card/35 hover:border-primary/30"}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`h-2 w-2 rounded-full ${isActive ? "bg-primary" : "bg-muted-foreground/30"}`} />
                          <span className="text-sm font-medium text-foreground">{panel.title}</span>
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{panel.kicker}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="dashboard-card absolute bottom-5 right-5 hidden w-36 rounded-lg border border-border/40 bg-card/45 p-4 backdrop-blur-md md:block">
                  <KamonIcon className="mx-auto h-16 w-16 text-primary/35" />
                  <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-widest text-muted-foreground">quiet craft</p>
                </div>

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



