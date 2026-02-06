import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu, Github, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Philosophy", href: "#philosophy" },
  { name: "Team", href: "/team" },
  { name: "Docs", href: "/docs" },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .filter((item) => item.href.startsWith("#"))
        .map((item) => document.querySelector(item.href));

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveLink(entry.target.id);
            }
          });
        },
        { threshold: 0.5 }
      );

      sections.forEach((section) => {
        if (section) observer.observe(section);
      });

      return () => {
        sections.forEach((section) => {
          if (section) observer.unobserve(section);
        });
      };
    };

    handleScroll();
  }, []);


  return (
    <motion.header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500 ease-in-out border-b border-transparent",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-border py-2" 
          : "bg-transparent py-6"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 md:px-12">
        
        <div className="flex items-center">
          <a href="/" className="group relative z-50 flex items-center gap-2">
             <div className="flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground font-serif font-bold italic">
               K
             </div>
            <span className="font-serif text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
              Koamishin
            </span>
          </a>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "group relative text-sm font-medium tracking-wide transition-colors hover:text-primary",
                activeLink === (item.href.startsWith("#") ? item.href.substring(1) : item.href)
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <div className="h-6 w-[1px] bg-border" />
          <a
            href="https://github.com/Koamishin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-transparent">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-l border-border bg-background p-0 sm:w-[350px]">
              <div className="flex h-full flex-col p-6">
                <SheetHeader className="mb-8 flex flex-row items-center justify-between space-y-0">
                  <SheetTitle className="font-serif text-2xl font-bold">Menu</SheetTitle>
                  <SheetClose className="rounded-full bg-muted p-2 transition-colors hover:bg-primary/20 hover:text-primary">
                    <X className="h-5 w-5" />
                  </SheetClose>
                </SheetHeader>
                
                <nav className="flex flex-1 flex-col justify-center gap-8">
                  {navItems.map((item, idx) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between border-b border-border/50 pb-4 text-3xl font-light tracking-tight transition-colors hover:text-primary"
                    >
                      <span className="font-serif italic">{item.name}</span>
                      <span className="font-mono text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                        0{idx + 1}
                      </span>
                    </a>
                  ))}
                </nav>

                <div className="mt-auto flex justify-between border-t border-border pt-6">
                   <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                     Socials
                   </span>
                   <div className="flex gap-4">
                     <a href="https://github.com/Koamishin" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                       <Github className="h-5 w-5" />
                     </a>
                   </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
