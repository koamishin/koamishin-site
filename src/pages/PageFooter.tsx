import React from 'react';
import { Github } from 'lucide-react';

const PageFooter: React.FC = () => {
  return (
    <footer className="py-12 border-t border-border/30 bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="font-serif text-base text-foreground mb-1">Koamishin Studio</p>
          <p className="font-mono text-xs text-muted-foreground uppercase tracking-[0.2em]">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>

        <a
          href="https://github.com/Koamishin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/40 bg-card/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 text-muted-foreground hover:text-foreground"
        >
          <Github className="h-5 w-5" />
          <span className="font-mono text-xs uppercase tracking-[0.2em]">GitHub</span>
        </a>
      </div>
    </footer>
  );
};

export default PageFooter;
