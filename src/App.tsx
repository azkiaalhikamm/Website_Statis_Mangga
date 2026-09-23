import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import About from './components/About';
import Products from './components/Products';
import Farmer from './components/Farmer';
import QualityPromise from './components/QualityPromise';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AboutPage from './components/AboutPage';
import ProductsPage from './components/ProductsPage';
import WhyUsPage from './components/WhyUsPage';
import FAQPage from './components/FAQPage';
import Contact from './components/Contact';
import AdminDashboard from './components/Admin/AdminDashboard';
import { useState, useEffect } from 'react';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPath(window.location.hash);
      // Scroll to top on any page switch
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderContent = () => {
    switch (currentPath) {
      case '#admin':
        return <AdminDashboard />;
      case '#kontak':
        return <Contact />;
      case '#tentang':
        return <AboutPage />;
      case '#produk':
        return <ProductsPage />;
      case '#kenapa-kami':
        return <WhyUsPage />;
      case '#faq':
        return <FAQPage />;
      default:
        return (
          <>
            <Hero />
            <TrustBar />
            <About />
            <Products />
            <Farmer />
            <QualityPromise />
            <Testimonials />
            <FAQ />
            <CTASection />
          </>
        );
    }
  };

  const isAdminRoute = currentPath === '#admin';

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main>
        {renderContent()}
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingWhatsApp />}
    </>
  );
}

export default App;
