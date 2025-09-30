import React, { useState } from 'react';
import { Phone, Star, Clock, DollarSign, MapPin, Filter, Search } from 'lucide-react';

export function ServiceProviders() {
  const [serviceType, setServiceType] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const providers = [
    {
      id: 1,
      name: 'Emergency Plumbing Plus',
      serviceType: 'plumber',
      rating: 4.8,
      reviewCount: 127,
      response: '15 min',
      pricing: 'premium',
      distance: '2.3 miles',
      available: true,
      phone: '(555) 123-4567',
      estimate: '$150-250',
      specialties: ['Emergency Response', '24/7 Service', 'Water Damage'],
    },
    {
      id: 2,
      name: 'FastFix Water Solutions',
      serviceType: 'plumber',
      rating: 4.6,
      reviewCount: 89,
      response: '25 min',
      pricing: 'standard',
      distance: '3.7 miles',
      available: true,
      phone: '(555) 234-5678',
      estimate: '$120-200',
      specialties: ['Leak Detection', 'Pipe Repair', 'Insurance Claims'],
    },
    {
      id: 3,
      name: 'RestoreRight Services',
      serviceType: 'restoration',
      rating: 4.9,
      reviewCount: 203,
      response: '45 min',
      pricing: 'premium',
      distance: '4.1 miles',
      available: true,
      phone: '(555) 345-6789',
      estimate: '$500-1500',
      specialties: ['Water Extraction', 'Mold Prevention', 'Full Restoration'],
    },
    {
      id: 4,
      name: 'Quick Shutoff Specialists',
      serviceType: 'shutoff',
      rating: 4.7,
      reviewCount: 156,
      response: '10 min',
      pricing: 'budget',
      distance: '1.8 miles',
      available: true,
      phone: '(555) 456-7890',
      estimate: '$75-125',
      specialties: ['Emergency Shutoff', 'Main Line Access', 'Valve Repair'],
    },
  ];

  const filteredProviders = providers
    .filter(provider => serviceType === 'all' || provider.serviceType === serviceType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'distance': return parseFloat(a.distance) - parseFloat(b.distance);
        case 'response': return parseInt(a.response) - parseInt(b.response);
        default: return 0;
      }
    });

  const handleRequestService = (provider) => {
    alert(`Service request sent to ${provider.name}. Expected response: ${provider.response}`);
  };

  const getPricingColor = (pricing) => {
    switch (pricing) {
      case 'budget': return 'text-success bg-green-100';
      case 'standard': return 'text-warning bg-yellow-100';
      case 'premium': return 'text-primary bg-blue-100';
      default: return 'text-text-muted bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-text-primary">Emergency Services</h2>
        <p className="text-text-secondary mt-1 sm:mt-0">
          Vetted local contractors ready to respond
        </p>
      </div>

      <div className="bg-white rounded-lg border border-border p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
          <div className="flex gap-4">
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-white"
            >
              <option value="all">All Services</option>
              <option value="plumber">Plumbers</option>
              <option value="restoration">Restoration</option>
              <option value="shutoff">Emergency Shutoff</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-white"
            >
              <option value="rating">Sort by Rating</option>
              <option value="distance">Sort by Distance</option>
              <option value="response">Sort by Response Time</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="border border-border rounded-lg p-4 hover:shadow-card-hover transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-text-primary">{provider.name}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-text-primary ml-1">{provider.rating}</span>
                    <span className="text-text-muted ml-1">({provider.reviewCount} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPricingColor(provider.pricing)}`}>
                    {provider.pricing.toUpperCase()}
                  </div>
                  <div className={`mt-1 w-2 h-2 rounded-full mx-auto ${provider.available ? 'bg-success' : 'bg-gray-400'}`} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-text-muted mr-1" />
                  <span className="text-text-secondary">{provider.response}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-text-muted mr-1" />
                  <span className="text-text-secondary">{provider.distance}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-text-muted mr-1" />
                  <span className="text-text-secondary">{provider.estimate}</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-text-secondary">Specialties</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {provider.specialties.map((specialty, index) => (
                    <span key={index} className="inline-block px-2 py-1 bg-bg-secondary text-text-secondary text-xs rounded">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleRequestService(provider)}
                  className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover transition-colors text-sm font-medium"
                >
                  Request Service
                </button>
                <a
                  href={`tel:${provider.phone}`}
                  className="flex items-center justify-center px-3 py-2 border border-border rounded-md hover:bg-surface-hover transition-colors"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}