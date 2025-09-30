import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { SensorDetail } from './components/SensorDetail';
import { AlertsPanel } from './components/AlertsPanel';
import { InsuranceReports } from './components/InsuranceReports';
import { EmergencyServices } from './components/EmergencyServices';
import { useSensorData } from './hooks/useSensorData';
import { useAlerts } from './hooks/useAlerts';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedSensor, setSelectedSensor] = useState(null);
  const { sensors, updateSensor, addSensorReading } = useSensorData();
  const { alerts, addAlert, dismissAlert } = useAlerts();

  // Simulate real-time sensor data
  useEffect(() => {
    const interval = setInterval(() => {
      sensors.forEach(sensor => {
        if (sensor.isActive) {
          const reading = {
            humidity: Math.random() * 100,
            temperature: 18 + Math.random() * 15,
            waterDetected: Math.random() < 0.02, // 2% chance of leak detection
            timestamp: new Date(),
            confidence: 0.8 + Math.random() * 0.2
          };
          
          addSensorReading(sensor.sensorId, reading);
          
          // Check for leak events
          if (reading.waterDetected && reading.confidence > 0.85) {
            addAlert({
              sensorId: sensor.sensorId,
              severity: reading.humidity > 80 ? 'critical' : reading.humidity > 60 ? 'high' : 'medium',
              location: sensor.location,
              message: `Water detected at ${sensor.location}`,
              timestamp: new Date()
            });
          }
        }
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [sensors, addSensorReading, addAlert]);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <Dashboard 
            sensors={sensors}
            alerts={alerts}
            onSensorClick={setSelectedSensor}
            onViewChange={setActiveView}
          />
        );
      case 'sensor-detail':
        return selectedSensor ? (
          <SensorDetail 
            sensor={selectedSensor}
            onBack={() => setActiveView('dashboard')}
          />
        ) : (
          <Dashboard 
            sensors={sensors}
            alerts={alerts}
            onSensorClick={setSelectedSensor}
            onViewChange={setActiveView}
          />
        );
      case 'alerts':
        return (
          <AlertsPanel 
            alerts={alerts}
            sensors={sensors}
            onDismissAlert={dismissAlert}
            onBack={() => setActiveView('dashboard')}
          />
        );
      case 'insurance':
        return (
          <InsuranceReports 
            alerts={alerts}
            sensors={sensors}
            onBack={() => setActiveView('dashboard')}
          />
        );
      case 'emergency':
        return (
          <EmergencyServices 
            onBack={() => setActiveView('dashboard')}
          />
        );
      default:
        return (
          <Dashboard 
            sensors={sensors}
            alerts={alerts}
            onSensorClick={setSelectedSensor}
            onViewChange={setActiveView}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-water-50 to-primary-50">
      <Header 
        activeView={activeView}
        onViewChange={setActiveView}
        alertCount={alerts.filter(a => !a.dismissed).length}
      />
      <main className="pt-20">
        {renderView()}
      </main>
    </div>
  );
}

export default App;