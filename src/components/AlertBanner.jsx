import React from 'react';
import { AlertTriangle, Phone, FileText, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function AlertBanner({ alert, onDismiss, onCallEmergency, onViewReport }) {
  const getSeverityClass = () => {
    switch (alert.severity) {
      case 'critical': return 'alert-critical';
      case 'high': return 'alert-critical';
      case 'medium': return 'alert-warning';
      default: return 'alert-info';
    }
  };

  return (
    <div className={getSeverityClass()}>
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="font-semibold">Water Leak Detected</h4>
              <p className="text-sm mt-1">
                Location: {alert.location} • Severity: {alert.severity.toUpperCase()}
              </p>
              <p className="text-xs mt-1 opacity-75">
                {formatDistanceToNow(new Date(alert.detectedAt), { addSuffix: true })}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-3 sm:mt-0">
              <button
                onClick={() => onCallEmergency?.(alert)}
                className="flex items-center px-3 py-2 bg-white text-red-700 rounded-md hover:bg-red-50 text-sm font-medium border border-red-200"
              >
                <Phone className="h-4 w-4 mr-1" />
                Get Help
              </button>
              <button
                onClick={() => onViewReport?.(alert)}
                className="flex items-center px-3 py-2 bg-white text-red-700 rounded-md hover:bg-red-50 text-sm font-medium border border-red-200"
              >
                <FileText className="h-4 w-4 mr-1" />
                Report
              </button>
              {onDismiss && (
                <button
                  onClick={() => onDismiss(alert.alertId)}
                  className="p-2 bg-white text-red-700 rounded-md hover:bg-red-50 border border-red-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}