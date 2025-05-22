import React, { useEffect, useState } from 'react';
import api from "../api/api";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

   const user = JSON.parse(localStorage.getItem("userInfo")) || [];
  console.log(user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get(`/cart/users/${user.userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to load orders", err);
      }
    };

    if (user.userId) fetchOrders();
  }, [user.userId]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Your Order History</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="border rounded p-4 mb-4">
            <div className="text-sm text-gray-600">Order ID: {order.id}</div>
            <div className="text-sm text-gray-600 mb-2">
              Date: {new Date(order.orderedAt).toLocaleDateString()}
            </div>

            <ul className="mb-2">
              {order.items.map((item, idx) => (
                <li key={idx} className="text-sm">
                  {item.quantity} x {item.name} @ ${item.price * item.quantity}
                </li>
              ))}
            </ul>

            <div className="font-semibold">Total: ${order.total.toFixed(2)}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default OrderHistory;
