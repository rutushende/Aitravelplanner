import { Calendar, Music, PartyPopper, MapPin, Clock } from 'lucide-react';

interface Event {
  name: string;
  date: string;
  type: 'festival' | 'music' | 'cultural' | 'sports';
  location: string;
  description: string;
  icon: string;
}

export function EventFinder({ destination, travelDates }: { destination: string; travelDates?: { start: Date; end: Date } }) {
  const getEventsForDestination = (dest: string): Event[] => {
    // Mock events - in production, this would come from a real-time events API
    const events: Record<string, Event[]> = {
      goa: [
        {
          name: 'Sunburn Festival',
          date: 'Dec 27-30',
          type: 'music',
          location: 'Vagator Beach',
          description: 'Asia\'s biggest electronic music festival',
          icon: '🎵',
        },
        {
          name: 'Goa Carnival',
          date: 'Feb-Mar',
          type: 'cultural',
          location: 'Panaji',
          description: 'Vibrant street parades, music, and dance',
          icon: '🎭',
        },
        {
          name: 'Shigmo Festival',
          date: 'March',
          type: 'festival',
          location: 'Across Goa',
          description: 'Hindu spring festival with colorful processions',
          icon: '🌺',
        },
      ],
      manali: [
        {
          name: 'Manali Winter Carnival',
          date: 'January',
          type: 'cultural',
          location: 'Mall Road',
          description: 'Celebrate winter with folk dances and winter sports',
          icon: '❄️',
        },
        {
          name: 'Hadimba Devi Fair',
          date: 'May',
          type: 'festival',
          location: 'Hadimba Temple',
          description: 'Traditional fair honoring goddess Hadimba',
          icon: '🛕',
        },
      ],
      jaipur: [
        {
          name: 'Jaipur Literature Festival',
          date: 'January',
          type: 'cultural',
          location: 'Diggi Palace',
          description: 'World\'s largest free literary festival',
          icon: '📚',
        },
        {
          name: 'Teej Festival',
          date: 'July-August',
          type: 'festival',
          location: 'Across Jaipur',
          description: 'Monsoon festival celebrating marital bliss',
          icon: '🌧️',
        },
        {
          name: 'Diwali in Jaipur',
          date: 'October-November',
          type: 'festival',
          location: 'City-wide',
          description: 'Festival of lights with stunning illuminations',
          icon: '🪔',
        },
      ],
      bali: [
        {
          name: 'Nyepi (Day of Silence)',
          date: 'March',
          type: 'cultural',
          location: 'Island-wide',
          description: 'Balinese New Year - complete silence and no lights',
          icon: '🕯️',
        },
        {
          name: 'Bali Arts Festival',
          date: 'June-July',
          location: 'Denpasar',
          type: 'cultural',
          description: 'Month-long celebration of Balinese arts and culture',
          icon: '🎨',
        },
        {
          name: 'Ubud Food Festival',
          date: 'April-May',
          location: 'Ubud',
          type: 'cultural',
          description: 'Celebration of Indonesian cuisine',
          icon: '🍜',
        },
      ],
      dubai: [
        {
          name: 'Dubai Shopping Festival',
          date: 'December-January',
          type: 'cultural',
          location: 'City-wide',
          description: 'Massive sales, entertainment, and fireworks',
          icon: '🛍️',
        },
        {
          name: 'Dubai Food Festival',
          date: 'February-March',
          type: 'cultural',
          location: 'Various locations',
          description: 'Celebrate global cuisines with food events',
          icon: '🍽️',
        },
      ],
      bangkok: [
        {
          name: 'Songkran (Thai New Year)',
          date: 'April 13-15',
          type: 'festival',
          location: 'City-wide',
          description: 'Famous water festival celebrating Thai New Year',
          icon: '💦',
        },
        {
          name: 'Loy Krathong',
          date: 'November',
          type: 'festival',
          location: 'Rivers and canals',
          description: 'Festival of lights with floating lanterns',
          icon: '🏮',
        },
      ],
    };

    const destKey = dest.toLowerCase();
    return events[destKey] || [
      {
        name: 'Local Cultural Events',
        date: 'Check on arrival',
        type: 'cultural',
        location: 'Various',
        description: 'Ask your hotel or locals about ongoing events and festivals',
        icon: '🎪',
      },
    ];
  };

  const events = getEventsForDestination(destination);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'festival':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'music':
        return 'bg-pink-100 text-pink-700 border-pink-300';
      case 'cultural':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'sports':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <PartyPopper className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-900">Local Events & Festivals</h2>
      </div>

      {events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl flex-shrink-0">{event.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{event.name}</h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(
                        event.type
                      )}`}
                    >
                      {event.type}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{event.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-8">
          No major events found for your travel dates. Check local listings upon arrival!
        </p>
      )}

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
        <div className="flex items-start gap-3">
          <Music className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Pro Tip:</span> Book tickets in advance for popular festivals.
              Some events require special permits or have limited capacity.
            </p>
            <p className="text-xs text-gray-600">
              Check local tourism websites closer to your travel dates for the most up-to-date event information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
