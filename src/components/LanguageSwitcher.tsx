import { useState, useRef, useEffect } from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitcher({ forceDarkText }: { forceDarkText: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = [
    { 
      code: 'en', 
      label: 'English', 
      flag: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="14" style={{ borderRadius: '2px', objectFit: 'cover' }}>
          <clipPath id="s">
            <path d="M0,0 v30 h60 v-30 z"/>
          </clipPath>
          <clipPath id="t">
            <path d="M30,15 h30 v15 z v-15 h-30 z h-30 v-15 z v15 h30 z"/>
          </clipPath>
          <g clipPath="url(#s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
          </g>
        </svg>
      )
    },
    { 
      code: 'id', 
      label: 'Indonesia', 
      flag: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="20" height="14" style={{ borderRadius: '2px', objectFit: 'cover' }}>
          <rect width="3" height="1" fill="#FF0000"/>
          <rect width="3" height="1" y="1" fill="#FFFFFF"/>
        </svg>
      )
    }
  ];

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle language"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: forceDarkText ? '#1e4433' : '#fff',
          transition: 'all 0.3s ease',
          backgroundColor: forceDarkText ? 'rgba(26,58,42,0.06)' : 'rgba(255,255,255,0.1)',
        }}
        onMouseEnter={(e) => {
           e.currentTarget.style.backgroundColor = forceDarkText ? 'rgba(26,58,42,0.12)' : 'rgba(255,255,255,0.2)';
        }}
        onMouseLeave={(e) => {
           e.currentTarget.style.backgroundColor = forceDarkText ? 'rgba(26,58,42,0.06)' : 'rgba(255,255,255,0.1)';
        }}
      >
        <Languages size={20} />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '12px',
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '10px',
          width: '180px',
          boxShadow: '0 10px 40px rgba(26,58,42,0.12)',
          zIndex: 1001,
          animation: 'fadeIn 0.2s ease',
          border: '1px solid rgba(26,58,42,0.08)'
        }}>
          <div style={{
             position: 'absolute',
             top: '-6px',
             right: '12px',
             width: '12px',
             height: '12px',
             backgroundColor: '#fff',
             transform: 'rotate(45deg)',
             borderLeft: '1px solid rgba(26,58,42,0.08)',
             borderTop: '1px solid rgba(26,58,42,0.08)',
          }} />
          
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {options.map((opt) => (
              <button
                key={opt.code}
                onClick={() => {
                  setLanguage(opt.code as any);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  padding: '12px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: '#1e4433',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '15px',
                  fontWeight: language === opt.code ? 700 : 500,
                  transition: 'all 0.2s ease',
                  backgroundColor: language === opt.code ? 'rgba(245,166,35,0.1)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (language !== opt.code) {
                    e.currentTarget.style.backgroundColor = 'rgba(26,58,42,0.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = language === opt.code ? 'rgba(245,166,35,0.1)' : 'transparent';
                }}
              >
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: language === opt.code ? '#f5a623' : '#a8b0ad',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {language === opt.code && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f5a623' }} />}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(26,58,42,0.1)', borderRadius: '4px', padding: '2px' }}>
                  {opt.flag}
                </div>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
