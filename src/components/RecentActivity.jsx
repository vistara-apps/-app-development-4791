import React from 'react';
import { Clock, Droplets, AlertTriangle, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function RecentActivity({ alerts }) {
  const recentAlerts = alerts.slice(0, 5);

  const getActivityIcon = (alert) => {
    if (alert.severity === 'critical') return AlertTriangle;
    if (alert.acknowledged) return CheckCircle;
    return Droplets;
  };

  const getActivityColor = (alert) => {
    if (alert.severity === 'critical') return 'text-danger';
    if (alert.acknowledged) return 'text-success';
    return 'text-primary';
  };

  return (
    <div className="bg-white rounded-lg border border-border p-4">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {recentAlerts.length > 0 ? (
          recentAlerts.map((alert) => {
            const Icon = getActivityIcon(alert);
            const color = getActivityColor(alert);
            
            return (
              <div key={alert.alertId} className="flex items-start">
                <Icon className={`h-4 w-4 mt-1 mr-3 ${color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary">
                    {alert.acknowledged ? 'Resolved leak' : 'Leak detected'} at {alert.location}
                  </p>
                  <p className="text-xs text-text-muted">
                    {formatDistanceToNow(new Date(alert.detectedAt), { addSuffix: true })}
                  </p>
                </div>
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'critical' ? 'bg-danger' : 
                  alert.acknowledged ? 'bg-success' : 'bg-warning'
                }`} />
              </div>
            );
          })
        ) : (
          <div className="text-center py-6">
            <Clock className="h-8 w-8 text-text-muted mx-auto mb-2" />
            <p className="text-text-muted text-sm">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  );
}