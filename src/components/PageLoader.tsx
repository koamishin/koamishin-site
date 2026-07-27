import React from "react";

const PageLoaderInternal: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-75 motion-reduce:animate-none motion-reduce:opacity-100">
        <div
          className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent motion-reduce:border-primary/40 motion-reduce:animate-none"
          style={{ animation: "spin 75ms linear infinite" }}
        />
        <p
          className="text-sm text-muted-foreground animate-pulse motion-reduce:animate-none"
          style={{ animationDuration: "300ms" }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
};

export default React.memo(PageLoaderInternal);