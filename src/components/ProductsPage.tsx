import { useState, useEffect, useRef } from 'react';
import { WHATSAPP_URL } from '../data';
import type { Product } from '../data';
import { 
  Sparkles, 
  Eye, 
  Package, 
  ChevronRight
} from 'lucide-react';
import WhatsappIcon from './icons/WhatsappIcon';
import { useLanguage } from '../context/LanguageContext';
import { useSupabaseData } from '../hooks/useSupabaseData';
import ProductModal from './ProductModal';

export default function ProductsPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { products: productsList, isLoading } = useSupabaseData();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
      { threshold: 0.08 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div style={{ backgroundColor: '#fdf8f0', minHeight: '100vh', paddingTop: '140px', paddingBottom: '100px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block',
          width: '40px',
          height: '40px',
          border: '3px solid rgba(30, 68, 51, 0.1)',
          borderTopColor: '#1e4433',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ marginTop: '16px', color: '#5e5754', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Memuat katalog mangga...
        </p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      ref={sectionRef} 
      style={{ 
        backgroundColor: '#fdf8f0', 
        minHeight: '100vh', 
        paddingTop: 'clamp(96px, 12vw, 130px)', 
        paddingBottom: '90px' 
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 32px)' }}>
        
        {/* Header Section */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 'clamp(36px, 6vw, 56px)' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(245, 166, 35, 0.12)',
            color: '#c27d0a',
            padding: '6px 16px',
            borderRadius: '100px',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            marginBottom: '16px',
            border: '1px solid rgba(245, 166, 35, 0.25)',
          }}>
            <Sparkles size={14} color="#f5a623" />
            {t('productsPage.badge')}
          </div>

          <h1 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(30px, 5.5vw, 52px)',
            fontWeight: 800,
            color: '#1e4433',
            lineHeight: 1.2,
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}>
            {t('productsPage.title1')} <span style={{ fontStyle: 'italic', color: '#f5a623' }}>{t('productsPage.title2')}</span>
          </h1>

          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: 'clamp(15px, 2vw, 17px)',
            color: '#5e5754',
            maxWidth: '660px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            {t('productsPage.desc')}
          </p>
        </div>

        {/* Products Grid (Clean 2-Column Responsive Layout) */}
        {/* Products Grid (Clean 2-Column Responsive Layout) */}
        <div className="catalog-products-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 'clamp(24px, 3.5vw, 36px)',
          marginBottom: '60px'
        }}>
          {productsList.map((product) => (
            <div 
              key={product.id} 
              className="reveal catalog-card"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(26, 58, 42, 0.08)',
                boxShadow: '0 8px 30px rgba(26, 58, 42, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all 0.35s cubic-bezier(0.2, 0, 0, 1)',
                position: 'relative'
              }}
            >
              {/* Image Section */}
              <div 
                className="catalog-img-wrapper"
                onClick={() => setSelectedProduct(product)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  height: '280px',
                  backgroundColor: '#f7f6f2',
                  cursor: 'pointer'
                }}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="catalog-img"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.2, 0, 0, 1)'
                  }}
                />
                
                {/* Badge Top Left */}
                {product.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: product.badgeColor || '#1e4433',
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
                    zIndex: 2,
                  }}>
                    {product.badge}
                  </div>
                )}

                {/* Weight Tag Top Right */}
                {product.weight && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(8px)',
                    color: '#1e4433',
                    padding: '5px 12px',
                    borderRadius: '100px',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Package size={12} color="#f5a623" />
                    {product.weight}
                  </div>
                )}

                {/* Hover Quick View Overlay */}
                <div 
                  className="catalog-quickview-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(10, 28, 18, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 3
                  }}
                >
                  <span style={{
                    backgroundColor: '#fff',
                    color: '#1e4433',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '13px',
                    fontWeight: 700,
                    padding: '8px 18px',
                    borderRadius: '100px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Eye size={14} color="#f5a623" />
                    {t('productsPage.viewDetail')}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div 
                className="catalog-card-body" 
                style={{
                  padding: 'clamp(20px, 3.2vw, 28px)',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1
                }}
              >
                {/* Local name / Subtitle */}
                <div style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: product.color || '#f5a623',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  marginBottom: '6px',
                }}>
                  {product.localName || product.name}
                </div>
                
                {/* Title */}
                <h2 
                  onClick={() => setSelectedProduct(product)}
                  style={{
                    fontFamily: 'Playfair Display, Georgia, serif',
                    fontSize: 'clamp(22px, 2.5vw, 26px)',
                    fontWeight: 800,
                    color: '#1e4433',
                    marginBottom: '10px',
                    lineHeight: 1.25,
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#f5a623')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#1e4433')}
                >
                  {product.name}
                </h2>

                {/* Description (Uniform 3-Line Clamp) */}
                <p style={{
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '14px',
                  color: '#5e5754',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                  minHeight: '66px',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {product.description || product.longDescription}
                </p>

                {/* Compact Taste Tags */}
                {product.tasteProfile && product.tasteProfile.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '20px'
                  }}>
                    {product.tasteProfile.slice(0, 3).map((taste, i) => (
                      <span key={i} style={{
                        backgroundColor: '#f2f7f3',
                        color: '#1e4433',
                        fontSize: '12px',
                        fontWeight: 600,
                        padding: '4px 11px',
                        borderRadius: '8px',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        border: '1px solid rgba(26, 58, 42, 0.08)',
                      }}>
                        {taste}
                      </span>
                    ))}
                  </div>
                )}

                {/* Clean 2-Tier Bottom Section: Price + Detail Button, and Full-Width WhatsApp CTA */}
                <div className="catalog-bottom-bar" style={{
                  borderTop: '1px solid rgba(26, 58, 42, 0.08)',
                  paddingTop: '18px',
                  marginTop: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}>
                  {/* Tier 1: Price and Detail Trigger */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}>
                    <div>
                      <div style={{ 
                        fontFamily: 'Plus Jakarta Sans, sans-serif', 
                        fontSize: '11px', 
                        color: '#8a837f', 
                        marginBottom: '3px', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.06em',
                        fontWeight: 700
                      }}>
                        {t('productsPage.specialPrice')}
                      </div>
                      <div style={{ 
                        fontFamily: 'Playfair Display, Georgia, serif', 
                        fontSize: 'clamp(20px, 2.2vw, 24px)', 
                        fontWeight: 800, 
                        color: '#d4890a', 
                        lineHeight: 1.1,
                        whiteSpace: 'nowrap'
                      }}>
                        {product.priceRange}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedProduct(product)}
                      title={t('productsPage.viewDetail')}
                      className="catalog-detail-btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#fff',
                        color: '#1e4433',
                        border: '1.5px solid rgba(26, 58, 42, 0.16)',
                        padding: '8px 16px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        fontWeight: 700,
                        fontSize: '13px',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(26, 58, 42, 0.05)';
                        e.currentTarget.style.borderColor = '#1e4433';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#fff';
                        e.currentTarget.style.borderColor = 'rgba(26, 58, 42, 0.16)';
                      }}
                    >
                      <Eye size={15} color="#1e4433" />
                      <span>{t('productsPage.viewDetail')}</span>
                    </button>
                  </div>

                  {/* Tier 2: Full-Width Primary WhatsApp CTA */}
                  <a 
                    href={`${WHATSAPP_URL}?text=Halo%20Mangga%20Dermayu,%20saya%20ingin%20memesan%20mangga%20${encodeURIComponent(product.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="catalog-wa-btn"
                    style={{
                      width: '100%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '9px',
                      backgroundColor: '#1e4433',
                      color: '#fff',
                      padding: '13px 20px',
                      borderRadius: '14px',
                      textDecoration: 'none',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      transition: 'all 0.25s ease',
                      boxShadow: '0 4px 14px rgba(30, 68, 51, 0.2)',
                      boxSizing: 'border-box'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5a623';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(245, 166, 35, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1e4433';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(30, 68, 51, 0.2)';
                    }}
                  >
                    <WhatsappIcon size={18} />
                    <span>{t('productsPage.orderWA')}</span>
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Custom Order / Hampers Section */}
        <div className="reveal custom-order-banner" style={{
          backgroundColor: '#fff',
          borderRadius: '24px',
          padding: 'clamp(28px, 5vw, 44px)',
          border: '1px solid rgba(26, 58, 42, 0.08)',
          boxShadow: '0 10px 40px rgba(26, 58, 42, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px'
        }}>
          <div style={{ flex: '1 1 400px', maxWidth: '680px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#d4890a',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              marginBottom: '10px'
            }}>
              <Package size={15} />
              Layanan Khusus & Grosir
            </div>
            <h3 style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(22px, 3vw, 30px)',
              fontWeight: 800,
              color: '#1e4433',
              marginBottom: '8px',
              lineHeight: 1.25
            }}>
              {t('productsPage.customOrderTitle')}
            </h3>
            <p style={{
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '15px',
              color: '#5e5754',
              lineHeight: 1.65,
              margin: 0
            }}>
              {t('productsPage.customOrderDesc')}
            </p>
          </div>

          <a
            href={`${WHATSAPP_URL}?text=Halo%20Mangga%20Dermayu,%20saya%20tertarik%20dengan%20pesanan%20khusus%20/%20hampers%20buah%20partai%20besar.`}
            target="_blank"
            rel="noopener noreferrer"
            className="custom-order-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              backgroundColor: '#1e4433',
              color: '#fff',
              padding: '16px 32px',
              borderRadius: '14px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 24px rgba(30, 68, 51, 0.2)',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f5a623';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 28px rgba(245, 166, 35, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1e4433';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(30, 68, 51, 0.2)';
            }}
          >
            <WhatsappIcon size={18} />
            <span>{t('productsPage.customOrderBtn')}</span>
            <ChevronRight size={16} />
          </a>
        </div>

      </div>

      {/* Selected Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Responsive Stylesheet */}
      <style>{`
        /* Hover card effects */
        .catalog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(26, 58, 42, 0.12) !important;
          border-color: rgba(245, 166, 35, 0.35) !important;
        }
        .catalog-card:hover .catalog-img {
          transform: scale(1.05);
        }
        .catalog-card:hover .catalog-quickview-overlay {
          opacity: 1 !important;
        }

        /* Mobile & Tablet Responsive (<= 860px) */
        @media (max-width: 860px) {
          .catalog-products-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }
          .catalog-img-wrapper {
            height: 250px !important;
          }
        }

        /* Small Phones (<= 520px) */
        @media (max-width: 520px) {
          .catalog-img-wrapper {
            height: 210px !important;
          }
          .catalog-card-body {
            padding: 18px 16px !important;
          }
          .catalog-detail-btn {
            padding: 7px 12px !important;
            font-size: 12px !important;
          }
          .catalog-wa-btn {
            padding: 12px 16px !important;
            font-size: 13.5px !important;
          }
          .custom-order-banner {
            padding: 24px 18px !important;
          }
          .custom-order-btn {
            width: 100% !important;
            padding: 14px 20px !important;
          }
        }

        /* Very Small Phones (<= 360px) */
        @media (max-width: 360px) {
          .catalog-card-body {
            padding: 14px 12px !important;
          }
          .catalog-wa-btn {
            font-size: 12.5px !important;
            gap: 6px !important;
          }
        }
      `}</style>
    </div>
  );
}
