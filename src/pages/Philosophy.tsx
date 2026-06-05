import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Sparkles, Gift, Quote, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Philosophy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const principles = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Collaboration',
      japanese: '協力',
      description: 'We believe the best software is built together. Community input isn\'t just feedback—it\'s the foundation of our architecture.'
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Passion',
      japanese: '情熱',
      description: 'Code is more than syntax; it\'s expression. We are driven by a genuine love for solving complex problems elegantly.'
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: 'Openness',
      japanese: '開放',
      description: 'Knowledge grows when shared. We are committed to keeping our tools free, accessible, and transparent for everyone.'
    }
  ];

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

      // Quote animation
      gsap.fromTo(quoteRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
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
      id="philosophy"
      ref={containerRef}
      className="relative w-full py-32 md:py-48 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Our Ethos</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold">
            Why We Build
          </h2>
        </div>

        <div className="mb-24 flex justify-center">
          <blockquote
            ref={quoteRef}
            className="relative max-w-4xl text-center font-serif text-2xl md:text-4xl font-medium leading-snug text-foreground"
          >
            <Quote className="absolute -left-8 -top-8 h-12 w-12 text-primary/20 md:-left-16 md:-top-12 md:h-20 md:w-20" />
            <span className="relative z-10">
              "Code is our craft, open source is our canvas. We build not just for functionality, but for the{' '}
              <span className="italic text-primary decoration-primary/30 underline-offset-8">
                community
              </span>{' '}
              and the shared joy of creation."
            </span>
          </blockquote>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative flex flex-col items-center text-center p-8 rounded-2xl border border-transparent hover:border-primary/30 transition-all duration-300 hover:bg-card/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute right-4 top-4 font-serif text-2xl font-bold text-foreground/5 group-hover:text-primary/10 transition-colors">
                {principle.japanese}
              </div>

              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-xl group-hover:shadow-primary/30">
                {principle.icon}
              </div>

              <h3 className="mb-4 font-serif text-2xl md:text-3xl font-bold text-foreground transition-colors group-hover:text-primary">
                {principle.title}
              </h3>

              <p className="text-base md:text-lg leading-relaxed text-muted-foreground font-light">
                {principle.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col items-center text-center">
          <Lightbulb className="mb-6 h-10 w-10 text-primary/60" />
          <p className="max-w-2xl text-lg md:text-xl font-light text-foreground/80">
            We aim to lower barriers and raise standards. By democratizing access to high-quality tools,
            we hope to inspire the next wave of digital artisans.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
