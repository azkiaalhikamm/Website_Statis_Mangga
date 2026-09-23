import { useEffect, useRef } from 'react';
import { Leaf, Eye, Package, Home } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Journey() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    {
      id: '01',
      title: t('journey.s1.title'),
      description: t('journey.s1.desc'),
      Icon: Leaf,
    },
    {
      id: '02',
      title: t('journey.s2.title'),
      description: t('journey.s2.desc'),
      Icon: Eye,
    },
    {
      id: '03',
      title: t('journey.s3.title'),
      description: t('journey.s3.desc'),
      Icon: Package,
    },
    {
      id: '04',
      title: t('journey.s4.title'),
      description: t('journey.s4.desc'),
      Icon: Home,
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.step-item').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).style.opacity = '1';
                (el as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: '#1e4433',
        padding: '104px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background */}
      <div style={{
        position: 'absolute',
        top: '-80px',
        right: '-80px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        backgroundColor: 'rgba(245,166,35,0.04)',
        border: '1px solid rgba(245,166,35,0.06)',
      }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#f5a623',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            display: 'block',
            marginBottom: '14px',
          }}>
            {t('journey.badge')}
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}>
            {t('journey.title1')}
            <span style={{ fontStyle: 'italic', color: '#f5a623' }}>{t('journey.title2')}</span>
          </h2>
        </div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0',
          position: 'relative',
        }}>
          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            top: '52px',
            left: '12.5%',
            right: '12.5%',
            height: '1px',
            backgroundColor: 'rgba(245,166,35,0.25)',
            zIndex: 0,
          }} />

          {steps.map((step) => {
            const Icon = step.Icon;
            return (
              <div
                key={step.id}
                className="step-item"
                style={{
                  textAlign: 'center',
                  padding: '0 24px',
                  position: 'relative',
                  zIndex: 1,
                  opacity: 0,
                  transform: 'translateY(24px)',
                  transition: 'all 0.6s ease',
                }}
              >
                {/* Icon circle */}
                <div style={{
                  width: '104px',
                  height: '104px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245,166,35,0.08)',
                  border: '1.5px solid rgba(245,166,35,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                  position: 'relative',
                }}>
                  <Icon size={32} color="#f5a623" strokeWidth={1.5} />
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#f5a623',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '11px',
                    fontWeight: 800,
                    color: '#1e4433',
                  }}>
                    {step.id}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#fff',
                  marginBottom: '12px',
                  lineHeight: 1.3,
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.7,
                }}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section[style*="1a3a2a"] > div > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 40px !important;
          }
          section[style*="1a3a2a"] > div > div:last-child > div[style*="position: absolute"] {
            display: none !important;
          }
          section[style*="1a3a2a"] {
            padding: 72px 24px !important;
          }
        }
        @media (max-width: 480px) {
          section[style*="1a3a2a"] > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
