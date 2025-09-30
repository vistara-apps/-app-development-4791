import React, { useState } from 'react';
import { ArrowLeft, FileText, Download, Camera, Plus, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function InsuranceReports({ alerts, sensors, onBack }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [reports, setReports] = useState([
    {
      reportId: 'rpt_001',
      eventId: 'evt_001',
      location: 'Kitchen Sink',
      generatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      damageEstimate: { cost: 2500, scope: 'Minor water damage to cabinet floor' },
      status: 'completed',
      claimSubmitted: true
    },
    {
      reportId: 'rpt_002',
      eventId: 'evt_002',
      location: 'Basement',
      generatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      damageEstimate: { cost: 8500, scope: 'Significant flooding, drywall replacement needed' },
      status: 'completed',
      claimSubmitted: false
    }
  ]);

  const generateReport = () => {
    if (!selectedEvent) return;

    const newReport = {
      reportId: `rpt_${Date.now()}`,
      eventId: selectedEvent.alertId,
      location: selectedEvent.location,
      generatedAt: new Date(),
      damageEstimate: {
        cost: Math.floor(1000 + Math.random() * 5000),
        scope: generateDamageDescription(selectedEvent.severity)
      },
      status: 'completed',
      claimSubmitted: false
    };

    setReports([newReport, ...reports]);
    setSelectedEvent(null);
  };

  const generateDamageDescription = (severity) => {
    switch (severity) {
      case 'critical':
        return 'Major water damage requiring immediate professional restoration';
      case 'high':
        return 'Moderate water damage with potential structural concerns';
      case 'medium':
        return 'Minor water exposure, preventive measures recommended';
      default:
        return 'Minimal water detection, monitoring suggested';
    }
  };

  const eligibleEvents = alerts.filter(alert => 
    !alert.dismissed && 
    !reports.some(report => report.eventId === alert.alertId)
  );

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
            <h1 className="text-2xl font-bold text-gray-900">Insurance Reports</h1>
            <p className="text-gray-500">
              Professional documentation for insurance claims
            </p>
          </div>
        </div>

        {eligibleEvents.length > 0 && (
          <button
            onClick={() => setSelectedEvent(eligibleEvents[0])}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Generate Report
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reports List */}
        <div className="lg:col-span-2 space-y-6">
          {reports.length > 0 ? (
            reports.map((report) => (
              <div
                key={report.reportId}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <FileText className="w-5 h-5 text-primary-600" />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Water Damage Report - {report.location}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Report ID: {report.reportId}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDistanceToNow(report.generatedAt, { addSuffix: true })}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          report.claimSubmitted 
                            ? 'bg-success-100 text-success-600' 
                            : 'bg-warning-100 text-warning-600'
                        }`}>
                          {report.claimSubmitted ? 'Claim Submitted' : 'Ready to Submit'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Estimated Damage Cost</label>
                      <p className="text-lg font-bold text-gray-900">
                        ${report.damageEstimate.cost.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Damage Scope</label>
                      <p className="text-sm text-gray-700">
                        {report.damageEstimate.scope}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="btn-primary text-sm py-2 px-4">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                  
                  {!report.claimSubmitted && (
                    <button className="btn-ghost text-sm py-2 px-4">
                      Mark as Submitted
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl p-12 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports generated</h3>
              <p className="text-gray-500">
                Generate professional insurance reports when water damage occurs
              </p>
            </div>
          )}
        </div>

        {/* Report Generation Sidebar */}
        <div className="lg:col-span-1">
          {selectedEvent ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Generate Report</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Event Location</label>
                  <p className="text-gray-900">{selectedEvent.location}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Severity Level</label>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                    selectedEvent.severity === 'critical' ? 'bg-danger-100 text-danger-600' :
                    selectedEvent.severity === 'high' ? 'bg-warning-100 text-warning-600' :
                    'bg-water-100 text-water-600'
                  }`}>
                    {selectedEvent.severity.toUpperCase()}
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Detection Time</label>
                  <p className="text-gray-900">
                    {new Date(selectedEvent.timestamp).toLocaleString()}
                  </p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <label className="text-sm font-medium text-gray-500 block mb-2">
                    Add Photos (Optional)
                  </label>
                  <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400">
                    <Camera className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Upload damage photos</p>
                  </button>
                </div>

                <div className="space-y-2 pt-4">
                  <button
                    onClick={generateReport}
                    className="w-full btn-primary text-sm"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </button>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="w-full btn-ghost text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Report Features</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">Timestamped leak detection data</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">Sensor readings and environmental conditions</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">Professional damage assessment</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">Cost estimates and repair recommendations</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <p className="text-gray-600">Insurance-ready PDF format</p>
                </div>
              </div>

              {eligibleEvents.length > 0 && (
                <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm text-primary-700 font-medium">
                    {eligibleEvents.length} event{eligibleEvents.length > 1 ? 's' : ''} ready for reporting
                  </p>
                  <button
                    onClick={() => setSelectedEvent(eligibleEvents[0])}
                    className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Start generating report →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}