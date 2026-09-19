import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import TopBar from "./components/TopBar.jsx";
const Home = lazy(() => import("./pages/Home.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
// const ServiceDetail = lazy(() => import("./pages/ServiceDetail.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
// const Solutions = lazy(() => import("./pages/Solutions.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
// const Blog = lazy(() => import("./pages/Blog.jsx"));
// const BlogPost = lazy(() => import("./pages/BlogPost.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <TopBar />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="container-page py-32 text-center text-navy-300">
              Loading…
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            {/* <Route path="/services/:slug" element={<ServiceDetail />} /> */}
            <Route path="/about" element={<About />} />
            {/* <Route path="/solutions" element={<Solutions />} /> */}
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
