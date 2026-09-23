import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Product } from '../../data';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

interface ProductsAdminProps {
  products: Product[];
  refreshData: () => Promise<void>;
}

export default function ProductsAdmin({ products, refreshData }: ProductsAdminProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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
    color: '#fff',
    featured: false
  });

  const handleEdit = (product: Product) => {
    // In a real app we'd fetch the exact DB row or map backwards.
    // For simplicity we will assume we can just edit the fields we have.
    setFormData({
      name_id: product.localName || '',
      name_en: product.name,
      desc_id: product.description,
      desc_en: product.description,
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
      color: product.color || '#fff',
      featured: product.featured || false
    });
    setEditingId(product.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
    setIsLoading(true);
    try {
      await supabase.from('products').delete().eq('id', id);
      await refreshData();
    } catch (error) {
      console.error(error);
      alert('Gagal menghapus produk');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // 1. Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      // 2. Upload to Supabase Storage 
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // 3. Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      // 4. Update the form data
      setFormData({ ...formData, image_url: publicUrl });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert('Gagal mengupload gambar. Pastikan Anda sudah membuat Storage Bucket bernama "products" dengan akses Public di Supabase Anda.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const submitData = {
        ...formData,
        taste_profile_id: formData.taste_profile_id.split(',').map(s => s.trim()).filter(Boolean),
        taste_profile_en: formData.taste_profile_en.split(',').map(s => s.trim()).filter(Boolean),
      };

      if (editingId) {
        await supabase.from('products').update(submitData).eq('id', editingId);
      } else {
        const newId = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
        await supabase.from('products').insert([{ ...submitData, id: newId }]);
      }
      await refreshData();
      setIsEditing(false);
      setEditingId(null);
      // reset form
      setFormData({
        name_id: '', name_en: '', desc_id: '', desc_en: '',
        price_range_id: '', price_range_en: '', weight_id: '', weight_en: '',
        taste_profile_id: '', taste_profile_en: '', image_url: '',
        badge_id: '', badge_en: '', badge_color: '#f5a623', color: '#fff', featured: false
      });
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan produk');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>{editingId ? 'Edit Produk' : 'Tambah Produk'}</h2>
          <button onClick={() => setIsEditing(false)} style={{ padding: '8px', borderRadius: '50%', backgroundColor: '#f3f4f6' }}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Nama (ID)</label>
              <input required value={formData.name_id} onChange={(e) => setFormData({...formData, name_id: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Nama (EN)</label>
              <input required value={formData.name_en} onChange={(e) => setFormData({...formData, name_en: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Deskripsi (ID)</label>
              <textarea required value={formData.desc_id} onChange={(e) => setFormData({...formData, desc_id: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', minHeight: '80px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Deskripsi (EN)</label>
              <textarea required value={formData.desc_en} onChange={(e) => setFormData({...formData, desc_en: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', minHeight: '80px' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Harga (ID)</label>
              <input required value={formData.price_range_id} onChange={(e) => setFormData({...formData, price_range_id: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Harga (EN)</label>
              <input required value={formData.price_range_en} onChange={(e) => setFormData({...formData, price_range_en: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Berat (ID)</label>
              <input required value={formData.weight_id} onChange={(e) => setFormData({...formData, weight_id: e.target.value})} placeholder="Misal: 1kg" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Berat (EN)</label>
              <input required value={formData.weight_en} onChange={(e) => setFormData({...formData, weight_en: e.target.value})} placeholder="e.g. 1kg" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Rasa (ID) - Pisahkan dengan koma</label>
              <input required value={formData.taste_profile_id} onChange={(e) => setFormData({...formData, taste_profile_id: e.target.value})} placeholder="Manis, Harum, Segar" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Rasa (EN) - Pisahkan dengan koma</label>
              <input required value={formData.taste_profile_en} onChange={(e) => setFormData({...formData, taste_profile_en: e.target.value})} placeholder="Sweet, Fragrant, Fresh" style={{ width: '100%', padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Gambar URL atau Upload File</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input required value={formData.image_url} onChange={(e) => setFormData({...formData, image_url: e.target.value})} placeholder="https://..." style={{ flex: 1, padding: '8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }} />
                <label style={{ padding: '8px 12px', backgroundColor: '#e5e7eb', borderRadius: '6px', cursor: isUploading ? 'not-allowed' : 'pointer', fontSize: '14px', whiteSpace: 'nowrap', opacity: isUploading ? 0.7 : 1 }}>
                  {isUploading ? 'Loading...' : 'Pilih File'}
                  <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} style={{ display: 'none' }} />
                </label>
              </div>
              {formData.image_url && (
                <div style={{ marginTop: '12px' }}>
                  <img src={formData.image_url} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                </div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '24px' }}>
              <input type="checkbox" id="featured" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} style={{ marginRight: '8px' }} />
              <label htmlFor="featured">Produk Unggulan (Featured)</label>
            </div>
          </div>

          <button disabled={isLoading} type="submit" style={{ padding: '12px', backgroundColor: '#1e4433', color: '#fff', borderRadius: '6px', fontWeight: 'bold', marginTop: '16px', opacity: isLoading ? 0.7 : 1 }}>
            {isLoading ? 'Menyimpan...' : 'Simpan Produk'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Daftar Produk</h2>
        <button onClick={() => { setEditingId(null); setIsEditing(true); }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', backgroundColor: '#1e4433', color: '#fff', borderRadius: '6px', fontWeight: 600 }}>
          <Plus size={18} /> Tambah Produk
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '12px', color: '#4b5563' }}>Gambar</th>
              <th style={{ padding: '12px', color: '#4b5563' }}>Nama Produk</th>
              <th style={{ padding: '12px', color: '#4b5563' }}>Harga</th>
              <th style={{ padding: '12px', color: '#4b5563' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>
                  <img src={product.image} alt={product.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                </td>
                <td style={{ padding: '12px', fontWeight: 500 }}>{product.name}</td>
                <td style={{ padding: '12px', color: '#4b5563' }}>{product.priceRange}</td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => handleEdit(product)} style={{ color: '#3b82f6' }}><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(product.id)} style={{ color: '#ef4444' }} disabled={isLoading}><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
