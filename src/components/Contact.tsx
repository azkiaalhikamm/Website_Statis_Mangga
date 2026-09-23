import { MapPin, Phone, Clock } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_URL } from '../data';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div style={{ backgroundColor: '#fdf8f0', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
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
            {t('contact.subtitle')}
          </span>
          <h1 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 800,
            color: '#1e4433',
            lineHeight: 1.2,
            marginBottom: '20px',
            letterSpacing: '-0.02em',
          }} dangerouslySetInnerHTML={{ __html: t('contact.title').replace(/\*\*(.*?)\*\*/g, '<span style="font-style: italic; color: #f5a623">$1</span>') }} />
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '16px',
            color: '#5e5754',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            {t('contact.desc')}
          </p>
        </div>

        {/* Main Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          
          {/* WhatsApp */}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
            <div style={{
              backgroundColor: '#fff',
              padding: '32px',
              borderRadius: '20px',
              border: '1px solid rgba(26,58,42,0.08)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
              transition: 'all 0.3s ease',
              height: '100%',
              boxSizing: 'border-box',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.06)';
              e.currentTarget.style.borderColor = 'rgba(245,166,35,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
              e.currentTarget.style.borderColor = 'rgba(26,58,42,0.08)';
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                backgroundColor: 'rgba(37, 211, 102, 0.1)', color: '#25D366',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <Phone size={28} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#1e4433', marginBottom: '6px' }}>WhatsApp</h3>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', color: '#5e5754', marginBottom: '8px' }}>{t('contact.waDesc')}</p>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', fontWeight: 600, color: '#25D366' }}>{WHATSAPP_NUMBER}</p>
              </div>
            </div>
          </a>

          {/* Address */}
          <a href="https://maps.app.goo.gl/Y4StecZjiiQuD5nV9" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
            <div style={{
              backgroundColor: '#fff',
              padding: '32px',
              borderRadius: '20px',
              border: '1px solid rgba(26,58,42,0.08)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '20px',
              transition: 'all 0.3s ease',
              height: '100%',
              boxSizing: 'border-box',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.06)';
              e.currentTarget.style.borderColor = 'rgba(245,166,35,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
              e.currentTarget.style.borderColor = 'rgba(26,58,42,0.08)';
            }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '16px',
                backgroundColor: 'rgba(245,166,35,0.1)', color: '#f5a623',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                <MapPin size={28} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#1e4433', marginBottom: '6px' }}>{t('contact.addressTitle')}</h3>
                <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', color: '#5e5754', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: t('contact.addressDesc') }} />
              </div>
            </div>
          </a>

          {/* Working Hours */}
          <div style={{
            backgroundColor: '#1e4433',
            padding: '32px',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '20px',
            height: '100%',
            boxSizing: 'border-box',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px',
              backgroundColor: 'rgba(255,255,255,0.1)', color: '#f5a623',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Clock size={28} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{t('contact.hoursTitle')}</h3>
              <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>{t('contact.hoursDesc')}</p>
            </div>
          </div>
          
        </div>

        {/* Map Section */}
        <div style={{
          marginTop: '40px',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(26,58,42,0.08)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          height: '450px',
          width: '100%',
        }}>
          <iframe
            title="Lokasi Toko Buah Mangga Indramayu H. Syamsuri"
            src="https://maps.google.com/maps?q=Toko%20Buah%20Mangga%20Indramayu%20H.%20Syamsuri&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
