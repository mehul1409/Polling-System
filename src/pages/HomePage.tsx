import { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ServiceOverview from '../components/home/ServiceOverview';
import BrandsSection from '../components/home/BrandsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

function HomePage() {
  useEffect(() => {
    document.title = 'Microcon Systems | Industrial Homogenizers & Components';
  }, []);

  return (
    <div>
      <HeroSection />
      <BrandsSection />
      <FeaturedProducts />
      <ServiceOverview />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}

export default HomePage;