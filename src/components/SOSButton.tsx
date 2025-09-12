import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, PhoneCall } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const SOSButton = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [contactNumber, setContactNumber] = useState<string | null>(null);
  const [studentName, setStudentName] = useState<string | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes.user;
      if (!user) return;

      const { data, error } = await supabase
        .from('emergency_id_cards')
        .select('emergency_contact_number, student_name')
        .eq('user_id', user.id)
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        setContactNumber(data.emergency_contact_number);
        setStudentName(data.student_name);
      }
    };

    fetchContact();
  }, []);

  const handleSOS = async () => {
    if (!contactNumber) {
      toast({ title: 'Add an emergency contact', description: 'Create your Emergency ID card to enable SOS.', variant: 'destructive' });
      return;
    }
    try {
      setLoading(true);
      const message = `Emergency! ${studentName ?? 'User'} needs immediate help. Please call back now.`;
      const { data, error } = await supabase.functions.invoke('sos-call', {
        body: { to: contactNumber, message },
      });

      if (error) throw error;
      toast({ title: 'SOS Call initiated', description: `Call SID: ${data?.call_sid ?? 'created'}` });
    } catch (err: any) {
      console.error(err);
      toast({ title: 'Failed to send SOS', description: err.message ?? 'Please try again later', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-card">
      <div className="flex items-center gap-3 mb-3">
        <AlertTriangle className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">SOS Quick Help</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        One-tap SOS will place an automated call to your emergency contact.
      </p>
      <Button onClick={handleSOS} disabled={loading} className="gap-2">
        <PhoneCall className="w-4 h-4" />
        {loading ? 'Calling...' : 'Send SOS Call'}
      </Button>
      {!contactNumber && (
        <p className="text-xs text-muted-foreground mt-2">
          Tip: Set your emergency contact in your Emergency ID card.
        </p>
      )}
    </div>
  );
};

export default SOSButton;
