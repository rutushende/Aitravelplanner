import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import {
  Plane,
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Star,
  Hotel,
  ChevronDown,
  ChevronUp,
  LogOut,
} from 'lucide-react';
import type { Itinerary } from '@/app/utils/aiGenerator';
import { TravelChatAssistant } from '@/app/components/TravelChatAssistant';
import { ExpenseTracker } from '@/app/components/ExpenseTracker';
import { ShareTrip } from '@/app/components/ShareTrip';
import { PackingListGenerator } from '@/app/components/PackingListGenerator';
import { CulturalTips } from '@/app/components/CulturalTips';
import { EventFinder } from '@/app/components/EventFinder';
import { BestTimeToVisit } from '@/app/components/BestTimeToVisit';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '12px',
};

export function ItineraryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<any>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load trip from localStorage (will be replaced with Supabase)
    const trips = JSON.parse(localStorage.getItem('trips') || '[]');
    const foundTrip = trips.find((t: any) => t.id === id);
    if (foundTrip) {
      setTrip(foundTrip);
    }
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!trip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  const itinerary: Itinerary = trip.itinerary;
  const center = itinerary.dailyPlans[0]?.activities[0]?.location || { lat: 0, lng: 0 };

  // Collect all locations for markers
  const allLocations = [
    ...itinerary.hotels.map((h) => ({ ...h.location, type: 'hotel', name: h.name })),
    ...itinerary.dailyPlans.flatMap((day) =>
      day.activities.map((a) => ({ ...a.location, type: 'activity', name: a.name, time: a.time }))
    ),
  ];

  const totalEstimatedCost =
    itinerary.hotels.reduce((sum, h) => sum + h.pricePerNight * itinerary.totalDays, 0) +
    itinerary.dailyPlans.reduce(
      (sum, day) => sum + day.activities.reduce((s, a) => s + a.estimatedCost, 0),
      0
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Plane className="w-8 h-8 text-indigo-600" />
            <span className="text-2xl font-bold text-gray-900">TripGenius</span>
          </Link>
          <div className="flex items-center gap-4">
            {user && (
              <>
                <Link to="/planner" className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition">
                  New Trip
                </Link>
                <Link to="/dashboard" className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition">
                  My Trips
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Your {itinerary.destination} Adventure
            </h1>
            <div className="flex gap-3">
              <PackingListGenerator
                destination={trip.destination}
                days={parseInt(trip.days)}
                interests={trip.interests}
              />
              <ShareTrip tripId={id!} destination={itinerary.destination} />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold">{itinerary.totalDays} Days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="font-semibold">₹{itinerary.totalBudget}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Estimated Cost</p>
                <p className="font-semibold">₹{totalEstimatedCost.toFixed(0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Time to Visit */}
        <BestTimeToVisit destination={itinerary.destination} />

        {/* Map */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-600" />
            Interactive Map
          </h2>
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
              {allLocations.map((location, idx) => (
                <Marker
                  key={idx}
                  position={{ lat: location.lat, lng: location.lng }}
                  onClick={() => setSelectedMarker(location)}
                  icon={{
                    url:
                      location.type === 'hotel'
                        ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                        : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  }}
                />
              ))}
              {selectedMarker && (
                <InfoWindow
                  position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="p-2">
                    <h3 className="font-semibold">{selectedMarker.name}</h3>
                    <p className="text-sm text-gray-600">{selectedMarker.address}</p>
                    {selectedMarker.time && (
                      <p className="text-xs text-gray-500 mt-1">{selectedMarker.time}</p>
                    )}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>

        {/* Hotels */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Hotel className="w-5 h-5 text-indigo-600" />
            Recommended Hotels
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {itinerary.hotels.map((hotel, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">{hotel.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm">{hotel.rating} / 5</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{hotel.location.address}</p>
                <p className="text-lg font-bold text-indigo-600 mb-2">
                  ₹{hotel.pricePerNight}/night
                </p>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Tips */}
        <CulturalTips destination={itinerary.destination} />

        {/* Events & Festivals */}
        <EventFinder destination={itinerary.destination} />

        {/* Daily Itinerary */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            Day-by-Day Itinerary
          </h2>
          <div className="space-y-3">
            {itinerary.dailyPlans.map((day) => (
              <div key={day.day} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition"
                >
                  <span className="font-semibold text-lg">{day.title}</span>
                  {expandedDay === day.day ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {expandedDay === day.day && (
                  <div className="p-4 space-y-4">
                    {day.activities.map((activity, idx) => (
                      <div key={idx} className="border-l-4 border-indigo-500 pl-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-sm font-semibold">{activity.time}</span>
                            </div>
                            <h4 className="font-semibold text-lg">{activity.name}</h4>
                          </div>
                          <span className="text-indigo-600 font-semibold">
                            ₹{activity.estimatedCost}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{activity.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {activity.location.address}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {activity.duration}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Chat Assistant */}
      <TravelChatAssistant />

      {/* Expense Tracker */}
      <ExpenseTracker tripBudget={itinerary.totalBudget} />
    </div>
  );
}
