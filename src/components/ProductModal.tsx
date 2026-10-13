import { X } from 'lucide-react';
import WhatsappIcon from './icons/WhatsappIcon';
import { WHATSAPP_URL } from '../data';
import type { Product } from '../data';
import { useLanguage } from '../context/LanguageContext';

export default function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const { t } = useLanguage();
  return (
    <div
      className="product-modal-backdrop"
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
        <div style={{ position: 'relative', height: '100%', minHeight: '380px', backgroundColor: '#f9fafb' }}>
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
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
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
            fontSize: 'clamp(28px, 4vw, 36px)',
            fontWeight: 800,
            color: '#1e4433',
            marginTop: '8px',
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
            {product.longDescription || product.description}
          </p>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e4433', marginBottom: '10px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {t('products.tasteLabel')}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {product.tasteProfile && product.tasteProfile.map((taste, i) => (
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

          <div
            className="modal-stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '32px',
              padding: '18px 22px',
              backgroundColor: 'rgba(26,58,42,0.03)',
              borderRadius: '16px',
              border: '1px solid rgba(26,58,42,0.06)',
            }}
          >
            <div>
              <div style={{ fontSize: '12px', color: '#8a837f', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '4px' }}>{t('products.weightLabel')}</div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#1e4433', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{product.weight}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#8a837f', fontFamily: 'Plus Jakarta Sans, sans-serif', marginBottom: '4px' }}>{t('products.priceLabel')}</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#f5a623', fontFamily: 'Plus Jakarta Sans, sans-serif', whiteSpace: 'nowrap' }}>{product.priceRange}</div>
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
            .modal-grid > div:first-child { min-height: 220px !important; aspect-ratio: 16/9 !important; }
            .modal-grid > div:nth-child(2) { padding: 28px 20px !important; }
          }
          @media (max-width: 480px) {
            .product-modal-backdrop { padding: 12px !important; }
            .modal-grid > div:nth-child(2) { padding: 20px 16px !important; }
            .modal-stats-grid {
              grid-template-columns: 1fr !important;
              gap: 12px !important;
              padding: 14px 16px !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
