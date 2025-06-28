import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  ChevronRight, 
  Minus, 
  Plus, 
  Check,
  Info 
} from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types/product';
import { useCart } from '../contexts/CartContext';
import ProductCard from '../components/ui/ProductCard';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  useEffect(() => {
    // Find the product
    const foundProduct = products.find(p => p.id === id) || null;
    setProduct(foundProduct);

    if (foundProduct) {
      document.title = `${foundProduct.name} | Microcon Systems`;
      
      // Find related products (same brand or category, but not the same product)
      const related = products.filter(
        p => (p.brand === foundProduct.brand || p.category === foundProduct.category) && p.id !== foundProduct.id
      );
      setRelatedProducts(related.slice(0, 4));
    }
  }, [id]);

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-2xl font-medium mb-4">Product not found</h2>
        <p className="text-secondary-600 mb-6">
          The product you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link to="/products" className="btn btn-primary btn-md">
          Return to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8 mt-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-sm mb-8">
        <Link to="/" className="text-secondary-500 hover:text-primary-600">Home</Link>
        <ChevronRight size={16} className="mx-2 text-secondary-400" />
        <Link to="/products" className="text-secondary-500 hover:text-primary-600">Products</Link>
        <ChevronRight size={16} className="mx-2 text-secondary-400" />
        <Link to={`/products?category=${product.category}`} className="text-secondary-500 hover:text-primary-600">
          {product.category}
        </Link>
        <ChevronRight size={16} className="mx-2 text-secondary-400" />
        <span className="text-secondary-700">{product.name}</span>
      </div>

      {/* Product details */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-12">
        <div className="grid md:grid-cols-2 gap-8 p-6 lg:p-8">
          {/* Product image */}
          <div className="rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Product info */}
          <div>
            <div className="mb-6">
              <Link 
                to={`/products?brand=${product.brand}`}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                {product.brand}
              </Link>
              <h1 className="text-3xl font-semibold mt-1 mb-3">{product.name}</h1>

              <div className="flex items-baseline mb-4">
                {product.discountPrice ? (
                  <>
                    <span className="text-2xl font-bold text-primary-600">
                      ${product.discountPrice.toLocaleString()}
                    </span>
                    <span className="ml-3 text-lg text-secondary-400 line-through">
                      ${product.price.toLocaleString()}
                    </span>
                    <span className="ml-3 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
                      SALE
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-primary-600">
                    ${product.price.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Stock status */}
              <div className="flex items-center mb-6">
                {product.stock > 0 ? (
                  <>
                    <span className="bg-success-50 text-success-500 text-xs font-medium px-2 py-1 rounded-full flex items-center">
                      <Check size={14} className="mr-1" />
                      In Stock
                    </span>
                    <span className="ml-3 text-sm text-secondary-500">
                      {product.stock <= 5 ? `Only ${product.stock} left` : ''}
                    </span>
                  </>
                ) : (
                  <span className="bg-error-50 text-error-500 text-xs font-medium px-2 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Short description */}
              <p className="text-secondary-600 mb-6">
                {product.description}
              </p>

              {/* Quantity and Add to cart */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="p-2 border border-secondary-300 rounded-l-md bg-secondary-50 text-secondary-600 disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border-y border-secondary-300 py-2"
                  />
                  <button 
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    className="p-2 border border-secondary-300 rounded-r-md bg-secondary-50 text-secondary-600 disabled:opacity-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="btn btn-primary btn-lg flex-grow flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="btn btn-outline btn-lg sm:w-auto flex items-center justify-center gap-2">
                  <Heart size={20} />
                  <span className="sm:hidden md:inline">Add to Wishlist</span>
                </button>
              </div>

              {/* Bulk inquiry */}
              <div className="bg-secondary-50 p-4 rounded-lg border border-secondary-200">
                <div className="flex items-start">
                  <Info size={20} className="text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium mb-1">Need a bulk order?</h4>
                    <p className="text-sm text-secondary-600 mb-2">
                      Contact us for volume pricing and availability for orders over 10 units.
                    </p>
                    <Link to="/contact" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                      Request a Quote
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-secondary-200">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'description' 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent text-secondary-600 hover:text-secondary-900'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'specifications' 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent text-secondary-600 hover:text-secondary-900'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('compatibility')}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'compatibility' 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent text-secondary-600 hover:text-secondary-900'
              }`}
            >
              Compatibility
            </button>
          </div>

          <div className="p-6 lg:p-8">
            {activeTab === 'description' && (
              <div>
                <p className="text-secondary-700 leading-relaxed">
                  {product.description}
                </p>
                <p className="mt-4 text-secondary-700 leading-relaxed">
                  This {product.category.toLowerCase()} is engineered to meet the highest standards of performance
                  and reliability in industrial processing applications. Manufactured with premium materials
                  and precision engineering, it ensures consistent operation and extended service life.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                {product.specifications ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="border-b border-secondary-200 pb-2">
                        <span className="font-medium text-secondary-700">{key}:</span>{' '}
                        <span className="text-secondary-600">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-secondary-600">
                    Detailed specifications for this product are not available at the moment.
                    Please contact our technical team for more information.
                  </p>
                )}
              </div>
            )}

            {activeTab === 'compatibility' && (
              <div>
                {product.compatibleWith ? (
                  <div>
                    <p className="text-secondary-700 mb-4">
                      This {product.category.toLowerCase()} is compatible with the following brands:
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.compatibleWith.map((brand) => (
                        <span key={brand} className="badge badge-primary">
                          {brand}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-secondary-500">
                      Note: Compatibility may vary by specific model. Please consult our technical
                      team for detailed compatibility information.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-secondary-700 mb-4">
                      This product is designed to work with {product.brand} equipment.
                    </p>
                    <p className="text-sm text-secondary-500">
                      For cross-compatibility information with other brands, please contact our
                      technical support team.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
          <div className="product-grid">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailPage;