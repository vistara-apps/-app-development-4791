import { useState, useCallback } from 'react';

export function useAlerts() {
  const [alerts, setAlerts] = useState([
    {
      alertId: 'alert_001',
      sensorId: 'sensor_002',
      location: 'Bathroom Floor',
      message: 'Water detected at Bathroom Floor',
      severity: 'medium',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      dismissed: true
    },
    {
      alertId: 'alert_002',
      sensorId: 'sensor_003',
      location: 'Basement Corner',
      message: 'Humidity spike detected at Basement Corner',
      severity: 'high',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      dismissed: false
    }
  ]);

  const addAlert = useCallback((alertData) => {
    const newAlert = {
      alertId: `alert_${Date.now()}`,
      timestamp: new Date(),
      dismissed: false,
      ...alertData
    };

    setAlerts(prev => [newAlert, ...prev]);

    // Simulate browser notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('LeakGuard Alert', {
        body: alertData.message,
        icon: '/favicon.ico'
      });
    }

    return newAlert;
  }, []);

  const dismissAlert = useCallback((alertId) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.alertId === alertId 
          ? { ...alert, dismissed: true }
          : alert
      )
    );
  }, []);

  return {
    alerts,
    addAlert,
    dismissAlert
  };
}