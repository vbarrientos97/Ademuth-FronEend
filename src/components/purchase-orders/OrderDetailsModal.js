import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  const generateDownloadLink = (imageURL) => {
    const downloadLink = document.createElement("a");
    downloadLink.href = imageURL;
    downloadLink.target = "_blank";
    downloadLink.download = "imagen_para_sublimar.pdf";
    downloadLink.click();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Detalles de la Orden"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0"
    >
      <div className="bg-black opacity-90 absolute inset-0"></div>
      <div className="bg-white p-6 rounded-md shadow-md relative w-[40%]">
        <h2 className="text-xl font-bold mb-4">Detalles de la Orden</h2>
        <div className="mb-4 flex gap-2">
          <h3 className="font-bold">Cliente:</h3>
          <p>
            {order.customerName} {order.customerLastname}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="font-bold text-left">Productos:</h3>
          <ul>
            {order.products.map((product) => (
              <li
                key={product.id}
                className="pb-4 pt-4 flex flex-col border-b border-solid"
              >
                <div className="flex gap-2">
                  {product.name || "Camiseta Sublimada"} - ₡{product.price} -
                  Cantidad:
                  {product.amount}
                  {!product.photoURL ? (
                    <>
                      <p> - Talla: {product.size} - </p>
                      <p>Comentarios: {product.comments}</p>
                    </>
                  ) : (
                    <p></p>
                  )}
                </div>
                {product.photoURL ? (
                  <p></p>
                ) : (
                  <button
                    onClick={() =>
                      generateDownloadLink(
                        product.localDesign ||
                          product.customDesign ||
                          product.photoURL
                      )
                    }
                    className="w-[180px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 rounded-full mt-2 cursor-pointer text-sm"
                  >
                    Descargar PDF
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4 text-center">
          <h3 className="font-bold">Precio Total:</h3>
          <p>₡{order.totalPrice}</p>
        </div>
        <div className="mb-4 text-right">
          <button
            onClick={onClose}
            className="bg-summer text-darkiblue hover:bg-summerhovered transition px-3 py-1 rounded-md mt-3"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
