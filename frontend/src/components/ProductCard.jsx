export default function ProductCard({ product, onAddToCart }) {
  return (
    // <div className="product-card">
    //   <div className="p-4">
    //     <h2 className="text-lg font-semibold">{product.name}</h2>
    //     <p className="text-gray-500 text-sm mb-2">{product.description}</p>
    //     <p className="text-green-600 font-bold mb-4">${product.price.toFixed(2)}</p>

    //     <button
    //       onClick={() => onAddToCart(product)}
    //       className="btn-primary"
    //     >
    //       Add to Cart
    //     </button>
    //   </div>
    // </div>
    <div className="card">
      {/* <img
        src={product.imageUrl || "https://via.placeholder.com/300"}
        alt={product.name}
        className="w-full h-48 object-cover rounded-xl mb-2"
      /> */}
      <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
      <p className="text-sm text-gray-500 mb-2">{product.description}</p>
      <div className="text-green-600 font-bold mb-4">${product.price.toFixed(2)}</div>
      <button
        onClick={() => onAddToCart(product)}
        className="btn-primary w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}
