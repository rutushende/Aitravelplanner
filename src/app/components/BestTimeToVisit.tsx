import { Sun, Cloud, CloudRain, Snowflake, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface SeasonInfo {
  season: string;
  months: string;
  weather: string;
  temperature: string;
  rainfall: 'low' | 'medium' | 'high';
  crowdLevel: 'low' | 'medium' | 'high';
  priceLevel: 'low' | 'medium' | 'high';
  recommendation: 'best' | 'good' | 'avoid';
  icon: React.ReactNode;
  highlights: string[];
}

export function BestTimeToVisit({ destination }: { destination: string }) {
  const getSeasonInfo = (dest: string): SeasonInfo[] => {
    const seasonData: Record<string, SeasonInfo[]> = {
      goa: [
        {
          season: 'Winter',
          months: 'Nov - Feb',
          weather: 'Pleasant & Dry',
          temperature: '20-32°C',
          rainfall: 'low',
          crowdLevel: 'high',
          priceLevel: 'high',
          recommendation: 'best',
          icon: <Sun className="w-6 h-6 text-yellow-500" />,
          highlights: ['Perfect beach weather', 'Festival season', 'Water sports'],
        },
        {
          season: 'Summer',
          months: 'Mar - May',
          weather: 'Hot & Humid',
          temperature: '25-35°C',
          rainfall: 'low',
          crowdLevel: 'low',
          priceLevel: 'low',
          recommendation: 'good',
          icon: <Sun className="w-6 h-6 text-orange-500" />,
          highlights: ['Lower prices', 'Less crowded', 'Beach activities'],
        },
        {
          season: 'Monsoon',
          months: 'Jun - Oct',
          weather: 'Heavy Rainfall',
          temperature: '24-30°C',
          rainfall: 'high',
          crowdLevel: 'low',
          priceLevel: 'low',
          recommendation: 'avoid',
          icon: <CloudRain className="w-6 h-6 text-blue-500" />,
          highlights: ['Lush greenery', 'Best prices', 'Limited water sports'],
        },
      ],
      manali: [
        {
          season: 'Summer',
          months: 'Mar - Jun',
          weather: 'Pleasant',
          temperature: '10-25°C',
          rainfall: 'low',
          crowdLevel: 'high',
          priceLevel: 'high',
          recommendation: 'best',
          icon: <Sun className="w-6 h-6 text-yellow-500" />,
          highlights: ['Perfect for trekking', 'Clear mountain views', 'Adventure sports'],
        },
        {
          season: 'Monsoon',
          months: 'Jul - Sep',
          weather: 'Rainy',
          temperature: '10-20°C',
          rainfall: 'high',
          crowdLevel: 'low',
          priceLevel: 'low',
          recommendation: 'avoid',
          icon: <CloudRain className="w-6 h-6 text-blue-500" />,
          highlights: ['Landslide risk', 'Beautiful landscapes', 'Very quiet'],
        },
        {
          season: 'Winter',
          months: 'Oct - Feb',
          weather: 'Very Cold',
          temperature: '-5 to 10°C',
          rainfall: 'low',
          crowdLevel: 'medium',
          priceLevel: 'medium',
          recommendation: 'good',
          icon: <Snowflake className="w-6 h-6 text-blue-300" />,
          highlights: ['Snowfall experience', 'Winter sports', 'Scenic beauty'],
        },
      ],
      jaipur: [
        {
          season: 'Winter',
          months: 'Nov - Feb',
          weather: 'Cool & Pleasant',
          temperature: '8-22°C',
          rainfall: 'low',
          crowdLevel: 'high',
          priceLevel: 'high',
          recommendation: 'best',
          icon: <Sun className="w-6 h-6 text-yellow-500" />,
          highlights: ['Perfect sightseeing', 'Festival season', 'Outdoor activities'],
        },
        {
          season: 'Summer',
          months: 'Mar - Jun',
          weather: 'Very Hot',
          temperature: '25-45°C',
          rainfall: 'low',
          crowdLevel: 'low',
          priceLevel: 'low',
          recommendation: 'avoid',
          icon: <Sun className="w-6 h-6 text-red-500" />,
          highlights: ['Extreme heat', 'Lower prices', 'Indoor attractions'],
        },
        {
          season: 'Monsoon',
          months: 'Jul - Oct',
          weather: 'Humid with Rain',
          temperature: '25-35°C',
          rainfall: 'medium',
          crowdLevel: 'low',
          priceLevel: 'low',
          recommendation: 'good',
          icon: <CloudRain className="w-6 h-6 text-blue-500" />,
          highlights: ['Green landscapes', 'Teej festival', 'Pleasant evenings'],
        },
      ],
    };

    return seasonData[dest.toLowerCase()] || [];
  };

  const seasons = getSeasonInfo(destination);

  if (seasons.length === 0) {
    return null;
  }

  const getLevelBadge = (level: string, type: 'crowd' | 'price' | 'rain') => {
    const colors = {
      low: 'bg-green-100 text-green-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-red-100 text-red-700',
    };

    const labels = {
      crowd: { low: 'Quiet', medium: 'Moderate', high: 'Crowded' },
      price: { low: 'Budget', medium: 'Moderate', high: 'Expensive' },
      rain: { low: 'Dry', medium: 'Some Rain', high: 'Heavy Rain' },
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[level as keyof typeof colors]}`}>
        {labels[type][level as keyof typeof labels.crowd]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Sun className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-bold text-gray-900">Best Time to Visit {destination}</h2>
      </div>

      <div className="space-y-4">
        {seasons.map((season, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-lg border-2 ${
              season.recommendation === 'best'
                ? 'border-green-500 bg-green-50'
                : season.recommendation === 'good'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-gray-50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {season.icon}
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{season.season}</h3>
                  <p className="text-sm text-gray-600">{season.months}</p>
                </div>
              </div>
              {season.recommendation === 'best' && (
                <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  BEST TIME
                </span>
              )}
              {season.recommendation === 'avoid' && (
                <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  AVOID
                </span>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Weather & Temperature</p>
                <p className="font-semibold text-gray-900">
                  {season.weather} • {season.temperature}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {getLevelBadge(season.crowdLevel, 'crowd')}
                {getLevelBadge(season.priceLevel, 'price')}
                {getLevelBadge(season.rainfall, 'rain')}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">HIGHLIGHTS:</p>
              <div className="flex flex-wrap gap-2">
                {season.highlights.map((highlight, i) => (
                  <span key={i} className="text-xs bg-white px-3 py-1 rounded-full border border-gray-200">
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Planning Tip:</span> Book flights and hotels 2-3 months in advance
          for the best season to get better prices and availability.
        </p>
      </div>
    </div>
  );
}
