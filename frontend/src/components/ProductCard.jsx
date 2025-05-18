export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="card">
      {/* <img
        src={product.imageUrl || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-auto h-auto object-cover rounded-xl mb-2"
      /> */}
      {product.imageUrl && (
        <img
          src={`http://localhost:5177${product.imageUrl}`}
          // src={product.imageUrl || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-auto h-auto object-cover rounded-xl mb-2"
        />
      )}
      <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
      <p className="text-sm text-gray-500 mb-2">{product.description}</p>
      <div className="text-green-600 font-bold mb-4">
        ${product.price.toFixed(2)}
      </div>
      <button
        onClick={() => onAddToCart(product)}
        className="btn-primary w-auto"
      >
        Add to Cart
      </button>
    </div>
  );
}
