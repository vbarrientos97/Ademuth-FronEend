import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuNav from "../nav/MenuNav";
import { Link } from "react-router-dom";
import Breadcrumb from "../nav/Breadcrumb";
import config from "../../api/config";
import Modal from "react-modal";
import { deleteProduct, fetchProducts } from "../../features/productSlice";

function ProductsList() {
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const breadcrumbItems = [
    { label: "Inicio", url: "/purchase-orders" },
    { label: "Página Actual", url: "/tee-designer-admin" },
  ];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    setProductIdToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(productIdToDelete));
    setIsModalOpen(false);
  };

  if (status === "loading") {
    return <div>Cargando productos...</div>;
  }

  if (status === "failed") {
    return <div>Error al cargar los productos: {error}</div>;
  }

  return (
    <div>
      <MenuNav />
      <div className="h-full bg-graypage">
        <div className="md:w-[80%] lg:w-[60%] mx-auto pt-20 pb-10">
          <Breadcrumb items={breadcrumbItems} />
          <div className="flex justify-center flex-col content-center mt-10">
            <div className="flex justify-between mb-6">
              <h2 className="text-darkiblue font-bold mb-4 text-center">
                Lista de productos no personalizados
              </h2>
              <Link
                to={"/create-product"}
                className="w-40 max-h-[40px] flex gap-2 justify-center items-center bg-mainblue hover:bg-blue-700 text-white font-bold px-2 py-1 text-xs rounded-md"
              >
                + Agregar Producto
              </Link>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="shadow-xl bg-white text-center p-4 rounded-md flex flex-col content-center"
                >
                  <header className="flex justify-center text-mainblue mb-2">
                    <h3 className="text-center font-bold text-lg">
                      {product.name}
                    </h3>
                  </header>
                  <p>{product.description}</p>
                  <p className="text-babygray mt-2 mb-2">
                    Precio: ₡{product.price}
                  </p>
                  <img
                    src={config.backendBaseUrl + product.photoURL}
                    alt={product.name}
                    className="w-40 h-40 mx-auto mt-2 rounded-md object-cover"
                  />
                  <div className="flex justify-end md:flex-col md:gap-2 lg:flex-row mt-2 flex gap-x-2 justify-center">
                    <Link
                      className="bg-transparent text-babygray hover:bg-babygray hover:text-white transition font-bold border-2 border-babygray px-2 py-1 text-xs rounded-md"
                      to={`/edit-product/${product.id}`}
                    >
                      Editar Producto
                    </Link>
                    <button
                      className="bg-summer text-darkiblue hover:bg-summerhovered transition font-bold px-2 py-1 text-xs rounded-md"
                      onClick={() => handleDelete(product.id)}
                    >
                      Eliminar Producto
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmation Modal"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0"
      >
        <div className="bg-black opacity-90 absolute inset-0"></div>
        <div className="bg-white p-6 rounded-md shadow-md text-center relative">
          <p className="mb-4">¿Seguro que deseas eliminar este producto?</p>
          <button
            className="bg-mainblue hover:bg-blue-700 text-white px-3 py-1 rounded-md mt-3 mr-2"
            onClick={confirmDelete}
          >
            Eliminar
          </button>
          <button
            className="bg-summer text-darkiblue hover:bg-summerhovered transition px-3 py-1 rounded-md mt-3"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ProductsList;
