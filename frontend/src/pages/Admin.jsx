import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: 0, stock: 0 });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, form);
      } else {
        await api.post("/products", { ...form, categoryId: 1 });
      }
      setForm({ name: "", description: "", price: 0, stock: 0 });
      setEditingId(null);
      loadProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛠 Admin Panel</h1>

      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-3">{editingId ? "Edit Product" : "Add Product"}</h2>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="input mb-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="input mb-2"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="input mb-2"
        />
        <input
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="input mb-4"
        />
        <div className="flex gap-2">
          <button onClick={handleSubmit} className="btn-primary">
            {editingId ? "Update" : "Add"} Product
          </button>
          {editingId && (
            <button
              onClick={() => {
                setForm({ name: "", description: "", price: 0, stock: 0 });
                setEditingId(null);
              }}
              className="btn-danger"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-3">Product List</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <div key={product.id} className="card flex flex-col justify-between">
            <div>
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-green-600 font-semibold">${product.price}</p>
              <p className="text-sm text-gray-400">{product.stock} in stock</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => handleEdit(product)} className="btn-primary bg-yellow-500 hover:bg-yellow-600">
                Edit
              </button>
              <button onClick={() => handleDelete(product.id)} className="btn-danger">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// import { useEffect, useState } from "react";
// import api from "../api/api";

// export default function Admin() {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({ name: "", description: "", price: 0, stock: 0 });

//   // Fetch products on load
//   useEffect(() => {
//     loadProducts();
//   }, []);

//   const loadProducts = async () => {
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Failed to fetch products:", err);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleAddProduct = async () => {
//     try {
//       await api.post("/products", { ...form, categoryId: 1 });
//       setForm({ name: "", description: "", price: 0, stock: 0 });
//       loadProducts();
//     } catch (err) {
//       console.error("Error adding product:", err);
//     }
//   };

//   const handleDeleteProduct = async (id) => {
//     try {
//       await api.delete(`/products/${id}`);
//       loadProducts();
//     } catch (err) {
//       console.error("Error deleting product:", err);
//     }
//   };

//   const handleUpdateProduct = async (id) => {
//     try {
//       await api.put(`/products/${id}`, form);
//       setForm({ name: "", description: "", price: 0, stock: 0 });
//       loadProducts();
//     } catch (err) {
//       console.error("Error updating product:", err);
//     }
//   };

//   const handleSelectProduct = (product) => {
//     setForm({
//       name: product.name,
//       description: product.description,
//       price: product.price,
//       stock: product.stock,
//     });
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">🛠 Admin Panel - Products</h1>

//       {/* Product Form */}
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-lg font-semibold mb-2">Add / Edit Product</h2>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleInputChange}
//           className="input mb-2"
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleInputChange}
//           className="input mb-2"
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={form.price}
//           onChange={handleInputChange}
//           className="input mb-2"
//         />
//         <input
//           type="number"
//           name="stock"
//           placeholder="Stock"
//           value={form.stock}
//           onChange={handleInputChange}
//           className="input mb-2"
//         />
//         <div className="flex gap-2">
//           <button onClick={handleAddProduct} className="btn-primary">Add Product</button>
//           <button onClick={() => handleUpdateProduct(form.id)} className="btn-primary bg-yellow-500 hover:bg-yellow-600">Update</button>
//         </div>
//       </div>

//       {/* Product List */}
//       <h2 className="text-xl font-semibold mb-2">Product List</h2>
//       <div className="grid gap-4">
//         {products.map(product => (
//           <div key={product.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
//             <div>
//               <h3 className="font-bold">{product.name}</h3>
//               <p className="text-sm text-gray-600">{product.description}</p>
//               <p className="text-green-600 font-semibold">${product.price} — {product.stock} in stock</p>
//             </div>
//             <div className="flex gap-2">
//               <button onClick={() => handleSelectProduct(product)} className="btn-primary bg-yellow-500 hover:bg-yellow-600">Edit</button>
//               <button onClick={() => handleDeleteProduct(product.id)} className="btn-danger">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
