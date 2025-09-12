import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Clock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type DisasterType = 'earthquake' | 'cyclone' | 'flood' | 'tsunami' | 'thunderstorm' | 'fire' | 'drought' | 'landslide';

interface HelplineNumber {
  id: string;
  disaster_type: DisasterType;
  state: string;
  district?: string;
  helpline_name: string;
  phone_number: string;
  is_toll_free: boolean;
  is_24x7: boolean;
}

const disasterTypes = [
  'earthquake',
  'cyclone',
  'flood',
  'tsunami',
  'thunderstorm',
  'fire',
  'drought',
  'landslide'
];

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh'
];

export default function HelplineNumbers() {
  const [helplines, setHelplines] = useState<HelplineNumber[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedDisaster, setSelectedDisaster] = useState<string>('');
  const { toast } = useToast();

  const fetchHelplines = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('helpline_numbers')
        .select('*')
        .order('state')
        .order('disaster_type');

      if (selectedState) {
        query = query.eq('state', selectedState);
      }

      if (selectedDisaster) {
        query = query.eq('disaster_type', selectedDisaster as DisasterType);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching helplines:', error);
        toast({
          title: "Error",
          description: "Failed to fetch helpline numbers",
          variant: "destructive"
        });
        return;
      }

      setHelplines(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHelplines();
  }, [selectedState, selectedDisaster]);

  // Insert sample helpline data if none exists
  useEffect(() => {
    const insertSampleData = async () => {
      const { data: existingData } = await supabase
        .from('helpline_numbers')
        .select('id')
        .limit(1);

      if (!existingData || existingData.length === 0) {
        const sampleHelplines = [
          // National Emergency Numbers
          {
            disaster_type: 'earthquake' as DisasterType,
            state: 'National',
            helpline_name: 'National Emergency Response System',
            phone_number: '112',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'fire' as DisasterType,
            state: 'National',
            helpline_name: 'Fire Brigade Emergency',
            phone_number: '101',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'flood' as DisasterType,
            state: 'National',
            helpline_name: 'National Disaster Management Authority',
            phone_number: '011-26701728',
            is_toll_free: false,
            is_24x7: true
          },
          
          // State-wise Emergency Numbers
          {
            disaster_type: 'earthquake' as DisasterType,
            state: 'Uttarakhand',
            helpline_name: 'Uttarakhand Emergency Response',
            phone_number: '1070',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'flood' as DisasterType,
            state: 'Kerala',
            helpline_name: 'Kerala Flood Control Room',
            phone_number: '1077',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'cyclone' as DisasterType,
            state: 'Odisha',
            helpline_name: 'Odisha Emergency Operations Center',
            phone_number: '1077',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'fire' as DisasterType,
            state: 'Maharashtra',
            helpline_name: 'Maharashtra Fire Services',
            phone_number: '101',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'earthquake' as DisasterType,
            state: 'Delhi',
            helpline_name: 'Delhi Emergency Services',
            phone_number: '1077',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'thunderstorm' as DisasterType,
            state: 'West Bengal',
            helpline_name: 'West Bengal Disaster Management',
            phone_number: '1070',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'cyclone' as DisasterType,
            state: 'Tamil Nadu',
            helpline_name: 'Tamil Nadu Emergency Response',
            phone_number: '1070',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'flood' as DisasterType,
            state: 'Bihar',
            helpline_name: 'Bihar Flood Control Room',
            phone_number: '1077',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'earthquake' as DisasterType,
            state: 'Gujarat',
            helpline_name: 'Gujarat Emergency Services',
            phone_number: '108',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'drought' as DisasterType,
            state: 'Rajasthan',
            helpline_name: 'Rajasthan Drought Relief',
            phone_number: '1077',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'landslide' as DisasterType,
            state: 'Himachal Pradesh',
            helpline_name: 'HP Disaster Management',
            phone_number: '1070',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'tsunami' as DisasterType,
            state: 'Andhra Pradesh',
            helpline_name: 'AP Coastal Emergency',
            phone_number: '1077',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'cyclone' as DisasterType,
            state: 'Andhra Pradesh',
            helpline_name: 'AP Cyclone Warning Centre',
            phone_number: '040-23422288',
            is_toll_free: false,
            is_24x7: true
          },
          {
            disaster_type: 'flood' as DisasterType,
            state: 'Assam',
            helpline_name: 'Assam Flood Control',
            phone_number: '1077',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'earthquake' as DisasterType,
            state: 'Jammu and Kashmir',
            helpline_name: 'J&K Emergency Response',
            phone_number: '1977',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'fire' as DisasterType,
            state: 'Karnataka',
            helpline_name: 'Karnataka Fire Emergency',
            phone_number: '101',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'thunderstorm' as DisasterType,
            state: 'Punjab',
            helpline_name: 'Punjab Emergency Services',
            phone_number: '1070',
            is_toll_free: true,
            is_24x7: true
          },
          {
            disaster_type: 'flood' as DisasterType,
            state: 'Uttar Pradesh',
            helpline_name: 'UP Flood Management',
            phone_number: '1077',
            is_toll_free: true,
            is_24x7: true
          }
        ];

        const { error } = await supabase
          .from('helpline_numbers')
          .insert(sampleHelplines);

        if (!error) {
          fetchHelplines();
        }
      }
    };

    insertSampleData();
  }, []);

  const callNumber = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const formatDisasterType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Emergency Helpline Numbers</h2>
        <p className="text-muted-foreground">
          State and disaster-specific emergency contact numbers
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select value={selectedState} onValueChange={setSelectedState}>
          <SelectTrigger>
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All States</SelectItem>
            {indianStates.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDisaster} onValueChange={setSelectedDisaster}>
          <SelectTrigger>
            <SelectValue placeholder="Select Disaster Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Disasters</SelectItem>
            {disasterTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {formatDisasterType(type)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Helpline Numbers */}
      {loading ? (
        <div className="flex items-center justify-center p-8">
          Loading helpline numbers...
        </div>
      ) : helplines.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              No helpline numbers found for the selected filters.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {helplines.map((helpline) => (
            <Card key={helpline.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{helpline.helpline_name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{helpline.state}</p>
                  </div>
                  <Badge variant="outline">
                    {formatDisasterType(helpline.disaster_type)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span className="font-semibold text-lg">{helpline.phone_number}</span>
                  </div>
                  <Button 
                    onClick={() => callNumber(helpline.phone_number)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {helpline.is_toll_free && (
                    <Badge variant="secondary" className="text-xs">
                      <Shield className="w-3 h-3 mr-1" />
                      Toll Free
                    </Badge>
                  )}
                  {helpline.is_24x7 && (
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      24x7
                    </Badge>
                  )}
                </div>

                {helpline.district && (
                  <p className="text-sm text-muted-foreground">
                    <strong>District:</strong> {helpline.district}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}