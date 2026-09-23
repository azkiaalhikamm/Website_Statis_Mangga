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
    <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#1e4433' }}>Pengaturan Situs</h2>
      <p style={{ color: '#666', marginBottom: '32px' }}>Atur tampilan logo dan nama *brand* yang muncul di bagian atas (header) situs Anda.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
            Nama Situs / Brand
          </label>
          <input
            type="text"
            required
            value={formData.site_title}
            onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
            style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
            placeholder="Contoh: MANGGA DERMAYU"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: '#333' }}>
            Logo Situs (Header)
          </label>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            {formData.site_logo_url ? (
              <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <img src={formData.site_logo_url} alt="Logo Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ) : (
              <div style={{ width: '64px', height: '64px', borderRadius: '12px', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '12px', textAlign: 'center' }}>
                Tanpa<br/>Logo
              </div>
            )}
            
            <div style={{ flex: 1 }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
              />
              <p style={{ fontSize: '12px', color: '#666', marginTop: '6px', lineHeight: 1.5 }}>
                Gunakan gambar berukuran persegi (rasio 1:1), <strong>ukuran ideal 512x512 pixel</strong>.<br/>
                Sangat disarankan menggunakan format transparan (PNG). Kosongkan untuk menggunakan ikon bawaan.
              </p>
            </div>
          </div>
          
          {formData.site_logo_url && (
            <button 
              type="button" 
              onClick={handleRemoveLogo}
              style={{ fontSize: '13px', color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Hapus Logo Khusus
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || isUploading}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            backgroundColor: '#1e4433',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '6px',
            border: 'none',
            fontWeight: 600,
            cursor: (isLoading || isUploading) ? 'not-allowed' : 'pointer',
            opacity: (isLoading || isUploading) ? 0.7 : 1,
            marginTop: '16px'
          }}
        >
          <Save size={18} />
          {isLoading ? 'Menyimpan...' : isUploading ? 'Mengupload Logo...' : 'Simpan Pengaturan'}
        </button>
      </form>
    </div>
  );
}
