import React from 'react';
import { SensorCard } from './SensorCard';
import { AlertBanner } from './AlertBanner';
import { QuickStats } from './QuickStats';
import { RecentActivity } from './RecentActivity';

export function Dashboard({ sensors, alerts, triggerLeak }) {
  const activeSensors = sensors.filter(s => s.isActive);
  const criticalAlerts = alerts.filter(a => !a.acknowledged && a.severity === 'critical');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-text-primary">Dashboard</h2>
        <p className="text-text-secondary mt-1 sm:mt-0">
          Monitoring {activeSensors.length} sensors across your properties
        </p>
      </div>

      {criticalAlerts.length > 0 && (
        <div className="space-y-4">
          {criticalAlerts.map((alert) => (
            <AlertBanner key={alert.alertId} alert={alert} />
          ))}
        </div>
      )}

      <QuickStats sensors={sensors} alerts={alerts} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Active Sensors</h3>
            <button
              onClick={() => triggerLeak(sensors[0]?.sensorId)}
              className="mt-2 sm:mt-0 px-4 py-2 bg-warning text-white rounded-md hover:bg-orange-600 transition-colors text-sm"
            >
              Simulate Leak
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSensors.map((sensor) => (
              <SensorCard key={sensor.sensorId} sensor={sensor} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <RecentActivity alerts={alerts} />
        </div>
      </div>
    </div>
  );
}