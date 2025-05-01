import { useEffect, useState } from "react";
import api from "../api/api";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    api.get("/Products").then(res => setProducts(res.data));
  };

  const handleAddProduct = () => {
    api.post("/Products", { name, description: "", price: 0, stock: 10, categoryId: 1 }).then(() => {
      setName("");
      loadProducts();
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Admin - Product Management</h2>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Product name" className="border p-2 mr-2" />
      <button onClick={handleAddProduct} className="bg-green-600 text-white px-4 py-2">Add</button>

      <ul className="mt-4">
        {products.map(p => <li key={p.id}>{p.name}</li>)}
      </ul>
    </div>
  );
}
