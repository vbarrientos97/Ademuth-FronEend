import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
} from "../../features/products/productSlice";
import { useEffect } from "react";
import MenuNav from "../nav/MenuNav";
import { Link } from "react-router-dom";

function ProductsList() {
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  if (status === "loading") {
    return <div>Cargando productos...</div>;
  }

  if (status === "failed") {
    return <div>Error al cargar los productos: {error}</div>;
  }

  return (
    <div className="h-full bg-graypage">
      <MenuNav />
      <div className="flex items-center justify-center h-full">
        <div className="flex justify-center flex-col content-center">
          <div className="flex justify-between mb-6">
            <h2 className="text-darkiblue font-bold mb-4 text-center">
              Lista de productos no personalizados
            </h2>
            <Link
              to={"/create-product"}
              className="w-40 flex gap-2 justify-center items-center bg-mainblue text-white font-bold px-2 py-1 text-xs rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Agregar Producto
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
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
                <div>{product.photoURL}</div>
                <div className="mt-2 flex gap-x-2 justify-center">
                  <Link
                    className="bg-transparent text-babygray font-bold border-2 border-babygray px-2 py-1 text-xs rounded-md"
                    to={`/edit-product/${product.id}`}
                  >
                    Editar Producto
                  </Link>
                  <button
                    className="bg-summer text-darkiblue font-bold px-2 py-1 text-xs rounded-md"
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
  );
}

export default ProductsList;
