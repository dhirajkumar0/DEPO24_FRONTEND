import React from "react";

const Home = () => {
  return (
    <div>
      <div className=" w-screen text-center py-20 align-middle">
        <h1 className="text-white text-2xl py-6">Home Page</h1>

        <div className=" justify-center">
          <h1 className="text-[#3AC2CB]  text-2xl">
            You can create an order!!
          </h1>
          <p className="text-[#3AC2CB]  text-xl">
            Click on create order button on the top right to view products and
            create an order and generate invoice.
          </p>
          <p className="text-[#3AC2CB]  text-xl">
            If product list doesn't show up, please wait for the product list for few seconds!!{" "}
          </p>
           <p className="text-[#3AC2CB]  text-xl">
           Invoice generation will take around 9- 10 seconds so kindly  wait for it. {" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
