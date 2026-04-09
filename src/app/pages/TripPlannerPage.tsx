import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { Plane, MapPin, DollarSign, Calendar, Heart, LogOut } from 'lucide-react';
import { generateItinerary } from '@/app/utils/aiGenerator';
import { DestinationSuggestions } from '@/app/components/DestinationSuggestions';
import { TripPreview } from '@/app/components/TripPreview';

export function TripPlannerPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const generateAndNavigate = async () => {
    setLoading(true);

    try {
      const itinerary = await generateItinerary({
        destination,
        budget: parseFloat(budget),
        days: parseInt(days),
        interests,
      });

      // Save to localStorage (will be replaced with Supabase)
      const trips = JSON.parse(localStorage.getItem('trips') || '[]');
      const newTrip = {
        id: Date.now().toString(),
        destination,
        budget,
        days,
        interests,
        itinerary,
        createdAt: new Date().toISOString(),
      };
      trips.push(newTrip);
      localStorage.setItem('trips', JSON.stringify(trips));

      navigate(`/itinerary/${newTrip.id}`);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      alert('Failed to generate itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateAndNavigate();
  };

  const interestOptions = [
    { id: 'beaches', label: 'Beaches', icon: '🏖️' },
    { id: 'temples', label: 'Temples', icon: '⛩️' },
    { id: 'adventure', label: 'Adventure', icon: '🏔️' },
    { id: 'culture', label: 'Culture', icon: '🎭' },
    { id: 'food', label: 'Food', icon: '🍜' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'nightlife', label: 'Nightlife', icon: '🌃' },
    { id: 'nature', label: 'Nature', icon: '🌲' },
  ];

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
                <span className="text-gray-700">Hi, {user.name}</span>
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Smart Destination Suggestions */}
        <DestinationSuggestions onSelectDestination={setDestination} />

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Plan Your Dream Trip</h1>
          <p className="text-gray-600 mb-8">Fill in the details and let AI create your perfect itinerary</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., Paris, Tokyo, Bali"
                required
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="inline w-4 h-4 mr-1" />
                Budget (₹ INR)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., 150000"
                min="5000"
                required
              />
            </div>

            {/* Number of Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline w-4 h-4 mr-1" />
                Number of Days
              </label>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="e.g., 7"
                min="1"
                max="30"
                required
              />
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Heart className="inline w-4 h-4 mr-1" />
                Interests (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {interestOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleInterest(option.id)}
                    className={`p-3 rounded-lg border-2 transition ${
                      interests.includes(option.id)
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{option.icon}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <TripPreview
                destination={destination}
                days={parseInt(days) || 0}
                interests={interests}
                budget={parseFloat(budget) || 0}
                onConfirm={generateAndNavigate}
              />

              <div className="text-center text-sm text-gray-500">or</div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating Your Itinerary...' : 'Generate Directly'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
