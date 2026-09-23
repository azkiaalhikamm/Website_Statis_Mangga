import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="tentang"
      ref={sectionRef}
      style={{
        backgroundColor: '#fdf8f0',
        padding: '120px 48px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '4.5fr 7.5fr',
          gap: '100px',
          alignItems: 'center',
        }}>
          {/* Left: Image */}
          <div className="reveal" style={{ position: 'relative', paddingRight: '20px' }}>
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              aspectRatio: '3/4',
              position: 'relative',
              boxShadow: '0 24px 50px rgba(30, 68, 51, 0.15)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=800&q=85&fit=crop"
                alt="Kebun mangga Indramayu yang hijau dan subur"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                }}
              />
            </div>

            {/* Decorative element */}
            <div style={{
              position: 'absolute',
              bottom: '-24px',
              right: '-24px',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              backgroundColor: 'rgba(245,166,35,0.08)',
              border: '2px solid rgba(245,166,35,0.15)',
              zIndex: -1,
            }} />
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '-20px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(26,58,42,0.06)',
              border: '2px solid rgba(26,58,42,0.1)',
              zIndex: -1,
            }} />
          </div>

          {/* Right: Story */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ height: '2px', width: '40px', backgroundColor: '#f5a623' }} />
              <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: '#f5a623', letterSpacing: '0.1em', fontSize: '13px', textTransform: 'uppercase' }}>
                {t('about.title')}
              </span>
            </div>
            
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px, 4vw, 42px)',
              fontWeight: 800,
              color: '#1e4433',
              lineHeight: 1.15,
              marginBottom: '24px'
            }}>
              {t('about.subtitle')}
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: '#44403c', fontSize: '16px', lineHeight: 1.7, opacity: 0.9 }}>
                {t('about.desc1')}
              </p>
            </div>
            
            <a
              href="#tentang"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                fontWeight: 600,
                color: '#1e4433',
                textDecoration: 'none',
                paddingBottom: '4px',
                borderBottom: '2px solid #f5a623',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#f5a623';
                e.currentTarget.style.gap = '12px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#1e4433';
                e.currentTarget.style.gap = '8px';
              }}
            >
              {t('ui.readMore')} <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #tentang > div > div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          #tentang {
            padding: 72px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
