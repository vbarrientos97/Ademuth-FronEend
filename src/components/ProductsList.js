import { useSelector, useDispatch } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
} from "../features/products/productSlice";
import { useEffect } from "react";
import MenuNav from "../components/MenuNav";
import { Link } from "react-router-dom";

function ProductsList() {
  const products = useSelector((state) => state.products.products); // Accede al estado de los productos dentro del slice
  const status = useSelector((state) => state.products.status); // Accede al estado de carga de los productos
  const error = useSelector((state) => state.products.error); // Accede al estado de error de los productos
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
    <div className="h-full">
      <MenuNav />
      <div className="flex items-center justify-center h-full">
        <div className="flex justify-center flex-col content-center">
          <h2 className="mb-6 text-darkiblue font-bold">Lista de Productos</h2>
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="shadow-xl text-center p-4 rounded-md flex flex-col content-center"
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
