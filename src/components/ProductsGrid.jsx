import React from "react";
import { ProductCard } from "../components/index.js";
const ProductsGrid = ({ allProducts }) => {
  return (
    <div className="pb-3">
      <h1 className="text-xl font-bold w-full md:w-[50%] mx-auto my-5">
        All Products
      </h1>
      {allProducts.map((productDetails, idx) => (
        <ProductCard productDetails={productDetails} idx={idx} key={idx} />
      ))}
    </div>
  );
};

export default ProductsGrid;
