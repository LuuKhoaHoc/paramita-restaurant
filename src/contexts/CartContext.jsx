import React, { useEffect, useState } from 'react'

export const CartContext = React.createContext({
  cartItems: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  updateCartItemSelected: () => {},
  updateCartItemQuantity: () => {}
})

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  // Load cart from sessionStorage when component mounts
  useEffect(() => {
    const savedCartItems = sessionStorage.getItem('cartItems')
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems))
    }
  }, [])

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const addCartItem = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.title === item.title
    )
    if (existingItem) {
      updateCartItemQuantity(item.title, existingItem.quantity + 1)
    } else {
      setCartItems((prevItems) => [...prevItems, item])
    }
  }

  const removeCartItem = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.title !== itemId)
    )
  }
  const updateCartItemSelected = (title, newSelected) => {
    const existingItem = cartItems.find((cartItem) => cartItem.title === title)
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.title === title ? { ...item, selected: newSelected } : item
        )
      )
    }
  }
  const updateCartItemQuantity = (title, newQuantity) => {
    const existingItem = cartItems.find((cartItem) => cartItem.title === title)
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.title === title ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addCartItem, removeCartItem, updateCartItemQuantity, updateCartItemSelected }}
    >
      {children}
    </CartContext.Provider>
  )
}
