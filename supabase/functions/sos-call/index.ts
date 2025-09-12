const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SosPayload {
  to: string;
  message?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { to, message }: SosPayload = await req.json();

    if (!to) {
      return new Response(
        JSON.stringify({ error: 'Missing required field: to' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID') ?? '';
    const AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN') ?? '';
    const FROM_NUMBER = Deno.env.get('TWILIO_PHONE_NUMBER') ?? '';

    if (!ACCOUNT_SID || !AUTH_TOKEN || !FROM_NUMBER) {
      console.error('Twilio secrets missing');
      return new Response(
        JSON.stringify({ error: 'Twilio configuration missing on server' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const voiceMessage = message || 'This is an automated SOS call from SafeLearn. Please contact the user immediately. This is urgent.';

    const url = `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Calls.json`;

    const body = new URLSearchParams({
      From: FROM_NUMBER,
      To: to,
      Twiml: `<Response><Say voice="alice">${voiceMessage}</Say></Response>`
    });

    const authHeader = 'Basic ' + btoa(`${ACCOUNT_SID}:${AUTH_TOKEN}`);

    const twilioRes = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });

    const twilioData = await twilioRes.json();

    if (!twilioRes.ok) {
      console.error('Twilio error:', twilioData);
      return new Response(
        JSON.stringify({ error: 'Failed to initiate SOS call', details: twilioData }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, call_sid: twilioData.sid }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('sos-call error:', error);
    return new Response(
      JSON.stringify({ error: error.message ?? 'Unexpected error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});