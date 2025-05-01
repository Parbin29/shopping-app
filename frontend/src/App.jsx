import { useEffect } from "react";
import connection from "./signalr/connection";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
