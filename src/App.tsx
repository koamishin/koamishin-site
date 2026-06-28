import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Philosophy from "./pages/Philosophy";
import Contact from "./pages/Contact";
import PageFooter from "./pages/PageFooter";
import PageLoader from "./components/PageLoader";
import { Helmet } from "react-helmet-async";
import { useEffect, useMemo, lazy, Suspense } from "react";
import React from "react";
import { useLenis } from "./hooks/use-lenis";
import LiquidEther from "@/components/LiquidEther";
import { useTheme } from "next-themes";
import { detectLowEndDevice } from "@/lib/performance";
import { ScrollTrigger } from "@/lib/gsap";

// Lazy load pages for code splitting
const DocsHome = lazy(() => import("./pages/DocsHome"));
const DocsPage = lazy(() => import("./pages/DocsPage"));
const EnterpriseProjects = lazy(() => import("./pages/EnterpriseProjects"));
const Team = lazy(() => import("./pages/Team"));

const SITE_URL = "https://koamishin.com";
const SITE_TITLE = "Koamishin.com - Open Source Laravel Solutions";
const SITE_DESCRIPTION =
  "Koamishin is a dynamic collective of developers committed to building high-quality, open-source Laravel applications including CMS platforms, POS systems, and business management software.";
const SITE_IMAGE = "https://koamishin.com/og-image.png";

const GlobalLiquidBackground = React.memo(() => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [isVisible, setIsVisible] = React.useState(true);
  const metrics = detectLowEndDevice();

  // Intersection Observer to pause when not visible
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    const element = document.getElementById('liquid-background');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const colors = useMemo(
    () => (isDark ? ["#7f4bd4", "#ff4fc3", "#8b5cf6"] : ["#6fbf96", "#38bda5", "#c8df72"]),
    [isDark]
  );

  // Disable background on low-end devices or when not visible
  if (metrics.isLowEnd || !isVisible) {
    return (
      <div id="liquid-background" className="fixed inset-0 z-0 overflow-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
      </div>
    );
  }

  return (
    <div id="liquid-background" className="fixed inset-0 z-0 overflow-hidden bg-background">
      <LiquidEther
        className="opacity-60 mix-blend-multiply saturate-150 dark:opacity-95 dark:mix-blend-screen"
        colors={colors}
        mouseForce={42}
        cursorSize={190}
        resolution={0.35} // Lower resolution for better performance
        autoSpeed={0.35} // Slower auto animation
        autoIntensity={2.0} // Lower intensity
        autoResumeDelay={500} // Longer delay before resume
        dt={0.02} // Larger time step for fewer calculations
      />
      <div className="absolute inset-0 bg-background/20 pointer-events-none dark:bg-background/45" />
    </div>
  );
});

const MainLayout = React.memo(() => {
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
});

const HomePage = React.memo(function HomePage() {
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
});

function App() {
  useLenis();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <GlobalLiquidBackground />
      <div className="relative z-10">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/enterprise-projects"
              element={
                <Suspense fallback={<PageLoader />}>
                  <EnterpriseProjects />
                </Suspense>
              }
            />
            <Route
              path="/team"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Team />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="/docs"
            element={
              <Suspense fallback={<PageLoader />}>
                <DocsHome />
              </Suspense>
            }
          />
          <Route
            path="/docs/:project/:version/*"
            element={
              <Suspense fallback={<PageLoader />}>
                <DocsPage />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
