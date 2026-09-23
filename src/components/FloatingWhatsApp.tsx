import WhatsappIcon from './icons/WhatsappIcon';
import { WHATSAPP_URL } from '../data';
import { useLanguage } from '../context/LanguageContext';

export default function FloatingWhatsApp() {
  const { t } = useLanguage();
  return (
    <>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pesan via WhatsApp"
        className="whatsapp-float"
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          zIndex: 999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: '#1e4433',
          color: '#fff',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: '14px',
          fontWeight: 700,
          padding: '14px 22px 14px 18px',
          borderRadius: '100px',
          textDecoration: 'none',
          boxShadow: '0 8px 24px rgba(30,68,51,0.2)',
          transition: 'all 0.3s ease',
          animation: 'pulse-slow 3s ease-in-out infinite',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.backgroundColor = '#f5a623';
          el.style.color = '#1e4433';
          el.style.transform = 'translateY(-3px) scale(1.02)';
          el.style.boxShadow = '0 12px 30px rgba(245,166,35,0.3)';
          el.style.animation = 'none';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.backgroundColor = '#1e4433';
          el.style.color = '#fff';
          el.style.transform = 'translateY(0) scale(1)';
          el.style.boxShadow = '0 8px 24px rgba(30,68,51,0.2)';
          el.style.animation = 'pulse-slow 3s ease-in-out infinite';
        }}
      >
        <WhatsappIcon size={20} />
        <span className="whatsapp-label">{t('floating.order')}</span>
      </a>

      <style>{`
        @media (max-width: 600px) {
          .whatsapp-float {
            bottom: 20px !important;
            right: 20px !important;
            padding: 14px !important;
            border-radius: 50% !important;
          }
          .whatsapp-label {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
