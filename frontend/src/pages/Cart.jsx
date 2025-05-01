import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Shopping Cart</h2>
      {cart.map(item => (
        <div key={item.id} className="border-b py-2 flex justify-between">
          <div>
            {item.name} - ${item.price}
          </div>
          <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
        </div>
      ))}
    </div>
  );
}
