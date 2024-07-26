import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border p-4 shadow-md rounded-lg">
      <img
        src={`https://via.placeholder.com/150?text=${product.name}`}
        alt={product.name}
        className="w-full h-40 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-600">{product.company}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Discount: {product.discount}%</p>
      <p>Availability: {product.availability}</p>
    </div>
  );
};

export default ProductCard;