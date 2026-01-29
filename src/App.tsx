import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Philosophy from "./pages/Philosophy";
import PageFooter from "./pages/PageFooter";
import DocsHome from "./pages/DocsHome";
import DocsPage from "./pages/DocsPage";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://koamishin.org";
const SITE_TITLE = "Koamishin.org - Open Source Laravel Solutions";
const SITE_DESCRIPTION =
  "Koamishin develops high-quality, open-source Laravel packages and applications like CMS, POS, and business systems to empower the developer community.";
const SITE_IMAGE = "https://koamishin.org/og-image.png"; // **IMPORTANT**: Create and upload a preview image (e.g., 1200x630px) and use its absolute URL here.

function HomePage() {
  return (
    <>
      <Helmet>
        {/* --- Primary Meta Tags --- */}
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta
          name="keywords"
          content="Laravel, Open Source, PHP, CMS, POS, Business Systems, Koamishin, Packages, Development"
        />
        <meta name="author" content="Koamishin Collective" />
        <link rel="canonical" href={SITE_URL} />
        {/* --- Open Graph / Facebook --- */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={SITE_IMAGE} />
        <meta property="og:site_name" content="Koamishin.org" />
        {/* --- Twitter --- */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={SITE_URL} />
        <meta property="twitter:title" content={SITE_TITLE} />
        <meta property="twitter:description" content={SITE_DESCRIPTION} />
        <meta property="twitter:image" content={SITE_IMAGE} />
        {/* Define language */}
        <html lang="en" />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
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
        </main>
        <PageFooter />
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/docs" element={<DocsHome />} />
      <Route path="/docs/:project/:version/*" element={<DocsPage />} />
    </Routes>
  );
}

export default App;

