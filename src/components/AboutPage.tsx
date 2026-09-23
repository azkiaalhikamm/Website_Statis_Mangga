import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, Users } from 'lucide-react';

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
    <div ref={sectionRef} style={{ backgroundColor: '#fdf8f0', minHeight: '100vh' }}>
      
      {/* Hero Header */}
      <div style={{
        position: 'relative',
        paddingTop: '160px',
        paddingBottom: '100px',
        backgroundColor: '#1e4433',
        overflow: 'hidden',
        textAlign: 'center'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1605027990121-cbae9e0642df?w=1600&q=85&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
          mixBlendMode: 'overlay',
          zIndex: 0
        }} />
        
        <div className="reveal" style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
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
            {t('aboutPage.badge')}
          </span>
          <h1 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.1,
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}>
            {t('aboutPage.title1')} <span style={{ fontStyle: 'italic', color: '#f5a623' }}>{t('aboutPage.title2')}</span>
          </h1>
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '18px',
            color: 'rgba(255,255,255,0.85)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            {t('aboutPage.desc')}
          </p>
        </div>
      </div>

      {/* Main Story Content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 24px' }}>
        
        <div className="reveal reveal-delay-1" style={{ marginBottom: '80px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <h2 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800,
            color: '#1e4433',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}>
            {t('aboutPage.section2.title')}
          </h2>
          <div style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '18px',
            color: '#5e5754',
            lineHeight: 1.8,
          }}>
            <p style={{ marginBottom: '20px' }} dangerouslySetInnerHTML={{ __html: t('aboutPage.section2.p1').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            <p dangerouslySetInnerHTML={{ __html: t('aboutPage.section2.p2').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
          </div>
        </div>

        {/* Vision & Mission Grid */}
        <div className="reveal reveal-delay-2" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          marginBottom: '100px'
        }}>
          
          <div style={{
            backgroundColor: '#fff',
            padding: '48px',
            borderRadius: '24px',
            border: '1px solid rgba(26,58,42,0.08)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '16px',
              backgroundColor: 'rgba(245,166,35,0.1)', color: '#f5a623',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <Sprout size={32} />
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 700, color: '#1e4433', marginBottom: '16px' }}>{t('aboutPage.vision.title')}</h3>
            <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '16px', color: '#5e5754', lineHeight: 1.7 }}>
              {t('aboutPage.vision.desc')}
            </p>
          </div>

          <div style={{
            backgroundColor: '#1e4433',
            padding: '48px',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '16px',
              backgroundColor: 'rgba(255,255,255,0.1)', color: '#f5a623',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <Users size={32} />
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>{t('aboutPage.mission.title')}</h3>
            <ul style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif', 
              fontSize: '16px', 
              color: 'rgba(255,255,255,0.85)', 
              lineHeight: 1.7,
              paddingLeft: '20px',
              margin: 0
            }}>
              <li style={{ marginBottom: '8px' }}>{t('aboutPage.mission.l1')}</li>
              <li style={{ marginBottom: '8px' }}>{t('aboutPage.mission.l2')}</li>
              <li>{t('aboutPage.mission.l3')}</li>
            </ul>
          </div>
          
        </div>

        {/* Statistics Banner */}
        <div className="reveal reveal-delay-3" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: '48px',
          borderRadius: '24px',
          border: '1px solid rgba(26,58,42,0.08)',
        }}>
          <div>
            <div style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: '48px',
              fontWeight: 800,
              color: '#1e4433',
              marginBottom: '8px',
              lineHeight: 1,
            }}>
              1.250.188
            </div>
            <div style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '16px',
              color: '#5e5754',
              lineHeight: 1.5,
            }}>
              {t('aboutPage.stats.desc1')}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: '56px',
              fontWeight: 800,
              color: '#f5a623',
              marginBottom: '8px',
              lineHeight: 1,
            }}>
              100%
            </div>
            <div style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '16px',
              color: '#5e5754',
              lineHeight: 1.5,
              fontWeight: 600,
            }}>
              {t('aboutPage.stats.desc2')}
            </div>
          </div>
        </div>
        <p className="reveal reveal-delay-4" style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: '12px',
          color: '#a8a29e',
          marginTop: '16px',
          textAlign: 'center'
        }}>
          {t('aboutPage.stats.source')}
        </p>

      </div>
    </div>
  );
}
