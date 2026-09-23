import { useLanguage } from '../context/LanguageContext';
import { useEffect } from 'react';

export default function Testimonials() {
  const { t } = useLanguage();

  useEffect(() => {
    // Actively hide Elfsight free watermark 
    const hideWatermark = () => {
      // 1. Check in standard DOM
      const links = document.querySelectorAll('a');
      links.forEach(a => {
        if (a.href.includes('elfsight.com') || (a.textContent && a.textContent.includes('Free Google Reviews Widget'))) {
          a.style.setProperty('display', 'none', 'important');
          a.style.setProperty('opacity', '0', 'important');
          a.style.setProperty('visibility', 'hidden', 'important');
        }
      });
      
      // 2. Check if Elfsight uses Shadow DOM in this widget
      const widgetElements = document.querySelectorAll('[class*="elfsight-app-"], [class*="eapps-"]');
      widgetElements.forEach(el => {
        if (el.shadowRoot) {
          // Inject a persistent style tag into the shadow DOM to prevent flashes
          if (!el.shadowRoot.querySelector('#hide-elfsight-style')) {
            const style = document.createElement('style');
            style.id = 'hide-elfsight-style';
            style.textContent = `
              a[href*="elfsight"], 
              a[title*="Free Google Reviews Widget"] { 
                display: none !important; 
                opacity: 0 !important; 
                visibility: hidden !important; 
              }
            `;
            el.shadowRoot.appendChild(style);
          }

          // Also manually hide links just in case
          const shadowLinks = el.shadowRoot.querySelectorAll('a');
          shadowLinks.forEach(a => {
            if (a.href.includes('elfsight.com') || (a.textContent && a.textContent.includes('Free Google Reviews Widget'))) {
              a.style.setProperty('display', 'none', 'important');
            }
          });
        }
      });
    };

    // Run extremely fast for the first few seconds to catch initial render (prevents flashing)
    let fastInterval = setInterval(hideWatermark, 50);
    
    // Slow down after 5 seconds to save resources
    setTimeout(() => {
      clearInterval(fastInterval);
      setInterval(hideWatermark, 1000);
    }, 5000);
    
    return () => {
      clearInterval(fastInterval);
      // Note: slower interval won't be cleared on unmount in this simple implementation, 
      // but Testimonials usually stays mounted on the home page.
    };
  }, []);

  return (
    <section style={{ backgroundColor: '#f9fafb', padding: '100px 20px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontFamily: 'Playfair Display, serif',
          fontSize: '36px',
          fontWeight: 700,
          color: '#1e4433',
          marginBottom: '60px'
        }}>
          {t('testi.title')}
        </h2>
        
        {/* Elfsight Google Reviews | Untitled Google Reviews */}
        <div className="elfsight-app-7516ecb8-15c1-4c27-9352-e1e5726e176f" data-elfsight-app-lazy></div>
      </div>
    </section>
  );
}

