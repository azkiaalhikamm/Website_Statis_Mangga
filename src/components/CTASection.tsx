import { ShoppingBag } from 'lucide-react';
import { WHATSAPP_URL } from '../data';
import { useLanguage } from '../context/LanguageContext';

export default function CTASection() {
  const { t } = useLanguage();

  const scrollToProducts = () => {
    document.querySelector('#produk')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        backgroundColor: '#1e4433',
        padding: '104px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '-100px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        border: '1px solid rgba(245,166,35,0.08)',
        backgroundColor: 'rgba(245,166,35,0.03)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-80px',
        right: '-80px',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        border: '1px solid rgba(245,166,35,0.06)',
        backgroundColor: 'rgba(245,166,35,0.02)',
      }} />

      {/* Floating mango icon */}
      <div
        className="animate-float-leaf"
        style={{
          position: 'absolute',
          top: '20%',
          right: '8%',
          opacity: 0.07,
        }}
      >
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
          <path d="M50 5 C20 5, 5 30, 5 50 C5 70, 20 90, 50 95 C80 90, 95 70, 95 50 C95 30, 80 5, 50 5Z" fill="#f5a623" />
        </svg>
      </div>

      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          color: 'rgba(245,166,35,0.8)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          display: 'block',
          marginBottom: '24px',
        }}>
          {t('cta.badge')}
        </span>

        <h2 style={{
          fontFamily: 'Playfair Display, Georgia, serif',
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 800,
          color: '#fff',
          lineHeight: 1.15,
          marginBottom: '20px',
          letterSpacing: '-0.02em',
        }}>
          {t('cta.title1')}
          <br />
          <span style={{ color: '#f5a623', fontStyle: 'italic' }}>{t('cta.title2')}</span>
        </h2>

        <p style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: '17px',
          color: 'rgba(255,255,255,0.65)',
          lineHeight: 1.7,
          marginBottom: '48px',
          maxWidth: '540px',
          margin: '0 auto 48px',
        }}>
          {t('cta.desc')}
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
              padding: '18px 36px',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#ffc657';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 32px rgba(245,166,35,0.35)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#f5a623';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
            }}
          >
            <ShoppingBag size={18} />
            {t('cta.btnWa')}
          </a>
          <button
            onClick={scrollToProducts}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'transparent',
              color: '#fff',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              padding: '18px 36px',
              borderRadius: '12px',
              border: '1.5px solid rgba(255,255,255,0.25)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.6)';
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.06)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.25)';
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            }}
          >
            {t('cta.btnProducts')}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section > div:last-of-type {
            padding: 0 4px;
          }
        }
      `}</style>
    </section>
  );
}
