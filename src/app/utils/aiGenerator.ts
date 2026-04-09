export interface TripInput {
  destination: string;
  budget: number;
  days: number;
  interests: string[];
}

export interface Activity {
  time: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  estimatedCost: number;
  duration: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  activities: Activity[];
}

export interface Hotel {
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  pricePerNight: number;
  rating: number;
  amenities: string[];
}

export interface Itinerary {
  destination: string;
  totalDays: number;
  totalBudget: number;
  hotels: Hotel[];
  dailyPlans: DayItinerary[];
}

// Mock AI generator - Replace with actual AI API call when backend is connected
export async function generateItinerary(input: TripInput): Promise<Itinerary> {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Get destination coordinates (mock data - will use real geocoding with Google Maps)
  const destinationCoords = getDestinationCoords(input.destination);

  // Generate mock hotels
  const hotels = generateHotels(input.destination, destinationCoords, input.budget, input.days);

  // Generate daily itineraries based on interests
  const dailyPlans = generateDailyPlans(
    input.destination,
    destinationCoords,
    input.days,
    input.interests,
    input.budget
  );

  return {
    destination: input.destination,
    totalDays: input.days,
    totalBudget: input.budget,
    hotels,
    dailyPlans,
  };
}

function getDestinationCoords(destination: string): { lat: number; lng: number } {
  // Mock coordinates for popular destinations
  const coords: Record<string, { lat: number; lng: number }> = {
    paris: { lat: 48.8566, lng: 2.3522 },
    tokyo: { lat: 35.6762, lng: 139.6503 },
    bali: { lat: -8.3405, lng: 115.092 },
    'new york': { lat: 40.7128, lng: -74.006 },
    london: { lat: 51.5074, lng: -0.1278 },
    dubai: { lat: 25.2048, lng: 55.2708 },
    rome: { lat: 41.9028, lng: 12.4964 },
    barcelona: { lat: 41.3851, lng: 2.1734 },
    bangkok: { lat: 13.7563, lng: 100.5018 },
    sydney: { lat: -33.8688, lng: 151.2093 },
  };

  const key = destination.toLowerCase();
  return coords[key] || { lat: 0, lng: 0 };
}

function generateHotels(
  destination: string,
  coords: { lat: number; lng: number },
  budget: number,
  days: number
): Hotel[] {
  const budgetPerNight = budget / (days * 3); // Rough estimate: 1/3 of budget for accommodation

  const hotelOptions = [
    {
      name: `${destination} Grand Hotel`,
      location: {
        lat: coords.lat + 0.01,
        lng: coords.lng + 0.01,
        address: `123 Main Street, ${destination}`,
      },
      pricePerNight: Math.min(budgetPerNight * 1.2, 16000),
      rating: 4.5,
      amenities: ['Free WiFi', 'Pool', 'Breakfast Included', 'Gym'],
    },
    {
      name: `Central ${destination} Inn`,
      location: {
        lat: coords.lat - 0.01,
        lng: coords.lng - 0.01,
        address: `456 Central Avenue, ${destination}`,
      },
      pricePerNight: Math.min(budgetPerNight * 0.8, 12000),
      rating: 4.2,
      amenities: ['Free WiFi', 'Breakfast', 'Airport Shuttle'],
    },
    {
      name: `${destination} Boutique Suites`,
      location: {
        lat: coords.lat + 0.005,
        lng: coords.lng - 0.005,
        address: `789 Downtown Road, ${destination}`,
      },
      pricePerNight: Math.min(budgetPerNight, 9600),
      rating: 4.3,
      amenities: ['Free WiFi', 'Rooftop Terrace', 'Restaurant'],
    },
  ];

  return hotelOptions.slice(0, 2);
}

function generateDailyPlans(
  destination: string,
  coords: { lat: number; lng: number },
  days: number,
  interests: string[],
  budget: number
): DayItinerary[] {
  const activities: Record<string, Activity[]> = {
    beaches: [
      {
        time: '09:00 AM',
        name: 'Beach Visit',
        description: 'Relax and enjoy the beautiful coastline',
        location: {
          lat: coords.lat + 0.02,
          lng: coords.lng + 0.03,
          address: `Sunset Beach, ${destination}`,
        },
        estimatedCost: 1600,
        duration: '3 hours',
      },
    ],
    temples: [
      {
        time: '10:00 AM',
        name: 'Historic Temple Tour',
        description: 'Explore ancient architecture and spirituality',
        location: {
          lat: coords.lat - 0.015,
          lng: coords.lng + 0.02,
          address: `Sacred Temple, ${destination}`,
        },
        estimatedCost: 1200,
        duration: '2 hours',
      },
    ],
    adventure: [
      {
        time: '08:00 AM',
        name: 'Mountain Hiking',
        description: 'Trek through scenic mountain trails',
        location: {
          lat: coords.lat + 0.05,
          lng: coords.lng - 0.04,
          address: `Mountain Trail, ${destination}`,
        },
        estimatedCost: 4000,
        duration: '4 hours',
      },
    ],
    culture: [
      {
        time: '11:00 AM',
        name: 'Museum Visit',
        description: 'Discover local history and art',
        location: {
          lat: coords.lat - 0.01,
          lng: coords.lng - 0.015,
          address: `National Museum, ${destination}`,
        },
        estimatedCost: 2000,
        duration: '2.5 hours',
      },
    ],
    food: [
      {
        time: '07:00 PM',
        name: 'Food Tour',
        description: 'Sample authentic local cuisine',
        location: {
          lat: coords.lat + 0.008,
          lng: coords.lng - 0.012,
          address: `Food Street, ${destination}`,
        },
        estimatedCost: 4800,
        duration: '3 hours',
      },
    ],
    shopping: [
      {
        time: '02:00 PM',
        name: 'Local Market',
        description: 'Browse traditional crafts and souvenirs',
        location: {
          lat: coords.lat - 0.02,
          lng: coords.lng + 0.01,
          address: `Central Market, ${destination}`,
        },
        estimatedCost: 3200,
        duration: '2 hours',
      },
    ],
    nightlife: [
      {
        time: '09:00 PM',
        name: 'Nightlife District',
        description: 'Experience the vibrant nighttime scene',
        location: {
          lat: coords.lat + 0.012,
          lng: coords.lng + 0.018,
          address: `Entertainment District, ${destination}`,
        },
        estimatedCost: 5600,
        duration: '3 hours',
      },
    ],
    nature: [
      {
        time: '09:30 AM',
        name: 'Nature Park',
        description: 'Explore botanical gardens and wildlife',
        location: {
          lat: coords.lat - 0.03,
          lng: coords.lng - 0.025,
          address: `Nature Reserve, ${destination}`,
        },
        estimatedCost: 2400,
        duration: '3 hours',
      },
    ],
  };

  const dailyPlans: DayItinerary[] = [];

  for (let day = 1; day <= days; day++) {
    const dayActivities: Activity[] = [];

    // Morning activity
    if (interests.length > 0) {
      const morningInterest = interests[(day - 1) % interests.length];
      const morningActivity = activities[morningInterest]?.[0];
      if (morningActivity) {
        dayActivities.push({ ...morningActivity });
      }
    }

    // Lunch
    dayActivities.push({
      time: '12:30 PM',
      name: 'Lunch at Local Restaurant',
      description: 'Enjoy traditional cuisine',
      location: {
        lat: coords.lat + (Math.random() - 0.5) * 0.02,
        lng: coords.lng + (Math.random() - 0.5) * 0.02,
        address: `Restaurant Row, ${destination}`,
      },
      estimatedCost: 2000,
      duration: '1.5 hours',
    });

    // Afternoon activity
    if (interests.length > 1) {
      const afternoonInterest = interests[(day) % interests.length];
      const afternoonActivity = activities[afternoonInterest]?.[0];
      if (afternoonActivity) {
        dayActivities.push({
          ...afternoonActivity,
          time: '03:00 PM',
        });
      }
    }

    // Dinner
    dayActivities.push({
      time: '07:00 PM',
      name: 'Dinner',
      description: 'Fine dining experience',
      location: {
        lat: coords.lat + (Math.random() - 0.5) * 0.02,
        lng: coords.lng + (Math.random() - 0.5) * 0.02,
        address: `Dining District, ${destination}`,
      },
      estimatedCost: 4000,
      duration: '2 hours',
    });

    dailyPlans.push({
      day,
      title: `Day ${day} - Exploring ${destination}`,
      activities: dayActivities,
    });
  }

  return dailyPlans;
}
