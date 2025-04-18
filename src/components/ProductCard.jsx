import React, { useState } from "react";
import { formatDate } from "../utils/formatDate.js";
import { Button } from "./ui/button.jsx";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import {
  addBid,
  getBids,
  reaction,
} from "../features/product/productThunks.js";
import { Input } from "../components/ui/input.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bidSchema } from "../schemas/product.schema.js";

const ProductCard = ({ productDetails, idx }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(bidSchema),
    mode: "onChange",
  });

  const [interestedCount, setInterestedCount] = useState(
    productDetails.interestedCount || 0
  );
  const [bids, setBids] = useState(productDetails.bids || []);
  const [isInterested, setIsInterested] = useState(false);
  const dispatch = useDispatch();

  const reactionLoading = useSelector(
    (state) => state.product.loading.reaction
  );
  const addBidLoading = useSelector((state) => state.product.loading.addBid);

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

        await dispatch(
          reaction({ id: productDetails._id, type: "notInterested" })
        );
        toast("Not Interested registered succesfully");
        setIsInterested(false);
      } else {
        const newProducts = [...interestedProducts, productDetails];
        localStorage.setItem("interestedProducts", JSON.stringify(newProducts));

        setInterestedCount((prev) => prev + 1);

        await dispatch(
          reaction({ id: productDetails._id, type: "interested" })
        );

        toast("Interested registered succesfully");
        setIsInterested(true);
      }
    } catch (err) {
      console.error("Reaction failed", err);
      setInterestedCount((prev) => (isInterestedAlready ? prev + 1 : prev - 1));
    }
  };

  const handleAddBid = async (data) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.log("userId is required");
      return;
    }
    await dispatch(
      addBid({
        id: productDetails._id,
        data: { userId: userId, amount: data.amount },
      })
    );

    toast("Bid added successfully");

    const res = await dispatch(getBids(productDetails._id));
    setBids(res.payload);
    setValue("amount", "");
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
            disabled={reactionLoading}
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
      {isInterested && (
        <form className="mt-4" onSubmit={handleSubmit(handleAddBid)}>
          <div className="w-full">
            <Input
              type="number"
              placeholder="Enter your bid"
              {...register("amount")}
            />
            {errors?.amount && (
              <p className="text-sm text-red-500">{errors?.amount?.message}</p>
            )}
          </div>
          <Button
            disabled={addBidLoading || !isValid}
            className="bg-slate-700 text-white rounded-sm cursor-pointer hover:bg-slate-800 transition-all duration-300 "
          >
            Place Bid
          </Button>
        </form>
      )}

      <div className=" max-h-[100px] overflow-y-auto mt-3">
        {bids.length === 0 ? (
          <p className="text-sm">No bids yet.</p>
        ) : (
          bids?.map((bid, index) => (
            <div
              className="flex flex-col justify-start items-start my-2"
              key={index}
            >
              <p className="font-bold text-sm">
                <span>Amount:</span>
                {bid.amount}
              </p>
              <p className="text-xs">
                <span className="font-bold">By:</span>
                {bid.userId}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCard;
