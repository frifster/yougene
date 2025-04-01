import React, { useState } from 'react';

interface Monster {
  id: string;
  name: string;
  type: string;
  level: number;
  geneticStability: number;
  abilities: string[];
  stats: {
    vitality: number;
    strength: number;
    defense: number;
    agility: number;
    intelligence: number;
  };
  price: number;
  seller: string;
}

interface MarketItem {
  id: string;
  monster: Monster;
  listingDate: string;
  status: 'available' | 'sold';
}

const GeneMarket: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'buy' | 'sell'>('buy');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // This will be replaced with actual Redux state
  const availableListings: MarketItem[] = [
    {
      id: '1',
      monster: {
        id: '1',
        name: 'Flora Sprout',
        type: 'Flora',
        level: 5,
        geneticStability: 85,
        abilities: ['Growth', 'Photosynthesis', 'Vine Whip'],
        stats: {
          vitality: 70,
          strength: 45,
          defense: 60,
          agility: 55,
          intelligence: 50,
        },
        price: 1000,
        seller: 'Player123',
      },
      listingDate: '2024-03-20',
      status: 'available',
    },
    {
      id: '2',
      monster: {
        id: '2',
        name: 'Pyro Drake',
        type: 'Pyro',
        level: 8,
        geneticStability: 92,
        abilities: ['Flame Burst', 'Heat Wave', 'Ember'],
        stats: {
          vitality: 65,
          strength: 75,
          defense: 50,
          agility: 70,
          intelligence: 60,
        },
        price: 2500,
        seller: 'MonsterMaster',
      },
      listingDate: '2024-03-20',
      status: 'available',
    },
  ];

  const filteredListings = availableListings.filter(listing => {
    const matchesSearch = listing.monster.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || listing.monster.type === filterType;
    return matchesSearch && matchesType;
  });

  const handlePurchase = (listingId: string) => {
    // This will be replaced with actual purchase logic
    console.log('Purchasing listing:', listingId);
  };

  const handleSell = (monsterId: string, price: number) => {
    // This will be replaced with actual selling logic
    console.log('Selling monster:', monsterId, 'for', price);
  };

  return (
    <div className="min-h-screen bg-background text-text p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Gene Market</h1>

        {/* Market Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setSelectedTab('buy')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'buy' ? 'bg-primary text-white' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Buy Monsters
          </button>
          <button
            onClick={() => setSelectedTab('sell')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTab === 'sell' ? 'bg-primary text-white' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Sell Monsters
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search monsters..."
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Filter by Type</label>
              <select
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Types</option>
                <option value="Flora">Flora</option>
                <option value="Pyro">Pyro</option>
                <option value="Terra">Terra</option>
                <option value="Aqua">Aqua</option>
              </select>
            </div>
          </div>
        </div>

        {/* Market Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map(listing => (
            <div key={listing.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{listing.monster.name}</h3>
                <span className="px-2 py-1 bg-primary/20 rounded text-sm">
                  {listing.monster.type}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Level:</span>
                  <span>{listing.monster.level}</span>
                </div>
                <div className="flex justify-between">
                  <span>Genetic Stability:</span>
                  <span>{listing.monster.geneticStability}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Price:</span>
                  <span className="text-accent">{listing.monster.price} credits</span>
                </div>
                <div className="flex justify-between">
                  <span>Seller:</span>
                  <span>{listing.monster.seller}</span>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Abilities:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {listing.monster.abilities.map(ability => (
                    <div key={ability} className="p-2 bg-gray-700 rounded text-sm">
                      {ability}
                    </div>
                  ))}
                </div>
              </div>
              {selectedTab === 'buy' ? (
                <button
                  onClick={() => handlePurchase(listing.id)}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition-colors"
                >
                  Purchase
                </button>
              ) : (
                <button
                  onClick={() => handleSell(listing.monster.id, listing.monster.price)}
                  className="w-full bg-secondary hover:bg-secondary/90 text-white py-2 rounded-lg transition-colors"
                >
                  Sell
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneMarket;
