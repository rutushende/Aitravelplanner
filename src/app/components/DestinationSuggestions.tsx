import { Sparkles, TrendingUp, MapPin, DollarSign } from 'lucide-react';

interface Destination {
  name: string;
  country: string;
  budgetRange: string;
  bestFor: string[];
  season: string;
  image: string;
}

export function DestinationSuggestions({ onSelectDestination }: { onSelectDestination: (dest: string) => void }) {
  const destinations: Destination[] = [
    {
      name: 'Goa',
      country: 'India',
      budgetRange: '₹20,000 - ₹50,000',
      bestFor: ['beaches', 'nightlife', 'food'],
      season: 'Oct - Mar',
      image: '🏖️',
    },
    {
      name: 'Manali',
      country: 'India',
      budgetRange: '₹30,000 - ₹70,000',
      bestFor: ['adventure', 'nature', 'culture'],
      season: 'May - Jun, Oct - Feb',
      image: '🏔️',
    },
    {
      name: 'Jaipur',
      country: 'India',
      budgetRange: '₹25,000 - ₹60,000',
      bestFor: ['culture', 'temples', 'shopping'],
      season: 'Nov - Mar',
      image: '🕌',
    },
    {
      name: 'Bali',
      country: 'Indonesia',
      budgetRange: '₹60,000 - ₹120,000',
      bestFor: ['beaches', 'temples', 'nature'],
      season: 'Apr - Oct',
      image: '🌴',
    },
    {
      name: 'Dubai',
      country: 'UAE',
      budgetRange: '₹80,000 - ₹200,000',
      bestFor: ['shopping', 'adventure', 'nightlife'],
      season: 'Nov - Mar',
      image: '🏙️',
    },
    {
      name: 'Bangkok',
      country: 'Thailand',
      budgetRange: '₹40,000 - ₹90,000',
      bestFor: ['food', 'shopping', 'temples'],
      season: 'Nov - Feb',
      image: '🛕',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-bold text-gray-900">Popular Destinations</h3>
        <TrendingUp className="w-4 h-4 text-green-600" />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {destinations.map((dest) => (
          <button
            key={dest.name}
            onClick={() => onSelectDestination(dest.name)}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-left group"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-3xl mb-1">{dest.image}</div>
                <h4 className="font-bold text-lg group-hover:text-indigo-600 transition">
                  {dest.name}
                </h4>
                <p className="text-sm text-gray-600">{dest.country}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="font-semibold">{dest.budgetRange}</span>
              </div>

              <div className="flex items-start gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div className="flex flex-wrap gap-1">
                  {dest.bestFor.map((interest) => (
                    <span
                      key={interest}
                      className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-gray-500">
                <span className="font-semibold">Best time:</span> {dest.season}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
