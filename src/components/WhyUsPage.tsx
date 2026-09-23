import { useEffect, useRef } from 'react';
import { getQualityFeatures, getJourneySteps } from '../data';
import * as Icons from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhyUsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const qualityFeatures = getQualityFeatures(language);
  const journeySteps = getJourneySteps(language);

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
    <div ref={sectionRef} style={{ backgroundColor: '#fdf8f0', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header Section */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#f5a623',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            display: 'block',
            marginBottom: '16px',
          }}>
            {t('whyus.subtitle')}
          </span>
          <h1 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 800,
            color: '#1e4433',
            lineHeight: 1.2,
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }} dangerouslySetInnerHTML={{ __html: t('whyus.pageTitle').replace(/\*\*(.*?)\*\*/g, '<span style="font-style: italic; color: #f5a623">$1</span>') }} />
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '18px',
            color: '#5e5754',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            {t('whyus.pageDesc')}
          </p>
        </div>

        {/* Quality Promises Grid */}
        <div className="reveal reveal-delay-1" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          marginBottom: '100px'
        }}>
          {qualityFeatures.map((feature, idx) => {
            const Icon = (Icons as any)[feature.icon];
            return (
              <div key={idx} style={{
                backgroundColor: '#fff',
                padding: '40px',
                borderRadius: '24px',
                border: '1px solid rgba(26,58,42,0.08)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(26,58,42,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)';
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '100px',
                  height: '100px',
                  backgroundColor: 'rgba(245,166,35,0.05)',
                  borderRadius: '50%',
                  zIndex: 0
                }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '60px', height: '60px', borderRadius: '16px',
                    backgroundColor: '#1e4433', color: '#f5a623',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '24px'
                  }}>
                    {Icon && <Icon size={28} />}
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700, color: '#1e4433', marginBottom: '12px' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', color: '#5e5754', lineHeight: 1.7 }}>
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Journey Section */}
        <div className="reveal reveal-delay-2" style={{
          backgroundColor: '#1e4433',
          borderRadius: '32px',
          padding: '80px 40px',
          color: '#fff'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.2,
              marginBottom: '20px',
            }} dangerouslySetInnerHTML={{ __html: t('whyus.journeyTitle').replace(/\*\*(.*?)\*\*/g, '<span style="font-style: italic; color: #f5a623">$1</span>') }} />
            <p style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '16px',
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              {t('whyus.journeyDesc')}
            </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            position: 'relative'
          }}>
            {/* Connecting line (desktop only) */}
            <div style={{
              position: 'absolute',
              top: '40px',
              left: '50px',
              right: '50px',
              height: '2px',
              background: 'linear-gradient(90deg, rgba(245,166,35,0.1) 0%, rgba(245,166,35,0.5) 50%, rgba(245,166,35,0.1) 100%)',
              zIndex: 0,
            }} className="desktop-nav" />

            {journeySteps.map((step, idx) => {
              const Icon = (Icons as any)[step.icon];
              return (
                <div key={idx} style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    backgroundColor: '#1e4433',
                    border: '2px solid #f5a623',
                    color: '#f5a623',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 0 20px rgba(245,166,35,0.2)'
                  }}>
                    {Icon && <Icon size={32} />}
                  </div>
                  <div style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#f5a623',
                    marginBottom: '8px',
                    letterSpacing: '0.1em'
                  }}>
                    {t('whyus.step')} {step.id}
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}
