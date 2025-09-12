import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DisasterAlerts from "@/components/DisasterAlerts";
import HelplineNumbers from "@/components/HelplineNumbers";
import ShelterLocator from "@/components/ShelterLocator";

const Emergency = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Emergency Response Center</h1>
            <p className="text-muted-foreground">
              Real-time disaster alerts, emergency contacts, and shelter locations
            </p>
          </div>

          <Tabs defaultValue="alerts" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="alerts">Disaster Alerts</TabsTrigger>
              <TabsTrigger value="helplines">Emergency Helplines</TabsTrigger>
              <TabsTrigger value="shelters">Shelter Locator</TabsTrigger>
            </TabsList>
            
            <TabsContent value="alerts" className="space-y-6">
              <DisasterAlerts />
            </TabsContent>
            
            <TabsContent value="helplines" className="space-y-6">
              <HelplineNumbers />
            </TabsContent>
            
            <TabsContent value="shelters" className="space-y-6">
              <ShelterLocator />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Emergency;