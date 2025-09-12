import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, MapPin, Users, Building, AlertTriangle, Shield } from "lucide-react";

interface DisasterCaseStudy {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
  magnitude: string;
  casualties: string;
  affected: string;
  cause: string;
  impact: string[];
  governmentActions: string[];
  lessons: string[];
  image: string;
  severity: "Low" | "Medium" | "High" | "Extreme";
}

const disasterCaseStudies: DisasterCaseStudy[] = [
  {
    id: "bihar-earthquake-1934",
    title: "1934 Bihar Earthquake",
    date: "January 15, 1934",
    location: "Bihar-Nepal border",
    type: "Earthquake",
    magnitude: "8.0 Mw",
    casualties: "≈10,700 deaths",
    affected: "Millions across Bihar and Nepal",
    cause: "Tectonic plate movement along the Himalayan fault lines",
    impact: [
      "Massive destruction in Bihar and neighboring Nepal",
      "Complete collapse of mud houses and buildings",
      "Infrastructure damage across the region",
      "Long-term economic impact on rural communities"
    ],
    governmentActions: [
      "Delayed reconstruction efforts due to lack of preparedness",
      "Led to future emphasis on earthquake-resistant building codes",
      "Establishment of geological survey protocols",
      "Development of seismic zonation maps"
    ],
    lessons: [
      "Need for earthquake-resistant construction",
      "Importance of disaster preparedness",
      "Critical role of building codes",
      "Early warning system requirements"
    ],
    image: "/src/assets/earthquake-hero.jpg",
    severity: "Extreme"
  },
  {
    id: "bhola-cyclone-1970",
    title: "1970 Bhola Cyclone",
    date: "November 12, 1970",
    location: "East Pakistan (Bangladesh), West Bengal, Odisha",
    type: "Cyclone",
    magnitude: "~115 mph wind speed",
    casualties: "≈500,000 deaths",
    affected: "Over 10 million people",
    cause: "Cyclonic storm over the Bay of Bengal",
    impact: [
      "Extensive flooding and infrastructure collapse",
      "Complete destruction of coastal villages",
      "Agricultural land permanently damaged",
      "Mass displacement of population"
    ],
    governmentActions: [
      "Massive relief operations",
      "Increased focus on cyclone warning systems in India",
      "Development of coastal infrastructure",
      "International aid coordination"
    ],
    lessons: [
      "Need for early warning systems",
      "Importance of cyclone shelters",
      "Coastal vulnerability management",
      "Emergency evacuation procedures"
    ],
    image: "/src/assets/tsunami-hero.jpg",
    severity: "Extreme"
  },
  {
    id: "odisha-cyclone-1999",
    title: "1999 Odisha Super Cyclone",
    date: "October 29, 1999",
    location: "Odisha",
    type: "Super Cyclone",
    magnitude: "~260 km/h wind speed",
    casualties: "≈10,000 deaths",
    affected: "1.5 million people",
    cause: "Tropical cyclone intensified over the Bay of Bengal",
    impact: [
      "Massive destruction of houses and infrastructure",
      "Complete power grid failure",
      "Agricultural crops destroyed",
      "Economic losses worth billions"
    ],
    governmentActions: [
      "Establishment of improved early warning systems",
      "Construction of cyclone shelters",
      "Formation of State Disaster Management Authorities (SDMAs)",
      "Enhanced communication systems"
    ],
    lessons: [
      "Cyclone preparedness and better infrastructure",
      "Community-based disaster management",
      "Importance of backup power systems",
      "Post-disaster reconstruction planning"
    ],
    image: "/src/assets/tornado-hero.jpg",
    severity: "Extreme"
  },
  {
    id: "gujarat-earthquake-2001",
    title: "2001 Gujarat Earthquake",
    date: "January 26, 2001",
    location: "Kutch region, Gujarat",
    type: "Earthquake",
    magnitude: "7.7 Mw",
    casualties: "≈20,000 deaths",
    affected: "6.3 million people",
    cause: "Fault movement in the Indian plate boundary",
    impact: [
      "Extensive damage to buildings, roads, and power systems",
      "Complete destruction of Bhuj city center",
      "Industrial infrastructure severely damaged",
      "Schools and hospitals collapsed"
    ],
    governmentActions: [
      "Rapid deployment of rescue teams (NDRF)",
      "Reconstruction initiatives with earthquake-resistant designs",
      "International aid acceptance and coordination",
      "Establishment of Gujarat State Disaster Management Authority"
    ],
    lessons: [
      "Integration of seismic-resistant building codes",
      "Importance of rapid response teams",
      "Community participation in reconstruction",
      "Modern construction techniques adoption"
    ],
    image: "/src/assets/earthquake-hero.jpg",
    severity: "Extreme"
  },
  {
    id: "indian-ocean-tsunami-2004",
    title: "2004 Indian Ocean Tsunami",
    date: "December 26, 2004",
    location: "Indian coastline (Tamil Nadu, Kerala, Andhra Pradesh, A&N Islands)",
    type: "Tsunami",
    magnitude: "9.1 Mw undersea earthquake",
    casualties: "≈10,000 deaths in India",
    affected: "650,000 people affected",
    cause: "Subduction zone earthquake off Sumatra",
    impact: [
      "Massive destruction of coastal infrastructure",
      "Fishing communities completely devastated",
      "Tourism industry severely impacted",
      "Environmental damage to marine ecosystems"
    ],
    governmentActions: [
      "Development of Indian Tsunami Early Warning System (ITEWS)",
      "Establishment of community awareness programs",
      "Coastal zone management regulations",
      "International cooperation on tsunami warning"
    ],
    lessons: [
      "Early warning systems for coastal disasters",
      "Community education on natural warning signs",
      "Coastal disaster management protocols",
      "International coordination importance"
    ],
    image: "/src/assets/tsunami-hero.jpg",
    severity: "Extreme"
  },
  {
    id: "uttarakhand-floods-2013",
    title: "2013 Uttarakhand Floods",
    date: "June 2013",
    location: "Uttarakhand",
    type: "Flash Floods",
    magnitude: "Multi-day cloudbursts",
    casualties: "≈5,700 missing",
    affected: "110,000 people stranded",
    cause: "Cloudbursts, heavy rainfall, and glacial lake outburst floods",
    impact: [
      "Major damage to infrastructure and tourist hubs (Kedarnath)",
      "Complete destruction of pilgrimage sites",
      "Thousands of tourists stranded",
      "Environmental degradation in fragile ecosystems"
    ],
    governmentActions: [
      "Operation Surya Hope by Indian Army for rescue and relief",
      "Later focus on regulating unplanned construction in fragile zones",
      "Enhanced weather monitoring systems",
      "Sustainable tourism guidelines"
    ],
    lessons: [
      "Sustainable development in fragile ecosystems",
      "Climate change adaptation strategies",
      "Proper urban planning in hill stations",
      "Emergency evacuation procedures for remote areas"
    ],
    image: "/src/assets/flood-hero.jpg",
    severity: "High"
  },
  {
    id: "jk-floods-2014",
    title: "2014 Jammu & Kashmir Floods",
    date: "September 2014",
    location: "Jammu & Kashmir",
    type: "Urban Floods",
    magnitude: "Heavy monsoon rainfall",
    casualties: "≈200 deaths",
    affected: "2.5 million people",
    cause: "Intense rainfall + poor urban planning",
    impact: [
      "Extensive damage to homes, infrastructure, and agriculture",
      "Srinagar city completely submerged",
      "Economic losses in tourism and agriculture",
      "Displacement of urban population"
    ],
    governmentActions: [
      "Operation Megh Rahat (Indian Army rescue mission)",
      "Improved flood forecasting & evacuation procedures",
      "Urban drainage system upgrades",
      "Flood management infrastructure development"
    ],
    lessons: [
      "Proper urban planning and flood control measures",
      "Importance of drainage infrastructure",
      "Early warning systems for urban areas",
      "Community preparedness programs"
    ],
    image: "/src/assets/flood-hero.jpg",
    severity: "High"
  },
  {
    id: "bihar-floods-2008",
    title: "2008 Bihar Floods",
    date: "August 2008",
    location: "Bihar",
    type: "River Floods",
    magnitude: "Kosi River embankment breach",
    casualties: "≈500 deaths",
    affected: "500,000 people displaced",
    cause: "Kosi River breach of embankment",
    impact: [
      "Widespread farmland and property damage",
      "Complete submersion of villages",
      "Agricultural economy severely impacted",
      "Long-term displacement of rural communities"
    ],
    governmentActions: [
      "Immediate deployment of NDRF",
      "Strengthening of river embankments and flood infrastructure",
      "River course management projects",
      "Compensation and rehabilitation programs"
    ],
    lessons: [
      "Critical need for embankment maintenance and monitoring",
      "River management and flood control",
      "Early warning systems for river floods",
      "Rehabilitation and livelihood restoration"
    ],
    image: "/src/assets/flood-hero.jpg",
    severity: "High"
  },
  {
    id: "kishtwar-floods-2025",
    title: "2025 Kishtwar Flash Floods",
    date: "August 2025",
    location: "Kishtwar, Jammu & Kashmir",
    type: "Flash Floods",
    magnitude: "Cloudburst event",
    casualties: "≈38 deaths confirmed",
    affected: "Thousands displaced",
    cause: "Cloudbursts & heavy rainfall",
    impact: [
      "Massive infrastructure and road damage",
      "Remote villages cut off from main areas",
      "Agricultural land and livestock losses",
      "Communication networks disrupted"
    ],
    governmentActions: [
      "₹209 crore allocated for relief from State Disaster Response Fund",
      "Evacuation and rehabilitation operations",
      "Emergency restoration of communication links",
      "Enhanced monitoring of cloudburst-prone areas"
    ],
    lessons: [
      "Reinforced need for monitoring cloudburst-prone areas",
      "Rapid response mechanisms for remote areas",
      "Climate change impact on extreme weather events",
      "Community-based early warning systems"
    ],
    image: "/src/assets/flood-hero.jpg",
    severity: "Medium"
  },
  {
    id: "cyclone-mocha-2023",
    title: "2023 Cyclone Mocha",
    date: "May 2023",
    location: "West Bengal, Odisha, Andhra Pradesh",
    type: "Cyclone",
    magnitude: "~215 km/h wind speed",
    casualties: "Minimal due to early warning",
    affected: "Thousands displaced",
    cause: "Tropical cyclone formation over Bay of Bengal",
    impact: [
      "Severe flooding and wind damage",
      "Infrastructure damage to coastal areas",
      "Agricultural crops affected",
      "Temporary disruption of economic activities"
    ],
    governmentActions: [
      "Preemptive evacuation of vulnerable populations",
      "Quick deployment of relief materials and shelter facilities",
      "Enhanced coordination between state and central agencies",
      "Real-time monitoring and weather updates"
    ],
    lessons: [
      "Preparedness & timely warning dissemination effectiveness",
      "Success of early evacuation strategies",
      "Importance of inter-agency coordination",
      "Community awareness and response training"
    ],
    image: "/src/assets/tornado-hero.jpg",
    severity: "Medium"
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Low": return "bg-success text-success-foreground";
    case "Medium": return "bg-warning text-warning-foreground";
    case "High": return "bg-destructive text-destructive-foreground";
    case "Extreme": return "bg-emergency text-emergency-foreground";
    default: return "bg-secondary text-secondary-foreground";
  }
};

const DisasterCaseStudies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 gradient-text">🚨 Disaster Case Studies</h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Comprehensive analysis of India's most significant natural disasters - their causes, impacts, 
              government responses, and the lessons learned for future disaster management.
            </p>
          </div>

          <div className="grid gap-8">
            {disasterCaseStudies.map((disaster, index) => (
              <Card key={disaster.id} className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-64 md:h-full">
                    <img 
                      src={disaster.image} 
                      alt={disaster.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className={getSeverityColor(disaster.severity)}>
                        {disaster.severity} Severity
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h2 className="text-2xl font-bold mb-2">{disaster.title}</h2>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={16} />
                          {disaster.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={16} />
                          {disaster.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Basic Information */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">TYPE & MAGNITUDE</h4>
                          <p className="text-sm">{disaster.type} - {disaster.magnitude}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">CASUALTIES</h4>
                          <p className="text-sm text-destructive font-medium">{disaster.casualties}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">PEOPLE AFFECTED</h4>
                          <p className="text-sm">{disaster.affected}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-muted-foreground mb-1">PRIMARY CAUSE</h4>
                          <p className="text-sm">{disaster.cause}</p>
                        </div>
                      </div>

                      <Separator />

                      {/* Impact Analysis */}
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                          <AlertTriangle size={16} />
                          IMPACT ANALYSIS
                        </h4>
                        <ul className="space-y-1">
                          {disaster.impact.map((item, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <span className="text-destructive mt-1">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Government Actions */}
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                          <Shield size={16} />
                          GOVERNMENT RESPONSE
                        </h4>
                        <ul className="space-y-1">
                          {disaster.governmentActions.map((action, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Lessons Learned */}
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                          <Building size={16} />
                          LESSONS LEARNED
                        </h4>
                        <ul className="space-y-1">
                          {disaster.lessons.map((lesson, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <span className="text-success mt-1">•</span>
                              {lesson}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Summary Statistics */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-center">📊 Case Studies Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">10</div>
                  <div className="text-sm text-muted-foreground">Major Disasters</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-destructive">~566K+</div>
                  <div className="text-sm text-muted-foreground">Total Casualties</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-warning">20M+</div>
                  <div className="text-sm text-muted-foreground">People Affected</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">90+</div>
                  <div className="text-sm text-muted-foreground">Years of Experience</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DisasterCaseStudies;