import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { SiteSettings } from '../../hooks/useSupabaseData';
import { Save } from 'lucide-react';

interface SettingsAdminProps {
  settings: SiteSettings;
  refreshData: () => Promise<void>;
}

export default function SettingsAdmin({ settings, refreshData }: SettingsAdminProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    site_title: settings.site_title,
    site_logo_url: settings.site_logo_url || ''
  });

  // Sync state if settings prop changes
  useEffect(() => {
    setFormData({
      site_title: settings.site_title,
      site_logo_url: settings.site_logo_url || ''
    });
  }, [settings]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `logo_${Date.now()}.${fileExt}`;
      const filePath = `settings/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setFormData({ ...formData, site_logo_url: publicUrl });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert('Gagal mengupload gambar. Pastikan Storage Supabase sudah dikonfigurasi dengan benar.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveLogo = () => {
    setFormData({ ...formData, site_logo_url: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert([{ 
          id: 'global', 
          site_title: formData.site_title,
          site_logo_url: formData.site_logo_url || null,
          updated_at: new Date().toISOString()
        }]);
        
      if (error) throw error;
      
      await refreshData();
      alert('Pengaturan berhasil disimpan!');
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan pengaturan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#fff', 
      padding: 'clamp(20px, 4vw, 32px)', 
      borderRadius: '16px', 
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)', 
      maxWidth: '640px',
      boxSizing: 'border-box'
    }}>
      <h2 style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: 800, marginBottom: '6px', color: '#1e4433' }}>
        Pengaturan Situs
      </h2>
      <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '28px', lineHeight: 1.6 }}>
        Atur tampilan logo dan nama <em>brand</em> yang muncul di bagian header situs Anda.
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#374151' }}>
            Nama Situs / Brand
          </label>
          <input
            type="text"
            required
            value={formData.site_title}
            onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
            style={{ width: '100%', padding: '11px 14px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }}
            placeholder="Contoh: MANGGA DERMAYU"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: '#374151' }}>
            Logo Situs (Header)
          </label>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {formData.site_logo_url ? (
              <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', flexShrink: 0 }}>
                <img src={formData.site_logo_url} alt="Logo Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ) : (
              <div style={{ width: '64px', height: '64px', borderRadius: '12px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '11px', textAlign: 'center', flexShrink: 0, border: '1px solid #e5e7eb' }}>
                Tanpa<br/>Logo
              </div>
            )}
            
            <div style={{ flex: '1 1 200px', minWidth: 0 }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                style={{ width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '13px', boxSizing: 'border-box' }}
              />
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px', lineHeight: 1.5, margin: '6px 0 0 0' }}>
                Rasio persegi 1:1, ideal 512x512px transparan (PNG).
              </p>
            </div>
          </div>
          
          {formData.site_logo_url && (
            <button 
              type="button" 
              onClick={handleRemoveLogo}
              style={{ fontSize: '13px', color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}
            >
              Hapus Logo Khusus
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || isUploading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: '#1e4433',
            color: '#fff',
            padding: '13px 24px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '14px',
            fontWeight: 700,
            cursor: (isLoading || isUploading) ? 'not-allowed' : 'pointer',
            opacity: (isLoading || isUploading) ? 0.7 : 1,
            marginTop: '8px',
            boxShadow: '0 4px 12px rgba(30, 68, 51, 0.15)',
            transition: 'all 0.2s',
            width: '100%'
          }}
        >
          <Save size={17} />
          <span>{isLoading ? 'Menyimpan...' : isUploading ? 'Mengupload Logo...' : 'Simpan Pengaturan'}</span>
        </button>
      </form>
    </div>
  );
}
