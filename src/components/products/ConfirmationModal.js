import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ConfirmationModal = ({ product, isOpen, onRequestClose, onConfirm }) => {
  const [amount, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10));
  };

  const handleConfirm = () => {
    onConfirm(product, amount);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmación de Compra"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0"
    >
      <div className="bg-black opacity-90 absolute inset-0"></div>
      <div className="bg-white p-6 rounded-md shadow-md text-center relative">
        <h2 className="font-bold mb-2">
          Agregar Producto al Carrito de Compras
        </h2>
        <p>¿Cuántos productos de "{product.name}" deseas comprar?</p>
        <input
          type="number"
          className="text-center mt-3 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={amount}
          onChange={handleQuantityChange}
          min={1}
        />
        <button
          className="bg-mainblue hover:bg-blue-700 text-white px-3 py-1 rounded-md mt-3 mr-2"
          onClick={handleConfirm}
        >
          <span className="mr-2">Agregar</span>
        </button>
        <button
          className="bg-summer text-darkiblue hover:bg-summerhovered transition px-3 py-1 rounded-md mt-3"
          onClick={onRequestClose}
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
