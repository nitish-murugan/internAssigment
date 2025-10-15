import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import useStore from '../store/useStore';
import { formatPrice, calculateItemPrice } from '../utils/helpers';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, updateCartItemQuantity, getCartTotal } = useStore();

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 25 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <ShoppingBag size={64} color="#ccc" />
            <h2>Your cart is empty</h2>
            <p>Add some fresh orange juice to get started!</p>
            <Link to="/products">
              <Button size="large">Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => {
              const itemPrice = calculateItemPrice(
                item.product.price,
                item.size,
                item.addons
              );

              return (
                <Card key={item.id} className="cart-item">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="cart-item-image"
                  />
                  
                  <div className="cart-item-details">
                    <h3>{item.product.name}</h3>
                    <p className="cart-item-size">Size: {item.size}</p>
                    {item.addons.length > 0 && (
                      <p className="cart-item-addons">
                        Add-ons: {item.addons.map(a => a.name).join(', ')}
                      </p>
                    )}
                  </div>

                  <div className="cart-item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="cart-item-price">
                    {formatPrice(itemPrice * item.quantity)}
                  </div>

                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </Card>
              );
            })}
          </div>

          <div className="cart-summary-wrapper">
            <Card className="cart-summary">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal ({cart.length} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
              </div>

              <div className="summary-row">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row summary-total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              {subtotal < 25 && (
                <div className="free-delivery-notice">
                  Add {formatPrice(25 - subtotal)} more for free delivery!
                </div>
              )}

              <div className="promo-code">
                <input 
                  type="text" 
                  placeholder="Enter promo code" 
                  className="promo-input"
                />
                <Button variant="outline" size="small">Apply</Button>
              </div>

              <Link to="/checkout">
                <Button fullWidth size="large">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link to="/products" className="continue-shopping">
                Continue Shopping
              </Link>
            </Card>

            <Card className="delivery-info">
              <h4>Delivery Information</h4>
              <ul>
                <li>🚚 Delivery in 30 minutes</li>
                <li>📦 Free delivery on orders over $25</li>
                <li>💯 100% satisfaction guarantee</li>
                <li>❄️ Temperature controlled delivery</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
