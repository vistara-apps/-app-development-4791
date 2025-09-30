import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, X, Phone, FileText, CheckCircle, Filter } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function AlertsPanel({ alerts, sensors, onDismissAlert, onBack }) {
  const [filter, setFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'active') return !alert.dismissed;
    if (filter === 'critical') return alert.severity === 'critical' && !alert.dismissed;
    if (filter === 'dismissed') return alert.dismissed;
    return true;
  });

  const getSensorLocation = (sensorId) => {
    const sensor = sensors.find(s => s.sensorId === sensorId);
    return sensor?.location || 'Unknown Location';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-danger-600 bg-danger-50 border-danger-200';
      case 'high': return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'medium': return 'text-water-600 bg-water-50 border-water-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Alerts & Notifications</h1>
            <p className="text-gray-500">
              {alerts.filter(a => !a.dismissed).length} active alerts
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Alerts</option>
            <option value="active">Active Only</option>
            <option value="critical">Critical Only</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Alerts List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert, index) => (
              <div
                key={alert.alertId || index}
                className={`bg-white rounded-xl border-l-4 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md ${
                  alert.dismissed ? 'border-gray-300' : getSeverityColor(alert.severity)
                } ${selectedAlert === alert ? 'ring-2 ring-primary-500' : ''}`}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        alert.dismissed ? 'bg-gray-100' : getSeverityColor(alert.severity).split(' ')[1]
                      }`}>
                        {alert.dismissed ? (
                          <CheckCircle className="w-5 h-5 text-success-600" />
                        ) : (
                          <AlertTriangle className={`w-5 h-5 ${getSeverityColor(alert.severity).split(' ')[0]}`} />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className={`font-semibold ${
                            alert.dismissed ? 'text-gray-500' : 'text-gray-900'
                          }`}>
                            {alert.message}
                          </h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            alert.dismissed ? 'bg-gray-100 text-gray-500' : getSeverityColor(alert.severity)
                          }`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">
                          Location: {getSensorLocation(alert.sensorId)}
                        </p>
                        
                        <p className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                    </div>

                    {!alert.dismissed && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDismissAlert(alert.alertId || index);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {!alert.dismissed && alert.severity === 'critical' && (
                    <div className="mt-4 flex space-x-2">
                      <button className="btn-danger text-sm py-2 px-4">
                        <Phone className="w-4 h-4 mr-2" />
                        Emergency Help
                      </button>
                      <button className="btn-ghost text-sm py-2 px-4">
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Report
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-12 text-center">
              <CheckCircle className="w-12 h-12 text-success-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
              <p className="text-gray-500">
                {filter === 'active' ? 'All alerts have been addressed.' : 'No alerts match the current filter.'}
              </p>
            </div>
          )}
        </div>

        {/* Alert Detail Sidebar */}
        <div className="lg:col-span-1">
          {selectedAlert ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Alert Details</h3>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-gray-900">{getSensorLocation(selectedAlert.sensorId)}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Severity</label>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${getSeverityColor(selectedAlert.severity)}`}>
                    {selectedAlert.severity.toUpperCase()}
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Detected</label>
                  <p className="text-gray-900">
                    {new Date(selectedAlert.timestamp).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <p className={`font-medium ${selectedAlert.dismissed ? 'text-success-600' : 'text-warning-600'}`}>
                    {selectedAlert.dismissed ? 'Resolved' : 'Active'}
                  </p>
                </div>

                {!selectedAlert.dismissed && (
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    <button className="w-full btn-danger text-sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Emergency Services
                    </button>
                    <button className="w-full btn-primary text-sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Insurance Report
                    </button>
                    <button
                      onClick={() => onDismissAlert(selectedAlert.alertId)}
                      className="w-full btn-ghost text-sm"
                    >
                      Mark as Resolved
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <AlertTriangle className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Select an alert to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}