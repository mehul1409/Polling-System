import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="container py-20">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-9xl font-bold text-primary-600 mb-8">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-secondary-600 mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/" 
            className="btn btn-primary btn-lg flex items-center justify-center"
          >
            <Home size={20} className="mr-2" />
            Go to Homepage
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="btn btn-outline btn-lg flex items-center justify-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;