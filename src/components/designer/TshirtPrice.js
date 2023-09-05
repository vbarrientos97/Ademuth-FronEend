import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTshirtPrice } from "../../features/priceSlice";

function TshirtPrice() {
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();

  const handlePriceChange = (event) => {
    const newPrice = event.target.value;
    setPrice(newPrice);
  };

  const handlePriceSubmit = () => {
    dispatch(setTshirtPrice(price));
  };

  return (
    <div className="mb-4">
      <label htmlFor="TshirtPrice">Precio para las camisetas sublimadas:</label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          id="TshirtPrice"
          name="TshirtPrice"
          placeholder="Digite el precio"
          className="text-center mt-3 px-4 py-1 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={price}
          onChange={handlePriceChange}
        />
        <button
          type="button"
          className="bg-mainblue hover:bg-blue-700 text-white px-3 py-1 rounded-md mt-3 mr-2"
          onClick={handlePriceSubmit}
        >
          Guardar precio
        </button>
      </div>
    </div>
  );
}

export default TshirtPrice;
