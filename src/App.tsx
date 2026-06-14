import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Philosophy from "./pages/Philosophy";
import Contact from "./pages/Contact";
import PageFooter from "./pages/PageFooter";
import DocsHome from "./pages/DocsHome";
import DocsPage from "./pages/DocsPage";
import Team from "./pages/Team";
import { Helmet } from "react-helmet-async";
import { useEffect, useMemo } from "react";
import { useLenis } from "./hooks/use-lenis";
import LiquidEther from "@/components/LiquidEther";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SITE_URL = "https://koamishin.com";
const SITE_TITLE = "Koamishin.com - Open Source Laravel Solutions";
const SITE_DESCRIPTION =
  "Koamishin is a dynamic collective of developers committed to building high-quality, open-source Laravel applications including CMS platforms, POS systems, and business management software.";
const SITE_IMAGE = "https://koamishin.com/og-image.png";

const GlobalLiquidBackground = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const colors = useMemo(
    () => (isDark ? ["#7f4bd4", "#ff4fc3", "#8b5cf6"] : ["#6fbf96", "#38bda5", "#c8df72"]),
    [isDark]
  );

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background">
      <LiquidEther
        className="opacity-60 mix-blend-multiply saturate-150 dark:opacity-95 dark:mix-blend-screen"
        colors={colors}
        mouseForce={42}
        cursorSize={190}
        resolution={0.55}
        autoSpeed={0.55}
        autoIntensity={3.4}
        autoResumeDelay={250}
      />
      <div className="absolute inset-0 bg-background/20 pointer-events-none dark:bg-background/45" />
    </div>
  );
};

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    const id = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(id);
  }, [location.pathname]);

  return (
    <div className="relative z-10 flex flex-col min-h-screen selection:bg-primary/20 selection:text-primary">
      <Header />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <PageFooter />
    </div>
  );
};

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = "#" + location.hash.substring(1);
      setTimeout(() => {
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(target);
        } else {
          const element = document.getElementById(location.hash.substring(1));
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }
      }, 120);
    } else {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [location]);

  return (
    <>
      <Helmet>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta
          name="keywords"
          content="Laravel, Open Source, PHP, CMS, POS, Business Systems, Koamishin, Packages, Development"
        />
        <meta name="author" content="Koamishin Collective" />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={SITE_IMAGE} />
        <meta property="og:site_name" content="Koamishin.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={SITE_URL} />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={SITE_DESCRIPTION} />
        <meta name="twitter:image" content={SITE_IMAGE} />
        <html lang="en" />
      </Helmet>
      
      <Hero />
      <div id="about">
        <About />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="philosophy">
        <Philosophy />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
}

function App() {
  useLenis();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <GlobalLiquidBackground />
      <div className="relative z-10">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/team" element={<Team />} />
          </Route>

          <Route path="/docs" element={<DocsHome />} />
          <Route path="/docs/:project/:version/*" element={<DocsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
