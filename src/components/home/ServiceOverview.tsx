import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Settings, PenTool as Tools, Clock, ShieldCheck } from 'lucide-react';

function ServiceOverview() {
  return (
    <section className="section bg-secondary-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-semibold mb-4">Comprehensive Service Solutions</h2>
          <p className="text-secondary-600">
            We provide expert maintenance and support services to keep your homogenization equipment running at peak performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Tools className="text-primary-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">On-Site Maintenance</h3>
            <p className="text-secondary-600 mb-4">
              Our technicians come to your facility to perform maintenance with minimal disruption.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle size={16} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm">Fast response times</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm">Expert technicians</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm">Minimal downtime</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Settings className="text-primary-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Repair & Refurbishment</h3>
            <p className="text-secondary-600 mb-4">
              Complete overhaul and reconditioning of homogenizer components and systems.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle size={16} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm">OEM quality parts</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm">Performance testing</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm">Extended equipment life</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="text-primary-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">AMC Contracts</h3>
            <p className="text-secondary-600 mb-4">
              Annual maintenance contracts for scheduled service and priority support.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle size={16} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm">Preventive maintenance</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm">Priority response</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm">Discounted parts</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="text-primary-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Spare Parts</h3>
            <p className="text-secondary-600 mb-4">
              Genuine and OEM-equivalent parts with fast worldwide shipping.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <CheckCircle size={16} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm">Large inventory</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm">Global logistics</span>
              </li>
              <li className="flex items-start">
                <CheckCircle size={16} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm">Custom repair kits</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/services" className="btn btn-primary btn-lg inline-flex items-center">
            Explore All Services
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ServiceOverview;