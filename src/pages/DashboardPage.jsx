import { Link } from 'react-router-dom';
import { Package, MapPin, User, Heart, LogOut } from 'lucide-react';
import useStore from '../store/useStore';
import { formatPrice, formatDate } from '../utils/helpers';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user, orders, logout } = useStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <div className="dashboard-header">
          <h1>My Dashboard</h1>
          <Button variant="danger" icon={<LogOut />} onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="dashboard-layout">
          <aside className="dashboard-sidebar">
            <Card>
              <div className="user-profile">
                <div className="user-avatar">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
              </div>

              <nav className="dashboard-nav">
                <button className="nav-item active">
                  <Package size={20} />
                  <span>Orders</span>
                </button>
                <button className="nav-item">
                  <MapPin size={20} />
                  <span>Addresses</span>
                </button>
                <button className="nav-item">
                  <User size={20} />
                  <span>Profile</span>
                </button>
                <button className="nav-item">
                  <Heart size={20} />
                  <span>Favorites</span>
                </button>
              </nav>

              <div className="loyalty-section">
                <h4>Loyalty Points</h4>
                <div className="points-display">
                  <span className="points">{user?.loyaltyPoints || 0}</span>
                  <span className="points-label">points</span>
                </div>
              </div>
            </Card>
          </aside>

          <main className="dashboard-content">
            <h2>Recent Orders</h2>
            
            {orders.length === 0 ? (
              <Card>
                <div className="no-orders">
                  <Package size={48} color="#ccc" />
                  <h3>No orders yet</h3>
                  <p>Start shopping to see your orders here</p>
                  <Link to="/products">
                    <Button>Browse Products</Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <Card key={order.id} className="order-card">
                    <div className="order-header">
                      <div>
                        <h4>Order #{order.id}</h4>
                        <p>{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="order-status" data-status={order.status}>
                        {order.status}
                      </div>
                    </div>

                    <div className="order-items">
                      {order.items.map((item, index) => (
                        <div key={index} className="order-item">
                          <img src={item.product.image} alt={item.product.name} />
                          <div>
                            <p className="item-name">{item.product.name}</p>
                            <p className="item-details">
                              {item.size} × {item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="order-footer">
                      <div className="order-total">
                        Total: {formatPrice(order.total)}
                      </div>
                      <Button size="small" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
