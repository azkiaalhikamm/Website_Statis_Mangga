import { useEffect, useRef } from 'react';
import { WHATSAPP_URL } from '../data';
import { ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSupabaseData } from '../hooks/useSupabaseData';

export default function ProductsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { products: productsList, isLoading } = useSupabaseData();

  useEffect(() => {
    if (isLoading || !sectionRef.current) return;
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
  }, [isLoading]);

  if (isLoading) {
    return (
      <div style={{ backgroundColor: '#fdf8f0', minHeight: '100vh', paddingTop: '120px', paddingBottom: '100px', textAlign: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

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
            {t('productsPage.badge')}
          </span>
          <h1 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 800,
            color: '#1e4433',
            lineHeight: 1.2,
            marginBottom: '24px',
            letterSpacing: '-0.02em',
          }}>
            {t('productsPage.title1')} <span style={{ fontStyle: 'italic', color: '#f5a623' }}>{t('productsPage.title2')}</span>
          </h1>
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '18px',
            color: '#5e5754',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            {t('productsPage.desc')}
          </p>
        </div>

        {/* Product List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
          {productsList.map((product, index) => (
            <div key={product.id} className="reveal" style={{
              display: 'flex',
              flexDirection: index % 2 === 1 ? 'row-reverse' : 'row',
              backgroundColor: '#fff',
              borderRadius: '32px',
              overflow: 'hidden',
              border: '1px solid rgba(26,58,42,0.08)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
              flexWrap: 'wrap'
            }}>
              
              {/* Image Side */}
              <div style={{
                flex: '1 1 400px',
                minHeight: '400px',
                position: 'relative'
              }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0, left: 0
                  }}
                />
                {product.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '24px',
                    left: index % 2 === 1 ? 'auto' : '24px',
                    right: index % 2 === 1 ? '24px' : 'auto',
                    backgroundColor: product.badgeColor || '#1e4433',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '100px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}>
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Content Side */}
              <div style={{
                flex: '1 1 500px',
                padding: '56px 48px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <div style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: product.color,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  marginBottom: '12px',
                }}>
                  {product.localName}
                </div>
                
                <h2 style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: '36px',
                  fontWeight: 800,
                  color: '#1e4433',
                  marginBottom: '20px',
                  lineHeight: 1.2
                }}>
                  {product.name}
                </h2>

                <p style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '16px',
                  color: '#5e5754',
                  lineHeight: 1.8,
                  marginBottom: '32px'
                }}>
                  {product.longDescription || product.description}
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '40px',
                  padding: '24px',
                  backgroundColor: 'rgba(26,58,42,0.03)',
                  borderRadius: '16px'
                }}>
                  <div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', color: '#8a837f', marginBottom: '4px' }}>{t('products.tasteLabel')}</div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', fontWeight: 600, color: '#1e4433' }}>
                      {product.tasteProfile.slice(0,2).join(', ')}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', color: '#8a837f', marginBottom: '4px' }}>{t('productsPage.sizeWeight')}</div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '15px', fontWeight: 600, color: '#1e4433' }}>
                      {product.weight}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
                  <div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '13px', color: '#8a837f', marginBottom: '4px' }}>{t('productsPage.specialPrice')}</div>
                    <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '24px', fontWeight: 700, color: '#f5a623' }}>
                      {product.priceRange}
                    </div>
                  </div>
                  
                  <a 
                    href={`${WHATSAPP_URL}?text=Halo%20Mangga%20Dermayu,%20saya%20ingin%20memesan%20mangga%20${product.name}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      backgroundColor: '#1e4433',
                      color: '#fff',
                      padding: '14px 28px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontWeight: 600,
                      fontSize: '15px',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(30,68,51,0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5a623';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(245,166,35,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1e4433';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(30,68,51,0.2)';
                    }}
                  >
                    <ShoppingBag size={18} />
                    {t('products.cta')}
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
