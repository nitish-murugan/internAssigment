import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Shield, Truck, Star } from 'lucide-react';
import Button from '../components/common/Button';
import { products, testimonials, categories } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import './HomePage.css';

const HomePage = () => {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Fresh Orange Juice
              <span className="gradient-text"> Delivered in 30 Minutes</span>
            </h1>
            <p className="hero-subtitle">
              100% pure, freshly squeezed orange juice with no preservatives. 
              From farm to your doorstep in under 30 minutes.
            </p>
            <div className="hero-actions">
              <Link to="/products">
                <Button size="large" icon={<ArrowRight />}>
                  Order Now
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="large">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=800&fit=crop" 
              alt="Fresh Orange Juice" 
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={32} />
              </div>
              <h3>30-Min Delivery</h3>
              <p>Lightning-fast delivery to your doorstep</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3>100% Natural</h3>
              <p>No preservatives, just pure goodness</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Truck size={32} />
              </div>
              <h3>Free Delivery</h3>
              <p>Free delivery on orders over $25</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Star size={32} />
              </div>
              <h3>Premium Quality</h3>
              <p>Handpicked oranges, freshly squeezed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.filter(cat => cat !== 'All').map((category, index) => (
              <Link 
                key={index} 
                to={`/products?category=${category}`}
                className="category-card"
              >
                <div className="category-image">
                  <img 
                    src={`https://images.unsplash.com/photo-1582979512210-99b6a53386f9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687`}
                    alt={category}
                  />
                </div>
                <h3>{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#ffa500" color="#ffa500" />
                  ))}
                </div>
                <p className="testimonial-content">{testimonial.content}</p>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience Fresh?</h2>
            <p>Join thousands of happy customers enjoying fresh orange juice every day</p>
            <Link to="/products">
              <Button size="large" icon={<ArrowRight />}>
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
