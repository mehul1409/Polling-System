import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [orderNote, setOrderNote] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    document.title = 'Your Cart | Microcon Systems';
  }, []);

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={32} className="text-secondary-400" />
            </div>
            <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
            <p className="text-secondary-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // In a real app, you would redirect to checkout or process the order
    // For demo purposes, we'll just simulate a delay
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <div className="container py-12 mt-8">
      <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-secondary-200">
                    <th className="text-left pb-4">Product</th>
                    <th className="text-center pb-4 hidden md:table-cell">Price</th>
                    <th className="text-center pb-4">Quantity</th>
                    <th className="text-right pb-4 hidden md:table-cell">Total</th>
                    <th className="text-right pb-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.product.id} className="border-b border-secondary-100">
                      <td className="py-4">
                        <div className="flex items-center">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-secondary-500">{item.product.brand}</p>
                            <p className="text-primary-600 md:hidden mt-1">
                              ${(item.product.discountPrice || item.product.price).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-center hidden md:table-cell">
                        ${(item.product.discountPrice || item.product.price).toLocaleString()}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 border border-secondary-300 rounded-l-md bg-secondary-50 text-secondary-600"
                          >
                            <Minus size={14} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            max={item.product.stock}
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                            className="w-12 text-center border-y border-secondary-300 py-1"
                          />
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="p-1 border border-secondary-300 rounded-r-md bg-secondary-50 text-secondary-600 disabled:opacity-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="py-4 text-right font-medium hidden md:table-cell">
                        ${((item.product.discountPrice || item.product.price) * item.quantity).toLocaleString()}
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-secondary-400 hover:text-error-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 lg:mb-0">
            <h2 className="text-lg font-medium mb-4">Order Notes</h2>
            <textarea
              rows={3}
              placeholder="Add any special instructions or notes about your order..."
              className="w-full rounded-md border-secondary-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-secondary-600">Subtotal</span>
                <span className="font-medium">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Shipping</span>
                <span className="text-secondary-600">Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-600">Tax</span>
                <span className="text-secondary-600">Calculated at checkout</span>
              </div>
              <div className="border-t border-secondary-200 pt-3 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold text-lg">${subtotal.toLocaleString()}</span>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="btn btn-primary btn-lg w-full flex items-center justify-center"
            >
              {isCheckingOut ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                    <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Proceed to Checkout
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
            
            <div className="mt-6">
              <Link 
                to="/products" 
                className="text-primary-600 flex items-center justify-center hover:text-primary-700"
              >
                <ShoppingCart size={16} className="mr-2" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;