import React, { useState } from 'react';
import { AlertBanner } from './AlertBanner';
import { Search, Filter, CheckCircle, AlertTriangle } from 'lucide-react';

export function AlertManager({ alerts, dismissAlert }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && !alert.acknowledged) ||
      (filterStatus === 'resolved' && alert.acknowledged);
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const handleCallEmergency = (alert) => {
    alert('Emergency services contacted for leak at ' + alert.location);
  };

  const handleViewReport = (alert) => {
    alert('Generating insurance report for leak at ' + alert.location);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-text-primary">Alert Management</h2>
        <div className="flex items-center mt-4 sm:mt-0">
          <CheckCircle className="h-5 w-5 text-success mr-2" />
          <span className="text-text-secondary">
            {alerts.filter(a => a.acknowledged).length} resolved, {alerts.filter(a => !a.acknowledged).length} active
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-border p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
            </select>
            
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-white"
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <AlertBanner
                key={alert.alertId}
                alert={alert}
                onDismiss={dismissAlert}
                onCallEmergency={handleCallEmergency}
                onViewReport={handleViewReport}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">No alerts found</h3>
              <p className="text-text-muted">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}