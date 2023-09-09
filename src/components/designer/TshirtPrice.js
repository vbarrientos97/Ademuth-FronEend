import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTeeprice, fetchTeeprice } from "../../features/priceSlice";

function TshirtPrice() {
  const [teeprice, setTeeprice] = useState("");
  const currentPrice = useSelector((state) => state.teeprice.teeprice);
  const teepriceValue =
    currentPrice.length > 0 ? currentPrice[0].teeprice : null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeeprice());
  }, [dispatch]);

  const handlePriceChange = (event) => {
    const newTeeprice = event.target.value;
    setTeeprice(newTeeprice);
  };

  const handlePriceSubmit = () => {
    dispatch(editTeeprice({ teepriceData: { teeprice } }))
      .then(() => {
        setTeeprice("");
      })
      .catch((error) => {
        console.error("Error al editar el precio:", error);
      });
  };

  return (
    <div className="mb-4">
      <div className="flex flex-col">
        <label htmlFor="TshirtPrice" className="font-bold py-2">
          Precio para las camisetas sublimadas
        </label>
        <label className="py-2">
          El precio actual es de:{" "}
          {teepriceValue !== null ? (
            <span className="text-mainblue font-bold">
              {teepriceValue} colones.
            </span>
          ) : (
            "Cargando..."
          )}
        </label>
      </div>

      {console.log(teeprice, "TshirtPrice")}
      <div className="flex items-center gap-2">
        <input
          type="text"
          id="TshirtPrice"
          name="TshirtPrice"
          placeholder="Digite el nuevo precio"
          className="text-center mt-3 px-4 py-1 border rounded-md"
          value={teeprice}
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
