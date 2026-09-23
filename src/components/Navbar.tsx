import { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { WHATSAPP_URL } from '../data';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { useSupabaseData } from '../hooks/useSupabaseData';

const getNavLinks = (t: (key: string) => string) => [
  { label: t('nav.beranda'), href: '#beranda' },
  { label: t('nav.tentang'), href: '#tentang' },
  { label: t('nav.produk'), href: '#produk' },
  { label: t('nav.kenapa'), href: '#kenapa-kami' },
  { label: t('nav.faq'), href: '#faq' },
  { label: t('nav.kontak'), href: '#kontak' },
];
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.hash);
  const { t } = useLanguage();
  const navLinks = getNavLinks(t);
  const { settings } = useSupabaseData();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    const handleHashChange = () => setCurrentPath(window.location.hash);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Halaman yang memiliki background gelap di bagian paling atas (hero)
  const isDarkHeroPage = currentPath === '' || currentPath === '#beranda' || currentPath === '#tentang';
  const forceDarkText = isScrolled || !isDarkHeroPage;

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Wrapper for fixed positioning */}
      <div
        style={{
          position: 'fixed',
          top: isScrolled ? '16px' : '0',
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none', // Allow clicking through the empty space around the pill
        }}
      >
        <nav
          style={{
            width: isScrolled ? 'calc(100% - 32px)' : '100%',
            maxWidth: '1280px',
            pointerEvents: 'auto', // Re-enable pointer events for the actual nav
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: isScrolled ? 'rgba(253, 248, 240, 0.92)' : 'transparent',
            backdropFilter: isScrolled ? 'blur(16px) saturate(180%)' : 'none',
            border: isScrolled ? '1px solid rgba(26,58,42,0.08)' : '1px solid transparent',
            borderRadius: isScrolled ? '100px' : '0px',
            boxShadow: isScrolled ? '0 10px 40px rgba(0, 0, 0, 0.08)' : 'none',
            padding: isScrolled ? '10px 24px' : '24px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="#beranda"
            onClick={handleNavClick}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
          >
            {settings.site_logo_url ? (
              <img 
                src={settings.site_logo_url} 
                alt="Site Logo" 
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  objectFit: 'cover',
                  boxShadow: '0 4px 10px rgba(30, 68, 51, 0.15)',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            ) : (
              <div style={{
                width: 40,
                height: 40,
                backgroundColor: '#1e4433',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 10px rgba(30, 68, 51, 0.15)',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Leaf size={22} color="#f5a623" strokeWidth={2.5} />
              </div>
            )}
            <div>
              <div style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontWeight: 800,
                fontSize: '17px',
                color: forceDarkText ? '#1e4433' : '#fff',
                lineHeight: 1.1,
                letterSpacing: '0.03em',
                transition: 'color 0.4s ease',
              }}>
                {settings.site_title}
              </div>
              <div style={{
                fontSize: '10px',
                color: forceDarkText ? '#f5a623' : 'rgba(245,166,35,0.9)',
                letterSpacing: '0.15em',
                fontWeight: 600,
                transition: 'color 0.4s ease',
                textTransform: 'uppercase'
              }}>
                {t('footer.brandSubtitle')}
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul style={{ display: 'flex', alignItems: 'center', gap: '8px', listStyle: 'none', margin: 0, padding: 0 }} className="desktop-nav">
            {navLinks.map((link) => {
              const isActive = currentPath === link.href || (currentPath === '' && link.href === '#beranda');
              return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '14.5px',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#f5a623' : (forceDarkText ? '#4b4643' : 'rgba(255,255,255,0.9)'),
                    textDecoration: 'none',
                    padding: '8px 12px',
                    transition: 'color 0.3s ease',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color = forceDarkText ? '#1e4433' : '#fff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color = forceDarkText ? '#4b4643' : 'rgba(255,255,255,0.9)';
                    }
                  }}
                >
                  {link.label}
                </a>
              </li>
            )})}
          </ul>

          {/* CTA + Mobile Burger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <LanguageSwitcher forceDarkText={forceDarkText} />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn desktop-nav"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '14px',
                fontWeight: 700,
                backgroundColor: '#1e4433',
                color: '#fff',
                padding: '11px 26px',
                borderRadius: '100px', // Pill shape
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-block',
                letterSpacing: '0.02em',
                boxShadow: '0 4px 14px rgba(30, 68, 51, 0.2)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#f5a623';
                (e.currentTarget as HTMLAnchorElement).style.color = '#1e4433';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 20px rgba(245, 166, 35, 0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1e4433';
                (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 14px rgba(30, 68, 51, 0.2)';
              }}
            >
              {t('nav.pesan')}
            </a>

            {/* Hamburger */}
            <button
              className="mobile-burger"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: forceDarkText ? '#1e4433' : '#fff',
                borderRadius: '8px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.3s ease',
              }}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          style={{
            width: isScrolled ? 'calc(100% - 32px)' : '100%',
            maxWidth: '1280px',
            pointerEvents: 'auto',
            overflow: 'hidden',
            maxHeight: mobileOpen ? '500px' : '0',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            backgroundColor: 'rgba(253, 248, 240, 0.98)',
            backdropFilter: 'blur(16px)',
            borderTop: mobileOpen ? '1px solid rgba(26,58,42,0.06)' : 'none',
            border: mobileOpen && isScrolled ? '1px solid rgba(26,58,42,0.08)' : 'none',
            borderRadius: isScrolled ? '24px' : '0px',
            boxShadow: mobileOpen ? '0 10px 30px rgba(0,0,0,0.08)' : 'none',
            marginTop: isScrolled ? '8px' : '0px',
          }}
          className="mobile-menu"
        >
          <div style={{ padding: '20px 24px 32px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navLinks.map((link) => {
              const isActive = currentPath === link.href || (currentPath === '' && link.href === '#beranda');
              return (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '15px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#1e4433' : '#5e5754',
                  backgroundColor: isActive ? 'rgba(245,166,35,0.15)' : 'transparent',
                  textDecoration: 'none',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                  display: 'block',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(26,58,42,0.04)';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#1e4433';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#5e5754';
                  }
                }}
              >
                {link.label}
              </a>
            )})}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '15px',
                fontWeight: 700,
                backgroundColor: '#1e4433',
                color: '#fff',
                padding: '16px',
                borderRadius: '100px',
                textDecoration: 'none',
                marginTop: '16px',
                textAlign: 'center',
                display: 'block',
                boxShadow: '0 4px 15px rgba(30, 68, 51, 0.2)',
              }}
            >
              {t('nav.pesan')}
            </a>
          </div>
        </div>
      </div>

      <style>{`
        /* Desktop Nav Link Animation */
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2.5px;
          bottom: 2px;
          left: 50%;
          background-color: #f5a623;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-50%);
          border-radius: 2px;
          opacity: 0;
        }
        .nav-link:hover::after, .nav-link.active::after {
          width: 20px;
          opacity: 1;
        }
        .nav-link.active::after {
          background-color: #f5a623;
        }
        
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-burger { display: flex !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  );
}
