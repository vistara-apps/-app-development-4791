import React, { useState } from 'react';
import { ArrowLeft, Droplets, Thermometer, Battery, Wifi, Settings, TrendingUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function SensorDetail({ sensor, onBack }) {
  const [timeRange, setTimeRange] = useState('24h');

  // Generate mock historical data
  const generateHistoricalData = () => {
    const hours = timeRange === '24h' ? 24 : timeRange === '7d' ? 168 : 720;
    const data = [];
    
    for (let i = hours; i >= 0; i--) {
      const timestamp = new Date(Date.now() - i * 60 * 60 * 1000);
      data.push({
        timestamp,
        humidity: 40 + Math.random() * 30,
        temperature: 18 + Math.random() * 8,
        waterDetected: Math.random() < 0.01
      });
    }
    
    return data;
  };

  const historicalData = generateHistoricalData();
  const averageHumidity = historicalData.reduce((sum, d) => sum + d.humidity, 0) / historicalData.length;
  const averageTemp = historicalData.reduce((sum, d) => sum + d.temperature, 0) / historicalData.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Dashboard</span>
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-100 rounded-xl">
                <Droplets className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{sensor.location}</h1>
                <p className="text-gray-500">{sensor.deviceType}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className={`font-medium ${
                  sensor.isActive ? 'text-success-600' : 'text-gray-400'
                }`}>
                  {sensor.isActive ? 'Online' : 'Offline'}
                </p>
                {sensor.lastPing && (
                  <p className="text-sm text-gray-500">
                    Last seen {formatDistanceToNow(new Date(sensor.lastPing), { addSuffix: true })}
                  </p>
                )}
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-water-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Droplets className="w-8 h-8 text-water-500" />
                <div>
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sensor.lastReading?.humidity.toFixed(1) || '--'}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Thermometer className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {sensor.lastReading?.temperature.toFixed(1) || '--'}°C
                  </p>
                </div>
              </div>
            </div>

            <div className={`rounded-xl p-4 ${
              sensor.batteryLevel > 50 ? 'bg-success-50' :
              sensor.batteryLevel > 20 ? 'bg-warning-50' : 'bg-danger-50'
            }`}>
              <div className="flex items-center space-x-3">
                <Battery className={`w-8 h-8 ${
                  sensor.batteryLevel > 50 ? 'text-success-500' :
                  sensor.batteryLevel > 20 ? 'text-warning-500' : 'text-danger-500'
                }`} />
                <div>
                  <p className="text-sm text-gray-600">Battery</p>
                  <p className="text-2xl font-bold text-gray-900">{sensor.batteryLevel}%</p>
                </div>
              </div>
            </div>

            <div className="bg-primary-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Wifi className="w-8 h-8 text-primary-500" />
                <div>
                  <p className="text-sm text-gray-600">Signal</p>
                  <p className="text-2xl font-bold text-gray-900">95%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Data */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Historical Data</h2>
            <div className="flex space-x-2">
              {['24h', '7d', '30d'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    timeRange === range
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-water-50 to-water-100 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-water-600" />
                <h3 className="font-medium text-gray-900">Humidity Trends</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average</span>
                  <span className="font-medium">{averageHumidity.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Max</span>
                  <span className="font-medium">{Math.max(...historicalData.map(d => d.humidity)).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Min</span>
                  <span className="font-medium">{Math.min(...historicalData.map(d => d.humidity)).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                <h3 className="font-medium text-gray-900">Temperature Trends</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average</span>
                  <span className="font-medium">{averageTemp.toFixed(1)}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Max</span>
                  <span className="font-medium">{Math.max(...historicalData.map(d => d.temperature)).toFixed(1)}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Min</span>
                  <span className="font-medium">{Math.min(...historicalData.map(d => d.temperature)).toFixed(1)}°C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Events */}
          <div className="mt-8">
            <h3 className="font-medium text-gray-900 mb-4">Recent Events</h3>
            <div className="space-y-3">
              {historicalData.filter(d => d.waterDetected).slice(0, 3).map((event, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-danger-50 rounded-lg">
                  <div className="w-2 h-2 bg-danger-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Water detected</p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
              
              {historicalData.filter(d => d.waterDetected).length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">No water detection events in selected timeframe</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}