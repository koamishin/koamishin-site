import React from "react";
// import { Button } from "@/components/ui/button"; // Still use Button for structure if needed
import { Github } from "lucide-react";

const PageFooter: React.FC = () => {
  return (
    <footer className="py-10 border-t border-border/20 bg-background">
      {" "}
      {/* Subtle border */}
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-5">
        <p className="font-sans text-sm text-muted-foreground text-center sm:text-left">
          &copy; {new Date().getFullYear()} Koamishin.org - Open Source Laravel
          Projects.
        </p>
        {/* Use a simple link style instead of a button for minimalism */}
        <a
          href="https://github.com/Koamishin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="mr-1.5 h-4 w-4" /> GitHub
        </a>
      </div>
    </footer>
  );
};

export default PageFooter;
