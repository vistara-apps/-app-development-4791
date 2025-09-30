import { useState, useEffect } from 'react';

export function useLeakGuard() {
  const [sensors, setSensors] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [leakEvents, setLeakEvents] = useState([]);

  // Initialize with demo data
  useEffect(() => {
    const initialSensors = [
      {
        sensorId: 'sensor-1',
        location: 'Kitchen Sink',
        deviceType: 'basic',
        isActive: true,
        lastPing: Date.now() - 120000,
        batteryLevel: 85,
        latestReading: {
          humidity: 42,
          temperature: 23,
          waterDetected: false,
          confidence: 0.92,
        },
      },
      {
        sensorId: 'sensor-2',
        location: 'Master Bathroom',
        deviceType: 'camera-enabled',
        isActive: true,
        lastPing: Date.now() - 45000,
        batteryLevel: 67,
        latestReading: {
          humidity: 68,
          temperature: 24,
          waterDetected: false,
          confidence: 0.88,
        },
      },
      {
        sensorId: 'sensor-3',
        location: 'Basement',
        deviceType: 'basic',
        isActive: true,
        lastPing: Date.now() - 180000,
        batteryLevel: 18,
        latestReading: {
          humidity: 55,
          temperature: 19,
          waterDetected: false,
          confidence: 0.95,
        },
      },
      {
        sensorId: 'sensor-4',
        location: 'Laundry Room',
        deviceType: 'basic',
        isActive: false,
        lastPing: Date.now() - 900000,
        batteryLevel: 5,
        latestReading: {
          humidity: 35,
          temperature: 21,
          waterDetected: false,
          confidence: 0.75,
        },
      },
    ];

    const initialAlerts = [
      {
        alertId: 'alert-1',
        eventId: 'event-1',
        location: 'Guest Bathroom',
        severity: 'medium',
        detectedAt: Date.now() - 3600000,
        acknowledged: true,
        channel: 'push',
      },
      {
        alertId: 'alert-2',
        eventId: 'event-2',
        location: 'Kitchen Sink',
        severity: 'low',
        detectedAt: Date.now() - 7200000,
        acknowledged: true,
        channel: 'email',
      },
    ];

    const initialEvents = [
      {
        eventId: 'event-1',
        sensorId: 'sensor-2',
        location: 'Guest Bathroom',
        detectedAt: Date.now() - 3600000,
        resolvedAt: Date.now() - 1800000,
        severity: 'medium',
        isFalsePositive: false,
        mlConfidence: 0.92,
      },
      {
        eventId: 'event-2',
        sensorId: 'sensor-1',
        location: 'Kitchen Sink',
        detectedAt: Date.now() - 7200000,
        resolvedAt: Date.now() - 5400000,
        severity: 'low',
        isFalsePositive: false,
        mlConfidence: 0.87,
      },
      {
        eventId: 'event-3',
        sensorId: 'sensor-3',
        location: 'Basement',
        detectedAt: Date.now() - 172800000,
        resolvedAt: Date.now() - 169200000,
        severity: 'critical',
        isFalsePositive: false,
        mlConfidence: 0.98,
      },
    ];

    setSensors(initialSensors);
    setAlerts(initialAlerts);
    setLeakEvents(initialEvents);
  }, []);

  const addSensor = (sensorData) => {
    const newSensor = {
      sensorId: `sensor-${Date.now()}`,
      ...sensorData,
      isActive: true,
      lastPing: Date.now(),
      batteryLevel: 100,
      latestReading: {
        humidity: 40 + Math.random() * 20,
        temperature: 20 + Math.random() * 8,
        waterDetected: false,
        confidence: 0.85 + Math.random() * 0.15,
      },
    };
    setSensors(prev => [...prev, newSensor]);
  };

  const updateSensor = (sensorId, updates) => {
    setSensors(prev => prev.map(sensor => 
      sensor.sensorId === sensorId ? { ...sensor, ...updates } : sensor
    ));
  };

  const triggerLeak = (sensorId) => {
    const sensor = sensors.find(s => s.sensorId === sensorId);
    if (!sensor) return;

    const eventId = `event-${Date.now()}`;
    const alertId = `alert-${Date.now()}`;

    // Create leak event
    const newEvent = {
      eventId,
      sensorId,
      location: sensor.location,
      detectedAt: Date.now(),
      resolvedAt: null,
      severity: 'critical',
      isFalsePositive: false,
      mlConfidence: 0.95,
    };

    // Create alert
    const newAlert = {
      alertId,
      eventId,
      location: sensor.location,
      severity: 'critical',
      detectedAt: Date.now(),
      acknowledged: false,
      channel: 'push',
    };

    // Update sensor reading
    updateSensor(sensorId, {
      latestReading: {
        ...sensor.latestReading,
        waterDetected: true,
        confidence: 0.95,
        humidity: 95,
      },
    });

    setLeakEvents(prev => [newEvent, ...prev]);
    setAlerts(prev => [newAlert, ...prev]);
  };

  const dismissAlert = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.alertId === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const generateInsuranceReport = (eventId) => {
    alert('Insurance report generated successfully! PDF will be sent to your email.');
  };

  return {
    sensors,
    alerts,
    leakEvents,
    addSensor,
    updateSensor,
    triggerLeak,
    dismissAlert,
    generateInsuranceReport,
  };
}