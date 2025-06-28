import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Service } from '../../data/services';

type ServiceCardProps = {
  service: Service;
};

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="card h-full flex flex-col">
      <div className="overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
        <p className="text-secondary-600 mb-4">{service.description}</p>
        
        <div className="mt-auto">
          <ul className="space-y-2 mb-4">
            {service.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle size={16} className="text-primary-600 mt-1 mr-2 flex-shrink-0" />
                <span className="text-sm text-secondary-700">{feature}</span>
              </li>
            ))}
          </ul>
          
          <Link 
            to={`/contact?service=${service.title}`} 
            className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
          >
            Request Service
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;