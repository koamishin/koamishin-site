import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import rehypeHighlight from "rehype-highlight";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    { enforce: "pre", ...mdx({ remarkPlugins: [remarkGfm, remarkFrontmatter], rehypePlugins: [rehypeHighlight] }) },
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // This is the default
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          "gsap-vendor": ["gsap"],
          "icons-vendor": ["lucide-react"],
        },
      },
    },
  },
});
