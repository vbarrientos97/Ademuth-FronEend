import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct } from "../../features/products/productSlice";
import { useNavigate, useParams } from "react-router-dom";

function ProductsForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    photoURL: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const products = useSelector((state) => state.products.products);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const getNextProductId = () => {
    const productIds = products.map((product) => product.id);
    const maxId = Math.max(...productIds);
    return maxId + 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (params.id) {
      dispatch(editProduct(product));
    } else {
      await dispatch(
        addProduct({
          ...product,
          id: getNextProductId(),
        })
      );
    }
    setTimeout(() => {
      navigate("/products");
    }, 500);
  };

  useEffect(() => {
    if (params.id) {
      setProduct(products.find((product) => product.id === Number(params.id)));
    }
  }, [params.id, products]);

  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={handleSubmit}
        className="bg-darkiblue rounded-md max-w-sm p-6"
      >
        <label
          className="text-white block text-xs font-bold mb-2"
          htmlFor="name"
        >
          Producto:
        </label>
        <input
          type="text"
          name="name"
          placeholder="Nombre del producto"
          value={product.name}
          onChange={handleChange}
          className="w-full p-2 rounded-md mb-2"
        />
        <label
          className="text-white block text-xs font-bold mb-2"
          htmlFor="price"
        >
          Precio:
        </label>
        <input
          type="text"
          name="price"
          placeholder="Precio del producto"
          value={product.price}
          onChange={handleChange}
          className="w-full p-2 rounded-md mb-2"
        />
        <label
          className="text-white block text-xs font-bold mb-2"
          htmlFor="photoURL"
        >
          Foto:
        </label>
        <input
          type="text"
          name="photoURL"
          placeholder="Foto del producto"
          value={product.photoURL}
          onChange={handleChange}
          className="w-full p-2 rounded-md mb-2"
        />
        <label
          className="text-white block text-xs font-bold mb-2"
          htmlFor="description"
        >
          Descripción:
        </label>
        <textarea
          name="description"
          placeholder="Descripción del producto"
          value={product.description}
          onChange={handleChange}
          className="w-full p-2 rounded-md mb-2"
        ></textarea>
        <button className="bg-mainblue text-white font-bold px-2 py-1 rounded-sm">
          Guardar Producto
        </button>
      </form>
    </div>
  );
}

export default ProductsForm;
