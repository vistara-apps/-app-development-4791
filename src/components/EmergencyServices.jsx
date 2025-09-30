import React, { useState } from 'react';
import { ArrowLeft, Phone, Star, Clock, MapPin, DollarSign, CheckCircle } from 'lucide-react';

export function EmergencyServices({ onBack }) {
  const [selectedService, setSelectedService] = useState('plumber');
  const [requestedProvider, setRequestedProvider] = useState(null);

  const serviceProviders = {
    plumber: [
      {
        id: 'plumber_1',
        name: 'AquaFix Emergency Plumbing',
        rating: 4.8,
        reviews: 156,
        availability: '15 min',
        pricing: '$150-250',
        specialties: ['Leak repair', 'Emergency shutoff', 'Pipe burst'],
        phone: '+1 (555) 123-4567',
        verified: true
      },
      {
        id: 'plumber_2',
        name: 'RapidFlow Plumbing Services',
        rating: 4.6,
        reviews: 89,
        availability: '25 min',
        pricing: '$120-200',
        specialties: ['Water damage', 'Drain cleaning', '24/7 service'],
        phone: '+1 (555) 234-5678',
        verified: true
      },
      {
        id: 'plumber_3',
        name: 'Pro Leak Solutions',
        rating: 4.9,
        reviews: 203,
        availability: '30 min',
        pricing: '$180-300',
        specialties: ['Premium service', 'Insurance liaison', 'Same-day repair'],
        phone: '+1 (555) 345-6789',
        verified: true
      }
    ],
    restoration: [
      {
        id: 'restore_1',
        name: 'DryTech Water Restoration',
        rating: 4.7,
        reviews: 124,
        availability: '45 min',
        pricing: '$500-1500',
        specialties: ['Water extraction', 'Mold prevention', 'Drying equipment'],
        phone: '+1 (555) 456-7890',
        verified: true
      },
      {
        id: 'restore_2',
        name: 'Emergency Dry Pro',
        rating: 4.5,
        reviews: 78,
        availability: '60 min',
        pricing: '$400-1200',
        specialties: ['24/7 response', 'Insurance claims', 'Full restoration'],
        phone: '+1 (555) 567-8901',
        verified: true
      }
    ],
    shutoff: [
      {
        id: 'shutoff_1',
        name: 'Instant Water Control',
        rating: 4.9,
        reviews: 67,
        availability: '10 min',
        pricing: '$75-150',
        specialties: ['Main shutoff', 'Emergency stops', 'Leak isolation'],
        phone: '+1 (555) 678-9012',
        verified: true
      }
    ]
  };

  const serviceTypes = [
    { id: 'plumber', label: 'Emergency Plumber', description: 'Fix leaks and water damage' },
    { id: 'restoration', label: 'Water Restoration', description: 'Dry and restore damaged areas' },
    { id: 'shutoff', label: 'Water Shutoff', description: 'Stop water flow immediately' }
  ];

  const requestService = (provider) => {
    setRequestedProvider(provider);
    // Simulate API call
    setTimeout(() => {
      // Reset after demo
      setRequestedProvider(null);
    }, 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Emergency Services</h1>
          <p className="text-gray-500">
            Connect with verified local professionals instantly
          </p>
        </div>
      </div>

      {requestedProvider && (
        <div className="mb-8 bg-success-50 border border-success-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-success-600" />
            <div>
              <h3 className="font-semibold text-success-900">Service Request Sent!</h3>
              <p className="text-success-700">
                {requestedProvider.name} has been notified. ETA: {requestedProvider.availability}
              </p>
              <p className="text-sm text-success-600 mt-1">
                You'll receive an SMS with live tracking shortly.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Service Type Selector */}
        <div className="lg:col-span-1">
          <h3 className="font-semibold text-gray-900 mb-4">Service Type</h3>
          <div className="space-y-2">
            {serviceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedService(type.id)}
                className={`w-full text-left p-4 rounded-xl border transition-colors duration-200 ${
                  selectedService === type.id
                    ? 'bg-primary-50 border-primary-200 text-primary-900'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <h4 className="font-medium">{type.label}</h4>
                <p className="text-sm opacity-75">{type.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-water-50 rounded-xl">
            <h4 className="font-medium text-water-900 mb-2">Emergency Tips</h4>
            <ul className="text-sm text-water-700 space-y-1">
              <li>• Turn off main water supply if possible</li>
              <li>• Move valuables to dry areas</li>
              <li>• Document damage with photos</li>
              <li>• Contact insurance after securing area</li>
            </ul>
          </div>
        </div>

        {/* Service Providers */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">
              Available {serviceTypes.find(t => t.id === selectedService)?.label}s
            </h3>
            <div className="text-sm text-gray-500">
              Showing {serviceProviders[selectedService]?.length || 0} verified providers
            </div>
          </div>

          <div className="space-y-4">
            {serviceProviders[selectedService]?.map((provider) => (
              <div
                key={provider.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                      {provider.verified && (
                        <CheckCircle className="w-4 h-4 text-success-500" />
                      )}
                    </div>

                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{provider.rating}</span>
                        <span className="text-sm text-gray-500">({provider.reviews} reviews)</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-success-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">ETA: {provider.availability}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span className="text-sm">{provider.pricing}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {provider.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-1 text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Local provider • Licensed & insured</span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-6">
                    <button
                      onClick={() => requestService(provider)}
                      disabled={requestedProvider === provider}
                      className={`px-6 py-3 rounded-xl font-medium text-sm transition-colors duration-200 ${
                        requestedProvider === provider
                          ? 'bg-success-500 text-white cursor-not-allowed'
                          : 'bg-danger-500 hover:bg-danger-600 text-white'
                      }`}
                    >
                      {requestedProvider === provider ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2 inline" />
                          Requested
                        </>
                      ) : (
                        <>
                          <Phone className="w-4 h-4 mr-2 inline" />
                          Request Service
                        </>
                      )}
                    </button>
                    
                    <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h4 className="font-medium text-gray-900 mb-3">How Emergency Services Work</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xs">1</div>
                <div>
                  <p className="font-medium text-gray-900">Request Service</p>
                  <p className="text-gray-600">Select provider and confirm request</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xs">2</div>
                <div>
                  <p className="font-medium text-gray-900">Get Confirmation</p>
                  <p className="text-gray-600">Receive ETA and tracking info via SMS</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xs">3</div>
                <div>
                  <p className="font-medium text-gray-900">Professional Help</p>
                  <p className="text-gray-600">Verified expert arrives with tools</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}