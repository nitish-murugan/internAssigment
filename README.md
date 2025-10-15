# FreshOJ - Quick Commerce Orange Juice Platform 🍊

A professional, production-ready React web application for a quick-commerce startup specializing in fresh orange juices. Built with modern web technologies and best practices.

## 🚀 Features

### Core Functionality
- **Product Catalog** - Browse various orange juice options with advanced filtering and sorting
- **Shopping Cart** - Full cart management with quantity controls and price calculations
- **User Authentication** - Secure login/signup with form validation
- **Order Management** - Complete checkout process with order confirmation
- **User Dashboard** - Order history, profile management, and loyalty points
- **Responsive Design** - Mobile-first approach, works seamlessly on all devices

### Product Features
- 12+ unique juice products
- Multiple size options (250ml, 500ml, 750ml, 1L, 3L)
- Organic and regular options
- Customizable add-ons (Extra pulp, No pulp, Extra Vitamin C)
- Real-time pricing calculations
- Product ratings and reviews

## 🛠️ Tech Stack

- **React 19** - Latest React with functional components and hooks
- **React Router v6** - Client-side routing
- **Zustand** - Lightweight state management with persistence
- **React Hook Form** - Performant form validation
- **Lucide React** - Beautiful icon system
- **Vite** - Lightning-fast build tool

## 📦 Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Common components (Button, Input, Card, etc.)
│   ├── auth/           # Authentication components
│   ├── product/        # Product-related components
│   ├── cart/           # Shopping cart components
│   └── layout/         # Layout components (Header, Footer)
├── pages/              # Page components
├── store/              # State management (Zustand)
├── data/               # Mock data and constants
├── utils/              # Utility functions
└── types/              # JSDoc type definitions
```

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#ff6b35, #ff8c42)
- **Secondary**: Green (#4caf50)
- **Professional, light color scheme**

### Typography
- **Font**: Inter with system fonts fallback
- **Sizes**: Standard 14-16px for body text with proper hierarchy

## 🚦 Usage Guide

1. **Browse Products** - Navigate to Products page and use filters
2. **Add to Cart** - Customize size and add-ons before adding
3. **Checkout** - Review cart and proceed to checkout
4. **Track Orders** - Access Dashboard after login to view order history

## 🚀 Build for Production

```bash
npm run build
npm run preview
```

## 📱 Features Implemented

✅ Product catalog with filtering and sorting  
✅ Shopping cart with quantity management  
✅ User authentication (login/signup)  
✅ Responsive design (mobile-first)  
✅ Form validation  
✅ State management with persistence  
✅ Professional UI/UX  
✅ Toast notifications  
✅ Favorites functionality  
✅ Order dashboard  

## 🔒 Security & Best Practices

- Form validation
- Input sanitization
- Secure authentication flow ready
- Code organization and modularity
- Performance optimizations

Built with ❤️ and 🍊

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
