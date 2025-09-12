import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DisasterAlert {
  alert_id: string;
  disaster_type: string;
  severity: string;
  title: string;
  description: string;
  affected_regions: {
    states: string[];
    districts: string[];
    cities: string[];
  };
  safety_instructions: string[];
  issued_at: string;
  expires_at?: string;
  source: string;
  coordinates?: {
    lat: number;
    lng: number;
    radius: number;
  };
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

    console.log('Starting disaster alerts fetch...');

    // Fetch alerts from multiple sources
    const alerts: DisasterAlert[] = [];

    // Simulate IMD API data (In production, replace with actual IMD API calls)
    const mockIMDAlerts = [
      {
        alert_id: 'IMD-2025-001',
        disaster_type: 'cyclone',
        severity: 'severe',
        title: 'Cyclonic Storm Warning',
        description: 'A severe cyclonic storm is approaching the eastern coast. Wind speeds may reach 120 km/h.',
        affected_regions: {
          states: ['Odisha', 'West Bengal'],
          districts: ['Puri', 'Balasore', 'North 24 Parganas'],
          cities: ['Bhubaneswar', 'Kolkata', 'Paradip']
        },
        safety_instructions: [
          'Stay indoors and avoid venturing out',
          'Keep emergency supplies ready',
          'Follow evacuation orders if issued',
          'Avoid coastal areas and low-lying regions'
        ],
        issued_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        source: 'IMD',
        coordinates: {
          lat: 20.2961,
          lng: 85.8245,
          radius: 200
        }
      },
      {
        alert_id: 'IMD-2025-002',
        disaster_type: 'thunderstorm',
        severity: 'moderate',
        title: 'Thunderstorm Alert',
        description: 'Thunderstorm with lightning and moderate rainfall expected.',
        affected_regions: {
          states: ['Maharashtra', 'Gujarat'],
          districts: ['Mumbai', 'Pune', 'Ahmedabad'],
          cities: ['Mumbai', 'Pune', 'Ahmedabad', 'Surat']
        },
        safety_instructions: [
          'Avoid open areas during thunderstorm',
          'Stay away from metal objects and tall trees',
          'Unplug electrical appliances',
          'If driving, pull over safely'
        ],
        issued_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        source: 'IMD',
        coordinates: {
          lat: 19.0760,
          lng: 72.8777,
          radius: 150
        }
      }
    ];

    // Simulate NDMA API data
    const mockNDMAAlerts = [
      {
        alert_id: 'NDMA-2025-001',
        disaster_type: 'earthquake',
        severity: 'extreme',
        title: 'Earthquake Alert - High Risk Zone',
        description: 'Seismic activity detected. Magnitude 6.2 earthquake possible in the region.',
        affected_regions: {
          states: ['Uttarakhand', 'Himachal Pradesh'],
          districts: ['Dehradun', 'Shimla', 'Chamoli'],
          cities: ['Dehradun', 'Shimla', 'Rishikesh']
        },
        safety_instructions: [
          'Drop, Cover, and Hold On during shaking',
          'Stay away from buildings and power lines',
          'Have emergency kit ready',
          'Identify safe spots in your home'
        ],
        issued_at: new Date().toISOString(),
        source: 'NDMA',
        coordinates: {
          lat: 30.0668,
          lng: 79.0193,
          radius: 100
        }
      }
    ];

    alerts.push(...mockIMDAlerts, ...mockNDMAAlerts);

    // Store alerts in database
    for (const alert of alerts) {
      const { error } = await supabaseClient
        .from('disaster_alerts')
        .upsert(alert, {
          onConflict: 'alert_id'
        });

      if (error) {
        console.error('Error inserting alert:', error);
      } else {
        console.log(`Alert ${alert.alert_id} inserted/updated successfully`);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Processed ${alerts.length} alerts`,
        alerts_processed: alerts.length
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in disaster-alerts-fetcher:', error);
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