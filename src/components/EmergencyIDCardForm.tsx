import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, IdCard, CreditCard } from 'lucide-react';
import { EmergencyIDCardGenerator } from './EmergencyIDCardGenerator';

interface IdCardData {
  student_name: string;
  student_id: string;
  mobile_number: string;
  emergency_contact_name: string;
  emergency_contact_number: string;
  email: string;
  blood_group: string;
  medical_conditions: string;
  nearest_police_station: string;
  nearest_hospital: string;
  nearest_shelter: string;
  college_name: string;
  address: string;
}

const initialState: IdCardData = {
  student_name: '',
  student_id: '',
  mobile_number: '',
  emergency_contact_name: '',
  emergency_contact_number: '',
  email: '',
  blood_group: '',
  medical_conditions: '',
  nearest_police_station: '',
  nearest_hospital: '',
  nearest_shelter: '',
  college_name: '',
  address: '',
};

export const EmergencyIDCardForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [data, setData] = useState<IdCardData>(initialState);
  const [showIdCard, setShowIdCard] = useState(false);

  useEffect(() => {
    document.title = 'Emergency ID Card | SafeLearn';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Create and manage your emergency ID card with contact and medical details.');
    const link = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', `${window.location.origin}/emergency-id`);
    if (!link.parentNode) document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const { data: userRes } = await supabase.auth.getUser();
        const user = userRes.user;
        if (!user) return;

        const { data: rows, error } = await supabase
          .from('emergency_id_cards')
          .select('*')
          .eq('user_id', user.id)
          .limit(1);

        if (error) throw error;

        const existing = rows?.[0];
        if (existing) {
          setId(existing.id);
          setData({
            student_name: existing.student_name,
            student_id: existing.student_id,
            mobile_number: existing.mobile_number,
            emergency_contact_name: existing.emergency_contact_name,
            emergency_contact_number: existing.emergency_contact_number,
            email: existing.email,
            blood_group: existing.blood_group ?? '',
            medical_conditions: existing.medical_conditions ?? '',
            nearest_police_station: existing.nearest_police_station,
            nearest_hospital: existing.nearest_hospital,
            nearest_shelter: existing.nearest_shelter,
            college_name: existing.college_name,
            address: existing.address,
          });
          // Show ID card if data exists
          setShowIdCard(true);
        }
      } catch (e: any) {
        console.error(e);
        toast({ title: 'Failed to load', description: e.message, variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [toast]);

  const onChange = (key: keyof IdCardData, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes.user;
      if (!user) throw new Error('Not authenticated');

      if (id) {
        const { error } = await supabase
          .from('emergency_id_cards')
          .update({ ...data })
          .eq('id', id);
        if (error) throw error;
        toast({ title: 'Updated', description: 'Emergency ID card updated successfully.' });
      } else {
        const { data: insertData, error } = await supabase
          .from('emergency_id_cards')
          .insert([{ user_id: user.id, ...data }])
          .select('id')
          .single();
        if (error) throw error;
        setId(insertData.id);
        toast({ title: 'Saved', description: 'Emergency ID card created successfully.' });
      }
      
      // Show ID card after successful save
      setShowIdCard(true);
    } catch (e: any) {
      console.error(e);
      toast({ title: 'Save failed', description: e.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  // If showing ID card and data is filled
  if (showIdCard && data.student_name) {
    return (
      <div className="space-y-6">
        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md gradient-primary">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Your Emergency ID Card</h2>
                  <p className="text-sm text-muted-foreground">Your emergency information is ready!</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowIdCard(false)}
                className="text-sm"
              >
                Edit Details
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <EmergencyIDCardGenerator data={data} />
      </div>
    );
  }

  return (
    <Card className="bg-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-md gradient-primary">
            <IdCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Emergency ID Card</h2>
            <p className="text-sm text-muted-foreground">Store critical info to help responders in emergencies.</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="student_name">Full name</Label>
              <Input id="student_name" value={data.student_name} onChange={(e) => onChange('student_name', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="student_id">Student ID</Label>
              <Input id="student_id" value={data.student_id} onChange={(e) => onChange('student_id', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="mobile_number">Mobile number</Label>
              <Input id="mobile_number" value={data.mobile_number} onChange={(e) => onChange('mobile_number', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={data.email} onChange={(e) => onChange('email', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="emergency_contact_name">Emergency contact name</Label>
              <Input id="emergency_contact_name" value={data.emergency_contact_name} onChange={(e) => onChange('emergency_contact_name', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="emergency_contact_number">Emergency contact number</Label>
              <Input id="emergency_contact_number" value={data.emergency_contact_number} onChange={(e) => onChange('emergency_contact_number', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="blood_group">Blood group</Label>
              <Input id="blood_group" value={data.blood_group} onChange={(e) => onChange('blood_group', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="medical_conditions">Medical conditions</Label>
              <Input id="medical_conditions" value={data.medical_conditions} onChange={(e) => onChange('medical_conditions', e.target.value)} />
            </div>
            <div>
              <Label htmlFor="nearest_police_station">Nearest police station</Label>
              <Input id="nearest_police_station" value={data.nearest_police_station} onChange={(e) => onChange('nearest_police_station', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="nearest_hospital">Nearest hospital</Label>
              <Input id="nearest_hospital" value={data.nearest_hospital} onChange={(e) => onChange('nearest_hospital', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="nearest_shelter">Nearest shelter</Label>
              <Input id="nearest_shelter" value={data.nearest_shelter} onChange={(e) => onChange('nearest_shelter', e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="college_name">College/Organization</Label>
              <Input id="college_name" value={data.college_name} onChange={(e) => onChange('college_name', e.target.value)} required />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" value={data.address} onChange={(e) => onChange('address', e.target.value)} required />
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...</> : 'Save & Generate ID Card'}
            </Button>
            {id && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowIdCard(true)}
                className="flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                View ID Card
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmergencyIDCardForm;
