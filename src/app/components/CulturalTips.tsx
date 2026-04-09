import { Lightbulb, Info, AlertCircle, Heart } from 'lucide-react';

interface Tip {
  icon: string;
  category: string;
  tip: string;
  importance: 'high' | 'medium' | 'low';
}

export function CulturalTips({ destination }: { destination: string }) {
  const getTipsForDestination = (dest: string): Tip[] => {
    // Mock cultural tips - in production, this would come from an API
    const tips: Record<string, Tip[]> = {
      default: [
        {
          icon: '🙏',
          category: 'Greetings',
          tip: 'Learn basic greetings in the local language. A simple "hello" and "thank you" goes a long way!',
          importance: 'medium',
        },
        {
          icon: '👕',
          category: 'Dress Code',
          tip: 'Dress modestly when visiting religious sites. Carry a scarf or shawl for temple visits.',
          importance: 'high',
        },
        {
          icon: '💵',
          category: 'Money',
          tip: 'Always carry some local currency. Many small vendors and local markets may not accept cards.',
          importance: 'high',
        },
        {
          icon: '🍽️',
          category: 'Dining',
          tip: 'Try local street food, but ensure it\'s freshly prepared. Look for busy stalls with high turnover.',
          importance: 'medium',
        },
        {
          icon: '📸',
          category: 'Photography',
          tip: 'Always ask permission before photographing people, especially in rural areas and religious sites.',
          importance: 'high',
        },
        {
          icon: '🚫',
          category: 'Etiquette',
          tip: 'Avoid public displays of affection in conservative areas. Respect local customs and traditions.',
          importance: 'medium',
        },
      ],
      bali: [
        {
          icon: '🙏',
          category: 'Temple Etiquette',
          tip: 'Always wear a sarong when entering temples. Most temples provide them at the entrance.',
          importance: 'high',
        },
        {
          icon: '🚫',
          category: 'Sacred Sites',
          tip: 'Don\'t sit higher than a priest during ceremonies. Remove shoes before entering sacred spaces.',
          importance: 'high',
        },
        {
          icon: '💰',
          category: 'Bargaining',
          tip: 'Bargaining is expected in markets. Start at 50% of the asking price and negotiate politely.',
          importance: 'medium',
        },
      ],
      dubai: [
        {
          icon: '👗',
          category: 'Dress Code',
          tip: 'Dress conservatively in public areas. Shoulders and knees should be covered in malls and souks.',
          importance: 'high',
        },
        {
          icon: '🍺',
          category: 'Alcohol',
          tip: 'Drinking alcohol in public is illegal. Only drink in licensed hotels, restaurants, or bars.',
          importance: 'high',
        },
        {
          icon: '🕌',
          category: 'Ramadan',
          tip: 'During Ramadan, avoid eating/drinking in public during daylight hours out of respect.',
          importance: 'high',
        },
      ],
      goa: [
        {
          icon: '🏖️',
          category: 'Beach Etiquette',
          tip: 'Swimwear is fine on beaches, but cover up when leaving the beach area.',
          importance: 'medium',
        },
        {
          icon: '🍛',
          category: 'Food',
          tip: 'Try Goan fish curry and bebinca. Don\'t miss the beach shacks for authentic local cuisine.',
          importance: 'low',
        },
      ],
      manali: [
        {
          icon: '🏔️',
          category: 'Altitude',
          tip: 'Acclimatize properly if going to high altitude areas. Stay hydrated and avoid alcohol initially.',
          importance: 'high',
        },
        {
          icon: '🧥',
          category: 'Weather',
          tip: 'Carry warm clothes even in summer. Temperature drops significantly at night.',
          importance: 'high',
        },
      ],
      jaipur: [
        {
          icon: '🕌',
          category: 'Heritage Sites',
          tip: 'Hire a guide at major forts and palaces to understand the rich history and architecture.',
          importance: 'medium',
        },
        {
          icon: '🛍️',
          category: 'Shopping',
          tip: 'Bargain at Johari Bazaar and Bapu Bazaar. Fixed prices at government emporia.',
          importance: 'medium',
        },
      ],
    };

    const destKey = dest.toLowerCase();
    return tips[destKey] || tips.default;
  };

  const tips = getTipsForDestination(destination);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-bold text-gray-900">Cultural Tips & Local Insights</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border-l-4 ${
              tip.importance === 'high'
                ? 'border-red-500 bg-red-50'
                : tip.importance === 'medium'
                ? 'border-yellow-500 bg-yellow-50'
                : 'border-blue-500 bg-blue-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-3xl flex-shrink-0">{tip.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{tip.category}</h3>
                  {tip.importance === 'high' && (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <p className="text-sm text-gray-700">{tip.tip}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-indigo-50 rounded-lg flex items-start gap-3">
        <Heart className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Pro Tip:</span> Respect local customs and be open to new
          experiences. When in doubt, observe what locals do and follow their lead!
        </p>
      </div>
    </div>
  );
}
