import { Header } from "@/components/Header";
import DisasterAlerts from "@/components/DisasterAlerts";

const Emergency = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Emergency Response Center</h1>
            <p className="text-muted-foreground">
              Real-time disaster alerts and emergency information
            </p>
          </div>

          <DisasterAlerts />
        </div>
      </main>
    </div>
  );
};

export default Emergency;