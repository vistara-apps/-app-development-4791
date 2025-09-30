import React from 'react';
import { Activity, Droplets, Shield, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function ActivityFeed({ alerts, sensors }) {
  // Generate recent activity from alerts and sensor data
  const generateActivities = () => {
    const activities = [];
    
    // Add recent alerts
    alerts.slice(0, 3).forEach(alert => {
      activities.push({
        id: `alert-${alert.alertId}`,
        type: 'alert',
        message: `Water detected at ${alert.location}`,
        timestamp: alert.timestamp,
        severity: alert.severity,
        icon: Droplets
      });
    });

    // Add sensor status updates
    sensors.forEach(sensor => {
      if (sensor.lastPing) {
        activities.push({
          id: `sensor-${sensor.sensorId}`,
          type: 'sensor',
          message: `${sensor.location} sensor online`,
          timestamp: sensor.lastPing,
          icon: CheckCircle
        });
      }
    });

    // Sort by timestamp
    return activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);
  };

  const activities = generateActivities();

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900">Activity Feed</h3>
      </div>
      
      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => {
            const Icon = activity.icon;
            
            return (
              <div key={activity.id} className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  activity.type === 'alert' 
                    ? activity.severity === 'critical' 
                      ? 'bg-danger-100' 
                      : 'bg-warning-100'
                    : 'bg-success-100'
                }`}>
                  <Icon className={`w-4 h-4 ${
                    activity.type === 'alert'
                      ? activity.severity === 'critical'
                        ? 'text-danger-600'
                        : 'text-warning-600'
                      : 'text-success-600'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-4">
            <Shield className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
}