import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, Users, Gift, Sparkles } from "lucide-react";
// import { cn } from "@/lib/utils";

// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const quoteVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }, // Elastic ease-out
  },
};

interface PrincipleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

// Reusable Principle Card Component
const PrincipleCard: React.FC<PrincipleCardProps> = ({
  icon,
  title,
  description,
  delay,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col items-center text-center p-6 rounded-lg transition-colors duration-300 hover:bg-muted/50"
      variants={!shouldReduceMotion ? itemVariants : undefined}
      transition={{ delay: delay }}
    >
      <motion.div
        className="mb-4 rounded-full bg-primary/10 p-4 text-primary"
        whileHover={!shouldReduceMotion ? { scale: 1.1, rotate: -5 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>
      <h4 className="mb-2 font-semibold text-lg text-foreground">{title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

const Philosophy: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const principles = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaboration",
      description:
        "We thrive on community input and believe the best solutions are built together.",
      delay: 0.5,
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Passion",
      description:
        "Driven by a genuine love for coding and problem-solving within the Laravel space.",
      delay: 0.6,
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Openness",
      description:
        "Committed to sharing knowledge and tools freely, fostering an accessible ecosystem.",
      delay: 0.7,
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-36 bg-background">
      {/* Subtle background gradient similar to other sections */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute left-1/4 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-primary to-secondary blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[20rem] w-[20rem] rounded-full bg-primary/20 blur-2xl" />
      </div>

      <motion.div
        className="container mx-auto px-4 max-w-4xl"
        variants={!shouldReduceMotion ? sectionVariants : undefined}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          variants={!shouldReduceMotion ? itemVariants : undefined}
        >
          <motion.p
            className="mb-2 text-sm font-medium uppercase tracking-wider text-primary"
            whileHover={!shouldReduceMotion ? { letterSpacing: "0.1em" } : {}}
          >
            WHY WE BUILD
          </motion.p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Our Core Philosophy
          </h2>
        </motion.div>

        {/* Central Quote */}
        <motion.blockquote
          className="relative mb-16 italic text-xl lg:text-2xl xl:text-3xl text-foreground/90 leading-snug max-w-3xl mx-auto text-center text-balance"
          variants={!shouldReduceMotion ? quoteVariants : undefined}
        >
          <Quote
            className="absolute -left-4 -top-4 h-10 w-10 text-primary/30 transform -translate-x-full opacity-50 md:opacity-100"
            aria-hidden="true"
          />
          "Code is our craft, open source is our canvas. We build not just for
          functionality, but for the{" "}
          <span className="font-semibold text-primary/90">community</span> and
          the shared joy of creation."
          {/* Optional closing quote icon */}
          {/* <Quote className="absolute -right-4 -bottom-4 h-10 w-10 text-primary/30 transform translate-x-full scale-x-[-1]" aria-hidden="true" /> */}
        </motion.blockquote>

        {/* Explanatory Text */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-20"
          variants={!shouldReduceMotion ? itemVariants : undefined}
        >
          <p className="text-lg leading-relaxed text-foreground/80">
            We believe powerful software shouldn't be locked away. By sharing
            our Laravel applications and packages freely on GitHub, we aim to{" "}
            <motion.span
              className="font-medium text-foreground underline decoration-primary/50 underline-offset-4 decoration-2"
              whileHover={
                !shouldReduceMotion ? { color: "var(--primary)" } : {}
              }
            >
              lower barriers
            </motion.span>{" "}
            for developers and businesses alike. It's about{" "}
            <motion.span
              className="font-medium text-foreground underline decoration-primary/50 underline-offset-4 decoration-2"
              whileHover={
                !shouldReduceMotion ? { color: "var(--primary)" } : {}
              }
            >
              empowerment
            </motion.span>{" "}
            through accessible, high-quality tools and fostering a space for
            shared learning and growth.
          </p>
        </motion.div>

        {/* Guiding Principles Section */}
        <motion.div
          variants={!shouldReduceMotion ? itemVariants : undefined}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-semibold text-foreground tracking-tight">
            Guiding Principles
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {principles.map((principle) => (
            <PrincipleCard key={principle.title} {...principle} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Philosophy;
