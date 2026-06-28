import React, { useEffect, useRef } from 'react';
import { MessageSquare, Mail, Github, Globe, MapPin } from 'lucide-react';
import { gsap } from '@/lib/gsap';

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      label: "Email",
      value: "rui@koamishin.com",
      link: "mailto:rui@koamishin.com"
    },
    {
      icon: <Github className="h-6 w-6" />,
      label: "GitHub",
      value: "github.com/Koamishin",
      link: "https://github.com/Koamishin"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      label: "Location",
      value: "Global Remote Team",
      link: null
    },
    {
      icon: <Globe className="h-6 w-6" />,
      label: "Website",
      value: "koamishin.com",
      link: "https://koamishin.com"
    }
  ];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const isLowEnd = hardwareConcurrency <= 2;

    const ctx = gsap.context(() => {
      // Skip animations on low-end devices or with reduced motion
      if (reducedMotion || isLowEnd) {
        gsap.set(headerRef.current?.children || [], { opacity: 1, y: 0 });
        itemsRef.current.forEach((item) => {
          if (item) gsap.set(item, { opacity: 1, x: 0 });
        });
        return;
      }

      gsap.fromTo(headerRef.current?.children || [],
        { opacity: 0, y: 40 },
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

      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.1,
            scrollTrigger: {
              trigger: item,
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
      id="contact"
      ref={containerRef}
      className="relative min-h-screen w-full py-32 md:py-48 px-6 md:px-12"
    >
      <div className="max-w-3xl mx-auto">
        <div ref={headerRef} className="mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Contact</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="block">Let's connect</span>
            <span className="bg-gradient-to-r from-primary via-purple-500 to-rose-500 bg-clip-text text-transparent italic font-light">
              & build the future
            </span>
          </h2>
          <p className="text-base md:text-lg font-light leading-relaxed text-muted-foreground">
            Ready to collaborate on your next project? Reach out through any of the channels below.
          </p>
        </div>

        <div className="space-y-10">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              ref={(el) => { itemsRef.current[index] = el; }}
              className="group flex items-center gap-6 py-4 border-b border-border/30 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0">
                {info.icon}
              </div>
              <div className="flex-1">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1">
                  {info.label}
                </p>
                {info.link ? (
                  <a
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="text-lg md:text-xl font-medium text-foreground hover:text-primary transition-colors duration-300 group-hover:translate-x-1 inline-block"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-lg md:text-xl font-medium text-foreground">
                    {info.value}
                  </p>
                )}
              </div>
              {info.link && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Decorative element */}
        <div className="mt-20 flex justify-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Contact;