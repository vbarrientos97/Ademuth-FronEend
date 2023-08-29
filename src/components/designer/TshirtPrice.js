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
    <div>
      <label htmlFor="TshirtPrice">Precio para las camisetas sublimadas:</label>
      <input
        type="text"
        id="TshirtPrice"
        name="TshirtPrice"
        placeholder="Digite el precio"
        value={price}
        onChange={handlePriceChange}
      />
      <button type="button" onClick={handlePriceSubmit}>
        Guardar precio
      </button>
    </div>
  );
}

export default TshirtPrice;
