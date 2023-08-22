import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct } from "../../features/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";

function ProductsForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    photoURL: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const products = useSelector((state) => state.products.products);
  const [requestStatus, setRequestStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({
          ...product,
          photoURL: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const getNextProductId = () => {
    const productIds = products.map((product) => product.id);
    const maxId = Math.max(...productIds);
    return maxId + 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.photoURL
    ) {
      setErrors({
        name: !product.name ? "Campo obligatorio" : "",
        description: !product.description ? "Campo obligatorio" : "",
        price: !product.price ? "Campo obligatorio" : "",
        photoURL: !product.photoURL ? "Campo obligatorio" : "",
      });
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    setIsLoading(true);

    try {
      if (params.id) {
        await dispatch(
          editProduct({ id: Number(params.id), productData: product })
        );
      } else {
        await dispatch(
          addProduct({
            ...product,
            id: getNextProductId(),
          })
        );
      }
      setRequestStatus("succeeded");
      setTimeout(() => {
        navigate("/products");
      }, 500);
    } catch (e) {
      setRequestStatus("failed");
    }
  };

  useEffect(() => {
    if (params.id) {
      setProduct(products.find((product) => product.id === Number(params.id)));
    }
  }, [params.id, products]);

  return (
    <>
      <div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
            <h1 className="text-center text-3xl font-light text-darkiblue">
              {params.id ? "Editar Producto" : "Agregar Producto"}
            </h1>
            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre del producto"
                      value={product.name}
                      onChange={handleChange}
                      className={`text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border ${
                        errors.name ? "border-red-500" : "border-gray-400"
                      } w-full py-2 focus:outline-none focus:border-blue-400`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>

                <div className="flex flex-col mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      name="price"
                      placeholder="Precio del producto"
                      value={product.price}
                      onChange={handleChange}
                      className={`text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border ${
                        errors.price ? "border-red-500" : "border-gray-400"
                      } w-full py-2 focus:outline-none focus:border-blue-400`}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-500">{errors.price}</p>
                  )}
                </div>

                <div className="flex flex-col mb-6">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      name="photoURL"
                      onChange={(e) => handleImageChange(e)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                    <div
                      role="button"
                      tabIndex="0"
                      className="cursor-pointer w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-white hover:bg-gray-100 text-gray-800"
                    >
                      <span className="inline-block mr-2">
                        <svg
                          className="w-5 h-5 text-gray-600 pt-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </span>
                      Escoger imagen
                    </div>
                    <span className="pl-1 text-xs text-gray-600">
                      {product.photoURL
                        ? "Imagen: " + product.name + " seleccionada."
                        : "No se ha seleccionado una imagen"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col mb-6">
                  <div className="relative">
                    <textarea
                      name="description"
                      placeholder="Descripción del producto"
                      value={product.description}
                      onChange={handleChange}
                      className={`text-sm sm:text-base placeholder-gray-500 pl-2 pr-4 rounded-lg border ${
                        errors.description
                          ? "border-red-500"
                          : "border-gray-400"
                      } w-full py-2 focus:outline-none focus:border-blue-400`}
                    ></textarea>
                  </div>
                  {errors.description && (
                    <p className="text-red-500">{errors.description}</p>
                  )}
                </div>

                <button className="bg-mainblue text-white font-bold px-2 py-1 rounded-sm">
                  Guardar Producto
                </button>
              </form>
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
        isLoading={isLoading}
      >
        <div className="bg-black opacity-90 absolute inset-0"></div>
        <div className="bg-white p-6 rounded-md shadow-md text-center relative">
          <p className="mb-4">
            ¿Estás seguro de que deseas guardar los cambios?
          </p>
          <button
            className="bg-mainblue text-white px-3 py-1 rounded-md mt-3 mr-2"
            disabled={isLoading}
            onClick={handleConfirm}
          >
            <span className="mr-2">
              {isLoading ? "Guardando" : "Sí, guardar"}
            </span>
          </button>
          <button
            className="bg-summer text-darkiblue px-3 py-1 rounded-md mt-3"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ProductsForm;
