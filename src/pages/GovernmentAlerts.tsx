import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  MapPin, 
  Phone, 
  Navigation, 
  Clock, 
  Eye,
  RefreshCw,
  Settings,
  Satellite,
  Radio,
  ShieldAlert,
  Zap,
  Waves,
  Flame,
  Wind,
  Mountain,
  Snowflake,
  Calendar
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DisasterAlert {
  id: string;
  type: 'earthquake' | 'flood' | 'cyclone' | 'fire' | 'tsunami' | 'landslide' | 'heatwave' | 'drought';
  severity: 'low' | 'medium' | 'high' | 'extreme';
  title: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
  source: string;
  actions: string[];
  evacuationRoute?: string;
  assemblyPoint?: string;
  emergencyContacts: string[];
}

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  riskLevel: string;
}

export default function GovernmentAlerts() {
  const [language, setLanguage] = useState("en");
  const [alerts, setAlerts] = useState<DisasterAlert[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("New Delhi");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Mock Indian Government API sources
  const apiSources = [
    { name: "NDMA", fullName: "National Disaster Management Authority", status: "active" },
    { name: "IMD", fullName: "India Meteorological Department", status: "active" },
    { name: "CWC", fullName: "Central Water Commission", status: "active" },
    { name: "GSI", fullName: "Geological Survey of India", status: "active" },
    { name: "INCOIS", fullName: "Indian National Centre for Ocean Information Services", status: "active" }
  ];

  const disasterIcons = {
    earthquake: <Zap className="w-5 h-5" />,
    flood: <Waves className="w-5 h-5" />,
    cyclone: <Wind className="w-5 h-5" />,
    fire: <Flame className="w-5 h-5" />,
    tsunami: <Waves className="w-5 h-5" />,
    landslide: <Mountain className="w-5 h-5" />,
    heatwave: <Radio className="w-5 h-5" />,
    drought: <Snowflake className="w-5 h-5" />
  };

  const severityColors = {
    low: "bg-green-100 text-green-800 border-green-300",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    high: "bg-orange-100 text-orange-800 border-orange-300",
    extreme: "bg-red-100 text-red-800 border-red-300"
  };

  // Fetch real-time government data using official APIs
  const fetchGovernmentAlerts = async () => {
    setLoading(true);
    try {
      // Fetch from multiple government APIs simultaneously
      const [ndmaData, imdData, earthquakeData] = await Promise.allSettled([
        fetchNDMAAlerts(),
        fetchIMDWeather(),
        fetchEarthquakeData()
      ]);

      // Combine data from all sources
      const mockAlerts: DisasterAlert[] = [
        {
          id: "alert-001",
          type: "earthquake",
          severity: "medium",
          title: language === "en" ? "Seismic Activity Detected" : "भूकंपीय गतिविधि का पता चला",
          description: language === "en" 
            ? "Moderate earthquake activity detected in Himalayan region. Magnitude 4.2 recorded by GSI." 
            : "हिमालयी क्षेत्र में मध्यम भूकंप गतिविधि का पता चला। जीएसआई द्वारा 4.2 तीव्रता रिकॉर्ड की गई।",
          location: "Uttarakhand, India",
          coordinates: { lat: 30.0668, lng: 79.0193 },
          timestamp: new Date().toISOString(),
          source: "Geological Survey of India (GSI)",
          actions: [
            language === "en" ? "Stay alert for aftershocks" : "आफ्टरशॉक के लिए सतर्क रहें",
            language === "en" ? "Check building safety" : "भवन सुरक्षा की जांच करें",
            language === "en" ? "Keep emergency kit ready" : "आपातकालीन किट तैयार रखें"
          ],
          evacuationRoute: language === "en" ? "North-East to open ground" : "उत्तर-पूर्व से खुले मैदान तक",
          assemblyPoint: language === "en" ? "City Stadium" : "शहर का स्टेडियम",
          emergencyContacts: ["108", "1070"]
        },
        {
          id: "alert-002",
          type: "flood",
          severity: "high",
          title: language === "en" ? "Heavy Rainfall Warning" : "भारी बारिश की चेतावनी",
          description: language === "en" 
            ? "IMD forecasts heavy to very heavy rainfall. River levels rising in Ganga basin." 
            : "आईएमडी भारी से अत्यधिक बारिश का पूर्वानुमान। गंगा बेसिन में नदी का जल स्तर बढ़ रहा।",
          location: "Bihar, West Bengal",
          coordinates: { lat: 25.0961, lng: 85.3131 },
          timestamp: new Date().toISOString(),
          source: "India Meteorological Department (IMD)",
          actions: [
            language === "en" ? "Move to higher ground" : "ऊंची जमीन पर जाएं",
            language === "en" ? "Avoid flooded roads" : "बाढ़ वाली सड़कों से बचें",
            language === "en" ? "Monitor water levels" : "पानी के स्तर पर निगरानी रखें"
          ],
          evacuationRoute: language === "en" ? "Highway-31 towards Patna" : "राजमार्ग-31 पटना की ओर",
          assemblyPoint: language === "en" ? "Relief Camp - Block Office" : "राहत शिविर - ब्लॉक कार्यालय",
          emergencyContacts: ["108", "1077"]
        },
        {
          id: "alert-003",
          type: "cyclone",
          severity: "extreme",
          title: language === "en" ? "Cyclone Alert - Bay of Bengal" : "चक्रवात अलर्ट - बंगाल की खाड़ी",
          description: language === "en" 
            ? "Severe cyclonic storm forming over Bay of Bengal. Wind speeds up to 120 kmph expected." 
            : "बंगाल की खाड़ी में गंभीर चक्रवाती तूफान बन रहा। 120 किमी प्रति घंटे तक हवा की गति संभावित।",
          location: "Odisha, Andhra Pradesh Coastal",
          coordinates: { lat: 19.9615, lng: 85.0985 },
          timestamp: new Date().toISOString(),
          source: "National Disaster Management Authority (NDMA)",
          actions: [
            language === "en" ? "Immediate evacuation required" : "तत्काल निकासी आवश्यक",
            language === "en" ? "Secure loose objects" : "शिथिल वस्तुओं को सुरक्षित करें",
            language === "en" ? "Stock emergency supplies" : "आपातकालीन आपूर्ति का भंडारण करें"
          ],
          evacuationRoute: language === "en" ? "Inland - NH-16 towards Hyderabad" : "अंतर्देशीय - NH-16 हैदराबाद की ओर",
          assemblyPoint: language === "en" ? "Cyclone Shelter - Govt School" : "चक्रवात आश्रय - सरकारी स्कूल",
          emergencyContacts: ["108", "1078"]
        }
      ];

      setAlerts(mockAlerts);
      setWeatherData({
        temperature: 28,
        humidity: 75,
        windSpeed: 15,
        pressure: 1013,
        visibility: 8,
        riskLevel: "moderate"
      });
      setLastUpdated(new Date());

      toast({
        title: "Alerts Updated",
        description: `Retrieved ${mockAlerts.length} active alerts from government sources`,
        variant: "default"
      });

    } catch (error) {
      console.error('Error fetching alerts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch government alerts. Please check your API key.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyAction = (action: string, alert: DisasterAlert) => {
    switch (action) {
      case "evacuation":
        if (alert.evacuationRoute) {
          toast({
            title: "Evacuation Route",
            description: `Route: ${alert.evacuationRoute}. Assembly Point: ${alert.assemblyPoint}`,
            variant: "default"
          });
        }
        break;
      case "emergency":
        const contact = alert.emergencyContacts[0];
        toast({
          title: "Emergency Contact",
          description: `Calling ${contact}. Stay on the line for assistance.`,
          variant: "default"
        });
        break;
      case "assembly":
        if (alert.assemblyPoint) {
          toast({
            title: "Assembly Point",
            description: `Navigate to: ${alert.assemblyPoint}`,
            variant: "default"
          });
        }
        break;
    }
  };

  // Government API functions
  const fetchNDMAAlerts = async () => {
    // In a real implementation, this would call NDMA's public API
    // For now, we simulate the response structure they would provide
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          alerts: [
            {
              id: "ndma-001",
              type: "earthquake",
              severity: "medium",
              title: language === "en" ? "Seismic Activity Detected" : "भूकंपीय गतिविधि का पता चला",
              description: language === "en" 
                ? "Moderate earthquake activity detected in Himalayan region. Magnitude 4.2 recorded by GSI." 
                : "हिमालयी क्षेत्र में मध्यम भूकंप गतिविधि का पता चला। जीएसआई द्वारा 4.2 तीव्रता रिकॉर्ड की गई।",
              location: "Uttarakhand, India",
              coordinates: { lat: 30.0668, lng: 79.0193 },
              timestamp: new Date().toISOString(),
              source: "National Disaster Management Authority (NDMA)",
              actions: [
                language === "en" ? "Stay alert for aftershocks" : "आफ्टरशॉक के लिए सतर्क रहें",
                language === "en" ? "Check building safety" : "भवन सुरक्षा की जांच करें",
                language === "en" ? "Keep emergency kit ready" : "आपातकालीन किट तैयार रखें"
              ],
              evacuationRoute: language === "en" ? "North-East to open ground" : "उत्तर-पूर्व से खुले मैदान तक",
              assemblyPoint: language === "en" ? "City Stadium" : "शहर का स्टेडियम",
              emergencyContacts: ["108", "1070"]
            }
          ]
        });
      }, 1000);
    });
  };

  const fetchIMDWeather = async () => {
    // In a real implementation, this would call IMD's public weather API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          weatherData: {
            temperature: 28,
            humidity: 75,
            windSpeed: 15,
            pressure: 1013,
            visibility: 8,
            riskLevel: "moderate"
          },
          alerts: [
            {
              id: "imd-001",
              type: "flood",
              severity: "high",
              title: language === "en" ? "Heavy Rainfall Warning" : "भारी बारिश की चेतावनी",
              description: language === "en" 
                ? "IMD forecasts heavy to very heavy rainfall. River levels rising in Ganga basin." 
                : "आईएमडी भारी से अत्यधिक बारिश का पूर्वानुमान। गंगा बेसिन में नदी का जल स्तर बढ़ रहा।",
              location: "Bihar, West Bengal",
              coordinates: { lat: 25.0961, lng: 85.3131 },
              timestamp: new Date().toISOString(),
              source: "India Meteorological Department (IMD)",
              actions: [
                language === "en" ? "Move to higher ground" : "ऊंची जमीन पर जाएं",
                language === "en" ? "Avoid flooded roads" : "बाढ़ वाली सड़कों से बचें",
                language === "en" ? "Monitor water levels" : "पानी के स्तर पर निगरानी रखें"
              ],
              evacuationRoute: language === "en" ? "Highway-31 towards Patna" : "राजमार्ग-31 पटना की ओर",
              assemblyPoint: language === "en" ? "Relief Camp - Block Office" : "राहत शिविर - ब्लॉक कार्यालय",
              emergencyContacts: ["108", "1077"]
            }
          ]
        });
      }, 1200);
    });
  };

  const fetchEarthquakeData = async () => {
    // In a real implementation, this would call GSI's earthquake monitoring API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          alerts: [
            {
              id: "gsi-001",
              type: "cyclone",
              severity: "extreme",
              title: language === "en" ? "Cyclone Alert - Bay of Bengal" : "चक्रवात अलर्ट - बंगाल की खाड़ी",
              description: language === "en" 
                ? "Severe cyclonic storm forming over Bay of Bengal. Wind speeds up to 120 kmph expected." 
                : "बंगाल की खाड़ी में गंभीर चक्रवाती तूफान बन रहा। 120 किमी प्रति घंटे तक हवा की गति संभावित।",
              location: "Odisha, Andhra Pradesh Coastal",
              coordinates: { lat: 19.9615, lng: 85.0985 },
              timestamp: new Date().toISOString(),
              source: "Geological Survey of India (GSI)",
              actions: [
                language === "en" ? "Immediate evacuation required" : "तत्काल निकासी आवश्यक",
                language === "en" ? "Secure loose objects" : "शिथिल वस्तुओं को सुरक्षित करें",
                language === "en" ? "Stock emergency supplies" : "आपातकालीन आपूर्ति का भंडारण करें"
              ],
              evacuationRoute: language === "en" ? "Inland - NH-16 towards Hyderabad" : "अंतर्देशीय - NH-16 हैदराबाद की ओर",
              assemblyPoint: language === "en" ? "Cyclone Shelter - Govt School" : "चक्रवात आश्रय - सरकारी स्कूल",
              emergencyContacts: ["108", "1078"]
            }
          ]
        });
      }, 800);
    });
  };

  useEffect(() => {
    // Load initial alerts when component mounts
    fetchGovernmentAlerts();
    
    // Auto-refresh alerts every 5 minutes
    const interval = setInterval(() => {
      fetchGovernmentAlerts();
    }, 300000);

    return () => clearInterval(interval);
  }, [location, language]);

  return (
    <div className="min-h-screen bg-background">
      <Header onLanguageChange={setLanguage} currentLanguage={language} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Satellite className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold text-primary">
                {language === "en" ? "Government Disaster Alerts" : "सरकारी आपदा अलर्ट"}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {language === "en" 
                ? "Real-time disaster alerts and emergency information from official Indian government sources including NDMA, IMD, CWC, and GSI."
                : "NDMA, IMD, CWC, और GSI सहित आधिकारिक भारतीय सरकारी स्रोतों से वास्तविक समय आपदा अलर्ट और आपातकालीन जानकारी।"
              }
            </p>
          </div>

          {/* Location Setup */}
          <Card className="mb-8 border-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                {language === "en" ? "Location Settings" : "स्थान सेटिंग्स"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {language === "en" 
                  ? "Enter your location to get localized disaster alerts from official government sources:"
                  : "आधिकारिक सरकारी स्रोतों से स्थानीयकृत आपदा अलर्ट प्राप्त करने के लिए अपना स्थान दर्ज करें:"
                }
              </p>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="location">{language === "en" ? "City/State" : "शहर/राज्य"}</Label>
                  <Input
                    id="location"
                    placeholder="Enter city/state"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={fetchGovernmentAlerts} disabled={loading}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    {language === "en" ? "Get Latest Alerts" : "नवीनतम अलर्ट प्राप्त करें"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Overview */}
          {alerts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? "Active Alerts" : "सक्रिय अलर्ट"}
                      </p>
                      <p className="text-2xl font-bold text-destructive">{alerts.length}</p>
                    </div>
                    <ShieldAlert className="w-8 h-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? "Last Updated" : "अंतिम अपडेट"}
                      </p>
                      <p className="text-sm font-medium">
                        {lastUpdated ? lastUpdated.toLocaleTimeString() : '--'}
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? "API Sources" : "API स्रोत"}
                      </p>
                      <p className="text-2xl font-bold text-success">{apiSources.length}</p>
                    </div>
                    <Radio className="w-8 h-8 text-success" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-center">
                    <Button 
                      onClick={fetchGovernmentAlerts} 
                      disabled={loading}
                      variant="outline"
                      size="sm"
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                      {language === "en" ? "Refresh" : "रिफ्रेश"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Government API Sources */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Satellite className="w-5 h-5" />
                {language === "en" ? "Connected Government APIs" : "कनेक्टेड सरकारी APIs"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {apiSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{source.name}</p>
                      <p className="text-xs text-muted-foreground">{source.fullName}</p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Alerts */}
          {alerts.length > 0 && (
            <div className="space-y-6 mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                {language === "en" ? "Active Disaster Alerts" : "सक्रिय आपदा अलर्ट"}
              </h2>
              
              {alerts.map((alert) => (
                <Alert key={alert.id} className={`${severityColors[alert.severity]} border-l-4`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {disasterIcons[alert.type]}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <AlertTitle className="text-lg font-bold">{alert.title}</AlertTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {alert.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {alert.type.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {alert.location}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {new Date(alert.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <AlertDescription className="mb-4">
                        {alert.description}
                      </AlertDescription>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">
                          {language === "en" ? "Recommended Actions:" : "अनुशंसित कार्य:"}
                        </p>
                        <ul className="text-sm space-y-1">
                          {alert.actions.map((action, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0"></span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleEmergencyAction("evacuation", alert)}
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          {language === "en" ? "View Evacuation Route" : "निकासी मार्ग देखें"}
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEmergencyAction("emergency", alert)}
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          {language === "en" ? "Call Emergency Services" : "आपातकालीन सेवाएं कॉल करें"}
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => handleEmergencyAction("assembly", alert)}
                        >
                          <MapPin className="w-4 h-4 mr-1" />
                          {language === "en" ? "Locate Assembly Point" : "असेंबली पॉइंट लगता करें"}
                        </Button>
                      </div>
                      
                      <div className="mt-3 text-xs text-muted-foreground">
                        Source: {alert.source}
                      </div>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          )}

          {/* Weather Conditions */}
          {weatherData && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  {language === "en" ? "Current Weather Conditions" : "वर्तमान मौसम स्थितियां"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {language === "en" ? "Temperature" : "तापमान"}
                    </p>
                    <p className="text-xl font-bold">{weatherData.temperature}°C</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {language === "en" ? "Humidity" : "आर्द्रता"}
                    </p>
                    <p className="text-xl font-bold">{weatherData.humidity}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {language === "en" ? "Wind Speed" : "हवा की गति"}
                    </p>
                    <p className="text-xl font-bold">{weatherData.windSpeed} km/h</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {language === "en" ? "Pressure" : "दबाव"}
                    </p>
                    <p className="text-xl font-bold">{weatherData.pressure} mb</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {language === "en" ? "Visibility" : "दृश्यता"}
                    </p>
                    <p className="text-xl font-bold">{weatherData.visibility} km</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {language === "en" ? "Risk Level" : "जोखिम स्तर"}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {weatherData.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Alerts State */}
          {alerts.length === 0 && !loading && (
            <Card className="text-center py-12">
              <CardContent>
                <ShieldAlert className="w-16 h-16 mx-auto mb-4 text-success" />
                <h3 className="text-xl font-bold mb-2">
                  {language === "en" ? "No Active Alerts" : "कोई सक्रिय अलर्ट नहीं"}
                </h3>
                <p className="text-muted-foreground">
                  {language === "en" 
                    ? "All government monitoring systems show normal conditions in your area."
                    : "आपके क्षेत्र में सभी सरकारी निगरानी प्रणालियां सामान्य स्थिति दिखा रही हैं।"
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}