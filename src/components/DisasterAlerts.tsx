import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Phone, MapPin, RefreshCw, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DisasterType = 'earthquake' | 'cyclone' | 'flood' | 'tsunami' | 'thunderstorm' | 'fire' | 'drought' | 'landslide';
type Severity = 'minor' | 'moderate' | 'severe' | 'extreme';

interface DisasterAlert {
  id: string;
  alert_id: string;
  disaster_type: DisasterType;
  severity: Severity;
  title: string;
  description: string;
  affected_regions: {
    states: string[];
    districts: string[];
    cities: string[];
  };
  safety_instructions: string[];
  issued_at: string;
  expires_at?: string;
  source: string;
  coordinates?: {
    lat: number;
    lng: number;
    radius: number;
  };
}

const severityColors = {
  minor: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  moderate: 'bg-orange-100 text-orange-800 border-orange-300',
  severe: 'bg-red-100 text-red-800 border-red-300',
  extreme: 'bg-purple-100 text-purple-800 border-purple-300'
};

const disasterIcons = {
  earthquake: '🌍',
  cyclone: '🌀',
  flood: '🌊',
  tsunami: '🌊',
  thunderstorm: '⛈️',
  fire: '🔥',
  drought: '🌵',
  landslide: '⛰️'
};

export default function DisasterAlerts() {
  const [alerts, setAlerts] = useState<DisasterAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      
      // Fetch latest alerts
      const { data, error } = await supabase
        .from('disaster_alerts')
        .select('*')
        .eq('is_active', true)
        .order('issued_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching alerts:', error);
        toast({
          title: "Error",
          description: "Failed to fetch disaster alerts",
          variant: "destructive"
        });
        return;
      }

      setAlerts((data || []).map(alert => ({
        ...alert,
        affected_regions: alert.affected_regions as DisasterAlert['affected_regions'],
        coordinates: alert.coordinates as DisasterAlert['coordinates']
      })));
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch disaster alerts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshAlerts = async () => {
    try {
      // Call the edge function to fetch new alerts
      const { error } = await supabase.functions.invoke('disaster-alerts-fetcher');
      
      if (error) {
        console.error('Error calling edge function:', error);
        toast({
          title: "Error",
          description: "Failed to refresh alerts",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Alerts refreshed successfully",
        });
        // Fetch updated alerts
        await fetchAlerts();
      }
    } catch (error) {
      console.error('Error refreshing alerts:', error);
      toast({
        title: "Error",
        description: "Failed to refresh alerts",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchAlerts();

    // Set up real-time subscription for new alerts
    const channel = supabase
      .channel('disaster-alerts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'disaster_alerts'
        },
        (payload) => {
          console.log('Real-time update:', payload);
          fetchAlerts(); // Refresh alerts when changes occur
          
          if (payload.eventType === 'INSERT') {
            toast({
              title: "New Alert",
              description: "A new disaster alert has been issued",
              variant: "destructive"
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getTimeDifference = (dateString: string) => {
    const now = new Date();
    const alertTime = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="animate-spin mr-2" />
        Loading alerts...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Disaster Alerts</h2>
          <p className="text-muted-foreground">
            Real-time disaster alerts from IMD and NDMA
          </p>
        </div>
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
          <Button onClick={refreshAlerts} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length === 0 ? (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            No active disaster alerts at the moment. Stay prepared and check back regularly.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id} className="border-l-4 border-l-red-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {disasterIcons[alert.disaster_type as keyof typeof disasterIcons] || '⚠️'}
                    </span>
                    <div>
                      <CardTitle className="text-lg">{alert.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={severityColors[alert.severity]}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="secondary">{alert.source}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {getTimeDifference(alert.issued_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-foreground">{alert.description}</p>
                
                {/* Affected Regions */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Affected Regions
                  </h4>
                  <div className="space-y-1 text-sm">
                    {alert.affected_regions.states.length > 0 && (
                      <p><strong>States:</strong> {alert.affected_regions.states.join(', ')}</p>
                    )}
                    {alert.affected_regions.districts.length > 0 && (
                      <p><strong>Districts:</strong> {alert.affected_regions.districts.join(', ')}</p>
                    )}
                    {alert.affected_regions.cities.length > 0 && (
                      <p><strong>Cities:</strong> {alert.affected_regions.cities.join(', ')}</p>
                    )}
                  </div>
                </div>
                
                {/* Safety Instructions */}
                <div>
                  <h4 className="font-semibold mb-2">Safety Instructions</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {alert.safety_instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                </div>
                
                {/* Alert Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t text-sm text-muted-foreground">
                  <p><strong>Issued:</strong> {formatTime(alert.issued_at)}</p>
                  {alert.expires_at && (
                    <p><strong>Expires:</strong> {formatTime(alert.expires_at)}</p>
                  )}
                  <p><strong>Alert ID:</strong> {alert.alert_id}</p>
                  <p><strong>Source:</strong> {alert.source}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}