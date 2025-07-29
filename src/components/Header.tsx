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
} from "@/components/ui/sheet"; // Added SheetClose
import { Menu, Github, X } from "lucide-react"; // Added X for close button
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
// Define navigation items
const navItems = [
  { name: "About", href: "#about" },
  { name: "Products", href: "#products" },
  { name: "Services", href: "#services" },
  // Add more sections as needed
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Control Sheet state

  // Detect scroll position for styling
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10); // Change style slightly after scrolling 10px
  });

  // Detect active section on scroll
  useEffect(() => {
    const sections = navItems.map((item) => document.querySelector(item.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            // Adjust threshold as needed
            setActiveLink(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Trigger when section is near the vertical center
        threshold: 0.1, // Need at least 10% visible
      },
    );

    sections.forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    return () => {
      sections.forEach((sec) => {
        if (sec) observer.unobserve(sec);
      });
    };
  }, []);

  // Header animation variants
  const headerVariants = {
    top: {
      backgroundColor: "rgba(var(--background-rgb), 0.6)", // More transparent at top
      borderColor: "rgba(var(--border-rgb), 0)",
      boxShadow: "none",
    },
    scrolled: {
      backgroundColor: "rgba(var(--background-rgb), 0.85)", // Less transparent when scrolled
      borderColor: "rgba(var(--border-rgb), 0.1)",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    },
  };

  // Underline animation for nav links
  const underlineVariants = {
    hidden: { scaleX: 0, originX: 0.5 },
    visible: {
      scaleX: 1,
      originX: 0.5,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-transparent" // Use transparent base for animation
      initial="top"
      animate={isScrolled ? "scrolled" : "top"}
      variants={headerVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="container mx-auto flex h-16 items-center px-4">
        {" "}
        {/* Increased height slightly */}
        {/* Logo/Brand Name - Desktop */}
        <div className="mr-6 hidden items-center md:flex">
          <a className="flex items-center space-x-2" href="/">
            {/* Optional Logo Icon Here */}
            {/* Using styles similar to Hero */}
            <span className="font-serif text-xl font-bold tracking-tight text-foreground">
              Philippine<span className="text-primary">Flowers</span>
            </span>
          </a>
        </div>
        {/* Desktop Navigation */}
        <nav className="mr-auto hidden items-center space-x-8 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "relative py-1 transition-colors hover:text-primary",
                activeLink === item.href.substring(1) // Remove '#' for comparison
                  ? "text-primary font-semibold"
                  : "text-muted-foreground",
              )}
              aria-current={
                activeLink === item.href.substring(1) ? "page" : undefined
              }
            >
              {item.name}
              {/* Animated underline */}
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                variants={underlineVariants}
                initial="hidden"
                animate={
                  activeLink === item.href.substring(1) ? "visible" : "hidden"
                }
              />
            </a>
          ))}
        </nav>
        {/* Mobile Menu Trigger */}
        <div className="flex flex-1 items-center justify-end md:hidden">
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0">
              <SheetHeader className="border-b p-4">
                <SheetTitle className="text-left">
                  {/* Logo/Brand Name - Mobile */}
                  <a
                    className="flex items-center space-x-2"
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-serif text-lg font-bold tracking-tight text-foreground">
                      Philippine<span className="text-primary">Flowers</span>
                    </span>
                  </a>
                </SheetTitle>
                {/* Add explicit close button inside sheet */}
                <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </SheetClose>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 p-4">
                {navItems.map((item) => (
                  <SheetClose asChild key={item.name}>
                    {" "}
                    {/* Wrap link in SheetClose */}
                    <a
                      href={item.href}
                      className={cn(
                        "rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        activeLink === item.href.substring(1)
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)} // Ensure close on click
                      aria-current={
                        activeLink === item.href.substring(1)
                          ? "page"
                          : undefined
                      }
                    >
                      {item.name}
                    </a>
                  </SheetClose>
                ))}
                {/* Contact Button in Mobile Menu */}
                <SheetClose asChild>
                  <Button variant="outline" asChild className="mt-4">
                    <a
                      href="#contact"
                      className="flex w-full items-center justify-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact Us
                    </a>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        {/* Contact Button - Desktop */}
        <div className="hidden items-center space-x-2 md:flex">
          <Button variant="ghost" size="sm" asChild className="group">
            <a
              href="#contact"
              aria-label="Contact Philippine Flowers"
            >
              Contact Us
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
