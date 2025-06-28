import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  X,
  Download,
  Upload
} from 'lucide-react';
import { products } from '../../data/products';
import { Product, Brand, Category } from '../../types/product';

function AdminProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const productsPerPage = 10;

  // Get unique brands and categories
  const brands = Array.from(new Set(products.map(p => p.brand)));
  const categories = Array.from(new Set(products.map(p => p.category)));

  useEffect(() => {
    document.title = 'Manage Products | Microcon Systems Admin';
  }, []);

  // Filter products based on search and filters
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(lowerCaseSearch) ||
          product.brand.toLowerCase().includes(lowerCaseSearch) ||
          product.category.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    // Apply brand filter
    if (selectedBrand) {
      result = result.filter(product => product.brand === selectedBrand);
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, selectedBrand, selectedCategory]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand(null);
    setSelectedCategory(null);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container py-8 mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Manage Products</h1>
        <div>
          <button className="btn btn-primary btn-md inline-flex items-center">
            <Plus size={18} className="mr-2" />
            Add New Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-secondary-200">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-secondary-300 focus:border-primary-500 focus:ring-primary-500"
              />
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" 
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter button (mobile) */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden btn btn-secondary btn-md inline-flex items-center"
            >
              <Filter size={18} className="mr-2" />
              Filters {(selectedBrand || selectedCategory) && '(Active)'}
            </button>

            {/* Filters (desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <div>
                <select
                  value={selectedBrand || ''}
                  onChange={(e) => setSelectedBrand(e.target.value as Brand || null)}
                  className="rounded-md border border-secondary-300 focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">All Brands</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value as Category || null)}
                  className="rounded-md border border-secondary-300 focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {(selectedBrand || selectedCategory) && (
                <button
                  onClick={resetFilters}
                  className="text-primary-600 hover:text-primary-700 flex items-center text-sm"
                >
                  <X size={14} className="mr-1" />
                  Clear Filters
                </button>
              )}
            </div>

            {/* Export/Import buttons */}
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-md inline-flex items-center">
                <Download size={18} className="mr-1" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button className="btn btn-secondary btn-md inline-flex items-center">
                <Upload size={18} className="mr-1" />
                <span className="hidden sm:inline">Import</span>
              </button>
            </div>
          </div>

          {/* Mobile filters (collapsible) */}
          {isFilterOpen && (
            <div className="md:hidden mt-4 p-4 bg-secondary-50 rounded-md">
              <div className="space-y-4">
                <div>
                  <label htmlFor="mobile-brand" className="block text-sm font-medium text-secondary-700 mb-1">
                    Brand
                  </label>
                  <select
                    id="mobile-brand"
                    value={selectedBrand || ''}
                    onChange={(e) => setSelectedBrand(e.target.value as Brand || null)}
                    className="w-full rounded-md border border-secondary-300 focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="mobile-category" className="block text-sm font-medium text-secondary-700 mb-1">
                    Category
                  </label>
                  <select
                    id="mobile-category"
                    value={selectedCategory || ''}
                    onChange={(e) => setSelectedCategory(e.target.value as Category || null)}
                    className="w-full rounded-md border border-secondary-300 focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={resetFilters}
                    className="text-primary-600 hover:text-primary-700 text-sm"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-secondary-700">Product</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-secondary-700">Brand</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-secondary-700">Category</th>
                <th className="py-3 px-4 text-right text-sm font-medium text-secondary-700">Price</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-secondary-700">Stock</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-secondary-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-200">
              {currentProducts.map(product => (
                <tr key={product.id} className="hover:bg-secondary-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover mr-3"
                      />
                      <span className="font-medium text-secondary-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-secondary-600">{product.brand}</td>
                  <td className="py-3 px-4 text-secondary-600">{product.category}</td>
                  <td className="py-3 px-4 text-right">
                    {product.discountPrice ? (
                      <div>
                        <span className="font-medium">${product.discountPrice.toLocaleString()}</span>
                        <span className="text-secondary-400 line-through ml-2">${product.price.toLocaleString()}</span>
                      </div>
                    ) : (
                      <span className="font-medium">${product.price.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${
                      product.stock <= 3 
                        ? 'bg-error-100 text-error-700' 
                        : product.stock <= 10 
                          ? 'bg-warning-100 text-warning-700'
                          : 'bg-success-100 text-success-700'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center space-x-3">
                      <button className="text-primary-600 hover:text-primary-700">
                        <Edit size={18} />
                      </button>
                      <button className="text-error-500 hover:text-error-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {currentProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-secondary-500">
                    No products found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="p-4 border-t border-secondary-200 flex items-center justify-between">
            <div className="text-sm text-secondary-600">
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-secondary-300 disabled:opacity-50"
              >
                <ChevronLeft size={16} />
              </button>
              
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 3 + i;
                  if (pageNum > totalPages) {
                    pageNum = totalPages - (4 - i);
                  }
                }
                
                return (
                  pageNum > 0 && pageNum <= totalPages && (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-md ${
                        currentPage === pageNum
                          ? 'bg-primary-600 text-white'
                          : 'border border-secondary-300 text-secondary-700 hover:bg-secondary-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                );
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-secondary-300 disabled:opacity-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProductsPage;