import React, { useState } from 'react';
import products from './products';
import Categories from './Categories';
import ProductList from './ProductList';

export default function ProductView() {
  const uniqueCategories = ['Pastries', 'Cakes', 'Soft Drinks'];
  const [active, setActive] = useState(uniqueCategories[0]);

  return (
    <div>
      <p>Available Stock : {active}</p>
      <Categories
        list={uniqueCategories}
        currentActiveCategory={active}
        onClick={(value) => setActive(value)}
      />
      <ProductList list={products} currentCategory={active} />
    </div>
  );
}


