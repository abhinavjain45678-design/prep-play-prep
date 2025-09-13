import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Phone, MapPin, Heart, Shield, Building2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface EmergencyIDCardGeneratorProps {
  data: {
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
  };
}

export const EmergencyIDCardGenerator = ({ data }: EmergencyIDCardGeneratorProps) => {
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      // Import html2canvas dynamically
      const html2canvas = await import('html2canvas');
      
      const canvas = await html2canvas.default(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `emergency-id-card-${data.student_name.replace(/\s+/g, '-').toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Downloaded Successfully",
        description: "Your Emergency ID Card has been downloaded.",
      });
    } catch (error) {
      console.error('Failed to download:', error);
      toast({
        title: "Download Failed",
        description: "Failed to download the ID card. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* ID Card Preview */}
      <div ref={cardRef} className="mx-auto" style={{ width: '320px', height: '200px' }}>
        <Card className="w-full h-full bg-gradient-to-br from-red-600 to-red-800 text-white relative overflow-hidden">
          <CardContent className="p-4 h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span className="text-xs font-bold">EMERGENCY ID</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                {data.student_id}
              </Badge>
            </div>

            {/* Student Info */}
            <div className="space-y-2">
              <h3 className="font-bold text-sm leading-tight">{data.student_name}</h3>
              <p className="text-xs opacity-90">{data.college_name}</p>
              
              {/* Blood Group */}
              {data.blood_group && (
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span className="text-xs font-semibold">Blood: {data.blood_group}</span>
                </div>
              )}

              {/* Emergency Contact */}
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span className="text-xs">{data.emergency_contact_number}</span>
              </div>

              {/* Medical Conditions */}
              {data.medical_conditions && (
                <div className="text-xs opacity-90">
                  <span className="font-medium">Medical: </span>
                  <span className="truncate">{data.medical_conditions}</span>
                </div>
              )}
            </div>

            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-6 translate-x-6"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-4 -translate-x-4"></div>
          </CardContent>
        </Card>
      </div>

      {/* Full Details Card */}
      <Card className="bg-card">
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Emergency Information Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Full Name:</span>
                <p className="text-muted-foreground">{data.student_name}</p>
              </div>
              <div>
                <span className="font-medium">Student ID:</span>
                <p className="text-muted-foreground">{data.student_id}</p>
              </div>
              <div>
                <span className="font-medium">Mobile:</span>
                <p className="text-muted-foreground">{data.mobile_number}</p>
              </div>
              <div>
                <span className="font-medium">Email:</span>
                <p className="text-muted-foreground">{data.email}</p>
              </div>
              <div>
                <span className="font-medium">Emergency Contact:</span>
                <p className="text-muted-foreground">{data.emergency_contact_name}</p>
                <p className="text-muted-foreground">{data.emergency_contact_number}</p>
              </div>
              {data.blood_group && (
                <div>
                  <span className="font-medium">Blood Group:</span>
                  <p className="text-muted-foreground">{data.blood_group}</p>
                </div>
              )}
            </div>

            {data.medical_conditions && (
              <div>
                <span className="font-medium">Medical Conditions:</span>
                <p className="text-muted-foreground">{data.medical_conditions}</p>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Nearby Emergency Services
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Police Station:</span>
                  <p className="text-muted-foreground">{data.nearest_police_station}</p>
                </div>
                <div>
                  <span className="font-medium">Hospital:</span>
                  <p className="text-muted-foreground">{data.nearest_hospital}</p>
                </div>
                <div>
                  <span className="font-medium">Shelter:</span>
                  <p className="text-muted-foreground">{data.nearest_shelter}</p>
                </div>
              </div>
            </div>

            <div>
              <span className="font-medium">Address:</span>
              <p className="text-muted-foreground">{data.address}</p>
            </div>
          </div>

          <div className="mt-6">
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download ID Card
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyIDCardGenerator;