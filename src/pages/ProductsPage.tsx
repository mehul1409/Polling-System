import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import { products } from '../data/products';
import { Product, Brand, Category } from '../types/product';

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Get unique brands and categories
  const brands = Array.from(new Set(products.map(p => p.brand)));
  const categories = Array.from(new Set(products.map(p => p.category)));

  // Initial filter setup from URL
  useEffect(() => {
    const brandParam = searchParams.get('brand') as Brand | null;
    const categoryParam = searchParams.get('category') as Category | null;
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    if (brandParam && brands.includes(brandParam)) {
      setSelectedBrand(brandParam);
    }

    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }

    if (minPrice && maxPrice) {
      setPriceRange([parseInt(minPrice), parseInt(maxPrice)]);
    }
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = [...products];

    if (selectedBrand) {
      filtered = filtered.filter(p => p.brand === selectedBrand);
    }

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    setFilteredProducts(filtered);

    // Update URL params
    const params = new URLSearchParams();
    if (selectedBrand) params.set('brand', selectedBrand);
    if (selectedCategory) params.set('category', selectedCategory);
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    setSearchParams(params);
  }, [selectedBrand, selectedCategory, priceRange]);

  // Reset filters
  const resetFilters = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setPriceRange([0, 200000]);
    setSearchParams({});
  };

  useEffect(() => {
    document.title = 'Products | Microcon Systems';
  }, []);

  return (
    <div className="container py-8 mt-8">
      <h1 className="text-3xl font-semibold mb-8">Industrial Homogenizers & Components</h1>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="w-full flex items-center justify-between bg-white p-4 rounded-md shadow-sm"
          >
            <span className="flex items-center">
              <Filter size={18} className="mr-2" />
              Filters
            </span>
            <span className="text-secondary-500 text-sm">
              {filteredProducts.length} products
            </span>
          </button>
        </div>

        {/* Filters */}
        <div
          className={`lg:block ${
            isMobileFiltersOpen ? 'block' : 'hidden'
          } bg-white rounded-lg shadow-sm p-6 h-fit`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Filters</h2>
            <button
              onClick={resetFilters}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Reset All
            </button>
          </div>

          {/* Brand filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Brand</h3>
            <div className="space-y-2">
              {brands.map(brand => (
                <label key={brand} className="flex items-center">
                  <input
                    type="radio"
                    name="brand"
                    checked={selectedBrand === brand}
                    onChange={() => setSelectedBrand(brand)}
                    className="mr-2"
                  />
                  <span className="text-sm">{brand}</span>
                </label>
              ))}
            </div>
            {selectedBrand && (
              <button
                onClick={() => setSelectedBrand(null)}
                className="flex items-center text-xs text-primary-600 mt-2"
              >
                <X size={12} className="mr-1" />
                Clear Brand
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Category</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="mr-2"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center text-xs text-primary-600 mt-2"
              >
                <X size={12} className="mr-1" />
                Clear Category
              </button>
            )}
          </div>

          {/* Price range filter */}
          <div>
            <h3 className="text-sm font-medium mb-2">Price Range</h3>
            <div className="flex justify-between mb-2">
              <span className="text-xs text-secondary-500">${priceRange[0].toLocaleString()}</span>
              <span className="text-xs text-secondary-500">${priceRange[1].toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200000"
              step="5000"
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>

        {/* Products grid */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-secondary-600">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center">
              <label htmlFor="sort" className="text-sm mr-2">
                Sort by:
              </label>
              <select
                id="sort"
                className="border border-secondary-300 rounded-md text-sm p-1"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-secondary-600 mb-4">
                Try adjusting your filters or search criteria.
              </p>
              <button
                onClick={resetFilters}
                className="btn btn-primary btn-md"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;