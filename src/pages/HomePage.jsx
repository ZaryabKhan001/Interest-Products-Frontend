import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch.js";
import { ProductsGrid } from "../components/index.js";

const HomePage = () => {
  const { data, error, isLoading, fetchData } = useFetch();

  useEffect(() => {
    fetchData("/product");
  }, []);

  return (
    <div className="my-16">
      {error && <p className="text-sm text-red-500">{error}</p>}
      {!isLoading && <ProductsGrid allProducts={data} />}
    </div>
  );
};

export default HomePage;
