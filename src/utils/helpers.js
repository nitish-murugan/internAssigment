/**
 * Format price to currency string
 * @param {number} price 
 * @returns {string}
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * Format date to readable string
 * @param {string|Date} date 
 * @returns {string}
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Calculate size multiplier for pricing
 * @param {string} size 
 * @returns {number}
 */
export const getSizeMultiplier = (size) => {
  const multipliers = {
    '250ml': 1,
    '500ml': 1.8,
    '750ml': 2.5,
    '1L': 3,
    '3L': 8
  };
  return multipliers[size] || 1;
};

/**
 * Calculate total price including size and addons
 * @param {number} basePrice 
 * @param {string} size 
 * @param {Array} addons 
 * @returns {number}
 */
export const calculateItemPrice = (basePrice, size, addons = []) => {
  const sizeMultiplier = getSizeMultiplier(size);
  const addonsPrice = addons.reduce((sum, addon) => sum + (addon.price || 0), 0);
  return basePrice * sizeMultiplier + addonsPrice;
};

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate phone number
 * @param {string} phone 
 * @returns {boolean}
 */
export const validatePhone = (phone) => {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return re.test(phone);
};

/**
 * Generate unique ID
 * @returns {string}
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Calculate estimated delivery time
 * @returns {string}
 */
export const getEstimatedDelivery = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 30);
  return now.toISOString();
};

/**
 * Get order status color
 * @param {string} status 
 * @returns {string}
 */
export const getStatusColor = (status) => {
  const colors = {
    pending: '#FFA500',
    confirmed: '#4CAF50',
    preparing: '#2196F3',
    'out-for-delivery': '#9C27B0',
    delivered: '#4CAF50',
    cancelled: '#F44336'
  };
  return colors[status] || '#757575';
};

/**
 * Debounce function
 * @param {Function} func 
 * @param {number} wait 
 * @returns {Function}
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 * @param {Function} func 
 * @param {number} limit 
 * @returns {Function}
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice 
 * @param {number} discountedPrice 
 * @returns {number}
 */
export const calculateDiscount = (originalPrice, discountedPrice) => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Scroll to top smoothly
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
