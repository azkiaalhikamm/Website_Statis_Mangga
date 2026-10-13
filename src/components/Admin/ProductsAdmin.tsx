import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Product } from '../../data';
import { Edit2, Trash2, Plus, X, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

interface ProductsAdminProps {
  products: Product[];
  refreshData: () => Promise<void>;
  saveProduct?: (formData: any, editingId?: string | null) => Promise<{ success: boolean }>;
  deleteProduct?: (id: string) => Promise<{ success: boolean }>;
}

export default function ProductsAdmin({ products, refreshData, saveProduct, deleteProduct }: ProductsAdminProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name_id: '',
    name_en: '',
    desc_id: '',
    desc_en: '',
    price_range_id: '',
    price_range_en: '',
    weight_id: '',
    weight_en: '',
    taste_profile_id: '',
    taste_profile_en: '',
    image_url: '',
    badge_id: '',
    badge_en: '',
    badge_color: '#f5a623',
    color: '#1e4433',
    featured: false
  });

  const sampleImages = [
    { label: 'Agrimania Studio', url: '/mangga_agrimania.jpg' },
    { label: 'Gedong Gincu', url: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=85&fit=crop&crop=center' },
    { label: 'Cengkir Kuning', url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=85&fit=crop&crop=center' },
    { label: 'Harum Manis Iris', url: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=800&q=85&fit=crop&crop=center' },
  ];

  const handleEdit = (product: Product) => {
    setFormData({
      name_id: product.localName || product.name,
      name_en: product.name,
      desc_id: product.description,
      desc_en: product.longDescription || product.description,
      price_range_id: product.priceRange,
      price_range_en: product.priceRange,
      weight_id: product.weight || '',
      weight_en: product.weight || '',
      taste_profile_id: Array.isArray(product.tasteProfile) ? product.tasteProfile.join(', ') : '',
      taste_profile_en: Array.isArray(product.tasteProfile) ? product.tasteProfile.join(', ') : '',
      image_url: product.image,
      badge_id: product.badge || '',
      badge_en: product.badge || '',
      badge_color: product.badgeColor || '#f5a623',
      color: product.color || '#1e4433',
      featured: product.featured || false
    });
    setEditingId(product.id);
    setIsEditing(true);
    setFeedbackMsg(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
    setIsLoading(true);
    setFeedbackMsg(null);
    try {
      if (deleteProduct) {
        await deleteProduct(id);
      } else {
        await supabase.from('products').delete().eq('id', id);
        await refreshData();
      }
      setFeedbackMsg({ type: 'success', text: 'Produk berhasil dihapus!' });
    } catch (error) {
      console.error(error);
      setFeedbackMsg({ type: 'error', text: 'Gagal menghapus produk.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
    } catch (error: any) {
      console.warn('Storage upload fallback or error:', error);
      // Create local blob preview URL for instant feedback
      const localUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image_url: localUrl });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedbackMsg(null);
    try {
      const submitData = {
        ...formData,
        taste_profile_id: formData.taste_profile_id.split(',').map(s => s.trim()).filter(Boolean),
        taste_profile_en: formData.taste_profile_en.split(',').map(s => s.trim()).filter(Boolean),
      };

      if (saveProduct) {
        await saveProduct(submitData, editingId);
      } else {
        if (editingId) {
          await supabase.from('products').update(submitData).eq('id', editingId);
        } else {
          const newId = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
          await supabase.from('products').insert([{ ...submitData, id: newId }]);
        }
        await refreshData();
      }

      setFeedbackMsg({ 
        type: 'success', 
        text: editingId ? 'Perubahan produk berhasil disimpan!' : 'Produk baru berhasil ditambahkan!' 
      });
      setIsEditing(false);
      setEditingId(null);
      // Reset form
      setFormData({
        name_id: '', name_en: '', desc_id: '', desc_en: '',
        price_range_id: '', price_range_en: '', weight_id: '', weight_en: '',
        taste_profile_id: '', taste_profile_en: '', image_url: '',
        badge_id: '', badge_en: '', badge_color: '#f5a623', color: '#1e4433', featured: false
      });
    } catch (error) {
      console.error(error);
      setFeedbackMsg({ type: 'error', text: 'Gagal menyimpan produk.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div style={{ 
        backgroundColor: '#fff', 
        padding: 'clamp(18px, 4vw, 32px)', 
        borderRadius: '16px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #f3f4f6', paddingBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(18px, 3.5vw, 22px)', fontWeight: 800, color: '#1e4433', margin: 0 }}>
              {editingId ? 'Edit Data Produk' : 'Tambah Produk Baru'}
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#6b7280' }}>
              Data produk otomatis sinkron ke halaman web publik katalog.
            </p>
          </div>
          <button 
            onClick={() => setIsEditing(false)} 
            aria-label="Tutup form"
            style={{ padding: '8px', borderRadius: '50%', backgroundColor: '#f3f4f6', border: 'none', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="admin-grid-2">
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Nama Produk (Bahasa Indonesia) *</label>
              <input 
                required 
                value={formData.name_id} 
                onChange={(e) => setFormData({...formData, name_id: e.target.value})} 
                placeholder="Misal: Gedong Gincu Super"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Nama Produk (English) *</label>
              <input 
                required 
                value={formData.name_en} 
                onChange={(e) => setFormData({...formData, name_en: e.target.value})} 
                placeholder="e.g. Gedong Gincu Super Mango"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
              />
            </div>
          </div>
          
          <div className="admin-grid-2">
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Deskripsi Produk (Bahasa Indonesia) *</label>
              <textarea 
                required 
                value={formData.desc_id} 
                onChange={(e) => setFormData({...formData, desc_id: e.target.value})} 
                placeholder="Deskripsi keunggulan rasa dan aroma mangga..."
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', minHeight: '85px', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Deskripsi Produk (English) *</label>
              <textarea 
                required 
                value={formData.desc_en} 
                onChange={(e) => setFormData({...formData, desc_en: e.target.value})} 
                placeholder="Product description in English..."
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', minHeight: '85px', fontSize: '14px', resize: 'vertical', boxSizing: 'border-box' }} 
              />
            </div>
          </div>

          <div className="admin-grid-3">
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Harga / Rentang Harga (ID) *</label>
              <input 
                required 
                value={formData.price_range_id} 
                onChange={(e) => setFormData({...formData, price_range_id: e.target.value})} 
                placeholder="Mulai dari Rp 35.000/kg"
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Ukuran / Bobot Buah (ID) *</label>
              <input 
                required 
                value={formData.weight_id} 
                onChange={(e) => setFormData({...formData, weight_id: e.target.value})} 
                placeholder="3–5 buah/kg" 
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Badge / Tag Populer</label>
              <input 
                value={formData.badge_id} 
                onChange={(e) => setFormData({...formData, badge_id: e.target.value, badge_en: e.target.value})} 
                placeholder="Best Seller, Favorit Lokal, Jumbo" 
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Profil Rasa (Pisahkan dengan koma) *
            </label>
            <input 
              required 
              value={formData.taste_profile_id} 
              onChange={(e) => setFormData({...formData, taste_profile_id: e.target.value, taste_profile_en: e.target.value})} 
              placeholder="Manis Alami, Harum Kuat, Daging Tebal, Lembut Tanpa Serat" 
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              URL Gambar Produk *
            </label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <input 
                required 
                value={formData.image_url} 
                onChange={(e) => setFormData({...formData, image_url: e.target.value})} 
                placeholder="https://... atau /mangga_agrimania.jpg" 
                style={{ flex: '1 1 200px', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} 
              />
              <label style={{ padding: '10px 16px', backgroundColor: '#e5e7eb', borderRadius: '8px', cursor: isUploading ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', opacity: isUploading ? 0.7 : 1 }}>
                {isUploading ? 'Mengunggah...' : 'Pilih File'}
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} style={{ display: 'none' }} />
              </label>
            </div>

            {/* Quick Presets */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ImageIcon size={14} /> Contoh Gambar:
              </span>
              {sampleImages.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({...formData, image_url: s.url})}
                  style={{
                    fontSize: '11px',
                    padding: '4px 9px',
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    color: '#1e4433',
                    fontWeight: 600
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {formData.image_url && (
              <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #d1d5db', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} 
                />
                <span style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <CheckCircle2 size={16} /> Preview Gambar Terpasang
                </span>
              </div>
            )}
          </div>

          <div className="admin-form-btns" style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
            <button 
              disabled={isLoading} 
              type="submit" 
              style={{ 
                padding: '13px 26px', 
                backgroundColor: '#1e4433', 
                color: '#fff', 
                borderRadius: '10px', 
                fontWeight: 700, 
                fontSize: '14px',
                border: 'none',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                boxShadow: '0 4px 12px rgba(30, 68, 51, 0.2)'
              }}
            >
              {isLoading ? 'Menyimpan...' : (editingId ? 'Simpan Perubahan' : 'Tambah Produk Sekarang')}
            </button>
            <button 
              type="button"
              onClick={() => setIsEditing(false)} 
              style={{ 
                padding: '13px 22px', 
                backgroundColor: '#f3f4f6', 
                color: '#4b5563', 
                borderRadius: '10px', 
                fontWeight: 600, 
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{ 
      backgroundColor: '#fff', 
      padding: 'clamp(18px, 4vw, 32px)', 
      borderRadius: '16px', 
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
      boxSizing: 'border-box'
    }}>
      {feedbackMsg && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '10px',
          marginBottom: '20px',
          backgroundColor: feedbackMsg.type === 'success' ? '#d1fae5' : '#fee2e2',
          color: feedbackMsg.type === 'success' ? '#065f46' : '#991b1b',
          fontSize: '14px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={18} />
          {feedbackMsg.text}
        </div>
      )}

      {/* Header with Title and Add Button */}
      <div className="admin-list-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: 'clamp(18px, 3.5vw, 22px)', fontWeight: 800, color: '#1e4433', margin: 0 }}>
            Daftar Produk Mangga
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#6b7280' }}>
            Total {products.length} varietas aktif terhubung ke website.
          </p>
        </div>
        <button 
          onClick={() => { setEditingId(null); setIsEditing(true); setFeedbackMsg(null); }} 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '8px', 
            padding: '11px 18px', 
            backgroundColor: '#1e4433', 
            color: '#fff', 
            borderRadius: '10px', 
            fontWeight: 700,
            fontSize: '13.5px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(30,68,51,0.2)',
            whiteSpace: 'nowrap'
          }}
        >
          <Plus size={18} /> Tambah Produk Baru
        </button>
      </div>

      {/* Desktop Table (≥ 768px) */}
      <div className="admin-table-container" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '640px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
              <th style={{ padding: '12px 14px', color: '#4b5563', fontSize: '13px', fontWeight: 700 }}>Foto</th>
              <th style={{ padding: '12px 14px', color: '#4b5563', fontSize: '13px', fontWeight: 700 }}>Nama Varietas</th>
              <th style={{ padding: '12px 14px', color: '#4b5563', fontSize: '13px', fontWeight: 700 }}>Harga</th>
              <th style={{ padding: '12px 14px', color: '#4b5563', fontSize: '13px', fontWeight: 700 }}>Ukuran/Berat</th>
              <th style={{ padding: '12px 14px', color: '#4b5563', fontSize: '13px', fontWeight: 700 }}>Badge</th>
              <th style={{ padding: '12px 14px', color: '#4b5563', fontSize: '13px', fontWeight: 700, textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.15s' }}>
                <td style={{ padding: '12px 14px' }}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '52px', height: '52px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #e5e7eb' }} 
                  />
                </td>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ fontWeight: 700, color: '#1e4433', fontSize: '15px' }}>{product.name}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>{product.localName}</div>
                </td>
                <td style={{ padding: '12px 14px', color: '#d4890a', fontWeight: 700, fontSize: '14px' }}>
                  {product.priceRange}
                </td>
                <td style={{ padding: '12px 14px', color: '#4b5563', fontSize: '13px' }}>
                  {product.weight}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  {product.badge ? (
                    <span style={{
                      backgroundColor: product.badgeColor || '#1e4433',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '100px',
                      whiteSpace: 'nowrap'
                    }}>
                      {product.badge}
                    </span>
                  ) : (
                    <span style={{ color: '#9ca3af', fontSize: '12px' }}>-</span>
                  )}
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleEdit(product)} 
                      title="Edit Produk"
                      style={{ 
                        padding: '8px', 
                        borderRadius: '8px', 
                        backgroundColor: '#eff6ff', 
                        color: '#2563eb', 
                        border: 'none', 
                        cursor: 'pointer' 
                      }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)} 
                      title="Hapus Produk"
                      disabled={isLoading}
                      style={{ 
                        padding: '8px', 
                        borderRadius: '8px', 
                        backgroundColor: '#fef2f2', 
                        color: '#dc2626', 
                        border: 'none', 
                        cursor: 'pointer' 
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List (< 768px) */}
      <div className="admin-cards-container" style={{ display: 'none', flexDirection: 'column', gap: '14px' }}>
        {products.map((product) => (
          <div 
            key={product.id} 
            style={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '14px',
              padding: '16px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #e5e7eb', flexShrink: 0 }} 
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '2px' }}>
                  <div style={{ fontWeight: 800, color: '#1e4433', fontSize: '15px', lineHeight: 1.25 }}>
                    {product.name}
                  </div>
                  {product.badge && (
                    <span style={{
                      backgroundColor: product.badgeColor || '#1e4433',
                      color: '#fff',
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '100px',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '6px' }}>
                  {product.localName}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ color: '#d4890a', fontWeight: 800, fontSize: '13.5px' }}>
                    {product.priceRange}
                  </span>
                  {product.weight && (
                    <span style={{ color: '#4b5563', fontSize: '11.5px', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '6px' }}>
                      {product.weight}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Action Buttons */}
            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
              <button 
                onClick={() => handleEdit(product)} 
                style={{ 
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '9px 12px', 
                  borderRadius: '9px', 
                  backgroundColor: '#eff6ff', 
                  color: '#2563eb', 
                  border: '1px solid #dbeafe', 
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '13px'
                }}
              >
                <Edit2 size={14} />
                <span>Edit</span>
              </button>
              <button 
                onClick={() => handleDelete(product.id)} 
                disabled={isLoading}
                style={{ 
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '9px 12px', 
                  borderRadius: '9px', 
                  backgroundColor: '#fef2f2', 
                  color: '#dc2626', 
                  border: '1px solid #fee2e2', 
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '13px'
                }}
              >
                <Trash2 size={14} />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Stylesheet */}
      <style>{`
        .admin-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .admin-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        @media (max-width: 767px) {
          .admin-table-container {
            display: none !important;
          }
          .admin-cards-container {
            display: flex !important;
          }
        }

        @media (max-width: 640px) {
          .admin-grid-2,
          .admin-grid-3 {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .admin-list-header {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .admin-list-header button {
            width: 100% !important;
          }
          .admin-form-btns {
            flex-direction: column !important;
          }
          .admin-form-btns button {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
