import { useState, useMemo } from 'react';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import useStore from '../store/useStore';
import Button from '../components/common/Button';
import './ProductsPage.css';

const ProductsPage = () => {
  const { viewMode, setViewMode } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('popular');
  const [showOrganic, setShowOrganic] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Organic filter
    if (showOrganic) {
      filtered = filtered.filter(p => p.organic);
    }

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
      default:
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return filtered;
  }, [selectedCategory, priceRange, sortBy, showOrganic]);

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Our Products</h1>
            <p>{filteredProducts.length} products available</p>
          </div>
          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={20} />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        <div className="products-layout">
          {/* Filters Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>Filters</h3>
              <button 
                className="mobile-close-filters"
                onClick={() => setShowFilters(false)}
              >
                ×
              </button>
            </div>

            <div className="filter-group">
              <h4>Category</h4>
              <div className="filter-options">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`filter-option ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="price-inputs">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                  min="0"
                  max="100"
                  placeholder="Min"
                />
                <span>to</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  min="0"
                  max="100"
                  placeholder="Max"
                />
              </div>
            </div>

            <div className="filter-group">
              <h4>Options</h4>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={showOrganic}
                  onChange={(e) => setShowOrganic(e.target.checked)}
                />
                <span>Organic Only</span>
              </label>
            </div>

            <Button
              variant="outline"
              fullWidth
              onClick={() => {
                setSelectedCategory('All');
                setPriceRange([0, 100]);
                setShowOrganic(false);
              }}
            >
              Reset Filters
            </Button>
          </aside>

          {/* Products Grid */}
          <main className="products-main">
            <div className="products-toolbar">
              <button 
                className="mobile-filters-btn"
                onClick={() => setShowFilters(true)}
              >
                <SlidersHorizontal size={20} />
                Filters
              </button>

              <div className="sort-control">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className={`products-grid products-${viewMode}`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <p>No products found matching your criteria.</p>
                <Button onClick={() => {
                  setSelectedCategory('All');
                  setPriceRange([0, 100]);
                  setShowOrganic(false);
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
