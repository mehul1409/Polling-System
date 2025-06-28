import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function CTASection() {
  return (
    <section className="section bg-secondary-50">
      <div className="container">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 lg:p-12">
              <h2 className="text-3xl font-semibold mb-4">Ready to Optimize Your Production?</h2>
              <p className="text-secondary-600 mb-6">
                Contact our team for expert advice on homogenizer selection, maintenance services, or spare parts requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  Contact Us Today
                </Link>
                <Link to="/products" className="btn btn-outline btn-lg">
                  Browse Products
                </Link>
              </div>
            </div>
            
            <div className="bg-secondary-900 p-8 lg:p-12 text-white">
              <h3 className="text-2xl font-semibold mb-6">Why Choose Microcon Systems?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-primary-500 rounded-full p-1 mr-3 mt-1">
                    <ArrowRight size={14} />
                  </span>
                  <span>20+ years of specialized expertise in industrial homogenizers</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-500 rounded-full p-1 mr-3 mt-1">
                    <ArrowRight size={14} />
                  </span>
                  <span>Comprehensive inventory of OEM and compatible parts</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-500 rounded-full p-1 mr-3 mt-1">
                    <ArrowRight size={14} />
                  </span>
                  <span>Experienced technicians with cross-brand knowledge</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-500 rounded-full p-1 mr-3 mt-1">
                    <ArrowRight size={14} />
                  </span>
                  <span>Fast response times and global shipping capabilities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;