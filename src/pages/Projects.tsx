import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  ArrowUpRight,
  BookOpen, // Icon for Documentation
  Gamepad2,
  GraduationCap,
  Package,
  CheckCircle, // Icon for features
  Layers, // Icon for Tech Stack
} from "lucide-react";
import { cn } from "@/lib/utils";

// Expanded Interface for more project details
interface Project {
  icon: React.ReactNode;
  title: string;
  status?: "Work in progress" | "Archived" | "Active";
  shortDescription: string; // Concise summary
  longDescription: string; // More detailed explanation
  features: string[]; // Key features list
  techStack: string[]; // Core technologies used
  repoUrl: string;
  docsUrl?: string; // Optional documentation link
}

// Updated project data with more details
const projectsData: Project[] = [
  {
    icon: <Gamepad2 className="h-12 w-12 text-primary" />,
    title: "GamifiedPortal",
    status: "Active",
    shortDescription: "An engaging gamified portal platform based on GLPv3.",
    longDescription:
      "GamifiedPortal is a modern fork of the GLPv3 platform, refactored and enhanced with contemporary web technologies. It aims to provide an interactive and motivating environment for users through gamification mechanics, built on a robust Laravel backend.",
    features: [
      "User Authentication & Profiles",
      "Gamification Elements (Points, Badges - Planned)",
      "Modular Architecture",
      "Blade Templating with Vite",
    ],
    techStack: [
      "PHP",
      "Laravel",
      "Blade",
      "JavaScript",
      "Tailwind CSS",
      "Vite",
    ],
    repoUrl: "https://github.com/koamishin/GamifiedPortal",
    // docsUrl: "/docs/gamified-portal", // Example docs link
  },
  {
    icon: <GraduationCap className="h-12 w-12 text-primary" />,
    title: "FilaGrade",
    status: "Work in progress",
    shortDescription: "Teacher workflow optimization platform using Filament.",
    longDescription:
      "FilaGrade leverages the power of Laravel and the Filament admin panel builder to streamline administrative tasks for educators. This capstone project focuses on simplifying grading, lesson planning, and communication to enhance instructional efficiency.",
    features: [
      "AI-Driven Lesson Planning (Planned)",
      "Automated Grading Assistance (Planned)",
      "Parent Engagement Hub (Planned)",
      "Secure Role-Based Access Control",
    ],
    techStack: [
      "PHP",
      "Laravel",
      "Filament",
      "Blade",
      "Tailwind CSS",
      "Livewire",
    ],
    repoUrl: "https://github.com/koamishin/FilaGrade",
  },
  {
    icon: <Package className="h-12 w-12 text-primary" />,
    title: "Business Suite Core",
    status: "Active",
    shortDescription: "Core modules for custom business management apps.",
    longDescription:
      "A foundational set of Laravel packages designed to accelerate the development of custom business applications. Provides common functionalities like user management, settings, and basic CRM components, allowing developers to focus on unique business logic.",
    features: [
      "Modular & Extendable Design",
      "User Roles & Permissions",
      "Basic Settings Management",
      "Community Driven",
    ],
    techStack: ["PHP", "Laravel", "Composer"],
    repoUrl: "https://github.com/Koamishin/business-suite-core", // Placeholder URL
  },
];

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Projects: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-24 md:py-36">
      {/* Consistent background */}
      <div className="absolute inset-0 -z-10 bg-muted/30">
        {/* Add subtle background elements if desired, similar to About */}
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          variants={!shouldReduceMotion ? sectionVariants : undefined}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Our Open Source Work
          </h2>
          <p className="mt-6 text-lg leading-8 text-foreground/80">
            Discover the tools and applications we're building to empower
            developers and streamline workflows within the Laravel ecosystem.
          </p>
        </motion.div>

        {/* Alternating Project Blocks */}
        <div className="space-y-20 md:space-y-28">
          {projectsData.map((project, index) => (
            <motion.article
              key={project.title}
              className={cn(
                "flex flex-col gap-10 md:gap-16 lg:items-center",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse", // Alternating layout
              )}
              variants={!shouldReduceMotion ? itemVariants : undefined}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% visible
            >
              {/* Visual Column (Icon) */}
              <motion.div
                className="flex flex-shrink-0 justify-center md:w-1/3"
                whileHover={
                  !shouldReduceMotion ? { scale: 1.05, rotate: 2 } : {}
                }
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="rounded-full bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8 shadow-lg ring-1 ring-border/10">
                  {project.icon}
                </div>
              </motion.div>

              {/* Textual Content Column */}
              <div className="md:w-2/3">
                {project.status && (
                  <Badge
                    variant={
                      project.status === "Work in progress"
                        ? "secondary"
                        : "outline"
                    }
                    className="mb-3 capitalize"
                  >
                    {project.status}
                  </Badge>
                )}
                <h3 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-4 text-lg text-foreground/80">
                  {project.longDescription}
                </p>

                {/* Key Features */}
                <div className="mt-6">
                  <h4 className="mb-3 flex items-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    Key Features
                  </h4>
                  <ul className="space-y-2 text-foreground/90">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mt-6">
                  <h4 className="mb-3 flex items-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    <Layers className="mr-2 h-4 w-4 text-primary" />
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="font-mono text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild className="group" size="lg">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                      className="inline-flex items-center"
                    >
                      <Github className="mr-2 h-5 w-5" /> GitHub Repo
                      <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </Button>
                  {project.docsUrl && (
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                      className="group"
                    >
                      <a
                        href={project.docsUrl}
                        // target="_blank" // Open in same tab if it's internal docs
                        // rel="noopener noreferrer"
                        aria-label={`View documentation for ${project.title}`}
                        className="inline-flex items-center"
                      >
                        <BookOpen className="mr-2 h-5 w-5" /> Documentation
                        <ArrowUpRight className="ml-1 h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="mb-4 text-lg text-muted-foreground">
            Want to see more or contribute?
          </p>
          <Button
            variant="ghost"
            asChild
            className="group text-lg text-primary hover:text-primary"
          >
            <a
              href="https://github.com/Koamishin"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore all our repositories on GitHub
              <Github className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
