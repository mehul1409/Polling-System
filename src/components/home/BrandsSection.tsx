import { motion } from 'framer-motion';

function BrandsSection() {
  const brands = [
    { name: 'SPX Gaulin', logo: 'SPX' },
    { name: 'Bertoli', logo: 'BERTOLI' },
    { name: 'FBF Italia', logo: 'FBF' },
    { name: 'TetraPak', logo: 'TETRAPAK' },
    { name: 'Niro Sovi', logo: 'NIRO SOVI' }
  ];

  return (
    <section className="py-12 bg-white border-t border-b border-secondary-200">
      <div className="container">
        <h3 className="text-center text-secondary-500 text-sm font-medium uppercase tracking-wider mb-8">
          Specialized in Leading Homogenizer Brands
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="flex items-center justify-center"
            >
              <span className="text-xl md:text-2xl font-heading font-semibold text-secondary-400">
                {brand.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandsSection;