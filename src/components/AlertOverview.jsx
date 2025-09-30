import React from 'react';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function AlertOverview({ alerts }) {
  const activeAlerts = alerts.filter(a => !a.dismissed);
  const recentAlerts = alerts.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Recent Alerts</h3>
        {activeAlerts.length > 0 && (
          <span className="bg-danger-100 text-danger-600 text-xs px-2 py-1 rounded-full">
            {activeAlerts.length} active
          </span>
        )}
      </div>

      <div className="space-y-3">
        {recentAlerts.length > 0 ? (
          recentAlerts.map((alert, index) => (
            <div
              key={alert.alertId || index}
              className={`flex items-center space-x-3 p-3 rounded-xl ${
                alert.dismissed ? 'bg-gray-50' : getSeverityBg(alert.severity)
              }`}
            >
              <div className={`p-1.5 rounded-lg ${getSeverityIconBg(alert.severity)}`}>
                {alert.dismissed ? (
                  <CheckCircle className="w-4 h-4 text-success-600" />
                ) : (
                  <AlertTriangle className={`w-4 h-4 ${getSeverityIconColor(alert.severity)}`} />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  alert.dismissed ? 'text-gray-500' : 'text-gray-900'
                }`}>
                  {alert.message}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <CheckCircle className="w-8 h-8 text-success-500 mx-auto mb-2" />
            <p className="text-sm text-gray-500">All systems normal</p>
          </div>
        )}
      </div>
    </div>
  );
}

function getSeverityBg(severity) {
  switch (severity) {
    case 'critical': return 'bg-danger-50 border border-danger-200';
    case 'high': return 'bg-warning-50 border border-warning-200';
    case 'medium': return 'bg-water-50 border border-water-200';
    default: return 'bg-gray-50';
  }
}

function getSeverityIconBg(severity) {
  switch (severity) {
    case 'critical': return 'bg-danger-100';
    case 'high': return 'bg-warning-100';
    case 'medium': return 'bg-water-100';
    default: return 'bg-gray-100';
  }
}

function getSeverityIconColor(severity) {
  switch (severity) {
    case 'critical': return 'text-danger-600';
    case 'high': return 'text-warning-600';
    case 'medium': return 'text-water-600';
    default: return 'text-gray-600';
  }
}