import { useState, useEffect, useRef } from 'react';
import { Sprout, Users, BadgeCheck, Truck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TrustBar() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchDeltaX = useRef(0);
  const touchDeltaY = useRef(0);

  const items = [
    { icon: Sprout, label: t('trust.i1.label'), desc: t('trust.i1.desc'), tag: '01' },
    { icon: Users, label: t('trust.i2.label'), desc: t('trust.i2.desc'), tag: '02' },
    { icon: BadgeCheck, label: t('trust.i3.label'), desc: t('trust.i3.desc'), tag: '03' },
    { icon: Truck, label: t('trust.i4.label'), desc: t('trust.i4.desc'), tag: '04' },
  ];

  // Auto-play timer (slides smoothly every 3.2 seconds)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  // Touch Swipe Gesture detection
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchDeltaX.current = 0;
    touchDeltaY.current = 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    touchDeltaY.current = e.touches[0].clientY - touchStartY.current;
  };

  const handleTouchEnd = () => {
    // Only detect swipe if horizontal movement exceeds vertical
    if (Math.abs(touchDeltaX.current) > Math.abs(touchDeltaY.current)) {
      if (touchDeltaX.current < -35) {
        setActiveIndex((prev) => (prev + 1) % items.length);
      } else if (touchDeltaX.current > 35) {
        setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
      }
    }
    setIsPaused(false);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #122b1f 0%, #1a3e2e 50%, #143124 100%)',
        borderTop: '1px solid rgba(245, 166, 35, 0.16)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.22)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
        position: 'relative',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* ================= DESKTOP & TABLET VIEW (> 768px) ================= */}
      <div
        className="trustbar-desktop"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
        }}
      >
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              style={{
                padding: '28px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                borderRight: i < items.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = 'rgba(255,255,255,0.04)';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.backgroundColor = 'transparent';
                el.style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '13px',
                  background: 'linear-gradient(135deg, rgba(245,166,35,0.18) 0%, rgba(245,166,35,0.06) 100%)',
                  border: '1px solid rgba(245,166,35,0.25)',
                  boxShadow: '0 4px 14px rgba(245,166,35,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'transform 0.3s ease',
                }}
              >
                <Icon size={22} color="#f5a623" strokeWidth={1.9} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 700,
                    fontSize: '14.5px',
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.25,
                    marginBottom: '3px',
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.35,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= MOBILE VIEW (<= 768px) ULTRA-SLEEK GLASS SLIDER ================= */}
      <div
        className="trustbar-mobile"
        style={{
          padding: '16px 16px 14px',
          maxWidth: '480px',
          margin: '0 auto',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Floating Glassmorphism Widget Card */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Slide Track */}
          <div
            style={{
              display: 'flex',
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
              width: '100%',
            }}
          >
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  style={{
                    minWidth: '100%',
                    width: '100%',
                    flexShrink: 0,
                    boxSizing: 'border-box',
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  {/* Left: Icon & Text Info */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, rgba(245,166,35,0.2) 0%, rgba(245,166,35,0.08) 100%)',
                        border: '1px solid rgba(245,166,35,0.28)',
                        boxShadow: '0 4px 12px rgba(245,166,35,0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={22} color="#f5a623" strokeWidth={1.9} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: 'Plus Jakarta Sans, sans-serif',
                          fontWeight: 700,
                          fontSize: '14.5px',
                          color: '#ffffff',
                          lineHeight: 1.25,
                          letterSpacing: '-0.01em',
                          marginBottom: '2px',
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Plus Jakarta Sans, sans-serif',
                          fontSize: '12px',
                          color: 'rgba(255,255,255,0.72)',
                          lineHeight: 1.35,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  {/* Right: Integrated Mini Control Chevrons */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      flexShrink: 0,
                    }}
                  >
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous Feature"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'background 0.2s',
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next Feature"
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '8px',
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'background 0.2s',
                      }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Segmented Auto-Progress Indicator Dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '6px',
            marginTop: '11px',
          }}
        >
          {items.map((_, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: isActive ? '22px' : '6px',
                  height: '4px',
                  borderRadius: '3px',
                  backgroundColor: isActive ? '#f5a623' : 'rgba(255,255,255,0.22)',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
                  boxShadow: isActive ? '0 0 10px rgba(245,166,35,0.6)' : 'none',
                }}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        .trustbar-desktop {
          display: grid;
        }
        .trustbar-mobile {
          display: none;
        }

        @media (max-width: 768px) {
          .trustbar-desktop {
            display: none !important;
          }
          .trustbar-mobile {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
