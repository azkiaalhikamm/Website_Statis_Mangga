import { Leaf, MapPin, Phone } from 'lucide-react';
import WhatsappIcon from './icons/WhatsappIcon';

// Custom brand icon SVGs (Lucide removed brand icons)
const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
import { WHATSAPP_URL, WHATSAPP_NUMBER } from '../data';
import { useLanguage } from '../context/LanguageContext';



export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { label: t('nav.beranda'), href: '#beranda' },
    { label: t('nav.produk'), href: '#produk' },
    { label: t('nav.tentang'), href: '#tentang' },
    { label: t('nav.faq'), href: '#faq' },
    { label: 'Admin Dashboard', href: '#admin' },
  ];

  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: '#122a1f',
      color: '#fff',
      padding: '72px 48px 40px',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '64px',
          marginBottom: '64px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: 40,
                height: 40,
                backgroundColor: '#1e4433',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Leaf size={20} color="#f5a623" />
              </div>
              <div>
                <div style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontWeight: 700,
                  fontSize: '16px',
                  color: '#fff',
                  letterSpacing: '0.02em',
                }}>
                  MANGGA DERMAYU
                </div>
                <div style={{
                  fontSize: '10px',
                  color: 'rgba(245,166,35,0.8)',
                  letterSpacing: '0.12em',
                  fontWeight: 500,
                }}>
                  {t('footer.brandSubtitle')}
                </div>
              </div>
            </div>
            <p style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.75,
              marginBottom: '28px',
              maxWidth: '320px',
            }}>
              {t('footer.desc')}
            </p>

            {/* Social */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { icon: InstagramIcon, label: 'Instagram' },
                { icon: WhatsappIcon, label: 'WhatsApp', href: WHATSAPP_URL },
                { icon: FacebookIcon, label: 'Facebook' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href || '#'}
                  target={href ? '_blank' : undefined}
                  rel={href ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.6)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#f5a623';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#1e4433';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = '#f5a623';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.6)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '24px',
            }}>
              {t('footer.quickLinks')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    style={{
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.5)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#f5a623'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: '16px',
              fontWeight: 700,
              color: '#fff',
              marginBottom: '24px',
            }}>
              {t('footer.contact')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Phone size={16} color="#f5a623" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>WhatsApp</div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}
                  >
                    {WHATSAPP_NUMBER}
                  </a>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <MapPin size={16} color="#f5a623" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>{t('footer.address')}</div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: t('contact.addressDesc') }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.35)',
          }}>
            {t('footer.copyright')}
          </p>
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.35)',
          }}>
            {t('footer.tagline')}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
          footer > div > div:first-of-type > div:first-child {
            grid-column: 1 / -1 !important;
          }
        }
        @media (max-width: 480px) {
          footer > div > div:first-of-type {
            grid-template-columns: 1fr !important;
          }
          footer {
            padding: 56px 24px 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
