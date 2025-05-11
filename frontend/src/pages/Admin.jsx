import { useEffect, useState } from "react";
import api from "../api/api";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    thumbnailUrl: "",
    price: 0,
    stock: 0,
    categoryId: 1,
  });
  const [editingId, setEditingId] = useState(null);
  const [file, setFile] = useState(null);
  // const [imageUrl, setImageUrl] = useState("");

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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm(prev => ({ ...prev, [name]: value }));
  // };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/products/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // setForm((prev) => ({ ...prev, imageUrl: res.data.imageUrl }));
      return res.data.imageUrl;
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageUrl = form.imageUrl;

    // Upload image if a file is selected
    if (file) {
      uploadedImageUrl = await handleUpload();
    }
    console.log(form);

    // Now submit the product with the imageUrl
    try {
      if (editingId) {
        form.id = editingId;
        form.categoryId = 1;
        // form.imageUrl = imageUrl;
        console.log(uploadedImageUrl);
        await api.put(`/products/${editingId}`, {
          ...form,
          categoryId: 1,
          imageUrl: uploadedImageUrl,
        });
      } else {
        // form.imageUrl = imageUrl;
        console.log(uploadedImageUrl);
        await api.post("/products", {
          ...form,
          categoryId: 1,
          imageUrl: uploadedImageUrl,
        });
      }
      setForm({
        name: "",
        description: "",
        imageUrl: "",
        thumbnailUrl: "",
        price: 0,
        stock: 0,
      });
      setEditingId(null);
      setFile(null);
      loadProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      thumbnailUrl: product.thumbnailUrl,
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
        <h2 className="text-xl font-semibold mb-3">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>
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
        {/* <textarea
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="input mb-2"
        /> */}
        <label className="mb-2">
          Upload product image:
        </label>
        <input type="file" onChange={handleFileChange} className="w-full" />
        <textarea
          name="thumbnailUrl"
          value={form.thumbnailUrl}
          onChange={handleChange}
          placeholder="Thumbnail URL"
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
        {products.map((product) => (
          <div key={product.id} className="card flex flex-col justify-between">
            <div>
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-green-600 font-semibold">${product.price}</p>
              <p className="text-sm text-gray-400">{product.stock} in stock</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(product)}
                className="btn-primary bg-yellow-500 hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
