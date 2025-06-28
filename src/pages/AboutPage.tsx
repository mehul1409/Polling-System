import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Award, Users, Globe, ArrowRight } from 'lucide-react';

function AboutPage() {
  useEffect(() => {
    document.title = 'About Us | Microcon Systems';
  }, []);

  return (
    <div>
      {/* Hero section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">About Microcon Systems</h1>
            <p className="text-xl text-primary-100">
              Specialists in industrial homogenizers and components with over 25 years of industry expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Company overview */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-6">Our Company</h2>
              <p className="text-secondary-600 mb-4">
                Founded in 1995, Microcon Systems has grown to become a leading provider of industrial homogenizers, components, and specialized maintenance services. We serve clients across the food processing, pharmaceutical, chemical, and cosmetic industries worldwide.
              </p>
              <p className="text-secondary-600 mb-6">
                Our team of experienced engineers and technicians brings decades of combined experience in homogenizer technology, providing unmatched expertise in equipment selection, maintenance, and optimization.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Comprehensive inventory of OEM and compatible parts</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Certified technicians with cross-brand expertise</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Global shipping and on-site service capabilities</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={20} className="text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <span>Commitment to quality and customer satisfaction</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg" 
                alt="Microcon Systems facility" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-secondary-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-semibold mb-4">Our Core Values</h2>
            <p className="text-secondary-600">
              These principles guide every aspect of our business, from product selection to customer service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <Award className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Excellence</h3>
              <p className="text-secondary-600">
                We maintain the highest standards in all our products and services, ensuring reliability and performance.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <Users className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Partnership</h3>
              <p className="text-secondary-600">
                We build long-term relationships with our clients, understanding their unique needs and challenges.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                <Globe className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Technical Innovation</h3>
              <p className="text-secondary-600">
                We continuously improve our offerings through technical advancements and industry best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-semibold mb-4">Our Leadership Team</h2>
            <p className="text-secondary-600">
              Meet the experienced professionals who drive our company's vision and success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" 
                  alt="Robert Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Robert Johnson</h3>
              <p className="text-primary-600 mb-2">CEO & Founder</p>
              <p className="text-secondary-600 text-sm">
                25+ years in industrial equipment manufacturing and distribution.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg" 
                  alt="Sarah Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Sarah Chen</h3>
              <p className="text-primary-600 mb-2">Technical Director</p>
              <p className="text-secondary-600 text-sm">
                Mechanical engineer with expertise in homogenization technology.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg" 
                  alt="Michael Rodriguez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Michael Rodriguez</h3>
              <p className="text-primary-600 mb-2">Service Manager</p>
              <p className="text-secondary-600 text-sm">
                20+ years experience in maintenance and repair of industrial equipment.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" 
                  alt="Emily Parker" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Emily Parker</h3>
              <p className="text-primary-600 mb-2">Global Sales Director</p>
              <p className="text-secondary-600 text-sm">
                Expert in international distribution and client relationship management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary-50">
        <div className="container">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-semibold mb-4">Work With Us</h2>
                <p className="text-secondary-600 mb-6">
                  Experience the Microcon difference with our expert team and comprehensive solutions for all your homogenizer needs.
                </p>
                <Link to="/contact" className="btn btn-primary btn-lg inline-flex items-center">
                  Get in Touch
                  <ArrowRight size={20} className="ml-2" />
                </Link>
              </div>
              <div 
                className="hidden md:block h-full bg-cover bg-center min-h-[300px]"
                style={{ backgroundImage: "url('https://images.pexels.com/photos/3846270/pexels-photo-3846270.jpeg')" }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;