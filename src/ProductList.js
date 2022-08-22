import React from 'react';

export default function ProductList({ list = [], currentCategory }) {
  return (
    <ul className="list-group">
      {list
        .filter((product) => product.category === currentCategory)
        .map((product) => (
          <li className="list-group-item">
            {product.name}
            {product.stocked ? (
              <span className="badge bg-success ms-2">In Stock</span>
            ) : null}
          </li>
        ))}
    </ul>
  );
}


