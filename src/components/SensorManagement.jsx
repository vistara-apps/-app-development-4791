import React, { useState } from 'react';
import { Plus, Battery, Wifi, Settings, Trash2, Edit, WifiOff } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function SensorManagement({ sensors, addSensor, updateSensor }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSensor, setEditingSensor] = useState(null);
  const [formData, setFormData] = useState({
    location: '',
    deviceType: 'basic',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSensor) {
      updateSensor(editingSensor.sensorId, formData);
      setEditingSensor(null);
    } else {
      addSensor(formData);
    }
    setFormData({ location: '', deviceType: 'basic' });
    setShowAddForm(false);
  };

  const handleEdit = (sensor) => {
    setEditingSensor(sensor);
    setFormData({
      location: sensor.location,
      deviceType: sensor.deviceType,
    });
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingSensor(null);
    setFormData({ location: '', deviceType: 'basic' });
  };

  const getStatusIcon = (sensor) => {
    if (!sensor.isActive || sensor.lastPing < Date.now() - 300000) return WifiOff;
    return Wifi;
  };

  const getStatusColor = (sensor) => {
    if (!sensor.isActive) return 'text-gray-500';
    if (sensor.lastPing < Date.now() - 300000) return 'text-danger';
    if (sensor.batteryLevel < 20) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-text-primary">Sensor Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Sensor
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            {editingSensor ? 'Edit Sensor' : 'Add New Sensor'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Kitchen Sink, Basement, Master Bathroom"
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Device Type
              </label>
              <select
                value={formData.deviceType}
                onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="basic">Basic Sensor</option>
                <option value="camera-enabled">Camera-Enabled Sensor</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover transition-colors"
              >
                {editingSensor ? 'Update Sensor' : 'Add Sensor'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-100 text-text-secondary py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {sensors.map((sensor) => {
          const StatusIcon = getStatusIcon(sensor);
          const statusColor = getStatusColor(sensor);
          
          return (
            <div key={sensor.sensorId} className="bg-white rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-text-primary">{sensor.location}</h3>
                <div className="flex items-center gap-2">
                  <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                  <button
                    onClick={() => handleEdit(sensor)}
                    className="p-1 text-text-muted hover:text-text-primary transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Device Type</span>
                  <span className="text-sm text-text-primary capitalize">
                    {sensor.deviceType.replace('-', ' ')}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Status</span>
                  <span className={`text-sm font-medium ${
                    !sensor.isActive ? 'text-gray-500' :
                    sensor.lastPing < Date.now() - 300000 ? 'text-danger' :
                    'text-success'
                  }`}>
                    {!sensor.isActive ? 'Inactive' :
                     sensor.lastPing < Date.now() - 300000 ? 'Offline' :
                     'Online'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Battery className="h-4 w-4 text-text-muted mr-1" />
                    <span className="text-sm text-text-secondary">Battery</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    sensor.batteryLevel < 20 ? 'text-warning' : 'text-text-primary'
                  }`}>
                    {sensor.batteryLevel}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Last Seen</span>
                  <span className="text-sm text-text-primary">
                    {formatDistanceToNow(new Date(sensor.lastPing), { addSuffix: true })}
                  </span>
                </div>

                {sensor.batteryLevel < 20 && (
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      Battery low - consider replacement
                    </p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-bg-secondary text-text-secondary py-2 px-3 rounded-md hover:bg-gray-200 transition-colors text-sm">
                    Configure
                  </button>
                  <button className="flex-1 bg-bg-secondary text-text-secondary py-2 px-3 rounded-md hover:bg-gray-200 transition-colors text-sm">
                    Test Alert
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}