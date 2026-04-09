import { useState } from 'react';
import { Backpack, Check, X } from 'lucide-react';

interface PackingItem {
  item: string;
  category: string;
  packed: boolean;
}

export function PackingListGenerator({
  destination,
  days,
  interests
}: {
  destination: string;
  days: number;
  interests: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [packingList, setPackingList] = useState<PackingItem[]>([]);
  const [generated, setGenerated] = useState(false);

  const generatePackingList = () => {
    const essentials: PackingItem[] = [
      { item: 'Passport/ID', category: 'Documents', packed: false },
      { item: 'Travel tickets', category: 'Documents', packed: false },
      { item: 'Hotel confirmations', category: 'Documents', packed: false },
      { item: 'Phone charger', category: 'Electronics', packed: false },
      { item: 'Power bank', category: 'Electronics', packed: false },
      { item: 'Medications', category: 'Health', packed: false },
      { item: 'First aid kit', category: 'Health', packed: false },
      { item: 'Sunscreen', category: 'Health', packed: false },
      { item: 'Hand sanitizer', category: 'Health', packed: false },
      { item: 'Toothbrush & toothpaste', category: 'Toiletries', packed: false },
      { item: 'Shampoo & soap', category: 'Toiletries', packed: false },
    ];

    // Add clothing based on trip duration
    const clothingItems: PackingItem[] = [
      { item: `${days} T-shirts/tops`, category: 'Clothing', packed: false },
      { item: `${Math.ceil(days / 2)} pants/shorts`, category: 'Clothing', packed: false },
      { item: `${days + 1} underwear`, category: 'Clothing', packed: false },
      { item: `${days + 1} pairs of socks`, category: 'Clothing', packed: false },
      { item: 'Comfortable walking shoes', category: 'Clothing', packed: false },
      { item: 'Sleepwear', category: 'Clothing', packed: false },
    ];

    // Add interest-specific items
    const interestItems: PackingItem[] = [];
    if (interests.includes('beaches')) {
      interestItems.push(
        { item: 'Swimsuit', category: 'Beach', packed: false },
        { item: 'Beach towel', category: 'Beach', packed: false },
        { item: 'Sunglasses', category: 'Beach', packed: false },
        { item: 'Flip flops', category: 'Beach', packed: false }
      );
    }
    if (interests.includes('adventure')) {
      interestItems.push(
        { item: 'Hiking boots', category: 'Adventure', packed: false },
        { item: 'Backpack', category: 'Adventure', packed: false },
        { item: 'Water bottle', category: 'Adventure', packed: false },
        { item: 'Rain jacket', category: 'Adventure', packed: false }
      );
    }
    if (interests.includes('temples') || interests.includes('culture')) {
      interestItems.push(
        { item: 'Modest clothing', category: 'Culture', packed: false },
        { item: 'Scarf/shawl', category: 'Culture', packed: false }
      );
    }
    if (interests.includes('nightlife')) {
      interestItems.push(
        { item: 'Dressy outfit', category: 'Nightlife', packed: false },
        { item: 'Dress shoes', category: 'Nightlife', packed: false }
      );
    }

    setPackingList([...essentials, ...clothingItems, ...interestItems]);
    setGenerated(true);
  };

  const togglePacked = (index: number) => {
    setPackingList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, packed: !item.packed } : item))
    );
  };

  const groupedItems = packingList.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PackingItem[]>);

  const packedCount = packingList.filter((item) => item.packed).length;
  const totalCount = packingList.length;

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          if (!generated) generatePackingList();
        }}
        className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold flex items-center gap-2"
      >
        <Backpack className="w-5 h-5" />
        Packing List
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-orange-600 text-white p-6 rounded-t-xl flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">AI Packing List</h2>
                <p className="text-sm opacity-90">
                  Personalized for your {destination} trip
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-orange-700 p-2 rounded">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Progress */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">Packing Progress</span>
                  <span className="text-sm font-bold">
                    {packedCount} / {totalCount} items
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-orange-500 h-3 rounded-full transition-all"
                    style={{ width: `${totalCount > 0 ? (packedCount / totalCount) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Packing List */}
              <div className="space-y-6">
                {Object.entries(groupedItems).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="font-bold text-lg mb-3 text-gray-900">{category}</h3>
                    <div className="space-y-2">
                      {items.map((item, idx) => (
                        <label
                          key={`${category}-${idx}`}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                        >
                          <input
                            type="checkbox"
                            checked={item.packed}
                            onChange={() => {
                              const globalIndex = packingList.findIndex(
                                (i) => i.item === item.item && i.category === category
                              );
                              togglePacked(globalIndex);
                            }}
                            className="w-5 h-5 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                          />
                          <span className={`flex-1 ${item.packed ? 'line-through text-gray-500' : ''}`}>
                            {item.item}
                          </span>
                          {item.packed && <Check className="w-5 h-5 text-green-600" />}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
