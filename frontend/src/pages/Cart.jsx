import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../api/api";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const [message, setMessage] = useState("");

const user = JSON.parse(localStorage.getItem("userInfo")) || []; // Retrieve user info from local storage
console.log(user);

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
    <div className="p-4">
      <h2 className="text-2xl mb-4">Shopping Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="border-b py-2 flex justify-between">
          <div>
            {item.name} - ${item.price}
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      {/* <button onClick={handleCheckout}>Checkout</button> */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleCheckout}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
        >
          Checkout
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
}
