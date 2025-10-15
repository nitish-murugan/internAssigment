// Type definitions using JSDoc comments for better IDE support

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string} image
 * @property {string} category
 * @property {string[]} sizes
 * @property {boolean} organic
 * @property {number} rating
 * @property {number} reviewCount
 * @property {string[]} features
 * @property {Object} nutrition
 */

/**
 * @typedef {Object} CartItem
 * @property {string} id
 * @property {Product} product
 * @property {number} quantity
 * @property {string} size
 * @property {string[]} addons
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} phone
 * @property {Address[]} addresses
 * @property {number} loyaltyPoints
 */

/**
 * @typedef {Object} Address
 * @property {string} id
 * @property {string} label
 * @property {string} street
 * @property {string} city
 * @property {string} state
 * @property {string} zipCode
 * @property {boolean} isDefault
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} userId
 * @property {CartItem[]} items
 * @property {number} subtotal
 * @property {number} deliveryFee
 * @property {number} tax
 * @property {number} total
 * @property {string} status
 * @property {Address} deliveryAddress
 * @property {string} paymentMethod
 * @property {string} createdAt
 * @property {string} estimatedDelivery
 */

export {};
