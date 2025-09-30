import React from 'react';
import { SensorCard } from './SensorCard';
import { AlertOverview } from './AlertOverview';
import { QuickActions } from './QuickActions';
import { ActivityFeed } from './ActivityFeed';

export function Dashboard({ sensors, alerts, onSensorClick, onViewChange }) {
  const activeSensors = sensors.filter(s => s.isActive);
  const criticalAlerts = alerts.filter(a => a.severity === 'critical' && !a.dismissed);
  const recentAlerts = alerts.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Critical Alerts Banner */}
      {criticalAlerts.length > 0 && (
        <div className="mb-8 bg-danger-500 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Critical Water Leak Detected!</h2>
              <p className="text-danger-100">
                {criticalAlerts.length} active critical alert{criticalAlerts.length > 1 ? 's' : ''} requiring immediate attention
              </p>
            </div>
            <button
              onClick={() => onViewChange('alerts')}
              className="bg-white text-danger-500 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      )}

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Sensors</p>
              <p className="text-2xl font-bold text-gray-900">{activeSensors.length}</p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse-slow"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Alerts</p>
              <p className="text-2xl font-bold text-gray-900">
                {alerts.filter(a => !a.dismissed).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Properties</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">System Health</p>
              <p className="text-2xl font-bold text-success-600">98%</p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center">
              <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sensors Grid */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Your Sensors</h2>
            <button className="text-primary-500 text-sm font-medium hover:text-primary-600">
              Add Sensor +
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sensors.map((sensor) => (
              <SensorCard
                key={sensor.sensorId}
                sensor={sensor}
                onClick={() => {
                  onSensorClick(sensor);
                  onViewChange('sensor-detail');
                }}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <AlertOverview alerts={recentAlerts} />
          <QuickActions onViewChange={onViewChange} />
          <ActivityFeed alerts={recentAlerts} sensors={sensors} />
        </div>
      </div>
    </div>
  );
}