import { useState } from 'react';
import { ShoppingCart, Heart, Star, Plus, Minus } from 'lucide-react';
import useStore from '../../store/useStore';
import { formatPrice, calculateItemPrice } from '../../utils/helpers';
import { addons as availableAddons } from '../../data/products';
import Button from '../common/Button';
import Card from '../common/Card';
import './ProductCard.css';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const favorite = isFavorite(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity, selectedAddons);
    setQuantity(1);
    setSelectedAddons([]);
  };

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => {
      const exists = prev.find(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      }
      return [...prev, addon];
    });
  };

  const totalPrice = calculateItemPrice(product.price, selectedSize, selectedAddons) * quantity;

  return (
    <Card className={`product-card product-card-${viewMode}`} hoverable>
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.organic && <span className="organic-badge">Organic</span>}
        <button 
          className={`favorite-btn ${favorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
        >
          <Heart size={20} fill={favorite ? '#ff6b35' : 'none'} />
        </button>
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-rating">
          <Star size={16} fill="#ffa500" color="#ffa500" />
          <span>{product.rating}</span>
          <span className="review-count">({product.reviewCount} reviews)</span>
        </div>

        <div className="product-features">
          {product.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
        </div>

        {showDetails && (
          <div className="product-details-expanded">
            <div className="size-selector">
              <label>Size:</label>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="addons-selector">
              <label>Add-ons:</label>
              <div className="addons-options">
                {availableAddons.map(addon => (
                  <button
                    key={addon.id}
                    className={`addon-option ${selectedAddons.find(a => a.id === addon.id) ? 'active' : ''}`}
                    onClick={() => toggleAddon(addon)}
                  >
                    {addon.name} {addon.price > 0 && `+${formatPrice(addon.price)}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="product-footer">
          <div className="product-price">
            <span className="price">{formatPrice(totalPrice)}</span>
            {quantity > 1 && (
              <span className="price-per-item">
                {formatPrice(totalPrice / quantity)} each
              </span>
            )}
          </div>
          <div className="product-actions">
            <Button
              variant="ghost"
              size="small"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide' : 'Customize'}
            </Button>
            <Button
              variant="primary"
              size="small"
              icon={<ShoppingCart size={16} />}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
