import React from "react";
import { productSchema } from "../schemas/product.schema.js";
import { Input } from "../components/ui/input.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../components/ui/button.jsx";
import { Loader2 } from "lucide-react";
import { Textarea } from "../components/ui/textarea.jsx";
import { useNavigate } from "react-router-dom";
import useMutation from "../hooks/useMutation.js";
import { toast } from "sonner";

const AddNewProductPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(productSchema), mode: "onChange" });

  const navigate = useNavigate();
  const { mutate, isLoading, error } = useMutation();

  const handleAddingProduct = async (data) => {
    try {
      const res = await mutate("/product/create", "POST", data);

      if (res?.success) {
        toast("Product added successfully");
        navigate("/");
      } else {
        console.error("Error creating product", res);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  return (
    <div className="my-24 flex flex-col justify-start items-center gap-5">
      <h1 className="text-2xl font-bold text-left w-full lg:w-[50rem]">
        Add New Product
      </h1>
      <form
        className="flex flex-col justify-center items-start gap-8 my-5 w-full lg:w-[50rem]"
        onSubmit={handleSubmit(handleAddingProduct)}
      >
        <div className="w-full">
          <Input
            placeholder="Enter Your Name"
            {...register("name")}
            type={"text"}
          />
          {errors?.name && (
            <p className="text-sm text-red-500">{errors?.name?.message}</p>
          )}
        </div>
        <div className="w-full">
          <Input
            placeholder="Enter Product Title"
            {...register("title")}
            type={"text"}
          />
          {errors?.title && (
            <p className="text-sm text-red-500">{errors?.title?.message}</p>
          )}
        </div>
        <div className="w-full">
          <Textarea
            placeholder="Write Product details here..."
            className={"h-[10rem]"}
            {...register("description")}
          />
          {errors?.description && (
            <p className="text-sm text-red-500">
              {errors?.description?.message}
            </p>
          )}
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button
          className={
            "cursor-pointer text-white bg-slate-700 hover:bg-slate-800 transition-all duration-300 rounded-sm min-w-[5rem]"
          }
          type="submit"
          disabled={!isValid || isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Add"}
        </Button>
      </form>
    </div>
  );
};

export default AddNewProductPage;
