import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Cpu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubService } from "@/services/GitHubService";

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

const VerticalText: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <div className={`flex flex-col items-center justify-center font-serif leading-none tracking-widest ${className}`} style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
    {text.split("").map((char, i) => (
      <span key={i} className="my-1 block">{char}</span>
    ))}
  </div>
);

const DataStream: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = containerRef.current?.querySelectorAll(".data-line");
      if (lines && lines.length > 0) {
        gsap.to(lines, {
          y: "100%",
          duration: 25, 
          repeat: -1,
          ease: "none",
          stagger: {
            amount: 15,
            from: "random"
          }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute right-0 top-0 h-full w-32 overflow-hidden opacity-5 pointer-events-none hidden lg:block">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="data-line absolute top-[-100%] left-0 w-full text-[10px] font-mono leading-none text-primary whitespace-nowrap" style={{ left: `${i * 20}%` }}>
          {Array.from({ length: 20 }).map(() => Math.floor(Math.random() * 16).toString(16)).join(" ")}
        </div>
      ))}
    </div>
  );
};

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const verticalDecorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const [stats, setStats] = useState({ modules: 0, artisans: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await GitHubService.fetchKoamishinStats();
      if (data) {
        setStats(data);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let points: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const numPoints = 70; 
    const connectionDistance = 180;
    let mouseX = -1000;
    let mouseY = -1000;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints();
    };

    const initPoints = () => {
      points = [];
      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2, 
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 2 + 0.5,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.classList.contains("dark");
      const strokeColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)";
      const pointColor = isDark ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)";

      points.forEach((point) => {
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          point.x -= dx * 0.005; 
          point.y -= dy * 0.005;
        }

        point.x += point.vx;
        point.y += point.vy;
        
        if (point.x < 0) point.x = canvas.width;
        if (point.x > canvas.width) point.x = 0;
        if (point.y < 0) point.y = canvas.height;
        if (point.y > canvas.height) point.y = 0;

        ctx.fillStyle = pointColor;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            ctx.globalAlpha = 1 - dist / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    resizeCanvas();
    draw();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        hudRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.2 }
      )
      .fromTo(
        ".divider-line",
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1.8, ease: "power3.inOut" },
        "-=0.8"
      );

      const titleChars = titleRef.current?.querySelectorAll(".hero-char");
      const katakana = titleRef.current?.querySelectorAll(".hero-katakana");
      
      if (titleChars && titleChars.length > 0) {
        tl.fromTo(
          titleChars,
          { y: 100, opacity: 0, skewY: 10 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.5, stagger: 0.1 },
          "-=1.5"
        );
      }

      if (katakana && katakana.length > 0) {
        tl.fromTo(
          katakana,
          { opacity: 0, x: 20, filter: "blur(10px)" },
          { opacity: 0.08, x: 0, filter: "blur(0px)", duration: 2.5, ease: "power2.out" },
          "-=1.5"
        );
      }

      if (verticalDecorRef.current) {
        const verticalSpans = verticalDecorRef.current.querySelectorAll("span");
        if (verticalSpans.length > 0) {
           tl.fromTo(
            verticalSpans,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, stagger: 0.1, duration: 1.2 },
            "-=2"
          );
        }
      }

      if (statsRef.current) {
        tl.fromTo(
          statsRef.current, 
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 1 },
          "-=1"
        );
      }

      gsap.to(".parallax-content", {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom 30%",
          scrub: 1,
        },
      });

      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        gsap.to(".floating-icon", {
          x: x,
          y: y,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1
        });
      };
      
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (stats.modules > 0 || stats.artisans > 0) {
        const ctx = gsap.context(() => {
            gsap.fromTo(".stat-modules", 
                { textContent: 0 }, 
                { textContent: stats.modules, duration: 2.5, snap: { textContent: 1 }, ease: "power2.out" }
            );
            gsap.fromTo(".stat-artisans", 
                { textContent: 0 }, 
                { textContent: stats.artisans, duration: 2.5, snap: { textContent: 1 }, ease: "power2.out" }
            );
        }, statsRef); 
        return () => ctx.revert();
    }
  }, [stats]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full overflow-hidden bg-background pt-20"
    >
      <div className="absolute inset-0 -z-20">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" />
      </div>
      
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-30">
        <div className="floating-icon absolute left-[5%] top-[15%]">
           <JapanesePattern className="h-64 w-64 text-primary opacity-20 rotate-12" />
        </div>
        <div className="floating-icon absolute right-[10%] bottom-[20%]">
           <Globe className="h-48 w-48 text-secondary opacity-10 -rotate-12 stroke-1" />
        </div>
        <div className="floating-icon absolute left-[15%] bottom-[10%]">
           <KamonIcon className="h-32 w-32 text-primary opacity-20" />
        </div>
      </div>
      
      <div ref={overlayRef} className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-background/40 to-background opacity-0 pointer-events-none" />
      <DataStream />

      <div className="parallax-content container relative z-10 mx-auto flex min-h-[85vh] flex-col justify-center px-6 md:px-12">
        
        <div ref={hudRef} className="mb-16 flex flex-wrap items-center gap-6 border-l-2 border-primary/30 pl-6">
          <div className="flex items-center gap-3">
            <KamonIcon className="h-6 w-6 text-primary" />
            <span className="font-serif text-sm italic tracking-widest text-muted-foreground">The Artisan Collective</span>
          </div>
          <div className="hidden h-px w-16 bg-border md:block" />
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground/70">
            <span>Est. 2024</span>
            <span className="mx-2">•</span>
            <span>Tokyo / Global</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          
          <div className="lg:col-span-8 relative">
            <h1 ref={titleRef} className="flex flex-col font-serif font-bold leading-[0.8] tracking-tighter text-foreground">
              
              <div className="relative flex items-end overflow-visible">
                <span className="hero-char text-8xl md:text-[10rem] lg:text-[13rem] z-10 mix-blend-difference">
                  KOAMI
                </span>
                <span 
                  className="hero-katakana absolute -top-10 left-[60%] -z-10 font-sans text-9xl font-black text-primary opacity-0 md:text-[12rem] lg:left-[55%]"
                  style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
                >
                  コアミ
                </span>
                <span className="mb-6 ml-6 hidden font-mono text-xs tracking-[0.3em] text-primary/60 md:block">
                  [ SMALL NET ]
                </span>
              </div>

              <div className="relative mt-4 flex items-center gap-4 overflow-visible pl-2 md:mt-0 md:pl-16">
                 <div className="divider-line h-[2px] w-16 bg-primary md:w-40" />
                 <span className="hero-char text-8xl italic text-primary md:text-[10rem] lg:text-[13rem] z-10">
                   SHIN
                 </span>
                 <span 
                  className="hero-katakana absolute -bottom-10 left-[70%] -z-10 font-sans text-9xl font-black text-foreground opacity-0 md:text-[12rem]"
                  style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
                >
                  シン
                </span>
                 <span className="absolute -bottom-12 right-0 rotate-90 font-mono text-xs uppercase tracking-[0.5em] text-primary/60 md:static md:mb-8 md:ml-4 md:rotate-0">
                   [ NEW ]
                 </span>
              </div>

            </h1>
            
            <div className="mt-20 max-w-xl border-t border-primary/20 pt-8">
              <p className="text-lg font-light leading-relaxed text-muted-foreground md:text-2xl">
                <span className="mb-4 block font-serif text-sm italic text-primary">
                  Our Philosophy
                </span>
                We are a digital guild weaving intricate connections to foster innovation. 
                Believing in the <span className="text-foreground font-medium border-b border-primary/30">artisan's touch</span> for the open web—where code is crafted, not just written.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-end lg:col-span-4 lg:pl-12 relative">
            
            <div ref={verticalDecorRef} className="vertical-decor absolute right-0 top-0 hidden h-full flex-col items-center justify-start gap-12 font-serif text-2xl font-bold text-primary/10 lg:flex">
               <VerticalText text="創造" />
               <div className="h-24 w-[1px] bg-primary/10"></div>
               <VerticalText text="調和" />
               <div className="h-24 w-[1px] bg-primary/10"></div>
               <VerticalText text="未来" />
            </div>

            <div ref={statsRef} className="space-y-12 border-l-2 border-border/30 pl-8 lg:border-l-0 lg:pl-0 z-10">
              
              <div className="relative group">
                <div className="absolute -left-[34px] top-2 h-2 w-2 rounded-full bg-primary transition-all duration-500 group-hover:bg-foreground lg:hidden"></div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Ecosystem</p>
                <div className="flex items-baseline gap-3 font-sans text-6xl font-light text-foreground">
                  <span className="stat-modules">{stats.modules || 12}</span>
                  <span className="text-lg text-primary font-serif italic">Projects</span>
                </div>
              </div>
              
              <div className="relative group">
                 <div className="absolute -left-[34px] top-2 h-2 w-2 rounded-full bg-muted-foreground transition-all duration-500 group-hover:bg-primary lg:hidden"></div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Network</p>
                <div className="flex items-baseline gap-3 font-sans text-6xl font-light text-foreground">
                  <span className="stat-artisans">{stats.artisans || 85}</span>
                  <span className="text-lg text-primary font-serif italic">Artisans</span>
                </div>
              </div>

              <div className="pt-10">
                <Button 
                  size="lg" 
                  className="group relative h-20 w-full overflow-hidden rounded-sm border border-primary/30 bg-background text-foreground transition-all hover:border-primary hover:shadow-[0_0_40px_-10px_rgba(var(--primary),0.2)]"
                >
                  <div className="absolute inset-0 w-[200%] translate-x-[-100%] bg-gradient-to-r from-transparent via-primary/5 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[100%]" />
                  <a href="#projects" className="relative z-10 flex w-full items-center justify-between px-4">
                    <div className="flex flex-col items-start text-left">
                      <span className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">Enter</span>
                      <span className="font-serif text-2xl italic tracking-wide">The Collective</span>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                       <ArrowRight className="h-5 w-5" />
                    </div>
                  </a>
                </Button>
                
                <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
                   <span className="font-mono text-[10px] text-muted-foreground">OPEN_SOURCE.init</span>
                   <Cpu className="h-4 w-4 text-primary/40 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 flex w-full justify-between px-6 py-8 md:px-12 items-end">
         <div className="font-mono text-[10px] text-muted-foreground/60 leading-relaxed">
           35.6895° N / 139.6917° E <br/>
           EST. 2024 © KOAMISHIN
         </div>
         <div className="flex flex-col items-center gap-3">
            <div className="h-16 w-[1px] bg-gradient-to-b from-primary/60 to-transparent" />
            <span className="writing-vertical-rl font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
              Scroll
            </span>
         </div>
      </div>

    </section>
  );
};

export default Hero;
