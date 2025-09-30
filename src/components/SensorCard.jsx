import React from 'react';
import { Droplets, Thermometer, Battery, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function SensorCard({ sensor }) {
  const getStatusColor = () => {
    if (!sensor.isActive || sensor.lastPing < Date.now() - 300000) return 'text-gray-500';
    if (sensor.latestReading?.waterDetected) return 'text-danger';
    if (sensor.batteryLevel < 20) return 'text-warning';
    return 'text-success';
  };

  const getStatusIcon = () => {
    if (!sensor.isActive || sensor.lastPing < Date.now() - 300000) return WifiOff;
    if (sensor.latestReading?.waterDetected) return AlertTriangle;
    return Wifi;
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className="sensor-card">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-text-primary">{sensor.location}</h4>
        <div className="flex items-center">
          <StatusIcon className={`h-4 w-4 ${getStatusColor()}`} />
          {sensor.latestReading?.waterDetected && (
            <div className="ml-2 w-2 h-2 bg-danger rounded-full animate-pulse-slow"></div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="flex items-center">
          <Droplets className="h-4 w-4 text-primary mr-2" />
          <div className="text-sm">
            <div className="text-text-secondary">Humidity</div>
            <div className="font-medium text-text-primary">
              {sensor.latestReading?.humidity || 45}%
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <Thermometer className="h-4 w-4 text-primary mr-2" />
          <div className="text-sm">
            <div className="text-text-secondary">Temperature</div>
            <div className="font-medium text-text-primary">
              {sensor.latestReading?.temperature || 22}°C
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center">
          <Battery className="h-4 w-4 text-text-muted mr-1" />
          <span className={`${sensor.batteryLevel < 20 ? 'text-warning' : 'text-text-secondary'}`}>
            {sensor.batteryLevel}%
          </span>
        </div>
        <span className="text-text-muted">
          {formatDistanceToNow(new Date(sensor.lastPing), { addSuffix: true })}
        </span>
      </div>

      {sensor.latestReading?.waterDetected && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
          <div className="text-sm font-medium text-red-800">Water Detected!</div>
          <div className="text-xs text-red-600">
            Confidence: {Math.round((sensor.latestReading.confidence || 0.95) * 100)}%
          </div>
        </div>
      )}
    </div>
  );
}