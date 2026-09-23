import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { getFaqs } from '../data';
import { useLanguage } from '../context/LanguageContext';

export default function FAQ() {
  const { language, t } = useLanguage();
  const faqs = getFaqs(language);
  const [open, setOpen] = useState<string | null>('f1');

  const toggle = (id: string) => setOpen(open === id ? null : id);

  return (
    <section id="faq-teaser" style={{ backgroundColor: '#f5ede0', padding: '120px 48px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
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
            {t('faq.subtitle')}
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 800,
            color: '#1e4433',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}>
            {t('faq.title1')}
            <br />
            <span style={{ fontStyle: 'italic', color: '#f5a623' }}>{t('faq.title2')}</span>
          </h2>
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.slice(0, 3).map((faq) => (
            <div
              key={faq.id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                border: open === faq.id ? '1.5px solid rgba(245,166,35,0.4)' : '1px solid rgba(26,58,42,0.07)',
                overflow: 'hidden',
                transition: 'border 0.25s ease',
                boxShadow: open === faq.id ? '0 4px 20px rgba(245,166,35,0.08)' : 'none',
              }}
            >
              <button
                onClick={() => toggle(faq.id)}
                style={{
                  width: '100%',
                  padding: '22px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1e4433',
                  lineHeight: 1.4,
                  flex: 1,
                }}>
                  {faq.question}
                </span>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: open === faq.id ? '#1e4433' : 'rgba(26,58,42,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.25s ease',
                }}>
                  {open === faq.id
                    ? <Minus size={16} color="#f5a623" />
                    : <Plus size={16} color="#1e4433" />
                  }
                </div>
              </button>

              <div style={{
                maxHeight: open === faq.id ? '300px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s ease',
              }}>
                <div style={{
                  padding: '0 28px 24px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '15px',
                  color: '#5e5754',
                  lineHeight: 1.75,
                }}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a
            href="#faq"
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
            {t('faq.viewHelp')}
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #faq-teaser {
            padding: 72px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
