import Header from "./components/Header";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Philosophy from "./pages/Philosophy";
import PageFooter from "./pages/PageFooter";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://koamishin.org";
const SITE_TITLE = "Koamishin.org - Open Source Laravel Solutions";
const SITE_DESCRIPTION =
  "Koamishin develops high-quality, open-source Laravel packages and applications like CMS, POS, and business systems to empower the developer community.";
const SITE_IMAGE = "https://koamishin.org/og-image.png"; // **IMPORTANT**: Create and upload a preview image (e.g., 1200x630px) and use its absolute URL here.
// const TWITTER_HANDLE = "@YourTwitterHandle";
function App() {
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
        {/* <meta name="twitter:site" content={TWITTER_HANDLE} /> */}{" "}
        {/* Optional */}
        {/* <meta name="twitter:creator" content={TWITTER_HANDLE} /> */}{" "}
        {/* Optional */}
        {/* --- Favicons (Optional but Recommended) --- */}
        {/* Generate favicons using a tool like https://realfavicongenerator.net/ */}
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
              <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
              <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
              <link rel="manifest" href="/site.webmanifest">
              <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"> // Use your primary color
              <meta name="msapplication-TileColor" content="#da532c"> // Use your primary color
              <meta name="theme-color" content="#ffffff"> // Default light theme color */}
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

export default App;
