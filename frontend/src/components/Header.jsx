import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="text-xl font-bold">ShoppingSite</div>
      <nav>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/cart" className="mr-4">Cart</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  );
}
