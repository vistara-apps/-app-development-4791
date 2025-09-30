import React from 'react';
import { Droplets, Thermometer, Battery, Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function SensorCard({ sensor, onClick }) {
  const getStatusColor = () => {
    if (!sensor.isActive) return 'text-gray-400';
    if (sensor.lastReading?.waterDetected) return 'text-danger-500';
    if (sensor.batteryLevel < 20) return 'text-warning-500';
    return 'text-success-500';
  };

  const getStatusText = () => {
    if (!sensor.isActive) return 'Offline';
    if (sensor.lastReading?.waterDetected) return 'Water Detected!';
    if (sensor.batteryLevel < 20) return 'Low Battery';
    return 'Active';
  };

  const getBgColor = () => {
    if (!sensor.isActive) return 'bg-gray-50';
    if (sensor.lastReading?.waterDetected) return 'bg-danger-50 border-danger-200';
    return 'bg-white';
  };

  return (
    <div
      onClick={onClick}
      className={`sensor-card cursor-pointer ${getBgColor()} ${
        sensor.lastReading?.waterDetected ? 'animate-pulse-slow' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-xl ${
            sensor.isActive ? 'bg-primary-100' : 'bg-gray-100'
          }`}>
            <Droplets className={`w-5 h-5 ${
              sensor.isActive ? 'text-primary-600' : 'text-gray-400'
            }`} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{sensor.location}</h3>
            <p className="text-sm text-gray-500">{sensor.deviceType}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {sensor.isActive ? (
            <Wifi className="w-4 h-4 text-success-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-gray-400" />
          )}
          {sensor.lastReading?.waterDetected && (
            <AlertTriangle className="w-4 h-4 text-danger-500 animate-bounce-slow" />
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
          {sensor.lastPing && (
            <span className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(sensor.lastPing), { addSuffix: true })}
            </span>
          )}
        </div>

        {sensor.isActive && sensor.lastReading && (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Droplets className="w-4 h-4 text-water-400" />
              <div>
                <p className="text-xs text-gray-500">Humidity</p>
                <p className="text-sm font-medium">{sensor.lastReading.humidity.toFixed(1)}%</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-orange-400" />
              <div>
                <p className="text-xs text-gray-500">Temperature</p>
                <p className="text-sm font-medium">{sensor.lastReading.temperature.toFixed(1)}°C</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Battery className={`w-4 h-4 ${
              sensor.batteryLevel > 50 ? 'text-success-500' :
              sensor.batteryLevel > 20 ? 'text-warning-500' : 'text-danger-500'
            }`} />
            <span className="text-sm text-gray-600">{sensor.batteryLevel}%</span>
          </div>
          
          {sensor.lastReading?.confidence && (
            <div className="text-xs text-gray-500">
              Confidence: {(sensor.lastReading.confidence * 100).toFixed(0)}%
            </div>
          )}
        </div>
      </div>
    </div>
  );
}