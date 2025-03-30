import React, { useState, useEffect } from 'react';
import { Activity, Award, Clock, DollarSign, BarChart2, MapPin, Zap, Shield, Leaf, TrendingUp, User, Users } from 'lucide-react';

const SuiSuiDriveDashboard = () => {
  // Dashboard state
  const [activeTab, setActiveTab] = useState('realtime');
  const [isLive, setIsLive] = useState(true);
  const [currentSpeed, setCurrentSpeed] = useState(42);
  const [distanceTraveled, setDistanceTraveled] = useState(12.4);
  const [suiSpent, setSuiSpent] = useState(0.124);
  const [ecoScore, setEcoScore] = useState(87);
  const [safetyScore, setSafetyScore] = useState(92);
  
  // Real-time simulation
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      // Randomly change values (in a real app, we'd use actual data)
      const newSpeed = Math.max(0, currentSpeed + (Math.random() * 6 - 3));
      setCurrentSpeed(Math.round(newSpeed));
      
      const newDistance = distanceTraveled + (newSpeed / 3600); // km/h → km/s conversion
      setDistanceTraveled(parseFloat(newDistance.toFixed(3)));
      
      const newSuiSpent = newDistance * 0.01; // 1km = 0.01 SUI
      setSuiSpent(parseFloat(newSuiSpent.toFixed(4)));
      
      // Update eco and safety scores
      setEcoScore(Math.min(100, Math.max(0, ecoScore + (Math.random() * 2 - 1))));
      setSafetyScore(Math.min(100, Math.max(0, safetyScore + (Math.random() * 2 - 1))));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isLive, currentSpeed, distanceTraveled, ecoScore, safetyScore]);
  
  // Badge data
  const badges = [
    { name: 'Eco Driver', icon: <Leaf />, level: 3, progress: 85 },
    { name: 'Smooth Driver', icon: <TrendingUp />, level: 4, progress: 92 },
    { name: 'Safe Driver', icon: <Shield />, level: 2, progress: 68 },
    { name: 'Regular Driver', icon: <Clock />, level: 5, progress: 100 },
  ];
  
  // Ranking data
  const rankings = [
    { rank: 1, name: 'Michael S.', score: 98, reward: 0.5 },
    { rank: 2, name: 'Emma L.', score: 95, reward: 0.3 },
    { rank: 3, name: 'David T.', score: 93, reward: 0.2 },
    { rank: 4, name: 'You', score: 89, reward: 0.1 },
    { rank: 5, name: 'James K.', score: 86, reward: 0.05 },
  ];
  
  return (
    <div className="w-full max-w-md mx-auto bg-gray-50 shadow-lg overflow-hidden min-h-screen flex flex-col">
      {/* Header - Mobile optimized */}
      <div className="bg-blue-600 text-white p-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg width="32" height="32" viewBox="0 0 40 40" className="mr-2">
              <circle cx="20" cy="20" r="20" fill="#00BFFF" />
              <path d="M8 20C8 13.373 13.373 8 20 8C26.627 8 32 13.373 32 20" stroke="white" strokeWidth="3" fill="none" />
              <path d="M32 20C32 26.627 26.627 32 20 32C13.373 32 8 26.627 8 20" stroke="white" strokeWidth="3" fill="none" strokeDasharray="2 2" />
              <circle cx="20" cy="20" r="5" fill="white" />
              <path d="M20 12L22 16H18L20 12Z" fill="white" />
            </svg>
            <h1 className="text-lg font-bold">SuiSuiDrive</h1>
          </div>
          <div className="flex items-center">
            <div className={`flex items-center ${isLive ? 'text-green-300' : 'text-gray-300'}`}>
              <span className={`inline-block w-2 h-2 rounded-full mr-1 ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></span>
              <span className="text-xs mr-2">LIVE</span>
            </div>
            <button 
              onClick={() => setIsLive(!isLive)} 
              className={`px-2 py-1 rounded text-xs font-medium ${isLive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {isLive ? 'Stop' : 'Start'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation - Mobile optimized */}
      <div className="bg-white border-b sticky top-12 z-10">
        <div className="flex justify-around">
          <button 
            className={`flex-1 py-3 font-medium text-xs flex flex-col items-center justify-center ${activeTab === 'realtime' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('realtime')}
          >
            <Activity size={16} className="mb-1" />
            Real-time
          </button>
          <button 
            className={`flex-1 py-3 font-medium text-xs flex flex-col items-center justify-center ${activeTab === 'achievements' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('achievements')}
          >
            <Award size={16} className="mb-1" />
            Achievements
          </button>
          <button 
            className={`flex-1 py-3 font-medium text-xs flex flex-col items-center justify-center ${activeTab === 'rankings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('rankings')}
          >
            <Users size={16} className="mb-1" />
            Rankings
          </button>
        </div>
      </div>
      
      {/* Main Content - Flex growth to secure content area */}
      <div className="p-3 flex-grow overflow-y-auto">
        {/* Real-time Tab */}
        {activeTab === 'realtime' && (
          <>
            {/* Main metrics - Mobile-friendly vertical layout */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-white rounded-lg shadow p-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-500 text-xs font-medium">Current Speed</h3>
                  <Clock size={14} className="text-blue-500" />
                </div>
                <div className="flex items-end">
                  <span className="text-2xl font-bold">{currentSpeed}</span>
                  <span className="text-gray-500 text-xs ml-1 mb-1">km/h</span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-500 text-xs font-medium">Distance</h3>
                  <MapPin size={14} className="text-blue-500" />
                </div>
                <div className="flex items-end">
                  <span className="text-2xl font-bold">{distanceTraveled.toFixed(1)}</span>
                  <span className="text-gray-500 text-xs ml-1 mb-1">km</span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-3 col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-500 text-xs font-medium">SUI Payment</h3>
                  <DollarSign size={14} className="text-blue-500" />
                </div>
                <div className="flex items-end">
                  <span className="text-2xl font-bold">{suiSpent.toFixed(4)}</span>
                  <span className="text-gray-500 text-xs ml-1 mb-1">SUI</span>
                </div>
              </div>
            </div>
            
            {/* Map display area - Mobile-size optimized */}
            <div className="bg-white rounded-lg shadow overflow-hidden mb-3">
              <div className="p-2 bg-blue-50 border-b border-blue-100">
                <h3 className="font-medium text-blue-800 text-xs">Driving Map</h3>
              </div>
              <div className="relative" style={{ height: '180px' }}>
                {/* Map display area (placeholder) */}
                <div className="absolute inset-0 bg-gray-100">
                  <div className="h-full w-full flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={24} className="mx-auto text-blue-300 mb-1" />
                      <p className="text-gray-500 text-xs">Loading map data...</p>
                      <p className="text-gray-400 text-xs mt-1">Detailed location data is not recorded for privacy</p>
                    </div>
                  </div>
                </div>
                
                {/* Payment points overlay (sample display) */}
                <div className="absolute bottom-2 left-2">
                  <div className="bg-white rounded-md shadow-md p-1 text-xs">
                    <div className="flex items-center text-gray-600">
                      <Zap size={10} className="text-yellow-500 mr-1" />
                      <span className="text-xs">Payment Points</span>
                    </div>
                    <div className="flex gap-1 text-xs">
                      <div className="flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                        <span>Completed</span>
                      </div>
                      <div className="flex items-center ml-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                        <span>Processing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Score display - Adapted for smaller screens */}
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white rounded-lg shadow p-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-500 text-xs font-medium">Eco Score</h3>
                  <Leaf size={14} className="text-green-500" />
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-green-600">
                        {Math.round(ecoScore)}%
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-green-600">
                        +{(ecoScore >= 80 ? 0.002 : 0.001).toFixed(3)} SUI/km
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 my-1 text-xs flex rounded bg-green-100">
                    <div style={{ width: `${ecoScore}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                  </div>
                  <p className="text-xs text-gray-500">Earn SUI with fuel-efficient driving!</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-gray-500 text-xs font-medium">Safety Score</h3>
                  <Shield size={14} className="text-blue-500" />
                </div>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {Math.round(safetyScore)}%
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        +{(safetyScore >= 90 ? 0.003 : 0.001).toFixed(3)} SUI/km
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 my-1 text-xs flex rounded bg-blue-100">
                    <div style={{ width: `${safetyScore}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                  </div>
                  <p className="text-xs text-gray-500">Get more SUI with safe driving!</p>
                </div>
              </div>
            </div>
          </>
        )}
        
        {/* Achievements Tab - Mobile-friendly */}
        {activeTab === 'achievements' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-3 border-b">
              <h2 className="text-base font-medium text-gray-800">Driver Achievements</h2>
              <p className="text-xs text-gray-500">Unlock badges with safe driving</p>
            </div>
            
            <div className="p-3">
              <div className="grid grid-cols-1 gap-3">
                {badges.map((badge, index) => (
                  <div key={index} className="border rounded-lg p-2 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-2 flex-shrink-0">
                      {badge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-800 text-xs truncate">{badge.name}</h3>
                        <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">Lv.{badge.level}</span>
                      </div>
                      <div className="mt-1 relative">
                        <div className="overflow-hidden h-1.5 mb-1 text-xs flex rounded bg-gray-200">
                          <div style={{ width: `${badge.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{badge.progress}%</span>
                          <span>Next Lv: {100 - badge.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* SUI rewards display */}
              <div className="mt-4 bg-green-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-green-800 font-medium text-xs flex items-center">
                    <Award size={12} className="mr-1" />
                    Achievement Rewards
                  </h3>
                  <span className="text-xs font-bold text-green-700">+1.25 SUI</span>
                </div>
                <p className="text-xs text-green-700">Earn SUI based on your badge levels. Keep leveling up!</p>
                <button className="mt-2 w-full py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs font-medium">
                  Claim Rewards
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Rankings Tab - Mobile optimized */}
        {activeTab === 'rankings' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-3 border-b">
              <h2 className="text-base font-medium text-gray-800">Safe Driving Rankings</h2>
              <p className="text-xs text-gray-500">This week's top drivers (out of 240)</p>
            </div>
            
            <div className="p-3">
              <div className="mb-3">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-1 mr-2">
                      <User size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-xs">Your Rank</h3>
                      <p className="text-xs text-gray-500">Top 5% of all drivers!</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="text-xl font-bold text-blue-600">4</span>
                    <span className="text-gray-500 text-xs block">th</span>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto -mx-3">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-xs text-gray-500 bg-gray-50">
                      <th className="px-3 py-2 font-medium">Rank</th>
                      <th className="px-3 py-2 font-medium">Driver</th>
                      <th className="px-3 py-2 font-medium">Score</th>
                      <th className="px-3 py-2 font-medium">Reward</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {rankings.map((driver) => (
                      <tr key={driver.rank} className={driver.name === 'You' ? 'bg-blue-50' : ''}>
                        <td className="px-3 py-2 whitespace-nowrap text-xs">
                          {driver.rank <= 3 ? (
                            <span className={`flex items-center justify-center w-5 h-5 rounded-full text-white text-xs ${
                              driver.rank === 1 ? 'bg-yellow-500' : 
                              driver.rank === 2 ? 'bg-gray-400' : 'bg-yellow-700'
                            }`}>
                              {driver.rank}
                            </span>
                          ) : (
                            <span className="text-gray-500">{driver.rank}</span>
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs">
                          <span className={driver.name === 'You' ? 'font-medium text-blue-600' : ''}>
                            {driver.name}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-xs">
                          <div className="flex items-center">
                            <span className="mr-1">{driver.score}</span>
                            <div className="relative w-12">
                              <div className="overflow-hidden h-1 text-xs flex rounded bg-gray-200">
                                <div style={{ width: `${driver.score}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-green-600 font-medium text-xs">
                          +{driver.reward} SUI
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-3 text-center">
                <button className="text-blue-600 text-xs font-medium">
                  View All Rankings →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer - Mobile optimized */}
      <div className="bg-gray-100 p-2 border-t flex justify-between items-center text-xs text-gray-500 mt-auto">
        <div>SuiSuiDrive v1.2.0</div>
        <div className="flex items-center">
          <span className="bg-green-500 rounded-full w-2 h-2 mr-1"></span>
          <span>Blockchain Connected</span>
        </div>
      </div>
    </div>
  );
};

export default SuiSuiDriveDashboard;