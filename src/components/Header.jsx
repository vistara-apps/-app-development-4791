import React from 'react';
import { Shield, Bell, FileText, Users, Settings, BarChart3, Home } from 'lucide-react';

export function Header({ activeView, setActiveView, alerts }) {
  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'alerts', name: 'Alerts', icon: Bell, badge: alerts.filter(a => !a.acknowledged).length },
    { id: 'insurance', name: 'Insurance', icon: FileText },
    { id: 'services', name: 'Services', icon: Users },
    { id: 'sensors', name: 'Sensors', icon: Settings },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ];

  return (
    <header className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-xl font-bold text-text-primary">LeakGuard</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    activeView === item.id
                      ? 'text-primary bg-blue-50'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                  {item.badge > 0 && (
                    <span className="ml-2 bg-danger text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="md:hidden">
            <select
              value={activeView}
              onChange={(e) => setActiveView(e.target.value)}
              className="border border-border rounded-md px-3 py-2 bg-white"
            >
              {navigation.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} {item.badge > 0 && `(${item.badge})`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}