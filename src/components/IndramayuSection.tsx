import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function IndramayuSection() {
  const { t } = useLanguage();

  return (
    <section
      id="indramayu"
      style={{
        position: 'relative',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('https://images.unsplash.com/photo-1549954231-5ef2deee19b3?w=1600&q=90&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(10,28,18,0.88) 0%, rgba(10,28,18,0.6) 60%, rgba(10,28,18,0.3) 100%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 48px',
          width: '100%',
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          {/* Location */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '24px',
            opacity: 0.8,
          }}>
            <MapPin size={16} color="#f5a623" />
            <span style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.8)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}>
              {t('indramayu.location')}
            </span>
          </div>

          {/* Big typography */}
          <div style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(60px, 10vw, 120px)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            marginBottom: '16px',
            textShadow: '0 4px 40px rgba(0,0,0,0.3)',
          }}>
            INDRA<span style={{ color: '#f5a623' }}>MAYU</span>
          </div>

          {/* Decorative line */}
          <div style={{
            width: '60px',
            height: '3px',
            backgroundColor: '#f5a623',
            borderRadius: '2px',
            marginBottom: '24px',
          }} />

          <div style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(22px, 3.5vw, 32px)',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 600,
            fontStyle: 'italic',
            marginBottom: '20px',
          }}>
            {t('indramayu.city')}
          </div>

          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.7,
            letterSpacing: '0.01em',
          }}>
            {t('indramayu.desc')}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #indramayu > div {
            padding: 60px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
