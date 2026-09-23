import { useEffect, useState } from 'react';
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

export function useSupabaseData() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>(getProducts(language));
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    // If Supabase URL is not configured, just use the local data
    if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
      setProducts(getProducts(language));
      setIsLoading(false);
      return;
    }

    try {
      // Fetch site settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'global')
        .single();
        
      if (!settingsError && settingsData) {
        setSettings({
          site_title: settingsData.site_title,
          site_logo_url: settingsData.site_logo_url
        });
      }

      // Fetch products
      const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true });

        if (!productsError && productsData) {
          const mappedProducts: Product[] = productsData.map((p) => ({
            id: p.id,
            name: language === 'en' ? p.name_en : p.name_id,
            localName: p.name_id || '',
            description: language === 'en' ? p.desc_en : p.desc_id,
            longDescription: language === 'en' ? p.desc_en : p.desc_id,
            priceRange: language === 'en' ? p.price_range_en : p.price_range_id,
            weight: language === 'en' ? p.weight_en : p.weight_id,
            tasteProfile: Array.isArray(language === 'en' ? p.taste_profile_en : p.taste_profile_id) 
              ? (language === 'en' ? p.taste_profile_en : p.taste_profile_id) 
              : [],
            image: p.image_url,
            badge: language === 'en' ? p.badge_en : p.badge_id,
            badgeColor: p.badge_color,
            color: p.color || '#1e4433',
            featured: p.featured
          }));
          setProducts(mappedProducts);
        } else {
          console.error(productsError);
          setProducts(getProducts(language));
        }

      } catch (err) {
      console.error('Error fetching from Supabase:', err);
      setProducts(getProducts(language));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [language]);

  return { products, settings, isLoading, refreshData: fetchData };
}

