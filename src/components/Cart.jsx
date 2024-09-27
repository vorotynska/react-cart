import PropTypes from 'prop-types'
import { useContext } from 'react'
import { CartContext } from '../context/cart.jsx'

export default function Cart ({ showModal, toggle }) {

  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)

  return (
    showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="relative bg-white dark:bg-gray-900 shadow-lg w-full max-w-md mx-auto rounded-lg p-6 sm:p-8 text-black dark:text-white font-normal uppercase text-sm min-h-[300px]">
          <h1 className="text-2xl font-bold mb-4 text-center">Cart</h1>
          
          <button
            className="absolute top-4 right-4 px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={toggle}
          >
            Close
          </button>

          <div className="flex flex-col gap-4 mb-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div className="flex justify-between items-center" key={item.id}>
                  <div className="flex gap-4 items-center">
                    <img src={item.thumbnail} alt={item.title} className="rounded-md w-16 h-16 object-cover" />
                    <div className="flex flex-col">
                      <h1 className="text-lg font-bold">{item.title}</h1>
                      <p className="text-gray-600 dark:text-gray-400">${item.price}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <button
                      className="px-3 py-1 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                      onClick={() => { addToCart(item) }}
                    >
                      +
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      className="px-3 py-1 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                      onClick={() => { removeFromCart(item) }}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-lg font-bold text-center">Your cart is empty</h1>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="flex flex-col items-center mt-4">
              <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
              <button
                className="px-4 py-2 mt-4 bg-red-600 text-white text-xs font-bold uppercase rounded hover:bg-red-500 focus:outline-none focus:bg-red-500"
                onClick={clearCart}
              >
                Clear cart
              </button>
            </div>
          )}
        </div>
      </div>
    )
  )
}

Cart.propTypes = {
  showModal: PropTypes.bool,
  toggle: PropTypes.func
}



