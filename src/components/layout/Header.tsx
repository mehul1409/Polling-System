import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { itemCount } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-primary-600 font-heading font-bold text-2xl">Microcon</span>
          <span className="text-secondary-600 font-heading">Systems</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`font-medium ${
              location.pathname === '/' 
                ? 'text-primary-600' 
                : 'text-secondary-700 hover:text-primary-600'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className={`font-medium ${
              location.pathname.includes('/products') 
                ? 'text-primary-600' 
                : 'text-secondary-700 hover:text-primary-600'
            }`}
          >
            Products
          </Link>
          <Link 
            to="/services" 
            className={`font-medium ${
              location.pathname === '/services' 
                ? 'text-primary-600' 
                : 'text-secondary-700 hover:text-primary-600'
            }`}
          >
            Services
          </Link>
          <Link 
            to="/about" 
            className={`font-medium ${
              location.pathname === '/about' 
                ? 'text-primary-600' 
                : 'text-secondary-700 hover:text-primary-600'
            }`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`font-medium ${
              location.pathname === '/contact' 
                ? 'text-primary-600' 
                : 'text-secondary-700 hover:text-primary-600'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Action buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/cart\" className="relative p-2">
                <ShoppingCart size={22} className="text-secondary-700 hover:text-primary-600" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <div className="relative">
                <button 
                  onClick={toggleProfile}
                  className="flex items-center space-x-1 text-secondary-700 hover:text-primary-600"
                >
                  <User size={22} />
                  <span className="text-sm font-medium">{user?.name.split(' ')[0]}</span>
                  <ChevronDown size={16} />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fade-in">
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link 
              to="/login" 
              className="btn btn-primary btn-sm"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-secondary-700"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-down">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`font-medium ${
                location.pathname === '/' 
                  ? 'text-primary-600' 
                  : 'text-secondary-700'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`font-medium ${
                location.pathname.includes('/products') 
                  ? 'text-primary-600' 
                  : 'text-secondary-700'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/services" 
              className={`font-medium ${
                location.pathname === '/services' 
                  ? 'text-primary-600' 
                  : 'text-secondary-700'
              }`}
            >
              Services
            </Link>
            <Link 
              to="/about" 
              className={`font-medium ${
                location.pathname === '/about' 
                  ? 'text-primary-600' 
                  : 'text-secondary-700'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`font-medium ${
                location.pathname === '/contact' 
                  ? 'text-primary-600' 
                  : 'text-secondary-700'
              }`}
            >
              Contact
            </Link>

            <div className="border-t border-secondary-100 pt-4 mt-2">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <Link 
                    to="/cart" 
                    className="flex items-center space-x-2 text-secondary-700"
                  >
                    <ShoppingCart size={18} />
                    <span>Cart ({itemCount})</span>
                  </Link>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="flex items-center space-x-2 text-secondary-700"
                    >
                      <User size={18} />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  <button 
                    onClick={logout}
                    className="btn btn-secondary btn-sm w-full mt-2"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="btn btn-primary btn-sm w-full"
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;