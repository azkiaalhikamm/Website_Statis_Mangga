import { useState } from 'react';
import { X, Star } from 'lucide-react';
import WhatsappIcon from './icons/WhatsappIcon';
import { getProducts, WHATSAPP_URL } from '../data';
import type { Product } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { useSupabaseData } from '../hooks/useSupabaseData';

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { t } = useLanguage();
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'rgba(10,28,18,0.7)',
        backdropFilter: 'blur(6px)',
        animation: 'fadeIn 0.3s ease',
      }}
      onClick={onClose}
    >
      <div
        className="modal-grid"
        style={{
          backgroundColor: '#fff',
          borderRadius: '24px',
          overflow: 'hidden',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
          animation: 'fadeUp 0.35s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: '100%', minHeight: '400px', backgroundColor: '#f9fafb' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          />
          {product.badge && (
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              backgroundColor: product.badgeColor || '#f5a623',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              padding: '6px 12px',
              borderRadius: '8px',
              letterSpacing: '0.05em',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}>
              {product.badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ position: 'relative', padding: '48px 40px', display: 'flex', flexDirection: 'column' }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: '#f3f4f6',
              border: 'none',
              cursor: 'pointer',
              color: '#5e5754',
              padding: '8px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#e5e7eb';
              (e.currentTarget as HTMLButtonElement).style.color = '#111827';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#f3f4f6';
              (e.currentTarget as HTMLButtonElement).style.color = '#5e5754';
            }}
          >
            <X size={20} />
          </button>

          <span style={{
            fontSize: '12px',
            fontWeight: 700,
            color: product.color || '#f5a623',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>
            {product.localName}
          </span>
          <h3 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: '36px',
            fontWeight: 800,
            color: '#1e4433',
            marginTop: '12px',
            marginBottom: '16px',
            lineHeight: 1.15,
          }}>
            {product.name}
          </h3>

          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '15px',
            color: '#5e5754',
            lineHeight: 1.75,
            marginBottom: '24px',
          }}>
            {product.longDescription}
          </p>

          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e4433', marginBottom: '10px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t('products.tasteLabel')}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {product.tasteProfile.map((taste, i) => (
                <span key={i} style={{
                  backgroundColor: 'rgba(245,166,35,0.1)',
                  color: '#d4890a',
                  fontSize: '12px',
                  fontWeight: 600,
                  padding: '6px 14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(245,166,35,0.15)',
                }}>
                  {taste}
                </span>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '36px',
            padding: '20px 24px',
            backgroundColor: 'rgba(26,58,42,0.03)',
            borderRadius: '16px',
            border: '1px solid rgba(26,58,42,0.06)',
          }}>
            <div>
              <div style={{ fontSize: '12px', color: '#8a837f', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '4px' }}>{t('products.weightLabel')}</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#1e4433', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{product.weight}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#8a837f', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '4px' }}>{t('products.priceLabel')}</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#f5a623', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{product.priceRange}</div>
            </div>
          </div>

          <a
            href={`${WHATSAPP_URL}?text=${t('products.waPrefix')}${product.name}${t('products.waSuffix')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              backgroundColor: '#1e4433',
              color: '#fff',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '15px',
              fontWeight: 700,
              padding: '16px',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              marginTop: 'auto',
              boxShadow: '0 8px 24px rgba(30,68,51,0.2)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#f5a623';
              (e.currentTarget as HTMLAnchorElement).style.color = '#1e4433';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 30px rgba(245,166,35,0.3)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1e4433';
              (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(30,68,51,0.2)';
            }}
          >
            <WhatsappIcon size={18} />
            {t('products.orderViaWhatsapp')}
          </a>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .modal-grid { grid-template-columns: 1fr !important; }
            .modal-grid > div:first-child { min-height: 250px !important; aspect-ratio: 16/9 !important; }
            .modal-grid > div:nth-child(2) { padding: 32px 24px !important; }
          }
        `}</style>
      </div>
    </div>
  );
}

function ProductCard({ product, onClick }: { product: Product; onClick: () => void }) {
  const { t } = useLanguage();
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.35s ease',
        border: '1px solid rgba(26,58,42,0.07)',
        boxShadow: '0 2px 12px rgba(26,58,42,0.04)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        const card = e.currentTarget as HTMLDivElement;
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 20px 48px rgba(26,58,42,0.12)';
        const img = card.querySelector('.product-img') as HTMLImageElement;
        if (img) img.style.transform = 'scale(1.07)';
        const cta = card.querySelector('.product-cta') as HTMLElement;
        if (cta) cta.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget as HTMLDivElement;
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 2px 12px rgba(26,58,42,0.04)';
        const img = card.querySelector('.product-img') as HTMLImageElement;
        if (img) img.style.transform = 'scale(1)';
        const cta = card.querySelector('.product-cta') as HTMLElement;
        if (cta) cta.style.opacity = '0';
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', backgroundColor: '#f9fafb' }}>
        <img
          className="product-img"
          src={product.image}
          alt={`${product.name} ${t('products.imgAlt')}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
        />
        {product.badge && (
          <div style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            backgroundColor: product.badgeColor || '#f5a623',
            color: '#fff',
            fontSize: '11px',
            fontWeight: 700,
            padding: '6px 12px',
            borderRadius: '8px',
            letterSpacing: '0.04em',
            zIndex: 2,
          }}>
            {product.badge}
          </div>
        )}
        {/* Hover CTA overlay */}
        <div
          className="product-cta"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(10,28,18,0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: 3,
          }}
        >
          <span style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '14px',
            fontWeight: 700,
            color: '#fff',
            backgroundColor: 'rgba(245,166,35,0.9)',
            padding: '10px 24px',
            borderRadius: '10px',
            letterSpacing: '0.02em',
          }}>
            {t('products.viewDetail')}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h3 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: '22px',
            fontWeight: 700,
            color: '#1e4433',
            lineHeight: 1.2,
            minHeight: '52px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            paddingRight: '8px'
          }}>
            {product.name}
          </h3>
          <div style={{ display: 'flex', gap: '2px', flexShrink: 0, marginTop: '4px' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill="#f5a623" color="#f5a623" />
            ))}
          </div>
        </div>

        <p style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          fontSize: '15px',
          color: '#5e5754',
          lineHeight: 1.65,
          marginBottom: '16px',
          minHeight: '74px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {product.description}
        </p>

        {/* Taste tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px', minHeight: '26px' }}>
          {product.tasteProfile.slice(0, 2).map((taste, i) => (
            <span key={i} style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#d4890a',
              backgroundColor: 'rgba(245,166,35,0.1)',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(245,166,35,0.18)',
            }}>
              {taste}
            </span>
          ))}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '16px',
          borderTop: '1px solid rgba(26,58,42,0.07)',
          marginTop: 'auto',
        }}>
          <div style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '13px',
            fontWeight: 700,
            color: '#1e4433',
          }}>
            {product.priceRange}
          </div>
          <a
            href={`${WHATSAPP_URL}?text=${t('products.waPrefix2')}${product.name}${t('products.waSuffix2')}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1e4433',
              color: '#fff',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '12px',
              fontWeight: 600,
              padding: '9px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#f5a623';
              (e.currentTarget as HTMLAnchorElement).style.color = '#1e4433';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#1e4433';
              (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
            }}
          >
            <WhatsappIcon size={13} />
            {t('nav.pesan')}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  const [selected, setSelected] = useState<Product | null>(null);
  const { language, t } = useLanguage();
  const { products, isLoading } = useSupabaseData();

  if (isLoading) {
    return (
      <section id="produk-teaser" style={{ backgroundColor: '#fdf8f0', padding: '120px 48px', textAlign: 'center' }}>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section id="produk-teaser" style={{ backgroundColor: '#fdf8f0', padding: '120px 48px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
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
            {t('products.collection')}
          </span>
          <h2 style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 800,
            color: '#1e4433',
            lineHeight: 1.15,
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}>
            {t('products.collectionTitle')}
          </h2>
          <p style={{
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '17px',
            color: '#5e5754',
            maxWidth: '540px',
            margin: '0 auto',
            lineHeight: 1.65,
          }}>
            {t('products.collectionDesc')}
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {products.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setSelected(product)}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a
            href="#produk"
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
            {t('products.viewAll')}
          </a>
        </div>
      </div>

      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}

      <style>{`
        @media (max-width: 600px) {
          #produk {
            padding: 72px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
