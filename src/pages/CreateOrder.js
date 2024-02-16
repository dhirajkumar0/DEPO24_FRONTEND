import React from "react";
import { useState, useEffect } from "react";
import api from "../api/api";

const CreateOrder = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [gst, setGst] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await api.getProducts();
    setProducts(res.data.products);
    console.log(products);
  };

  const handleAddToCart = async (product) => {
    await setCartItems([
      ...cartItems,
      { ...product, quantity, gst, amount, total },
    ]);

    setQuantity(1);
  };
  const handleOrder = async () => {
    try {
      const response = await api.generateOrder(cartItems);
      const url = response.data.file;
      setPdfUrl(url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {pdfUrl ? (
        <iframe src={pdfUrl} className="w-screen h-screen"></iframe>
      ) : (
        <>
          {" "}
          <h1 className="text-center text-lg text-white mt-3">Product List</h1>
          <div className="flex justify-start items-center bg-[#233750] h-12 leading-10 text-lg  text-center text-white border-solid border-2 border-sky-500 mx-20 ">
            <div className="w-1/2 border-r-2    border-sky-500">
              <p>Name</p>
            </div>
            <div className="w-24 border-r-2  border-sky-500 ">
              <p>Price</p>
            </div>
            <div className="border-r-2   border-sky-500 w-24">
              <p>Discount</p>
            </div>
            <div className="border-r-2  border-sky-500 w-28">
              <p>HSN Code</p>
            </div>
            <div className="border-r-2  border-sky-500 w-32">
              <p>DSIN</p>
            </div>
            <div className="border-r-2  border-sky-500 w-24">
              <p>Quantity</p>
            </div>
            <div className="w-40"></div>
          </div>
          <div>
            {products.map((product) => (
              <div
                key={product.id}
                className="flex content-center justify-start leading-10 text-center text-white border-solid border-2 border-b-none border-sky-500 mx-20 "
              >
                <div className="w-1/2 border-r-2  text-start   border-sky-500">
                  <p className="pl-2"> {product.name}</p>
                </div>
                <div className="w-24 border-r-2  border-sky-500 ">
                  <p>{product.mrp}</p>
                </div>
                <div className="border-r-2   border-sky-500 w-24">
                  <p>{product.discount} %</p>
                </div>
                <div className="border-r-2  border-sky-500 w-28">
                  <p>{product.hsn}</p>
                </div>
                <div className="border-r-2  border-sky-500 w-32">
                  <p>{product.dsin}</p>
                </div>
                <div className="border-r-2  border-sky-500 w-24">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    defaultValue="1"
                    onChange={(event) => {
                      setQuantity(event.target.value);
                    }}
                    className="w-full bg-black px-2"
                  />
                </div>
                <div className="w-40 text-center">
                  <button
                    onClick={() => handleAddToCart(product, 1)}
                    className="bg-[#3AC2CB] text-center    hover:bg-black w-full h-full   text-white "
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h1 className="text-center text-lg text-white mt-3">Cart</h1>
          <div className="flex justify-start items-center bg-[#233750] h-12 mt-5 leading-10 text-lg  text-center text-white border-solid border-2 border-sky-500 mx-20 ">
            <div className="w-1/2 border-r-2    border-sky-500">
              <p>Name</p>
            </div>
            <div className="w-24 border-r-2  border-sky-500 ">
              <p>Price</p>
            </div>
            <div className="border-r-2   border-sky-500 w-24">
              <p>Discount</p>
            </div>
            <div className="border-r-2  border-sky-500 w-28">
              <p>SGST (9%)</p>
            </div>
            <div className="border-r-2  border-sky-500 w-32">
              <p>CGST (9%)</p>
            </div>
            <div className="border-r-2  border-sky-500 w-24">
              <p>Quantity</p>
            </div>
            <div className="w-40">
              <p>Amount</p>
            </div>
          </div>
          <div>
            {cartItems.map((product) =>
              product.quantity !== "NAN" ? (
                <div
                  key={product.id}
                  className="flex content-center justify-start leading-10 text-center text-white border-solid border-2 border-b-none border-sky-500 mx-20 "
                >
                  <div className="w-1/2 border-r-2  text-start   border-sky-500">
                    <p className="pl-2"> {product.name}</p>
                  </div>
                  <div className="w-24 border-r-2  border-sky-500 ">
                    <p>{product.mrp}</p>
                  </div>
                  <div className="border-r-2   border-sky-500 w-24">
                    <p>{product.discount} %</p>
                  </div>
                  <div className="border-r-2  border-sky-500 w-28">
                    <p>
                      {(
                        ((product.mrp -
                          product.mrp * (product.discount / 100)) *
                          product.quantity *
                          9) /
                        100
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="border-r-2  border-sky-500 w-32">
                    <p>
                      {(
                        ((product.mrp -
                          product.mrp * (product.discount / 100)) *
                          product.quantity *
                          9) /
                        100
                      ).toFixed(2)}
                    </p>
                  </div>
                  <div className="border-r-2  border-sky-500 w-24">
                    <p>{product.quantity}</p>
                  </div>
                  <div className="w-40 text-center">
                    {(
                      (product.mrp - product.mrp * (product.discount / 100)) *
                      product.quantity
                    ).toFixed(2)}
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
          <div className="flex gap-4 justify-center mt-5 text-center px-10">
            {cartItems.length !== 0 ? (
              <div>
                <button
                  onClick={(event) => setCartItems([])}
                  className="bg-[#3AC2CB] px-4 py-1 hover:bg-black my-auto w-32 h-8 text-white rounded-2xl"
                >
                  Clear cart
                </button>
              </div>
            ) : (
              ""
            )}

            <div>
              <button
                className="bg-[#3AC2CB] px-4 py-1 hover:bg-black my-auto w-32 h-8 text-white rounded-2xl"
                onClick={handleOrder}
              >
                Create order
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateOrder;
