import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import ServiceCard from '../components/ui/ServiceCard';
import { services } from '../data/services';

function ServicesPage() {
  useEffect(() => {
    document.title = 'Services | Microcon Systems';
  }, []);

  return (
    <div>
      {/* Hero section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Expert Homogenizer Services</h1>
            <p className="text-xl text-primary-100 mb-6">
              Comprehensive maintenance, repair, and support services to keep your equipment running at peak performance.
            </p>
            <Link to="/contact" className="btn bg-white text-primary-700 hover:bg-primary-50 btn-lg">
              Request Service
            </Link>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Our Service Offerings</h2>
            <p className="text-secondary-600">
              From routine maintenance to emergency repairs, our skilled technicians provide comprehensive support for all major homogenizer brands and models.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="py-16 bg-secondary-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Our Service Process</h2>
            <p className="text-secondary-600">
              We follow a structured approach to ensure efficient, high-quality service delivery every time.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline connector */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-12 relative">
              {/* Step 1 */}
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                  <h3 className="text-xl font-semibold mb-2">Initial Assessment</h3>
                  <p className="text-secondary-600">
                    Our technical team evaluates your equipment's condition and performance to identify issues and recommend solutions.
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center">
                    <span className="font-bold">1</span>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 flex md:justify-start justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                    <CheckCircle size={36} className="text-primary-600" />
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 flex md:justify-end justify-center order-1 md:order-none">
                  <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                    <Clock size={36} className="text-primary-600" />
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center">
                    <span className="font-bold">2</span>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold mb-2">Service Execution</h3>
                  <p className="text-secondary-600">
                    Our certified technicians perform the required maintenance or repairs, using OEM or high-quality compatible parts.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                  <h3 className="text-xl font-semibold mb-2">Performance Testing</h3>
                  <p className="text-secondary-600">
                    We thoroughly test all serviced equipment to ensure optimal performance before returning it to service.
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center">
                    <span className="font-bold">3</span>
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12 flex md:justify-start justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                    <ArrowRight size={36} className="text-primary-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="bg-primary-900 rounded-xl text-white overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-semibold mb-4">Ready to Schedule Service?</h2>
                <p className="text-primary-100 mb-6">
                  Contact our service team today to schedule maintenance, request repairs, or discuss an annual maintenance contract.
                </p>
                <Link to="/contact" className="btn bg-white text-primary-700 hover:bg-primary-50 btn-lg">
                  Contact Service Team
                </Link>
              </div>
              <div 
                className="hidden md:block bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.pexels.com/photos/257636/pexels-photo-257636.jpeg')" }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;