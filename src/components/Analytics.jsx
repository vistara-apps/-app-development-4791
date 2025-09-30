import React, { useState } from 'react';
import { TrendingUp, BarChart3, Calendar, AlertTriangle, Droplets } from 'lucide-react';
import { format, subDays, isWithinInterval } from 'date-fns';

export function Analytics({ sensors, leakEvents }) {
  const [timeRange, setTimeRange] = useState('7d');

  const getDateRange = () => {
    const end = new Date();
    const start = subDays(end, timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90);
    return { start, end };
  };

  const { start, end } = getDateRange();
  const filteredEvents = leakEvents.filter(event => 
    isWithinInterval(new Date(event.detectedAt), { start, end })
  );

  const stats = {
    totalEvents: filteredEvents.length,
    avgResponseTime: '12 minutes',
    falsePositiveRate: '8%',
    costSaved: '$24,500',
  };

  const sensorStats = sensors.map(sensor => {
    const sensorEvents = filteredEvents.filter(e => e.sensorId === sensor.sensorId);
    return {
      ...sensor,
      eventCount: sensorEvents.length,
      avgHumidity: 45 + Math.random() * 20,
      avgTemp: 20 + Math.random() * 10,
    };
  });

  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dayEvents = filteredEvents.filter(event => 
      format(new Date(event.detectedAt), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    return {
      date: format(date, 'MMM d'),
      events: dayEvents.length,
      humidity: 40 + Math.random() * 30,
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-text-primary">Analytics & Insights</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="mt-4 sm:mt-0 px-3 py-2 border border-border rounded-md bg-white"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-border p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-warning bg-yellow-100 p-2 rounded-md" />
            <div className="ml-3">
              <p className="text-text-secondary text-sm">Total Events</p>
              <p className="text-2xl font-semibold text-text-primary">{stats.totalEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-success bg-green-100 p-2 rounded-md" />
            <div className="ml-3">
              <p className="text-text-secondary text-sm">Avg Response</p>
              <p className="text-2xl font-semibold text-text-primary">{stats.avgResponseTime}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border p-4">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-primary bg-blue-100 p-2 rounded-md" />
            <div className="ml-3">
              <p className="text-text-secondary text-sm">False Positive</p>
              <p className="text-2xl font-semibold text-text-primary">{stats.falsePositiveRate}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border p-4">
          <div className="flex items-center">
            <Droplets className="h-8 w-8 text-accent bg-orange-100 p-2 rounded-md" />
            <div className="ml-3">
              <p className="text-text-secondary text-sm">Cost Saved</p>
              <p className="text-2xl font-semibold text-text-primary">{stats.costSaved}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Activity Chart */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Daily Activity</h3>
          <div className="space-y-4">
            {dailyData.map((day, index) => (
              <div key={index} className="flex items-center">
                <div className="w-16 text-sm text-text-secondary">{day.date}</div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(day.events / Math.max(...dailyData.map(d => d.events)) || 1) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-8 text-sm text-text-primary font-medium">{day.events}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sensor Performance */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Sensor Performance</h3>
          <div className="space-y-3">
            {sensorStats.map((sensor) => (
              <div key={sensor.sensorId} className="border border-border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-text-primary">{sensor.location}</h4>
                  <span className="text-sm text-text-secondary">{sensor.eventCount} events</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Avg Humidity</span>
                    <div className="font-medium text-text-primary">{sensor.avgHumidity.toFixed(1)}%</div>
                  </div>
                  <div>
                    <span className="text-text-secondary">Avg Temp</span>
                    <div className="font-medium text-text-primary">{sensor.avgTemp.toFixed(1)}°C</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">AI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Pattern Detected</h4>
            <p className="text-sm text-blue-800">
              Basement humidity increases by 15% during morning showers. Consider installing ventilation.
            </p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">System Improvement</h4>
            <p className="text-sm text-green-800">
              ML model accuracy improved by 12% this week based on user feedback.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Maintenance Alert</h4>
            <p className="text-sm text-yellow-800">
              Kitchen sensor battery at 18%. Order replacement battery to avoid service interruption.
            </p>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Cost Savings</h4>
            <p className="text-sm text-purple-800">
              Early detection prevented an estimated $8,500 in water damage this month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}