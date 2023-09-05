import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, fetchProducts } from "../../features/productSlice";
import { useEffect } from "react";
import MenuNav from "../nav/MenuNav";
import { Link } from "react-router-dom";
import Breadcrumb from "../nav/Breadcrumb";
import config from "../../api/config";

function ProductsList() {
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const dispatch = useDispatch();

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
      <div className="flex justify-center h-full">
        <div className="pt-20">
          <Breadcrumb items={breadcrumbItems} />
          <div className="flex justify-center flex-col content-center mt-10">
            <div className="flex justify-between mb-6">
              <h2 className="text-darkiblue font-bold mb-4 text-center">
                Lista de productos no personalizados
              </h2>
              <Link
                to={"/create-product"}
                className="w-40 flex gap-2 justify-center items-center bg-mainblue hover:bg-blue-700 text-white font-bold px-2 py-1 text-xs rounded-md"
              >
                + Agregar Producto
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
                  <img
                    src={config.backendBaseUrl + product.photoURL}
                    alt={product.name}
                    className="w-40 h-40 mx-auto mt-2 rounded-md object-cover"
                  />
                  <div className="mt-2 flex gap-x-2 justify-center">
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
    </div>
  );
}

export default ProductsList;
