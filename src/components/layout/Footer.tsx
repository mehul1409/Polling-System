import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="font-heading font-bold text-xl text-white mb-4">Microcon Systems</h4>
            <p className="text-secondary-300 mb-4">
              Leaders in industrial homogenization technology, providing high-quality equipment and components since 1995.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-secondary-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-heading font-bold text-lg text-white mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-secondary-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-secondary-300 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-secondary-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h5 className="font-heading font-bold text-lg text-white mb-4">Our Products</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=Homogenizers" className="text-secondary-300 hover:text-white transition-colors">
                  Homogenizers
                </Link>
              </li>
              <li>
                <Link to="/products?category=Valves" className="text-secondary-300 hover:text-white transition-colors">
                  Valves & Components
                </Link>
              </li>
              <li>
                <Link to="/products?category=Pistons" className="text-secondary-300 hover:text-white transition-colors">
                  Pistons & O-rings
                </Link>
              </li>
              <li>
                <Link to="/products?category=Pressure+Gauges" className="text-secondary-300 hover:text-white transition-colors">
                  Pressure Gauges
                </Link>
              </li>
              <li>
                <Link to="/products?category=Hydraulic+Parts" className="text-secondary-300 hover:text-white transition-colors">
                  Hydraulic Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-heading font-bold text-lg text-white mb-4">Contact Us</h5>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-secondary-300 mt-0.5 flex-shrink-0" />
                <span className="text-secondary-300">
                  1234 Industrial Parkway, 
                  <br />Suite 500
                  <br />New York, NY 10001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-secondary-300 flex-shrink-0" />
                <span className="text-secondary-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-secondary-300 flex-shrink-0" />
                <span className="text-secondary-300">info@microcon-systems.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-700 mt-12 pt-8 text-center text-secondary-400 text-sm">
          <p>© {currentYear} Microcon Systems. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;