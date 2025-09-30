import React from 'react';
import { Phone, FileText, Settings, Plus } from 'lucide-react';

export function QuickActions({ onViewChange }) {
  const actions = [
    {
      id: 'emergency',
      label: 'Emergency Help',
      icon: Phone,
      color: 'bg-danger-500 hover:bg-danger-600',
      description: 'Get immediate assistance'
    },
    {
      id: 'insurance',
      label: 'Generate Report',
      icon: FileText,
      color: 'bg-primary-500 hover:bg-primary-600',
      description: 'Create insurance claim'
    },
    {
      id: 'add-sensor',
      label: 'Add Sensor',
      icon: Plus,
      color: 'bg-success-500 hover:bg-success-600',
      description: 'Install new device'
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
      
      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          
          return (
            <button
              key={action.id}
              onClick={() => action.id === 'add-sensor' ? null : onViewChange(action.id)}
              className={`w-full flex items-center space-x-3 p-4 rounded-xl text-white transition-colors duration-200 ${action.color}`}
            >
              <Icon className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">{action.label}</p>
                <p className="text-sm opacity-90">{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}