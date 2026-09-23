import { Sprout, Users, BadgeCheck, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TrustBar() {
  const { t } = useLanguage();

  const items = [
    { icon: Sprout, label: t('trust.i1.label'), desc: t('trust.i1.desc') },
    { icon: Users, label: t('trust.i2.label'), desc: t('trust.i2.desc') },
    { icon: BadgeCheck, label: t('trust.i3.label'), desc: t('trust.i3.desc') },
    { icon: Truck, label: t('trust.i4.label'), desc: t('trust.i4.desc') },
  ];

  return (
    <section style={{
      backgroundColor: '#1e4433',
      padding: '0',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0,
      }}>
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              style={{
                padding: '32px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                borderRight: i < items.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.04)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '12px',
                backgroundColor: 'rgba(245,166,35,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={22} color="#f5a623" strokeWidth={1.8} />
              </div>
              <div>
                <div style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#fff',
                  marginBottom: '2px',
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.55)',
                }}>
                  {item.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          section > div[style*="grid-template-columns"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          section > div[style*="grid-template-columns"] > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.1) !important;
          }
        }
        @media (max-width: 480px) {
          section > div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
