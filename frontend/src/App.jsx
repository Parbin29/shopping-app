import { useEffect } from "react";
import connection from "./signalr/connection";
import Header from "./components/Header";
import OrderHistory from "./components/OrderHistory";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
// import User from "./pages/User";
import RegisterUser from "./components/RegisterUser";
import Login from "./components/Login";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { isUserAuthenticated } from './auth/auth'; // adjust path as needed

export default function App() {

  useEffect(() => {
    connection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub");
        connection.on("ReceiveMessage", (message) => {
          alert(`🔔 New Notification: ${message}`);
        });
      })
      .catch(err => console.error("SignalR Connection Error:", err));
  }, []);

 

  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={
            isUserAuthenticated()
              ? <Navigate to="/home" replace />
              : <Navigate to="/login" replace />
          } />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<OrderHistory/>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
