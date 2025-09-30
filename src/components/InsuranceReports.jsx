import React, { useState } from 'react';
import { FileText, Download, Calendar, DollarSign, Camera, Clock } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';

export function InsuranceReports({ leakEvents, generateReport }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  const handleGenerateReport = async (eventId) => {
    setGeneratingReport(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
    generateReport(eventId);
    setGeneratingReport(false);
  };

  const getDamageEstimate = (severity) => {
    switch (severity) {
      case 'critical': return { min: 5000, max: 15000 };
      case 'high': return { min: 2000, max: 8000 };
      case 'medium': return { min: 500, max: 3000 };
      default: return { min: 100, max: 1000 };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-text-primary">Insurance Reports</h2>
        <p className="text-text-secondary mt-1 sm:mt-0">
          Professional documentation for insurance claims
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-border p-4">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Leak Events</h3>
          <div className="space-y-3">
            {leakEvents.length > 0 ? (
              leakEvents.map((event) => {
                const estimate = getDamageEstimate(event.severity);
                return (
                  <div
                    key={event.eventId}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedEvent?.eventId === event.eventId
                        ? 'border-primary bg-blue-50'
                        : 'border-border hover:border-text-muted'
                    }`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-text-primary">{event.location}</h4>
                        <p className="text-sm text-text-secondary">
                          {format(new Date(event.detectedAt), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          event.severity === 'critical' ? 'bg-red-100 text-red-800' :
                          event.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                          event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {event.severity.toUpperCase()}
                        </div>
                        <p className="text-xs text-text-muted mt-1">
                          ${estimate.min.toLocaleString()} - ${estimate.max.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6">
                <FileText className="h-8 w-8 text-text-muted mx-auto mb-2" />
                <p className="text-text-muted text-sm">No leak events to report</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-border p-4">
          {selectedEvent ? (
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Event Details</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Location</label>
                    <p className="text-text-primary">{selectedEvent.location}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Severity</label>
                    <p className="text-text-primary capitalize">{selectedEvent.severity}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Detected</label>
                    <p className="text-text-primary">
                      {format(new Date(selectedEvent.detectedAt), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary">Duration</label>
                    <p className="text-text-primary">
                      {selectedEvent.resolvedAt 
                        ? formatDistanceToNow(new Date(selectedEvent.resolvedAt), { addSuffix: false })
                        : 'Ongoing'
                      }
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-text-secondary">Damage Estimate</label>
                  <div className="flex items-center mt-1">
                    <DollarSign className="h-4 w-4 text-success mr-1" />
                    <span className="text-text-primary">
                      ${getDamageEstimate(selectedEvent.severity).min.toLocaleString()} - ${getDamageEstimate(selectedEvent.severity).max.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-text-secondary">ML Confidence</label>
                  <div className="flex items-center mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(selectedEvent.mlConfidence || 0.95) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-text-primary">
                      {Math.round((selectedEvent.mlConfidence || 0.95) * 100)}%
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-text-primary mb-3">Report Content</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-text-muted mr-2" />
                      Sensor data and timeline
                    </div>
                    <div className="flex items-center">
                      <Camera className="h-4 w-4 text-text-muted mr-2" />
                      Damage photos (if available)
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-text-muted mr-2" />
                      Cost estimates
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-text-muted mr-2" />
                      Event chronology
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleGenerateReport(selectedEvent.eventId)}
                  disabled={generatingReport}
                  className="w-full flex items-center justify-center px-4 py-3 bg-primary text-white rounded-md hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {generatingReport ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Report...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Generate Insurance Report
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">Select an Event</h3>
              <p className="text-text-muted">Choose a leak event from the list to generate an insurance report.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}