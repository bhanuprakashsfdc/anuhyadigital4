import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const PortfolioDetail = lazy(() => import('./pages/PortfolioDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const LoadingFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-label="Loading page">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    <span className="sr-only">Loading...</span>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ErrorBoundary>
          <Layout>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<PortfolioDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </ErrorBoundary>
      </Router>
    </HelmetProvider>
  );
}

export default App;
