import { useState, useEffect, useRef } from 'react';
import { getFaqs } from '../data';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const faqs = getFaqs(language);

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

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div ref={sectionRef} style={{ backgroundColor: '#fdf8f0', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        
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
            {t('faq.subtitle')}
          </span>
          <h1 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 800,
            color: '#1e4433',
            lineHeight: 1.2,
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }} dangerouslySetInnerHTML={{ __html: t('faq.pageTitle').replace(/\*\*(.*?)\*\*/g, '<span style="font-style: italic; color: #f5a623">$1</span>') }} />
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '18px',
            color: '#5e5754',
            lineHeight: 1.7,
          }}>
            {t('faq.pageDesc')}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="reveal reveal-delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  border: `1px solid ${isOpen ? 'rgba(245,166,35,0.3)' : 'rgba(26,58,42,0.08)'}`,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  boxShadow: isOpen ? '0 10px 30px rgba(0,0,0,0.05)' : 'none'
                }}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '24px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: '#1e4433',
                  }}
                >
                  <span style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '18px',
                    fontWeight: 600,
                    paddingRight: '24px',
                  }}>
                    {faq.question}
                  </span>
                  <div style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    color: isOpen ? '#f5a623' : '#1e4433',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <ChevronDown size={24} />
                  </div>
                </button>
                
                <div style={{
                  maxHeight: isOpen ? '500px' : '0',
                  opacity: isOpen ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: 'rgba(245,166,35,0.02)',
                }}>
                  <div style={{
                    padding: '0 24px 24px 24px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '16px',
                    color: '#5e5754',
                    lineHeight: 1.7,
                  }}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Contact CTA */}
        <div className="reveal reveal-delay-2" style={{
          marginTop: '60px',
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#1e4433',
          borderRadius: '24px',
          color: '#fff'
        }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>
            {t('faq.moreQuestionsTitle')}
          </h3>
          <p style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginBottom: '24px' }}>
            {t('faq.contactDesc')}
          </p>
          <a 
            href="#kontak"
            style={{
              display: 'inline-flex',
              backgroundColor: '#f5a623',
              color: '#fff',
              padding: '12px 32px',
              borderRadius: '100px',
              textDecoration: 'none',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: 700,
              fontSize: '15px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.color = '#1e4433';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f5a623';
              e.currentTarget.style.color = '#fff';
            }}
          >
            {t('faq.contactBtn')}
          </a>
        </div>

      </div>
    </div>
  );
}
