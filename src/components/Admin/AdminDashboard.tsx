import { useState, useEffect } from 'react';
import { useSupabaseData } from '../../hooks/useSupabaseData';
import { supabase } from '../../lib/supabase';
import { LogOut, ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';
import ProductsAdmin from './ProductsAdmin';
import SettingsAdmin from './SettingsAdmin';
import Login from './Login';

export default function AdminDashboard() {
  const { products, settings, isLoading, refreshData, saveProduct, deleteProduct } = useSupabaseData();
  const [session, setSession] = useState<any>(null);
  const [localAuth, setLocalAuth] = useState<boolean>(() => {
    return localStorage.getItem('mangga_admin_authenticated') === 'true';
  });
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthChecking(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Sign out error:', e);
    }
    localStorage.removeItem('mangga_admin_authenticated');
    setLocalAuth(false);
    setSession(null);
  };

  const isAuthenticated = Boolean(session || localAuth);

  if (isAuthChecking || isLoading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '18px', color: '#4b5563' }}>Memuat data dashboard...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setLocalAuth(true)} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '40px 24px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Top Navbar */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ 
                backgroundColor: '#d1fae5', 
                color: '#065f46', 
                fontSize: '11px', 
                fontWeight: 700, 
                padding: '3px 10px', 
                borderRadius: '100px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={13} /> Admin Aktif
              </span>
            </div>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#111827', margin: 0 }}>
              Mangga Dermayu Admin
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '4px 0 0 0' }}>
              Kelola katalog produk mangga dan informasi website secara langsung.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="#produk"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                backgroundColor: '#fff',
                color: '#1e4433',
                border: '1px solid #d1d5db',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                transition: 'all 0.2s'
              }}
            >
              <ArrowLeft size={16} />
              <span>Kembali ke Website</span>
              <ExternalLink size={14} style={{ opacity: 0.5 }} />
            </a>

            <button
              onClick={handleLogout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                backgroundColor: '#fee2e2',
                color: '#b91c1c',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              <LogOut size={16} />
              Keluar
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', borderBottom: '2px solid #e5e7eb', paddingBottom: '4px' }}>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '10px 16px',
              fontWeight: 700,
              fontSize: '15px',
              color: activeTab === 'products' ? '#1e4433' : '#6b7280',
              borderBottom: activeTab === 'products' ? '3px solid #1e4433' : '3px solid transparent',
              marginBottom: '-6px',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Manajemen Produk ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '10px 16px',
              fontWeight: 700,
              fontSize: '15px',
              color: activeTab === 'settings' ? '#1e4433' : '#6b7280',
              borderBottom: activeTab === 'settings' ? '3px solid #1e4433' : '3px solid transparent',
              marginBottom: '-6px',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Pengaturan Situs
          </button>
        </div>

        {/* Content View */}
        <div>
          {activeTab === 'products' ? (
            <ProductsAdmin 
              products={products} 
              refreshData={refreshData}
              saveProduct={saveProduct}
              deleteProduct={deleteProduct}
            />
          ) : (
            <SettingsAdmin 
              settings={settings} 
              refreshData={refreshData} 
            />
          )}
        </div>

      </div>
    </div>
  );
}
