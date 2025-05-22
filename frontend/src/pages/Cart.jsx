import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../api/api";

export default function Cart() {
  const { cart, setCart, removeFromCart } = useCart();
  const [message, setMessage] = useState("");

const user = JSON.parse(localStorage.getItem("userInfo")) || []; // Retrieve user info from local storage
// console.log(user);

const handleQuantityChange = (productId, newQty) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: newQty } : item
    );
    setCart(updatedCart);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const handleCheckout = async () => {

    try {

      const response = await api.post("/cart/checkout", {
         userId: user.userId,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      setMessage(response.data.message);
      removeFromCart([]); // Clear cart
    } catch (err) {
      setMessage("Checkout failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b py-4"
          >
            <div>
              <p className="font-semibold text-lg">{item.name}</p>
              <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
              <p className="text-gray-700">Quantity: {item.quantity}</p>
            </div>

            <div>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={e =>
                  handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                }
                className="w-20 border rounded px-2 py-1"
              />
            </div>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <div className="text-right mt-6">
          <p className="text-lg font-semibold mb-2">Total: ${total.toFixed(2)}</p>
          <div className="flex justify-end mt-6">
          <button 
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          onClick={handleCheckout}
          >
            Checkout
          </button>
          </div>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
