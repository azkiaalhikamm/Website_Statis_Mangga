import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Leaf, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLoginSuccess?: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const cleanEmail = email.trim();
    const cleanPassword = password;

    try {
      // 1. Coba otentikasi via Supabase Auth jika terkonfigurasi
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      if (!authError && data?.session) {
        localStorage.setItem('mangga_admin_authenticated', 'true');
        setLoading(false);
        if (onLoginSuccess) onLoginSuccess();
        return;
      }
    } catch (err) {
      console.warn('Supabase auth attempt:', err);
    }

    // 2. Kredensial cadangan admin terverifikasi
    if (
      (cleanEmail.toLowerCase() === 'admin@manggadermayu.com' || cleanEmail.toLowerCase() === 'admin') &&
      cleanPassword === 'admin123'
    ) {
      localStorage.setItem('mangga_admin_authenticated', 'true');
      setLoading(false);
      if (onLoginSuccess) onLoginSuccess();
      return;
    }

    // Jika gagal
    setError('Email atau password yang Anda masukkan salah.');
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(16px, 4vw, 32px)',
      fontFamily: 'Plus Jakarta Sans, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: 'clamp(24px, 6vw, 40px)',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        width: '100%',
        maxWidth: '420px',
        boxSizing: 'border-box'
      }}>
        {/* Back link */}
        <div style={{ marginBottom: '20px' }}>
          <a
            href="#produk"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: '#6b7280',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#1e4433')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Website</span>
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px' }}>
          <div style={{
            width: 52,
            height: 52,
            backgroundColor: '#1e4433',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            boxShadow: '0 4px 14px rgba(30,68,51,0.2)'
          }}>
            <Leaf size={26} color="#f5a623" />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: 0 }}>
            Login Admin
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '6px', textAlign: 'center' }}>
            Masuk untuk mengelola katalog produk Mangga Dermayu
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '12px 14px',
            borderRadius: '10px',
            marginBottom: '20px',
            fontSize: '13.5px',
            textAlign: 'center',
            fontWeight: 600,
            border: '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '18px' }}>
            <label htmlFor="email" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Email Admin
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              placeholder="Masukkan email atau username"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="password" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '11px 40px 11px 14px',
                  borderRadius: '10px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                placeholder="Masukkan kata sandi"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              backgroundColor: '#1e4433',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: loading ? 0.7 : 1,
              transition: 'background-color 0.2s',
              boxShadow: '0 4px 12px rgba(30, 68, 51, 0.2)'
            }}
          >
            {loading ? 'Memeriksa...' : (
              <>
                <Lock size={16} />
                <span>Masuk Sekarang</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
