-- Create enum for disaster types
CREATE TYPE public.disaster_type AS ENUM (
  'earthquake',
  'cyclone', 
  'flood',
  'tsunami',
  'thunderstorm',
  'fire',
  'drought',
  'landslide'
);

-- Create enum for alert severity
CREATE TYPE public.alert_severity AS ENUM (
  'minor',
  'moderate', 
  'severe',
  'extreme'
);

-- Create disaster alerts table
CREATE TABLE public.disaster_alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  alert_id TEXT UNIQUE NOT NULL,
  disaster_type disaster_type NOT NULL,
  severity alert_severity NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  affected_regions JSONB NOT NULL, -- {states: [], districts: [], cities: []}
  safety_instructions TEXT[] NOT NULL,
  issued_at TIMESTAMP WITH TIME ZONE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  source TEXT NOT NULL, -- 'IMD', 'NDMA', etc.
  coordinates JSONB, -- {lat: number, lng: number, radius: number}
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create helpline numbers table
CREATE TABLE public.helpline_numbers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  disaster_type disaster_type NOT NULL,
  state TEXT NOT NULL,
  district TEXT,
  helpline_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  is_toll_free BOOLEAN DEFAULT false,
  is_24x7 BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create emergency shelters table
CREATE TABLE public.emergency_shelters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  state TEXT NOT NULL,
  district TEXT NOT NULL,
  city TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  capacity INTEGER,
  contact_number TEXT,
  facilities TEXT[], -- ['medical', 'food', 'water', 'electricity']
  disaster_types disaster_type[] NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user alert preferences table
CREATE TABLE public.user_alert_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  alert_radius_km INTEGER DEFAULT 50,
  disaster_types disaster_type[] NOT NULL DEFAULT ARRAY['earthquake', 'cyclone', 'flood', 'tsunami', 'thunderstorm', 'fire']::disaster_type[],
  push_notifications BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.disaster_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.helpline_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_shelters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_alert_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for disaster_alerts (public read)
CREATE POLICY "Anyone can view active disaster alerts"
ON public.disaster_alerts
FOR SELECT
USING (is_active = true);

-- Create policies for helpline_numbers (public read)
CREATE POLICY "Anyone can view helpline numbers"
ON public.helpline_numbers
FOR SELECT
USING (true);

-- Create policies for emergency_shelters (public read)
CREATE POLICY "Anyone can view active emergency shelters"
ON public.emergency_shelters
FOR SELECT
USING (is_active = true);

-- Create policies for user_alert_preferences
CREATE POLICY "Users can view their own alert preferences"
ON public.user_alert_preferences
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own alert preferences"
ON public.user_alert_preferences
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own alert preferences"
ON public.user_alert_preferences
FOR UPDATE
USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_disaster_alerts_active ON public.disaster_alerts(is_active, issued_at DESC);
CREATE INDEX idx_disaster_alerts_region ON public.disaster_alerts USING GIN(affected_regions);
CREATE INDEX idx_disaster_alerts_coordinates ON public.disaster_alerts USING GIN(coordinates);
CREATE INDEX idx_helpline_state_disaster ON public.helpline_numbers(state, disaster_type);
CREATE INDEX idx_shelters_location ON public.emergency_shelters(latitude, longitude);
CREATE INDEX idx_shelters_disaster_types ON public.emergency_shelters USING GIN(disaster_types);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_disaster_alerts_updated_at
  BEFORE UPDATE ON public.disaster_alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_helpline_numbers_updated_at
  BEFORE UPDATE ON public.helpline_numbers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_emergency_shelters_updated_at
  BEFORE UPDATE ON public.emergency_shelters
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_alert_preferences_updated_at
  BEFORE UPDATE ON public.user_alert_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable real-time for disaster alerts
ALTER TABLE public.disaster_alerts REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.disaster_alerts;