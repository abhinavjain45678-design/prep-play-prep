import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ShelterRequest {
  latitude: number;
  longitude: number;
  radius_km?: number;
  disaster_type?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: ShelterRequest = await req.json();
    const { latitude, longitude, radius_km = 25, disaster_type } = body;

    if (!latitude || !longitude) {
      return new Response(
        JSON.stringify({ error: 'Latitude and longitude are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Finding shelters near ${latitude}, ${longitude} within ${radius_km}km`);

    // Calculate distance using Haversine formula in SQL
    let query = supabaseClient
      .from('emergency_shelters')
      .select('*')
      .eq('is_active', true);

    // Add disaster type filter if provided
    if (disaster_type) {
      query = query.contains('disaster_types', [disaster_type]);
    }

    const { data: shelters, error } = await query;

    if (error) {
      console.error('Error fetching shelters:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch shelters' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate distances and filter by radius
    const sheltersWithDistance = shelters
      .map(shelter => {
        const distance = calculateDistance(
          latitude,
          longitude,
          parseFloat(shelter.latitude),
          parseFloat(shelter.longitude)
        );
        return { ...shelter, distance_km: distance };
      })
      .filter(shelter => shelter.distance_km <= radius_km)
      .sort((a, b) => a.distance_km - b.distance_km)
      .slice(0, 20); // Limit to 20 nearest shelters

    return new Response(
      JSON.stringify({ 
        success: true,
        shelters: sheltersWithDistance,
        count: sheltersWithDistance.length,
        search_params: {
          latitude,
          longitude,
          radius_km,
          disaster_type
        }
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in shelter-locator:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});

// Haversine formula to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}