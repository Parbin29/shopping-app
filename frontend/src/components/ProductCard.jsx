export default function ProductCard({ product, onAddToCart }) {
    return (
      <div className="border p-4 rounded-xl shadow">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p>{product.description}</p>
        <p className="font-bold text-green-700">${product.price}</p>
        <button onClick={() => onAddToCart(product)} className="bg-blue-500 text-white px-3 py-1 mt-2 rounded">
          Add to Cart
        </button>
      </div>
    );
  }
  