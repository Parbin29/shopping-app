import { Link } from "react-router-dom";

export default function Header({ cartCount = 0 }) {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopZone
        </Link>

        <nav className="flex items-center space-x-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600">Home</Link>          
          <Link to="/admin" className="hover:text-blue-600">Admin</Link>
          <Link to="/cart" className="relative hover:text-blue-600">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/login" className="hover:text-blue-600">Login</Link>
          <Link to="/orders" className="hover:text-blue-600">
            Orders
          </Link>
        </nav>
      </div>
    </header>
  );
}
