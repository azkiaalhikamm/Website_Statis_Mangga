import { useState, useEffect } from 'react';
import { useSupabaseData } from '../../hooks/useSupabaseData';
import { supabase } from '../../lib/supabase';
import { LogOut } from 'lucide-react';
import ProductsAdmin from './ProductsAdmin';
import SettingsAdmin from './SettingsAdmin';
import Login from './Login';

export default function AdminDashboard() {
  const { products, settings, isLoading, refreshData } = useSupabaseData();
  const [session, setSession] = useState<any>(null);
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
    await supabase.auth.signOut();
  };

  if (isAuthChecking || isLoading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '18px', color: '#4b5563' }}>Memuat data dashboard...</p>
      </div>
    );
  }

  if (!session) {
    return <Login />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '40px 24px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              Mangga Dermayu Admin
            </h1>
            <p style={{ color: '#6b7280' }}>Kelola pengaturan dan daftar produk untuk website Anda.</p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '8px 16px',
              fontWeight: 600,
              fontSize: '16px',
              color: activeTab === 'products' ? '#1e4433' : '#6b7280',
              borderBottom: activeTab === 'products' ? '3px solid #1e4433' : '3px solid transparent',
              marginBottom: '-11px',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Manajemen Produk
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            style={{
              padding: '8px 16px',
              fontWeight: 600,
              fontSize: '16px',
              color: activeTab === 'settings' ? '#1e4433' : '#6b7280',
              borderBottom: activeTab === 'settings' ? '3px solid #1e4433' : '3px solid transparent',
              marginBottom: '-11px',
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

        <div>
          {activeTab === 'products' ? (
            <ProductsAdmin products={products} refreshData={refreshData} />
          ) : (
            <SettingsAdmin settings={settings} refreshData={refreshData} />
          )}
        </div>

      </div>
    </div>
  );
}
