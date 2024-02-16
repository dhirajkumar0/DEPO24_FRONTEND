import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone_number: "",
  });
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  useEffect(() => {}, []);
  return (
    <div className="flex justify-between bg-black align-middle">
      <div className="h-10  bg-black flex align-middle justify-end px-4 gap-1">
        <Link
          to="/"
          className=" bg-black text-white align-middle py-2  my-auto text-2xl px-5"
        >
          <img
            className="img-fluid h-8 py-1"
            src="https://cdn.shopify.com/s/files/1/0566/3182/0333/files/LOGO-color.png?v=1647674394"
          />
        </Link>
      </div>

      <div className="h-16  bg-black flex align-middle justify-end px-4 gap-1">
        <Link
          to="/create-order"
          className="h-16 bg-black flex align-middle justify-end px-4 gap-1"
        >
          <button className="bg-[#3AC2CB] px-4 py-1 hover:bg-black my-auto w-32 h-8 text-white rounded-2xl">
            Create Order
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
