-- Create emergency ID cards table
CREATE TABLE public.emergency_id_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  student_name TEXT NOT NULL,
  student_id TEXT NOT NULL,
  mobile_number TEXT NOT NULL,
  emergency_contact_name TEXT NOT NULL,
  emergency_contact_number TEXT NOT NULL,
  email TEXT NOT NULL,
  blood_group TEXT,
  medical_conditions TEXT,
  nearest_police_station TEXT NOT NULL,
  nearest_hospital TEXT NOT NULL,
  nearest_shelter TEXT NOT NULL,
  college_name TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.emergency_id_cards ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own emergency ID card" 
ON public.emergency_id_cards 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own emergency ID card" 
ON public.emergency_id_cards 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own emergency ID card" 
ON public.emergency_id_cards 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own emergency ID card" 
ON public.emergency_id_cards 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_emergency_id_cards_updated_at
BEFORE UPDATE ON public.emergency_id_cards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();