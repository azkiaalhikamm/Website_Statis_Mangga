import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { getProducts } from '../data';
import type { Product } from '../data';
import { useLanguage } from '../context/LanguageContext';

export interface SiteSettings {
  site_title: string;
  site_logo_url: string | null;
}

const defaultSettings: SiteSettings = {
  site_title: 'MANGGA DERMAYU',
  site_logo_url: null
};

const LOCAL_STORAGE_CUSTOM_KEY = 'mangga_custom_products_v2';
const LOCAL_STORAGE_DELETED_KEY = 'mangga_deleted_product_ids_v2';

export function useSupabaseData() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>(() => {
    // Check initial local storage
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_CUSTOM_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed parsing local products:', e);
    }
    return getProducts(language);
  });
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to get local overrides
  const getLocalOverrides = useCallback((): { custom: any[]; deleted: string[] } => {
    try {
      const customStr = localStorage.getItem(LOCAL_STORAGE_CUSTOM_KEY);
      const deletedStr = localStorage.getItem(LOCAL_STORAGE_DELETED_KEY);
      return {
        custom: customStr ? JSON.parse(customStr) : [],
        deleted: deletedStr ? JSON.parse(deletedStr) : []
      };
    } catch {
      return { custom: [], deleted: [] };
    }
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const { custom, deleted } = getLocalOverrides();

    // 1. Fetch site settings
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      try {
        const { data: settingsData } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 'global')
          .single();
          
        if (settingsData) {
          setSettings({
            site_title: settingsData.site_title,
            site_logo_url: settingsData.site_logo_url
          });
        }
      } catch (e) {
        console.warn('Error fetching settings:', e);
      }
    }

    // 2. Fetch products
    let baseProducts: Product[] = [];
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      try {
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true });

        if (!productsError && productsData && productsData.length > 0) {
          baseProducts = productsData.map((p) => ({
            id: p.id,
            name: language === 'en' ? (p.name_en || p.name_id) : (p.name_id || p.name_en),
            localName: p.name_id || '',
            description: language === 'en' ? (p.desc_en || p.desc_id) : (p.desc_id || p.desc_en),
            longDescription: language === 'en' ? (p.desc_en || p.desc_id) : (p.desc_id || p.desc_en),
            priceRange: language === 'en' ? (p.price_range_en || p.price_range_id) : (p.price_range_id || p.price_range_en),
            weight: language === 'en' ? (p.weight_en || p.weight_id) : (p.weight_id || p.weight_en),
            tasteProfile: Array.isArray(language === 'en' ? p.taste_profile_en : p.taste_profile_id) 
              ? (language === 'en' ? p.taste_profile_en : p.taste_profile_id) 
              : (Array.isArray(p.taste_profile_id) ? p.taste_profile_id : []),
            image: (p.id === 'agrimania' || (p.image_url && (p.image_url.includes('photo-1605027628030-9bb6f83535e6') || p.image_url.includes('photo-1546548970-71785318a17b')))) 
              ? '/mangga_agrimania.jpg' 
              : (p.image_url || '/mangga_agrimania.jpg'),
            badge: language === 'en' ? (p.badge_en || p.badge_id) : (p.badge_id || p.badge_en),
            badgeColor: p.badge_color || '#f5a623',
            color: p.color || '#1e4433',
            featured: Boolean(p.featured)
          }));
        } else {
          baseProducts = getProducts(language);
        }
      } catch (err) {
        console.warn('Error fetching products from Supabase, using local fallback:', err);
        baseProducts = getProducts(language);
      }
    } else {
      baseProducts = getProducts(language);
    }

    // Filter out deleted items
    let combined = baseProducts.filter(p => !deleted.includes(p.id));

    // Merge with custom or updated items
    if (custom.length > 0) {
      const customMap = new Map(custom.map((c: any) => [c.id, c]));
      // Update existing
      combined = combined.map(p => {
        if (customMap.has(p.id)) {
          const c = customMap.get(p.id);
          customMap.delete(p.id);
          return {
            ...p,
            name: language === 'en' ? (c.name_en || c.name_id || p.name) : (c.name_id || c.name_en || p.name),
            localName: c.name_id || p.localName,
            description: language === 'en' ? (c.desc_en || c.desc_id || p.description) : (c.desc_id || c.desc_en || p.description),
            longDescription: language === 'en' ? (c.desc_en || c.desc_id || p.longDescription) : (c.desc_id || c.desc_en || p.longDescription),
            priceRange: language === 'en' ? (c.price_range_en || c.price_range_id || p.priceRange) : (c.price_range_id || c.price_range_en || p.priceRange),
            weight: language === 'en' ? (c.weight_en || c.weight_id || p.weight) : (c.weight_id || c.weight_en || p.weight),
            tasteProfile: Array.isArray(c.taste_profile_id) ? c.taste_profile_id : (typeof c.taste_profile_id === 'string' ? c.taste_profile_id.split(',').map((s: string) => s.trim()) : p.tasteProfile),
            image: c.image_url || p.image,
            badge: c.badge_id || p.badge,
            badgeColor: c.badge_color || p.badgeColor,
            color: c.color || p.color,
            featured: Boolean(c.featured)
          };
        }
        return p;
      });

      // Add newly created custom items
      customMap.forEach((c: any) => {
        if (!deleted.includes(c.id)) {
          combined.push({
            id: c.id,
            name: language === 'en' ? (c.name_en || c.name_id) : (c.name_id || c.name_en),
            localName: c.name_id || '',
            description: language === 'en' ? (c.desc_en || c.desc_id) : (c.desc_id || c.desc_en),
            longDescription: language === 'en' ? (c.desc_en || c.desc_id) : (c.desc_id || c.desc_en),
            priceRange: language === 'en' ? (c.price_range_en || c.price_range_id) : (c.price_range_id || c.price_range_en),
            weight: language === 'en' ? (c.weight_en || c.weight_id) : (c.weight_id || c.weight_en),
            tasteProfile: Array.isArray(c.taste_profile_id) ? c.taste_profile_id : (typeof c.taste_profile_id === 'string' ? c.taste_profile_id.split(',').map((s: string) => s.trim()) : ['Manis']),
            image: c.image_url || '/mangga_agrimania.jpg',
            badge: c.badge_id || '',
            badgeColor: c.badge_color || '#f5a623',
            color: c.color || '#1e4433',
            featured: Boolean(c.featured)
          });
        }
      });
    }

    setProducts(combined);
    setIsLoading(false);
  }, [language, getLocalOverrides]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Listen for cross-component product updates
  useEffect(() => {
    const handleSync = () => {
      fetchData();
    };
    window.addEventListener('mangga_products_updated', handleSync);
    return () => window.removeEventListener('mangga_products_updated', handleSync);
  }, [fetchData]);

  // CRUD Operation: Save Product (Insert or Update)
  const saveProduct = async (formData: any, editingId?: string | null) => {
    const targetId = editingId || ('prod-' + Date.now());
    const productRecord = {
      ...formData,
      id: targetId,
      taste_profile_id: Array.isArray(formData.taste_profile_id) 
        ? formData.taste_profile_id 
        : (typeof formData.taste_profile_id === 'string' 
            ? formData.taste_profile_id.split(',').map((s: string) => s.trim()).filter(Boolean) 
            : []),
      taste_profile_en: Array.isArray(formData.taste_profile_en) 
        ? formData.taste_profile_en 
        : (typeof formData.taste_profile_en === 'string' 
            ? formData.taste_profile_en.split(',').map((s: string) => s.trim()).filter(Boolean) 
            : []),
      image_url: formData.image_url || '/mangga_agrimania.jpg'
    };

    // 1. Attempt Supabase cloud operation
    try {
      if (editingId) {
        await supabase.from('products').update(productRecord).eq('id', editingId);
      } else {
        await supabase.from('products').insert([productRecord]);
      }
    } catch (e) {
      console.warn('Supabase cloud write was not accepted, continuing with local persistence:', e);
    }

    // 2. Persistent local storage sync
    const { custom, deleted } = getLocalOverrides();
    const updatedDeleted = deleted.filter(id => id !== targetId);
    localStorage.setItem(LOCAL_STORAGE_DELETED_KEY, JSON.stringify(updatedDeleted));

    const existingIndex = custom.findIndex((c: any) => c.id === targetId);
    let updatedCustom: any[];
    if (existingIndex >= 0) {
      updatedCustom = [...custom];
      updatedCustom[existingIndex] = productRecord;
    } else {
      updatedCustom = [...custom, productRecord];
    }
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_KEY, JSON.stringify(updatedCustom));

    // 3. Notify app
    window.dispatchEvent(new CustomEvent('mangga_products_updated'));
    await fetchData();
    return { success: true };
  };

  // CRUD Operation: Delete Product
  const deleteProduct = async (id: string) => {
    // 1. Attempt Supabase delete
    try {
      await supabase.from('products').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase cloud delete was not accepted, continuing with local persistence:', e);
    }

    // 2. Persistent local storage sync
    const { custom, deleted } = getLocalOverrides();
    const updatedCustom = custom.filter((c: any) => c.id !== id);
    localStorage.setItem(LOCAL_STORAGE_CUSTOM_KEY, JSON.stringify(updatedCustom));

    if (!deleted.includes(id)) {
      const updatedDeleted = [...deleted, id];
      localStorage.setItem(LOCAL_STORAGE_DELETED_KEY, JSON.stringify(updatedDeleted));
    }

    // 3. Notify app
    window.dispatchEvent(new CustomEvent('mangga_products_updated'));
    await fetchData();
    return { success: true };
  };

  return { 
    products, 
    settings, 
    isLoading, 
    refreshData: fetchData,
    saveProduct,
    deleteProduct
  };
}
