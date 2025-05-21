export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="card">
      {product.imageUrl && (
        <img
          src={`http://localhost:5177${product.imageUrl}`}
          alt={product.name}
          className="w-auto h-auto object-cover rounded-xl mb-2"
        />
      )}
      <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
      <p className="text-sm text-gray-500 mb-2">{product.description}</p>
      <div className="text-green-600 font-bold mb-4">
        ${product.price.toFixed(2)}
      </div>
      
        <div className="mt-auto flex justify-end pb-4">
          <button
            onClick={() => onAddToCart(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Add to Cart
          </button>
        </div>
      {/* </div> */}
    </div>
  );
}
