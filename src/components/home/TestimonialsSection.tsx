import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Microcon Systems has been our trusted partner for homogenizer maintenance for over 7 years. Their technicians are knowledgeable, responsive, and have saved us from countless production delays.",
    author: "Sarah Johnson",
    title: "Production Manager",
    company: "Dairy Innovations Inc."
  },
  {
    id: 2,
    content: "The quality of Microcon's spare parts and their rapid shipping has been crucial for our operation. We've significantly reduced our downtime since switching to their components.",
    author: "Michael Chen",
    title: "Engineering Director",
    company: "Global Foods Processing"
  },
  {
    id: 3,
    content: "Our AMC contract with Microcon Systems provides peace of mind. Their preventive maintenance schedule has improved our equipment reliability by 40% over the past two years.",
    author: "Carlos Rodriguez",
    title: "Operations Lead",
    company: "Pharma Solutions"
  }
];

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((activeIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section bg-primary-600 text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-white mb-4">What Our Clients Say</h2>
            <p className="text-primary-100">
              Trusted by leading manufacturers across the food, pharmaceutical, and chemical industries.
            </p>
          </div>
          
          <div className="relative">
            <div className="mb-8 relative">
              <Quote size={48} className="absolute -top-6 -left-6 text-primary-400 opacity-30" />
              <p className="text-xl italic leading-relaxed mb-6">
                {testimonials[activeIndex].content}
              </p>
              <div>
                <div className="font-semibold text-white">
                  {testimonials[activeIndex].author}
                </div>
                <div className="text-primary-200">
                  {testimonials[activeIndex].title}, {testimonials[activeIndex].company}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-primary-700 hover:bg-primary-800 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === activeIndex ? 'bg-white' : 'bg-primary-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-primary-700 hover:bg-primary-800 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;