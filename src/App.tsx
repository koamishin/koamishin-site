import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Philosophy from "./pages/Philosophy";
import PageFooter from "./pages/PageFooter";
import DocsHome from "./pages/DocsHome";
import DocsPage from "./pages/DocsPage";
import Team from "./pages/Team";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

const SITE_URL = "https://koamishin.com";
const SITE_TITLE = "Koamishin.com - Open Source Laravel Solutions";
const SITE_DESCRIPTION =
  "Koamishin is a dynamic collective of developers committed to building high-quality, open-source Laravel applications including CMS platforms, POS systems, and business management software.";
const SITE_IMAGE = "https://koamishin.com/og-image.png";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
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
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
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
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/team" element={<Team />} />
      </Route>

      <Route path="/docs" element={<DocsHome />} />
      <Route path="/docs/:project/:version/*" element={<DocsPage />} />
    </Routes>
  );
}

export default App;
