import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Award, Star, Trophy } from "lucide-react";
import { Certificate } from "@/hooks/useGameProgress";

interface CertificateGeneratorProps {
  certificate: Certificate;
  studentName?: string;
}

export const CertificateGenerator = ({ certificate, studentName = "Safety Hero" }: CertificateGeneratorProps) => {
  // Validate certificate data
  if (!certificate || !certificate.id || !certificate.title) {
    return (
      <Card className="text-center py-8">
        <CardContent>
          <p className="text-destructive">Invalid certificate data</p>
        </CardContent>
      </Card>
    );
  }

  const getCertificateColor = () => {
    switch (certificate.level) {
      case 'Gold': return 'from-yellow-400 to-yellow-600';
      case 'Silver': return 'from-gray-400 to-gray-600';
      default: return 'from-orange-400 to-orange-600';
    }
  };

  const getCertificateIcon = () => {
    switch (certificate.level) {
      case 'Gold': return <Trophy className="w-12 h-12" />;
      case 'Silver': return <Star className="w-12 h-12" />;
      default: return <Award className="w-12 h-12" />;
    }
  };

  const handleDownload = () => {
    const certificateElement = document.getElementById(`certificate-${certificate.id}`);
    if (certificateElement) {
      // Create a canvas and draw the certificate
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = 800;
        canvas.height = 600;
        
        // Background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        if (certificate.level === 'Gold') {
          gradient.addColorStop(0, '#FEF3C7');
          gradient.addColorStop(1, '#F59E0B');
        } else if (certificate.level === 'Silver') {
          gradient.addColorStop(0, '#F1F5F9');
          gradient.addColorStop(1, '#64748B');
        } else {
          gradient.addColorStop(0, '#FED7AA');
          gradient.addColorStop(1, '#EA580C');
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Border
        ctx.strokeStyle = '#1F2937';
        ctx.lineWidth = 8;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
        
        // Title
        ctx.fillStyle = '#1F2937';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('CERTIFICATE OF ACHIEVEMENT', canvas.width / 2, 120);
        
        // Student name
        ctx.font = 'bold 36px Arial';
        ctx.fillText(`Awarded to: ${studentName}`, canvas.width / 2, 200);
        
        // Achievement
        ctx.font = '24px Arial';
        ctx.fillText(certificate.title, canvas.width / 2, 280);
        ctx.fillText(certificate.description, canvas.width / 2, 320);
        
        // Score
        ctx.font = 'bold 32px Arial';
        ctx.fillStyle = certificate.level === 'Gold' ? '#B45309' : '#374151';
        ctx.fillText(`Score: ${certificate.score.toFixed(1)}%`, canvas.width / 2, 380);
        
        // Level badge
        ctx.fillStyle = '#1F2937';
        ctx.font = 'bold 28px Arial';
        ctx.fillText(`${certificate.level} Level`, canvas.width / 2, 430);
        
        // Date
        ctx.font = '20px Arial';
        ctx.fillStyle = '#6B7280';
        ctx.fillText(`Earned on: ${certificate.earnedAt.toLocaleDateString()}`, canvas.width / 2, 500);
        
        // SafeLearn signature
        ctx.font = 'italic 18px Arial';
        ctx.fillText('SafeLearn Disaster Preparedness Platform', canvas.width / 2, 550);
        
        // Download
        const link = document.createElement('a');
        link.download = `${studentName}-${certificate.title}-Certificate.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    }
  };

  return (
    <div className="mb-6">
      <Card 
        id={`certificate-${certificate.id}`}
        className={`bg-gradient-to-br ${getCertificateColor()} text-white border-0 shadow-xl`}
      >
        <CardContent className="p-8 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-x-10 -translate-y-10" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 translate-y-16" />
          
          <div className="relative z-10">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white">
              CERTIFICATE OF ACHIEVEMENT
            </Badge>
            
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-full">
                {getCertificateIcon()}
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Awarded to:</h2>
            <h1 className="text-4xl font-bold mb-4 text-yellow-200">{studentName}</h1>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold">{certificate.title}</h3>
              <p className="text-white/90 mt-2">{certificate.description}</p>
            </div>
            
            <div className="flex justify-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold">{certificate.score.toFixed(1)}%</div>
                <div className="text-sm text-white/80">Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{certificate.level}</div>
                <div className="text-sm text-white/80">Level</div>
              </div>
            </div>
            
            <div className="text-sm text-white/80 mb-6">
              Earned on: {certificate.earnedAt ? new Date(certificate.earnedAt).toLocaleDateString() : 'Unknown date'}
            </div>
            
            <div className="border-t border-white/20 pt-4">
              <p className="text-sm italic text-white/90">
                SafeLearn Disaster Preparedness Platform
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center mt-4">
        <Button 
          onClick={handleDownload}
          variant="outline"
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download Certificate
        </Button>
      </div>
    </div>
  );
};