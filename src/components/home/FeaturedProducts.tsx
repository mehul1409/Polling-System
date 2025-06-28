import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../ui/ProductCard';
import { products } from '../../data/products';
import { Product } from '../../types/product';

function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Get featured products or just the first 4 if none are marked as featured
    const featured = products.filter(product => product.featured);
    setFeaturedProducts(featured.length ? featured : products.slice(0, 4));
  }, []);

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">Featured Products</h2>
          <Link 
            to="/products" 
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            View All Products
            <ChevronRight size={20} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;