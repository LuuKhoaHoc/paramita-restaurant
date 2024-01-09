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
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.title === item.title
    )

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems]
      updatedCartItems[existingItemIndex].quantity += 1
      setCartItems(updatedCartItems)
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }])
    }
  }

  const removeCartItem = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.title !== itemId)
    )
  }

  const updateCartItemSelected = (title, selectTitle, select) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.title === title
          ? {
              ...item,
              optionList: item.optionList.map((option) =>
                option.title === selectTitle
                  ? { ...option, selected: select }
                  : option
              )
            }
          : item
      )
    )
  }
  const updateCartItemQuantity = (title, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.title === title ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        removeCartItem,
        updateCartItemQuantity,
        updateCartItemSelected
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
