import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-secondary-900 to-primary-900 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/3846022/pexels-photo-3846022.jpeg')",
          opacity: 0.4
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Industrial Homogenization Excellence
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-secondary-100">
            Microcon Systems provides industry-leading homogenizers and components with unmatched reliability and service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products" className="btn btn-primary btn-lg">
              Explore Products
            </Link>
            <Link to="/services" className="btn btn-outline border-white text-white hover:bg-white/10 btn-lg">
              Our Services
            </Link>
          </div>
          
          <div className="mt-12 flex items-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center text-white group"
            >
              <span className="mr-2 text-lg font-medium group-hover:underline">Get Expert Consultation</span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}

export default HeroSection;