import { useState } from 'react';
import { Play, X, MapPin, Calendar, Heart, Sparkles } from 'lucide-react';

interface TripPreviewProps {
  destination: string;
  days: number;
  interests: string[];
  budget: number;
  onConfirm: () => void;
}

export function TripPreview({ destination, days, interests, budget, onConfirm }: TripPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const previewHighlights = [
    {
      day: 1,
      title: 'Arrival & Exploration',
      activities: ['Check into hotel', 'Local market visit', 'Welcome dinner at traditional restaurant'],
      image: '🏨',
    },
    {
      day: Math.ceil(days / 2),
      title: 'Adventure Day',
      activities: ['Morning activity based on interests', 'Local cuisine experience', 'Evening cultural show'],
      image: '🎭',
    },
    {
      day: days,
      title: 'Final Day',
      activities: ['Souvenir shopping', 'Visit iconic landmarks', 'Departure preparation'],
      image: '✈️',
    },
  ];

  const getActivityPreview = () => {
    const activities = [];
    if (interests.includes('beaches')) activities.push('Beach hopping and water sports');
    if (interests.includes('temples')) activities.push('Temple tours and spiritual experiences');
    if (interests.includes('adventure')) activities.push('Trekking and outdoor adventures');
    if (interests.includes('culture')) activities.push('Museum visits and cultural immersions');
    if (interests.includes('food')) activities.push('Food tours and cooking classes');
    if (interests.includes('shopping')) activities.push('Shopping at local markets');
    if (interests.includes('nightlife')) activities.push('Evening entertainment and nightlife');
    if (interests.includes('nature')) activities.push('Nature walks and wildlife');

    return activities.length > 0 ? activities : ['Sightseeing and local experiences'];
  };

  const startPreview = () => {
    setIsPlaying(true);
    let day = 1;
    const interval = setInterval(() => {
      day++;
      setCurrentDay(day);
      if (day > days) {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        disabled={!destination || !days || !budget}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        Preview Your Trip with AI
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Your {destination} Adventure Preview</h2>
                  <p className="text-sm opacity-90">Experience your trip before you book!</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Trip Overview */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Trip Overview
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Destination</p>
                    <p className="font-bold text-lg">{destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-bold text-lg">{days} Days</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-bold text-lg">₹{budget.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Activity Preview */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-600" />
                  Your Personalized Activities
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {getActivityPreview().map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-purple-200 rounded-lg">
                      <span className="text-2xl">✨</span>
                      <span className="text-gray-700">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day Highlights */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Trip Highlights</h3>
                <div className="space-y-4">
                  {previewHighlights.map((highlight) => (
                    <div key={highlight.day} className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-200">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{highlight.image}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-2">
                            Day {highlight.day}: {highlight.title}
                          </h4>
                          <ul className="space-y-1">
                            {highlight.activities.map((activity, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                <span className="text-purple-600 mt-1">•</span>
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulation */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Trip Simulation</h3>
                  <button
                    onClick={startPreview}
                    disabled={isPlaying}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2 disabled:opacity-50"
                  >
                    <Play className="w-4 h-4" />
                    {isPlaying ? 'Playing...' : 'Play Simulation'}
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-4 rounded-full transition-all duration-300"
                      style={{ width: `${(currentDay / days) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-lg">
                    Day {currentDay} / {days}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Watch as your {days}-day journey unfolds!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onConfirm();
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold"
                >
                  Let's Go! Generate Full Itinerary
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Adjust Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
