import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Gift, Sparkles, Quote, Lightbulb } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const VerticalJapanese: React.FC<{ text: string; className?: string }> = ({ text, className }) => (
  <div className={`flex flex-col items-center font-serif leading-tight ${className}`} style={{ writingMode: "vertical-rl", textOrientation: "upright" }}>
    {text.split("").map((char, i) => (
      <span key={i} className="my-1">{char}</span>
    ))}
  </div>
);

const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const principles = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaboration",
      japanese: "協力",
      description:
        "We believe the best software is built together. Community input isn't just feedback—it's the foundation of our architecture.",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "Passion",
      japanese: "情熱",
      description:
        "Code is more than syntax; it's expression. We are driven by a genuine love for solving complex problems elegantly.",
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: "Openness",
      japanese: "開放",
      description:
        "Knowledge grows when shared. We are committed to keeping our tools free, accessible, and transparent for everyone.",
    },
  ];

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

      gsap.fromTo(
        quoteRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        cardsRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 85%",
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-background py-32 md:py-48">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} 
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div ref={headerRef} className="mx-auto mb-24 max-w-3xl text-center relative">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-primary/50" />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Our Ethos
            </span>
            <span className="h-[1px] w-8 bg-primary/50" />
          </div>
          
          <h2 className="font-serif text-5xl font-bold leading-[1.1] tracking-tighter text-foreground md:text-7xl">
            Why We Build
          </h2>
        </div>

        <div className="mb-32 flex justify-center">
          <blockquote 
            ref={quoteRef}
            className="relative max-w-4xl text-center font-serif text-3xl font-medium leading-snug text-foreground md:text-5xl"
          >
            <Quote className="absolute -left-8 -top-8 h-12 w-12 text-primary/20 md:-left-16 md:-top-12 md:h-20 md:w-20" />
            <span className="relative z-10">
              "Code is our craft, open source is our canvas. We build not just for functionality, but for the <span className="italic text-primary decoration-primary/30 underline-offset-8">community</span> and the shared joy of creation."
            </span>
          </blockquote>
        </div>

        <div className="grid gap-12 md:grid-cols-3 lg:gap-16">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              ref={(el) => {
                  cardsRef.current[index] = el;
              }}
              className="group relative flex flex-col items-center text-center p-8 border border-transparent hover:border-primary/10 transition-colors duration-500 rounded-sm"
            >
              <VerticalJapanese 
                text={principle.japanese} 
                className="absolute right-4 top-4 text-2xl font-bold text-foreground/5 pointer-events-none transition-colors group-hover:text-primary/10" 
              />

              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-xl group-hover:shadow-primary/30">
                {principle.icon}
              </div>
              
              <h3 className="mb-4 font-serif text-3xl font-bold text-foreground transition-colors group-hover:text-primary">
                {principle.title}
              </h3>
              
              <p className="text-lg leading-relaxed text-muted-foreground font-light">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-32 flex flex-col items-center text-center">
           <Lightbulb className="mb-6 h-10 w-10 text-primary/60" />
           <p className="max-w-2xl text-xl font-light text-foreground/80">
             We aim to lower barriers and raise standards. By democratizing access to high-quality tools, 
             we hope to inspire the next wave of digital artisans.
           </p>
        </div>

      </div>
    </section>
  );
};

export default Philosophy;
