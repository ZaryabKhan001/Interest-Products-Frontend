import React from "react";
import Logo from "../assets/Logo.jpg";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button.jsx";
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="h-[12vh] flex justify-between items-center">
      <div className="w-[3rem] h-[3rem] overflow-hidden rounded-full">
        <img
          src={Logo}
          alt="Logo"
          loading="lazy"
          className="h-[100%] w-[100%] object-cover"
        />
      </div>

      <div>
        <h1 className="text-2xl font-bold hidden sm:block">
          Unique Product Ideas
        </h1>
      </div>
      <div>
        <Button
          className="bg-slate-700 text-white rounded-sm cursor-pointer hover:bg-slate-800 transition-all duration-300 "
          onClick={() => navigate("/new-product")}
        >
          + New Product
        </Button>
      </div>
    </header>
  );
};

export default Header;
