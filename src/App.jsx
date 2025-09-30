import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AlertManager } from './components/AlertManager';
import { InsuranceReports } from './components/InsuranceReports';
import { ServiceProviders } from './components/ServiceProviders';
import { SensorManagement } from './components/SensorManagement';
import { Analytics } from './components/Analytics';
import { useLeakGuard } from './hooks/useLeakGuard';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const { 
    sensors, 
    alerts, 
    leakEvents, 
    addSensor, 
    updateSensor, 
    triggerLeak, 
    dismissAlert,
    generateInsuranceReport 
  } = useLeakGuard();

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard sensors={sensors} alerts={alerts} triggerLeak={triggerLeak} />;
      case 'alerts':
        return <AlertManager alerts={alerts} dismissAlert={dismissAlert} />;
      case 'insurance':
        return <InsuranceReports leakEvents={leakEvents} generateReport={generateInsuranceReport} />;
      case 'services':
        return <ServiceProviders />;
      case 'sensors':
        return <SensorManagement sensors={sensors} addSensor={addSensor} updateSensor={updateSensor} />;
      case 'analytics':
        return <Analytics sensors={sensors} leakEvents={leakEvents} />;
      default:
        return <Dashboard sensors={sensors} alerts={alerts} triggerLeak={triggerLeak} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-secondary">
      <Header activeView={activeView} setActiveView={setActiveView} alerts={alerts} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderView()}
      </main>
    </div>
  );
}

export default App;