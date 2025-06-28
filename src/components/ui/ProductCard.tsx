import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../../types/product';
import { useCart } from '../../contexts/CartContext';

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link to={`/products/${product.id}`} className="card group h-full flex flex-col">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full aspect-product object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {product.discountPrice && (
          <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </span>
        )}
        
        {product.stock <= 3 && (
          <span className="absolute top-3 right-3 bg-error-500 text-white text-xs font-bold px-2 py-1 rounded">
            Low Stock
          </span>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2 flex-grow">
          <span className="text-xs text-secondary-500 uppercase">{product.brand}</span>
          <h3 className="font-medium text-lg">{product.name}</h3>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            {product.discountPrice ? (
              <>
                <span className="text-primary-600 font-semibold">${product.discountPrice.toLocaleString()}</span>
                <span className="text-secondary-400 line-through text-sm">${product.price.toLocaleString()}</span>
              </>
            ) : (
              <span className="text-primary-600 font-semibold">${product.price.toLocaleString()}</span>
            )}
          </div>
          
          <div className="mt-3 flex space-x-2">
            <button 
              onClick={handleAddToCart}
              className="btn btn-primary btn-sm flex-grow flex items-center justify-center gap-1"
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
            <button className="btn btn-secondary btn-sm p-2">
              <Heart size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;