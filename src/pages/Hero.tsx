import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Phone,
  ArrowRight,
  Flower,
  Heart,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Typing animation helper component
const TypingText: React.FC<{ text: string; delay?: number }> = ({
  text,
  delay = 0,
}) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const animateTyping = async () => {
        for (let i = 0; i <= text.length; i++) {
          setDisplayText(text.substring(0, i));
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
      };

      animateTyping();
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span>{displayText}</span>;
};

const Hero: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const features = [
    {
      icon: <Flower className="h-5 w-5" />,
      title: "Premium Quality",
      description:
        "Handcrafted artificial and fresh natural flowers from the Philippines",
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "Made with Love",
      description: "Each arrangement crafted with Filipino artistry and passion",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Every Occasion",
      description: "Perfect flowers for weddings, events, and special moments",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/3 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 h-48 w-48 rounded-full bg-secondary/5 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Eyebrow with animated dot */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative overflow-hidden rounded-full border border-border bg-background/80 px-5 py-2 backdrop-blur">
            <div className="flex items-center">
              <motion.span
                className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-primary"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p className="text-sm font-medium tracking-wide text-muted-foreground">
                KOAMISHIN FLOWERS
              </p>
            </div>

            {/* Subtle moving highlight effect */}
            <motion.div
              className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
              animate={{ x: [-200, 200] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Headline with animation */}
        <motion.div
          className="mx-auto mb-8 text-center md:max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h1 className="text-balance">
            <span className="block font-serif text-6xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Koamishin
              </motion.span>
              <motion.span
                className="text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 1.5 }}
              >
                .
              </motion.span>
              <motion.span
                className="font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                org
              </motion.span>
            </span>
            <motion.span
              className="mt-4 block font-sans text-lg font-light italic text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.3 }}
            >
              <TypingText
                text="Bringing Beauty to Every Occasion"
                delay={2500}
              />
            </motion.span>
          </h1>
        </motion.div>

        {/* Main description with animated highlight */}
        <motion.div
          className="mx-auto mb-12 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3 }}
        >
          <p className="mb-6 text-xl leading-relaxed text-foreground/80 md:text-2xl">
            We specialize in premium{" "}
            <motion.span
              className="font-serif font-semibold text-primary"
              whileHover={{
                scale: 1.05,
                color: "var(--primary)",
              }}
            >
              artificial
            </motion.span>{" "}
            and{" "}
            <motion.span
              className="font-serif font-semibold text-primary"
              whileHover={{
                scale: 1.05,
                color: "var(--primary)",
              }}
            >
              natural flowers
            </motion.span>{" "}
            from the Philippines, designed to{" "}
            <motion.span
              className="relative inline-block"
              whileHover={{ y: -2 }}
            >
              beautify
              <motion.span
                className="absolute bottom-0 left-0 h-[3px] w-0 bg-primary/40"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 4, ease: "easeInOut" }}
              />
            </motion.span>{" "}
            your special moments with{" "}
            <motion.span
              className="font-serif italic"
              whileHover={{ scale: 1.05 }}
            >
              Filipino artistry
            </motion.span>
            .
          </p>
          <p className="text-base text-muted-foreground">
            From wedding bouquets to home decorations, our handcrafted floral
            arrangements bring the beauty and craftsmanship of the Philippines
            to your doorstep.
          </p>
        </motion.div>

        {/* Interactive feature showcase */}
        <motion.div
          className="mx-auto mb-12 max-w-3xl overflow-hidden rounded-lg border border-border bg-card/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3.5 }}
        >
          <div className="flex border-b border-border">
            {features.map((feature, idx) => (
              <button
                key={idx}
                className={cn(
                  "flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200",
                  activeFeature === idx
                    ? "bg-background text-foreground"
                    : "text-muted-foreground hover:bg-accent/50",
                )}
                onClick={() => setActiveFeature(idx)}
              >
                <div className="flex items-center justify-center gap-2">
                  {feature.icon}
                  <span className="hidden md:inline">{feature.title}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="p-6">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4"
            >
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                {features[activeFeature].icon}
              </div>
              <div>
                <h3 className="font-medium text-foreground">
                  {features[activeFeature].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {features[activeFeature].description}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to action area with interactive buttons */}
        <motion.div
          className="flex flex-col items-center justify-center gap-5 md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 4 }}
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="group relative overflow-hidden text-base font-medium"
            >
              <motion.span
                className="absolute inset-0 bg-primary/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shop Now
              <motion.div
                className="ml-2"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              size="lg"
              className="border-border/40 bg-background/50 text-base font-medium backdrop-blur-sm"
              asChild
            >
              <a href="#contact" className="group flex items-center gap-2">
                Contact Us
                <Phone className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-[-1px]" />
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating code snippet with typing effect */}
      <motion.div
        className="absolute bottom-10 right-4 hidden -rotate-3 rounded-md border border-border bg-card/30 p-4 backdrop-blur-sm md:block"
        initial={{ opacity: 0, y: 20, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ duration: 0.6, delay: 4.5 }}
        whileHover={{
          y: -5,
          rotate: 0,
          transition: { duration: 0.2 },
        }}
      >
        <pre className="font-mono text-xs text-muted-foreground">
          <code>
            <TypingText
              text="🌸 Fresh flowers daily"
              delay={5000}
            />
          </code>
        </pre>
      </motion.div>

      {/* Visual floating badge */}
      <motion.div
        className="absolute left-8 top-36 hidden rounded-full border border-border bg-background/70 px-3 py-1.5 backdrop-blur-sm lg:block"
        initial={{ opacity: 0, y: 20, rotate: 10 }}
        animate={{ opacity: 1, y: 0, rotate: 5 }}
        transition={{ duration: 0.6, delay: 4.8 }}
        whileHover={{
          scale: 1.05,
          rotate: 0,
          transition: { duration: 0.2 },
        }}
      >
        <span className="text-xs font-medium text-foreground">
          100% Handcrafted
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
