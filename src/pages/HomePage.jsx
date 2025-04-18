import React, { useEffect } from "react";
import { ProductsGrid } from "../components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/productThunks.js";

const HomePage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.product.allProducts);
  const error = useSelector((state) => state.product.error.getAllProducts);
  const loading = useSelector((state) => state.product.loading.getAllProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className="my-16">
      {error && <p className="text-sm text-red-500">{error}</p>}
      {!loading && <ProductsGrid allProducts={data} />}
    </div>
  );
};

export default HomePage;
