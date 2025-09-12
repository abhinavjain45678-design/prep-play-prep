import { Header } from '@/components/Header';
import EmergencyIDCardForm from '@/components/EmergencyIDCardForm';

const EmergencyID = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Emergency ID Card</h1>
            <p className="text-muted-foreground">Manage your emergency contact and medical details</p>
          </div>
          <EmergencyIDCardForm />
        </div>
      </main>
    </div>
  );
};

export default EmergencyID;
