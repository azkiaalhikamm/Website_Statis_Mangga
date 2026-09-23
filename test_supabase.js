import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ojlnirdkpstyttektnxl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qbG5pcmRrcHN0eXR0ZWt0bnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4OTc5MDAsImV4cCI6MjEwMzQ3MzkwMH0.viQ-1uUQBC0UJHQoFMkyvmIEU8nDHlwJ5IDAJ_Wapys';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  const { data, error } = await supabase.from('products').insert([
    {
      id: 'test-123',
      name_id: 'Test',
      name_en: 'Test',
      desc_id: 'Test',
      desc_en: 'Test',
      price_range_id: 'Test',
      price_range_en: 'Test',
      weight_id: 'Test',
      weight_en: 'Test',
      taste_profile_id: ['Test'],
      taste_profile_en: ['Test'],
      image_url: 'Test',
      color: '#fff'
    }
  ]);
  console.log('Error:', error);
  console.log('Data:', data);
}

testInsert();
