import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Layers, Shield, Globe, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Security First',
      description: 'Enterprise-grade security practices built into every line of code, with Laravel\'s robust security features.'
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: 'Scalable Architecture',
      description: 'Designed for growth with clean separation of concerns, testable code, and modular components.'
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Open Source',
      description: 'Contributing back to the community with high-quality, well-documented packages and tools.'
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Modern Stack',
      description: 'Leveraging the latest technologies: Laravel, React, Vue, Tailwind, and more.'
    }
  ];

  const stats = [
    { number: '50+', label: 'Systems Developed' },
    { number: '99.9%', label: 'SLA Guaranteed' },
    { number: '12+', label: 'Open Source Packages' },
    { number: '150k+', label: 'Total Downloads' }
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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Stats animation
      gsap.fromTo(statsRef.current?.children || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full py-32 md:py-48 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Company Profile</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            A premium digital agency for{' '}
            <span className="bg-gradient-to-r from-primary via-rose-500 to-primary bg-clip-text text-transparent italic font-light">
              custom business systems
            </span>
          </h2>
          <p className="text-base md:text-xl font-light leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            Koamishin is a dedicated development firm specializing in high-performance web applications and business systems.
            We build robust backend solutions using the Laravel framework, paired with interactive, responsive SPAs built on Vue and React.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group p-8 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-xl hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-12 rounded-3xl border border-border/30 bg-muted/40 backdrop-blur-xl">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-serif text-4xl md:text-5xl font-bold text-primary mb-3">{stat.number}</div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
