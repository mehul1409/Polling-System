import { useState, useEffect, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle 
} from 'lucide-react';

function ContactPage() {
  const [searchParams] = useSearchParams();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    service: ''
  });

  useEffect(() => {
    document.title = 'Contact Us | Microcon Systems';
    
    // Check if there's a service parameter in the URL
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      setSelectedService(serviceParam);
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry about ${serviceParam}`,
        service: serviceParam
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the form data to your backend
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
  };

  return (
    <div>
      {/* Hero section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-primary-100">
              Get in touch with our team for sales inquiries, technical support, or service requests.
            </p>
          </div>
        </div>
      </section>

      {/* Contact information and form */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact information */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <Mail className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email Us</h3>
                    <p className="text-secondary-600 mb-1">Sales Inquiries:</p>
                    <p className="text-primary-600">sales@microcon-systems.com</p>
                    <p className="text-secondary-600 mb-1 mt-2">Technical Support:</p>
                    <p className="text-primary-600">support@microcon-systems.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <Phone className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Call Us</h3>
                    <p className="text-secondary-600 mb-1">Main Office:</p>
                    <p className="text-primary-600">+1 (555) 123-4567</p>
                    <p className="text-secondary-600 mb-1 mt-2">Service Hotline:</p>
                    <p className="text-primary-600">+1 (555) 765-4321</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <MapPin className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Visit Us</h3>
                    <p className="text-secondary-600">
                      1234 Industrial Parkway,<br />
                      Suite 500<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-3 mr-4">
                    <Clock className="text-primary-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Business Hours</h3>
                    <p className="text-secondary-600">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="md:col-span-2">
              <div className="bg-secondary-50 rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                
                {formSubmitted ? (
                  <div className="bg-success-50 border border-success-500 rounded-lg p-6 text-center">
                    <CheckCircle size={48} className="text-success-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                    <p className="text-secondary-700">
                      Your message has been sent successfully. A member of our team will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
                          Full Name*
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-secondary-700 mb-1">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="service" className="block text-sm font-medium text-secondary-700 mb-1">
                        Service of Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service || selectedService}
                        onChange={handleChange}
                        className="w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      >
                        <option value="">Select a service</option>
                        <option value="On-Site Maintenance">On-Site Maintenance</option>
                        <option value="Off-Site Repair & Refurbishment">Off-Site Repair & Refurbishment</option>
                        <option value="Annual Maintenance Contracts (AMC)">Annual Maintenance Contracts (AMC)</option>
                        <option value="Spare Parts">Spare Parts</option>
                        <option value="Equipment Purchase">Equipment Purchase</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-1">
                        Subject*
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-1">
                        Message*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      ></textarea>
                    </div>
                    
                    <div>
                      <button type="submit" className="btn btn-primary btn-lg w-full md:w-auto">
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-white pb-16">
        <div className="container">
          <div className="rounded-lg overflow-hidden shadow-md h-[400px] bg-secondary-100 flex items-center justify-center">
            <div className="text-center">
              <p className="text-secondary-600 mb-2">Map placeholder</p>
              <p className="text-secondary-500 text-sm">Interactive map would be embedded here in a production environment</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;