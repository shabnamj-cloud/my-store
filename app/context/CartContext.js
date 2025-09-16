"use client";
import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProduct = state.products.find(product => product.id === action.payload.id);
      
      if (existingProduct) {
        return {
          ...state,
          products: state.products.map(product =>
            product.id === action.payload.id
              ? { ...product, quantity: product.quantity + action.payload.quantity }
              : product
          )
        };
      }
      
      return {
        ...state,
        products: [...state.products, action.payload]
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id
            ? { ...product, quantity: action.payload.quantity }
            : product
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        products: []
      };

    case 'LOAD_CART':
      return {
        ...state,
        products: action.payload
      };

    default:
      return state;
  }
};

const initialState = {
  products: []
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.products));
  }, [state.products]);

  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product._id?.$oid || product._id,
        name: product.name,
        price: product.price?.$numberInt ? parseInt(product.price.$numberInt) : product.price,
        image: product.image,
        quantity,
        inStock: product.inStock,
        stock: product.stock?.$numberInt ? parseInt(product.stock.$numberInt) : product.stock
      }
    });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.products.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  const getCartProductsCount = () => {
    return state.products.reduce((total, product) => total + product.quantity, 0);
  };

  const value = {
    products: state.products,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartProductsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};