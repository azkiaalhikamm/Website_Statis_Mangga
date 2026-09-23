import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { WHATSAPP_URL } from '../data';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const delay = (el: HTMLElement | null, ms: number) => {
      if (!el) return;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, ms);
    };
    delay(badgeRef.current, 300);
    delay(headlineRef.current, 500);
    delay(subRef.current, 700);
    delay(textRef.current, 900);
    delay(ctaRef.current, 1100);
  }, []);


  return (
    <section
      id="beranda"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#122a1f',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=1600&q=90&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'zoomIn 8s ease-out forwards',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(105deg, rgba(10,28,18,0.82) 0%, rgba(15,35,25,0.65) 50%, rgba(10,28,18,0.45) 100%)',
        }}
      />

      {/* Decorative floating leaves */}
      <div
        className="animate-float-leaf"
        style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          opacity: 0.15,
          zIndex: 2,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
          <path d="M50 5 C20 5, 5 30, 5 50 C5 70, 20 90, 50 95 C80 90, 95 70, 95 50 C95 30, 80 5, 50 5Z" fill="#4a7c5f" opacity="0.6" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="#2d5a42" strokeWidth="1.5" opacity="0.4" />
        </svg>
      </div>
      <div
        className="animate-float-leaf"
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          opacity: 0.1,
          zIndex: 2,
          animationDelay: '-3s',
        }}
      >
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
          <path d="M50 5 C20 5, 5 30, 5 50 C5 70, 20 90, 50 95 C80 90, 95 70, 95 50 C95 30, 80 5, 50 5Z" fill="#f5a623" opacity="0.5" />
        </svg>
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '120px 48px 80px',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '680px' }}>


          {/* Headline */}
          <div
            ref={headlineRef}
            style={{
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'all 0.7s ease',
              marginBottom: '20px',
            }}
          >
            <h1
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 'clamp(44px, 6vw, 80px)',
                fontWeight: 800,
                color: '#fff',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
              dangerouslySetInnerHTML={{ __html: t('hero.title').replace(/\*\*(.*?)\*\*/g, '<span style="color: #f5a623; font-style: italic">$1</span>') }}
            />
          </div>

          {/* Subheadline */}
          <div
            ref={subRef}
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 0.6s ease',
              marginBottom: '40px',
            }}
          >
            <p style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: 'clamp(18px, 2.5vw, 22px)',
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 500,
              lineHeight: 1.4,
            }}>
              {t('hero.subtitle')}
            </p>
          </div>



          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'all 0.6s ease',
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#f5a623',
                color: '#1e4433',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '15px',
                fontWeight: 700,
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#ffc657';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(245,166,35,0.4)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#f5a623';
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
              }}
            >
              {t('nav.pesan')}
            </a>
            <a
              href="#produk"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: 'transparent',
                color: '#fff',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontSize: '15px',
                fontWeight: 600,
                padding: '16px 32px',
                borderRadius: '12px',
                border: '1.5px solid rgba(255,255,255,0.35)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.7)';
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.35)';
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
              }}
            >
              {t('hero.cta')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#produk"
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: 0.6,
          animation: 'fadeIn 1s ease 2s forwards',
          cursor: 'pointer',
          textDecoration: 'none',
        }}
      >
        <span style={{ fontSize: '11px', color: '#fff', letterSpacing: '0.1em', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>SCROLL</span>
        <ChevronDown size={18} color="#fff" style={{ animation: 'floatLeaf 2s ease-in-out infinite' }} />
      </a>

      <style>{`
        @media (max-width: 768px) {
          #beranda > div:last-of-type {
            padding: 100px 24px 60px !important;
          }
        }
      `}</style>
    </section>
  );
}
