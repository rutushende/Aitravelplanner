import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Plane, MapPin, Calendar, DollarSign, Trash2, Eye, LogOut, Plus } from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));

    // Load trips from localStorage (will be replaced with Supabase)
    const savedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    setTrips(savedTrips);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleDeleteTrip = (tripId: string) => {
    if (confirm('Are you sure you want to delete this trip?')) {
      const updatedTrips = trips.filter((t) => t.id !== tripId);
      setTrips(updatedTrips);
      localStorage.setItem('trips', JSON.stringify(updatedTrips));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
                <Link to="/planner" className="px-4 py-2 text-gray-700 hover:text-indigo-600 transition">
                  New Trip
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
            <p className="text-gray-600">View and manage all your travel plans</p>
          </div>
          <Link
            to="/planner"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            <Plus className="w-5 h-5" />
            Create New Trip
          </Link>
        </div>

        {trips.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips yet</h3>
            <p className="text-gray-600 mb-6">Start planning your first adventure!</p>
            <Link
              to="/planner"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
            >
              Plan a Trip
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{trip.destination}</h3>
                  <p className="text-sm opacity-90">Created {formatDate(trip.createdAt)}</p>
                </div>
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                      <span>{trip.days} days</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <DollarSign className="w-5 h-5 text-indigo-600" />
                      <span>₹{trip.budget} budget</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                      <span>{trip.interests.length} interests</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {trip.interests.slice(0, 3).map((interest: string) => (
                      <span
                        key={interest}
                        className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                    {trip.interests.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                        +{trip.interests.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/itinerary/${trip.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                    <button
                      onClick={() => handleDeleteTrip(trip.id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
