import { WHATSAPP_URL } from '../data';
import { useLanguage } from '../context/LanguageContext';

export default function Farmer() {
  const { t } = useLanguage();

  return (
    <section
      id="kenapa-kami"
      style={{
        backgroundColor: '#fdfbf7', // Consistent clean background
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '100px',
          alignItems: 'center',
        }}>
          {/* Text Content */}
          <div style={{ order: 1 }} className="farmer-text-content">
            <span style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#f5a623',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              display: 'block',
              marginBottom: '16px',
            }}>
              {t('farmer.badge')}
            </span>

            <h2 style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(36px, 4vw, 56px)',
              fontWeight: 700,
              color: '#1e4433',
              lineHeight: 1.15,
              marginBottom: '24px',
              letterSpacing: '-0.01em',
            }}>
              {t('farmer.title1')} <br />
              <span style={{ fontStyle: 'italic', fontWeight: 500, color: '#2e6047' }}>{t('farmer.title2')}</span>
            </h2>

            <div style={{ 
              width: '64px', 
              height: '3px', 
              backgroundColor: '#f5a623', 
              borderRadius: '2px',
              marginBottom: '32px' 
            }} />

            <p style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '16px',
              color: '#5e5754',
              lineHeight: 1.7,
              marginBottom: '20px',
            }}>
              {t('farmer.p1.1')}<strong style={{ color: '#1e4433', fontWeight: 600 }}>{t('farmer.p1.strong')}</strong>{t('farmer.p1.2')}
            </p>

            <p style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '16px',
              color: '#5e5754',
              lineHeight: 1.7,
              marginBottom: '48px',
            }}>
              {t('farmer.p2')}
            </p>

            <div style={{ display: 'flex' }}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: '#1e4433',
                  color: '#fff',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  padding: '16px 36px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 20px rgba(30, 68, 51, 0.15)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#2e6047';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 24px rgba(30, 68, 51, 0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1e4433';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 20px rgba(30, 68, 51, 0.15)';
                }}
              >
                {t('farmer.btn')}
              </a>
            </div>
          </div>

          {/* Image Content */}
          <div style={{ order: 2, position: 'relative' }} className="farmer-image-content">
            <div style={{ 
              borderRadius: '16px', 
              overflow: 'hidden', 
              aspectRatio: '4/5',
              boxShadow: '0 24px 48px rgba(0, 0, 0, 0.08)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1605027628030-9bb6f83535e6?w=1000&q=85&fit=crop"
                alt={t('farmer.imgAlt')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
                }}
              />
            </div>

            {/* Editorial Quote Card */}
            <div className="farmer-quote-card" style={{
              position: 'absolute',
              bottom: '40px',
              left: '-48px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)',
              borderRadius: '12px',
              padding: '32px',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.06)',
              maxWidth: '320px',
              border: '1px solid rgba(255, 255, 255, 0.8)',
            }}>
              <div style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '48px',
                color: '#f5a623',
                lineHeight: 0.5,
                marginBottom: '16px',
                opacity: 0.8,
              }}>
                "
              </div>
              <p style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '17px',
                color: '#1e4433',
                lineHeight: 1.6,
                fontStyle: 'italic',
                marginBottom: '16px',
              }}>
                {t('farmer.quote')}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ width: '24px', height: '1px', backgroundColor: '#f5a623' }}></div>
                <div style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: '#5e5754',
                  textTransform: 'uppercase',
                }}>
                  {t('farmer.quoteAuthor')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #kenapa-kami > div > div {
            gap: 40px !important;
          }
          .farmer-quote-card {
            left: -24px !important;
            padding: 24px !important;
            maxWidth: 280px !important;
          }
        }
        @media (max-width: 768px) {
          #kenapa-kami > div > div {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
          }
          .farmer-text-content {
            order: 2 !important;
          }
          .farmer-image-content {
            order: 1 !important;
          }
          #kenapa-kami {
            padding: 80px 20px !important;
          }
          .farmer-quote-card {
            bottom: -24px !important;
            left: 24px !important;
            right: 24px !important;
            maxWidth: none !important;
            width: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
