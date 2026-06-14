import React from 'react';
import { Github, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react';

const PageFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0);
    }
  };

  const navColumns = [
    {
      title: "Platform",
      links: [
        { label: "Dashboard", href: "#" },
        { label: "Architecture", href: "#" },
        { label: "Metrics", href: "#" },
        { label: "Features", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/docs" },
        { label: "Changelog", href: "#" },
        { label: "Roadmap", href: "#" },
        { label: "API Reference", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Koamishin", href: "/#about" },
        { label: "Team", href: "/team" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "/#contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Data Policy", href: "#" },
        { label: "License", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Github className="h-4 w-4" />, href: "https://github.com/Koamishin", label: "GitHub" },
    { icon: <Twitter className="h-4 w-4" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-4 w-4" />, href: "#", label: "LinkedIn" },
    { icon: <Mail className="h-4 w-4" />, href: "mailto:contact@koamishin.com", label: "Email" }
  ];

  const asciiArt = `
  KK   KK  OOOOOO  AA   AA  MM   MM  II  SS SS    HH   HH  II  NN   NN
  KK KK    OO  OO  AAAAAA  MMM MMM  II  SS       HH   HH  II  NNN  NN
  KKK      OO  OO  AA   AA  MM M MM  II   SSS    HHHHHHH  II  NN N NN
  KK KK    OO  OO  AA   AA  MM   MM  II      SS  HH   HH  II  NN  NNN
  KK   KK  OOOOOO  AA   AA  MM   MM  II  SS SS   HH   HH  II  NN   NN
  `;

  return (
    <footer className="pt-16 md:pt-24 pb-4 md:pb-8 border-t border-border/30 bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">
              <span className="block">Building</span>
              <span className="block bg-gradient-to-r from-primary via-purple-500 to-rose-500 bg-clip-text text-transparent italic font-light">
                the future
              </span>
            </h2>
            <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed max-w-md">
              A modern development collective. We build scalable systems, open-source tools, and beautiful user experiences.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mb-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : '_self'}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-card/50 border border-border/40 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            {navColumns.map((column, colIndex) => (
              <div key={colIndex}>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Return to Top Button */}
        <div className="flex justify-end mb-12">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Return to top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* KOAMISHIN ASCII Art at the Very Bottom - Responsive Width */}
        <div className="w-full overflow-hidden text-center">
          <pre className="font-mono text-[2vw] md:text-[1.8vw] lg:text-[1.6vw] xl:text-[1.4vw] text-foreground/10 select-none whitespace-pre leading-tight inline-block">
            {asciiArt}
          </pre>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;