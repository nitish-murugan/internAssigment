import { Link } from 'react-router-dom';
import { ShoppingCart, User, Heart, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';
import useStore from '../../store/useStore';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, getCartItemsCount } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartItemsCount = getCartItemsCount();

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <p className="header-promo">🍊 Fresh juice delivered in 30 minutes! Free delivery on orders over $25</p>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <span className="logo-icon">🍊</span>
              <span className="logo-text">FreshOJ</span>
            </Link>

            <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
              <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/products" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Products</Link>
              <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </nav>

            <div className="header-actions">
              <button 
                className="icon-btn"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search size={20} />
              </button>

              <Link to="/favorites" className="icon-btn">
                <Heart size={20} />
              </Link>

              <Link to="/cart" className="icon-btn cart-btn">
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className="cart-badge">{cartItemsCount}</span>
                )}
              </Link>

              {isAuthenticated ? (
                <Link to="/dashboard" className="icon-btn user-btn">
                  <User size={20} />
                  <span className="user-name">{user?.name}</span>
                </Link>
              ) : (
                <Link to="/login" className="btn-login">
                  Sign In
                </Link>
              )}

              <button 
                className="mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {searchOpen && (
            <div className="search-bar">
              <input 
                type="text" 
                placeholder="Search for fresh orange juices..." 
                className="search-input"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
