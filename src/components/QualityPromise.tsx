import { Leaf, ShieldCheck, Package, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function QualityPromise() {
  const { t } = useLanguage();

  const features = [
    {
      Icon: Leaf,
      title: t('whyus.f1.title'),
      desc: t('whyus.f1.desc'),
    },
    {
      Icon: ShieldCheck,
      title: t('whyus.f2.title'),
      desc: t('whyus.f2.desc'),
    },
    {
      Icon: Package,
      title: t('whyus.f3.title'),
      desc: t('whyus.f3.desc'),
    },
    {
      Icon: Zap,
      title: t('whyus.f4.title'),
      desc: t('whyus.f4.desc'),
    },
  ];
  return (
    <section id="kenapa-kami-teaser" style={{ backgroundColor: '#fdfbf7', padding: '120px 24px', borderTop: '1px solid rgba(30, 68, 51, 0.05)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
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
            {t('whyus.commitment')}
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(32px, 4vw, 44px)',
            fontWeight: 700,
            color: '#1e4433',
            lineHeight: 1.2,
            maxWidth: '700px',
            margin: '0 auto',
            letterSpacing: '-0.01em',
          }}>
            {t('whyus.commitmentTitle1')} <br />
            <span style={{ fontStyle: 'italic', fontWeight: 500, color: '#2e6047' }}>{t('whyus.commitmentTitle2')}</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="feature-grid">
          {features.map((feature, i) => {
            const Icon = feature.Icon;
            return (
              <div
                key={i}
                className="feature-card"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '40px 32px',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  border: '1px solid rgba(30, 68, 51, 0.06)',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget as HTMLDivElement;
                  card.style.transform = 'translateY(-8px)';
                  card.style.boxShadow = '0 20px 40px rgba(30, 68, 51, 0.08)';
                  card.style.borderColor = 'rgba(245, 166, 35, 0.4)';
                  
                  const iconBg = card.querySelector('[data-icon-bg]') as HTMLElement;
                  if (iconBg) {
                    iconBg.style.backgroundColor = '#f5a623';
                    iconBg.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget as HTMLDivElement;
                  card.style.transform = 'translateY(0)';
                  card.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.02)';
                  card.style.borderColor = 'rgba(30, 68, 51, 0.06)';
                  
                  const iconBg = card.querySelector('[data-icon-bg]') as HTMLElement;
                  if (iconBg) {
                    iconBg.style.backgroundColor = 'rgba(245, 166, 35, 0.1)';
                    iconBg.style.color = '#f5a623';
                  }
                }}
              >
                <div
                  data-icon-bg
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(245, 166, 35, 0.1)',
                    color: '#f5a623',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '24px',
                    transition: 'all 0.4s ease',
                  }}
                >
                  <Icon size={24} strokeWidth={2} color="currentColor" />
                </div>
                <h3
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#1e4433',
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '15px',
                    color: '#5e5754',
                    lineHeight: 1.6,
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <a
            href="#kenapa-kami"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 36px',
              backgroundColor: '#1e4433',
              color: '#fff',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 700,
              fontSize: '15px',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              border: '1.5px solid transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#1e4433';
              e.currentTarget.style.borderColor = '#1e4433';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1e4433';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'transparent';
            }}
          >
            {t('whyus.viewPromise')}
          </a>
        </div>
      </div>

      <style>{`
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .feature-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .feature-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 32px;
            margin-left: -24px;
            margin-right: -24px;
            padding-left: 24px;
            padding-right: 24px;
            gap: 16px;
            /* Hide scrollbar for Chrome, Safari and Opera */
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none;  /* IE and Edge */
          }
          
          .feature-grid::-webkit-scrollbar {
            display: none;
          }

          .feature-card {
            flex: 0 0 80%;
            scroll-snap-align: center;
          }

          #kenapa-kami-teaser {
            padding: 80px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
