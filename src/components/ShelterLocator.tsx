import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Navigation, Phone, Users, Wifi, Utensils, Hospital, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DisasterType = 'earthquake' | 'cyclone' | 'flood' | 'tsunami' | 'thunderstorm' | 'fire' | 'drought' | 'landslide';

interface Shelter {
  id: string;
  name: string;
  address: string;
  state: string;
  district: string;
  city: string;
  latitude: number;
  longitude: number;
  capacity?: number;
  contact_number?: string;
  facilities: string[];
  disaster_types: DisasterType[];
  distance_km?: number;
}

const facilityIcons = {
  medical: Hospital,
  food: Utensils,
  water: '💧',
  electricity: Zap,
  wifi: Wifi
};

export default function ShelterLocator() {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [searchRadius, setSearchRadius] = useState<number>(25);
  const [selectedDisaster, setSelectedDisaster] = useState<string>('');
  const { toast } = useToast();

  // Insert sample shelter data
  useEffect(() => {
    const insertSampleShelters = async () => {
      const { data: existingData } = await supabase
        .from('emergency_shelters')
        .select('id')
        .limit(1);

      if (!existingData || existingData.length === 0) {
        const sampleShelters = [
          {
            name: 'Community Center Relief Camp',
            address: 'Sector 15, Chandigarh',
            state: 'Chandigarh',
            district: 'Chandigarh',
            city: 'Chandigarh',
            latitude: 30.7333,
            longitude: 76.7794,
            capacity: 500,
            contact_number: '+91-172-2749999',
            facilities: ['medical', 'food', 'water', 'electricity'],
            disaster_types: ['earthquake', 'flood', 'fire'] as DisasterType[]
          },
          {
            name: 'Red Cross Emergency Shelter',
            address: 'Marine Drive, Mumbai',
            state: 'Maharashtra',
            district: 'Mumbai',
            city: 'Mumbai',
            latitude: 18.9435,
            longitude: 72.8081,
            capacity: 1000,
            contact_number: '+91-22-22158888',
            facilities: ['medical', 'food', 'water', 'electricity', 'wifi'],
            disaster_types: ['cyclone', 'flood', 'thunderstorm'] as DisasterType[]
          },
          {
            name: 'Government School Shelter',
            address: 'Connaught Place, New Delhi',
            state: 'Delhi',
            district: 'New Delhi',
            city: 'New Delhi',
            latitude: 28.6315,
            longitude: 77.2167,
            capacity: 750,
            contact_number: '+91-11-23438064',
            facilities: ['food', 'water', 'electricity'],
            disaster_types: ['earthquake', 'fire', 'thunderstorm'] as DisasterType[]
          },
          {
            name: 'Sports Complex Emergency Camp',
            address: 'Salt Lake, Kolkata',
            state: 'West Bengal',
            district: 'Kolkata',
            city: 'Kolkata',
            latitude: 22.5726,
            longitude: 88.3639,
            capacity: 800,
            contact_number: '+91-33-23574600',
            facilities: ['medical', 'food', 'water'],
            disaster_types: ['cyclone', 'flood', 'thunderstorm'] as DisasterType[]
          },
          {
            name: 'District Collector Office Shelter',
            address: 'Shivaji Nagar, Pune',
            state: 'Maharashtra',
            district: 'Pune',
            city: 'Pune',
            latitude: 18.5204,
            longitude: 73.8567,
            capacity: 600,
            contact_number: '+91-20-26123456',
            facilities: ['medical', 'food', 'water', 'electricity'],
            disaster_types: ['earthquake', 'flood', 'fire'] as DisasterType[]
          }
        ];

        await supabase.from('emergency_shelters').insert(sampleShelters);
      }
    };

    insertSampleShelters();
  }, []);

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          findNearbyShelters(location.lat, location.lng);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location Error",
            description: "Unable to get your current location. Please enable location services.",
            variant: "destructive"
          });
          setLoading(false);
        }
      );
    } else {
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const findNearbyShelters = async (lat: number, lng: number) => {
    try {
      const { data, error } = await supabase.functions.invoke('shelter-locator', {
        body: {
          latitude: lat,
          longitude: lng,
          radius_km: searchRadius,
          disaster_type: selectedDisaster || undefined
        }
      });

      if (error) {
        console.error('Error finding shelters:', error);
        toast({
          title: "Error",
          description: "Failed to find nearby shelters",
          variant: "destructive"
        });
      } else {
        setShelters(data.shelters || []);
        toast({
          title: "Success",
          description: `Found ${data.shelters?.length || 0} shelters nearby`,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to find nearby shelters",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const openDirections = (shelter: Shelter) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${shelter.latitude},${shelter.longitude}`;
    window.open(url, '_blank');
  };

  const callShelter = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Emergency Shelter Locator</h2>
        <p className="text-muted-foreground">
          Find nearest emergency shelters and relief centers
        </p>
      </div>

      {/* Location Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Find Nearby Shelters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Search Radius (km)</label>
              <Input
                type="number"
                value={searchRadius}
                onChange={(e) => setSearchRadius(Number(e.target.value))}
                min="1"
                max="100"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Disaster Type (Optional)</label>
              <Select value={selectedDisaster} onValueChange={setSelectedDisaster}>
                <SelectTrigger>
                  <SelectValue placeholder="Any disaster type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any disaster type</SelectItem>
                  <SelectItem value="earthquake">Earthquake</SelectItem>
                  <SelectItem value="cyclone">Cyclone</SelectItem>
                  <SelectItem value="flood">Flood</SelectItem>
                  <SelectItem value="tsunami">Tsunami</SelectItem>
                  <SelectItem value="thunderstorm">Thunderstorm</SelectItem>
                  <SelectItem value="fire">Fire</SelectItem>
                  <SelectItem value="drought">Drought</SelectItem>
                  <SelectItem value="landslide">Landslide</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={getCurrentLocation} 
                disabled={loading}
                className="w-full"
              >
                <MapPin className="w-4 h-4 mr-2" />
                {loading ? 'Finding...' : 'Find Shelters'}
              </Button>
            </div>
          </div>

          {userLocation && (
            <p className="text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 inline mr-1" />
              Current location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Shelters List */}
      {shelters.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Nearby Shelters ({shelters.length} found)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shelters.map((shelter) => (
              <Card key={shelter.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{shelter.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {shelter.city}, {shelter.state}
                      </p>
                    </div>
                    {shelter.distance_km && (
                      <Badge variant="outline">
                        {shelter.distance_km.toFixed(1)} km
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5" />
                    {shelter.address}
                  </p>

                  {shelter.capacity && (
                    <p className="text-sm flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Capacity: {shelter.capacity} people
                    </p>
                  )}

                  {/* Disaster Types */}
                  <div className="flex flex-wrap gap-1">
                    {shelter.disaster_types.map((type) => (
                      <Badge key={type} variant="secondary" className="text-xs">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Badge>
                    ))}
                  </div>

                  {/* Facilities */}
                  {shelter.facilities.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Available Facilities:</p>
                      <div className="flex flex-wrap gap-2">
                        {shelter.facilities.map((facility) => {
                          const IconComponent = facilityIcons[facility as keyof typeof facilityIcons];
                          return (
                            <div key={facility} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded">
                              {typeof IconComponent === 'string' ? (
                                <span>{IconComponent}</span>
                              ) : (
                                <IconComponent className="w-3 h-3" />
                              )}
                              {facility.charAt(0).toUpperCase() + facility.slice(1)}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={() => openDirections(shelter)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Navigation className="w-4 h-4 mr-1" />
                      Directions
                    </Button>
                    
                    {shelter.contact_number && (
                      <Button 
                        onClick={() => callShelter(shelter.contact_number!)}
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {userLocation && shelters.length === 0 && !loading && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              No shelters found within {searchRadius}km radius. Try increasing the search radius.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}