import { useState, useCallback } from 'react';

export function useSensorData() {
  const [sensors] = useState([
    {
      sensorId: 'sensor_001',
      location: 'Kitchen Sink',
      deviceType: 'basic',
      isActive: true,
      batteryLevel: 85,
      lastPing: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      lastReading: {
        humidity: 45.2,
        temperature: 22.1,
        waterDetected: false,
        confidence: 0.92,
        timestamp: new Date(Date.now() - 5 * 60 * 1000)
      }
    },
    {
      sensorId: 'sensor_002',
      location: 'Bathroom Floor',
      deviceType: 'camera-enabled',
      isActive: true,
      batteryLevel: 67,
      lastPing: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
      lastReading: {
        humidity: 78.5,
        temperature: 24.3,
        waterDetected: false,
        confidence: 0.88,
        timestamp: new Date(Date.now() - 2 * 60 * 1000)
      }
    },
    {
      sensorId: 'sensor_003',
      location: 'Basement Corner',
      deviceType: 'basic',
      isActive: true,
      batteryLevel: 15,
      lastPing: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
      lastReading: {
        humidity: 55.8,
        temperature: 18.7,
        waterDetected: false,
        confidence: 0.95,
        timestamp: new Date(Date.now() - 1 * 60 * 1000)
      }
    },
    {
      sensorId: 'sensor_004',
      location: 'Laundry Room',
      deviceType: 'basic',
      isActive: false,
      batteryLevel: 0,
      lastPing: new Date(Date.now() - 25 * 60 * 60 * 1000), // 25 hours ago
      lastReading: null
    }
  ]);

  const [sensorReadings, setSensorReadings] = useState({});

  const updateSensor = useCallback((sensorId, updates) => {
    // In a real app, this would make an API call
    console.log('Updating sensor:', sensorId, updates);
  }, []);

  const addSensorReading = useCallback((sensorId, reading) => {
    setSensorReadings(prev => ({
      ...prev,
      [sensorId]: [...(prev[sensorId] || []), reading].slice(-100) // Keep last 100 readings
    }));

    // Update the sensor's last reading
    const sensor = sensors.find(s => s.sensorId === sensorId);
    if (sensor) {
      sensor.lastReading = reading;
      sensor.lastPing = reading.timestamp;
    }
  }, [sensors]);

  return {
    sensors,
    sensorReadings,
    updateSensor,
    addSensorReading
  };
}