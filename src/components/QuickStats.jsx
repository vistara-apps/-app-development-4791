import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export function QuickStats({ sensors, alerts }) {
  const activeSensors = sensors.filter(s => s.isActive).length;
  const activeAlerts = alerts.filter(a => !a.acknowledged).length;
  const criticalAlerts = alerts.filter(a => !a.acknowledged && a.severity === 'critical').length;
  const uptime = '99.8%';

  const stats = [
    {
      label: 'Active Sensors',
      value: activeSensors,
      icon: Shield,
      color: 'text-success',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Active Alerts',
      value: activeAlerts,
      icon: AlertTriangle,
      color: activeAlerts > 0 ? 'text-danger' : 'text-success',
      bgColor: activeAlerts > 0 ? 'bg-red-50' : 'bg-green-50',
    },
    {
      label: 'Critical Alerts',
      value: criticalAlerts,
      icon: AlertTriangle,
      color: criticalAlerts > 0 ? 'text-danger' : 'text-success',
      bgColor: criticalAlerts > 0 ? 'bg-red-50' : 'bg-green-50',
    },
    {
      label: 'System Uptime',
      value: uptime,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-lg border border-border p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-md ${stat.bgColor}`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="ml-3">
                <p className="text-text-secondary text-sm">{stat.label}</p>
                <p className={`text-2xl font-semibold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}