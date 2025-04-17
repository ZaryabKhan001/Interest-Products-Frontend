import React, { useState } from "react";
import { formatDate } from "../utils/formatDate.js";
import { Button } from "./ui/button.jsx";
import useMutation from "../hooks/useMutation.js";

const ProductCard = ({ productDetails, idx }) => {
  const [interestedCount, setInterestedCount] = useState(
    productDetails.interestedCount || 0
  );
  const { mutate } = useMutation();

  const handleInterestedCount = async (productDetails) => {
    const stored = localStorage.getItem("interestedProducts");
    const interestedProducts = JSON.parse(stored) || [];

    const isInterestedAlready = interestedProducts.some(
      (product) => product._id === productDetails._id
    );

    try {
      if (isInterestedAlready) {
        const newProducts = interestedProducts.filter(
          (product) => product._id !== productDetails._id
        );
        localStorage.setItem("interestedProducts", JSON.stringify(newProducts));

        setInterestedCount((prev) => prev - 1);

        await mutate(`/product/${productDetails._id}/reaction`, "PATCH", {
          type: "notInterested",
        });
      } else {
        const newProducts = [...interestedProducts, productDetails];
        localStorage.setItem("interestedProducts", JSON.stringify(newProducts));

        setInterestedCount((prev) => prev + 1);

        await mutate(`/product/${productDetails._id}/reaction`, "PATCH", {
          type: "interested",
        });
      }
    } catch (err) {
      console.error("Reaction failed", err);
      setInterestedCount((prev) => (isInterestedAlready ? prev + 1 : prev - 1));
    }
  };
  return (
    <div className="w-full md:w-[50%] p-5 m-auto  border border-slate-500 shadow-md rounded-lg mb-5">
      <div className="flex justify-between items-start gap-3">
        <p>{idx + 1}</p>
        <p className="truncate text-lg font-bold">{productDetails?.title}</p>
        <div className="flex flex-col justify-start items-center gap-3">
          <Button
            className="bg-slate-700 text-white rounded-sm cursor-pointer hover:bg-slate-800 transition-all duration-300 "
            onClick={() => handleInterestedCount(productDetails)}
          >
            🔥
          </Button>
          <p className="font-bold text-lg">
            {interestedCount || productDetails?.interestedCount}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        By {productDetails?.createdBy} On{" "}
        {formatDate(productDetails?.createdAt)}
      </p>
    </div>
  );
};

export default ProductCard;
