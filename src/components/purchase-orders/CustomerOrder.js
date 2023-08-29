import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuNav from "../../components/nav/MenuNav";
import { fetchTshirts, deleteTshirt } from "../../features/tshirtSlice";
import { removeFromPurchase } from "../../features/purchaseSlice";
import { addOrder } from "../../features/orderSlice";
import { v4 as uuidv4 } from "uuid";

const CustomerOrders = () => {
  const dispatch = useDispatch();
  const tshirts = useSelector((state) => state.tshirts.tshirts);
  const status = useSelector((state) => state.tshirts.status);
  const selectedProducts = useSelector(
    (state) => state.purchases.selectedProducts
  );
  const user = useSelector((state) => state.auth.user);

  // const [customerName, setCustomerName] = useState("");
  // const [customerLastname, setCustomerLastname] = useState("");
  // const [design, setDesign] = useState("");
  // const [size, setSize] = useState("");
  // const [color, setColor] = useState("");
  // const [product, setProduct] = useState("");
  // const [amount, setAmount] = useState("");
  // const [comments, setComments] = useState("");
  // const [price, setPrice] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTshirts());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTshirt(id));
  };

  const handleDeleteOtherProduct = (id) => {
    dispatch(removeFromPurchase(id));
  };

  const calculateTotalPrice = () => {
    const totalSelectedProductsPrice = selectedProducts.reduce(
      (total, product) => total + parseFloat(product.price * product.amount),
      0
    );
    const totalTshirtsPrice = tshirts.reduce(
      (total, tshirt) => total + parseFloat(tshirt.price * tshirt.amount),
      0
    );
    return (totalSelectedProductsPrice + totalTshirtsPrice).toFixed(2);
  };

  const generateUniqueOrderId = () => {
    return uuidv4();
  };

  const handleSave = async () => {
    const newOrder = {
      customerName: user && user.name,
      customerLastname: user && user.lastname,
      products: [...tshirts, ...selectedProducts],
      totalPrice: calculateTotalPrice(),
      id: generateUniqueOrderId(),
    };

    await dispatch(addOrder(newOrder))
      .unwrap()
      .then(() => {
        console.log("Order added successfully");
      });
  };

  return (
    <div>
      <MenuNav />
      <div>
        <div className="max-w-[80%] mx-auto pt-40 pb-16">
          <div>
            <div className="flex flex-col">
              <h1 className="mb-2 text-darkiblue font-bold">
                Carrito de Compras
              </h1>
              <h2 className="mb-6 text-darkiblue">
                Pedido para cliente: {user && user.name} {user && user.lastname}
              </h2>
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-8 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b bg-darkiblue text-white font-medium dark:border-neutral-500">
                        <tr>
                          <th className="px-8 pt-6" colSpan={8}>
                            Camisetas Sublimadas
                          </th>
                        </tr>
                        <tr>
                          <th scope="col" className="px-8 py-4">
                            #
                          </th>
                          <th scope="col" className="px-8 py-4">
                            Color
                          </th>
                          <th scope="col" className="px-8 py-4">
                            Diseño para sublimar
                          </th>
                          <th scope="col" className="px-8 py-4">
                            Talla de camiseta
                          </th>
                          <th scope="col" className="px-8 py-4">
                            Comentarios
                          </th>
                          <th scope="col" className="px-8 py-4">
                            Cantidad
                          </th>
                          <th scope="col" className="px-8 py-4">
                            Precio Unitario
                          </th>
                          <th scope="col" className="px-8 py-4">
                            Acción
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tshirts.map((tshirt, index) => (
                          <tr
                            key={index}
                            className="border-b bg-graypage border-grayline"
                          >
                            <td className="whitespace-nowrap px-8 py-4 font-medium">
                              {index}
                            </td>
                            <td className="whitespace-nowrap px-8 py-4">
                              <div
                                style={{
                                  backgroundColor: tshirt.color,
                                  padding: "4px",
                                  border: "solid 1px",
                                  borderRadius: "4px",
                                }}
                              ></div>
                            </td>
                            <td className="whitespace-nowrap px-8 py-4">
                              <div
                                key={index}
                                className="px-4 w-[150px] h-auto"
                              >
                                <img
                                  src={tshirt.localDesign}
                                  alt={`Diseño ${index}`}
                                  className="w-[100%] h-[100%] object-cover rounded-lg shadow-md"
                                />
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-8 py-4">
                              {tshirt.size}
                            </td>
                            <td className="whitespace-nowrap px-8 py-4">
                              {tshirt.comments}
                            </td>
                            <td className="whitespace-nowrap px-8 py-4">
                              {tshirt.amount}
                            </td>
                            <td className="whitespace-nowrap px-8 py-4">
                              {tshirt.price}
                            </td>
                            <td className="whitespace-nowrap px-8 py-4">
                              <div className="mt-2 flex gap-x-2 justify-center">
                                <button
                                  className="bg-summer text-darkiblue font-bold px-2 py-1 text-xs rounded-md"
                                  onClick={() => handleDelete(tshirt.id)}
                                >
                                  Eliminar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <thead className="border-b bg-darkiblue text-white font-medium dark:border-neutral-500">
                        <tr>
                          <th className="px-8 pt-6" colSpan={8}>
                            Otros Productos
                          </th>
                        </tr>
                        <tr>
                          <th scope="col" className="px-8 py-4">
                            #
                          </th>
                          <th scope="col" className="px-8 py-4">
                            Nombre Producto
                          </th>
                          <th colSpan={3} scope="col" className="px-8 py-4">
                            Descripción
                          </th>
                          <th scope="col" className="px-8 py-4">
                            Cantidad
                          </th>
                          <th scope="col" className="px-8 py-4">
                            Precio Unitario
                          </th>
                          <th scope="col" className="px-8 py-4">
                            Acción
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProducts &&
                          selectedProducts.map((product, index) => (
                            <tr
                              key={index}
                              className="border-b bg-graypage border-grayline"
                            >
                              <td className="whitespace-nowrap px-8 py-4">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap px-8 py-4">
                                {product.name}
                              </td>
                              <td
                                colSpan={3}
                                className="whitespace-nowrap px-8 py-4"
                              >
                                {product.description}
                              </td>
                              <td className="whitespace-nowrap px-8 py-4">
                                {product.amount}
                              </td>
                              <td className="whitespace-nowrap px-8 py-4">
                                {product.price}
                              </td>
                              <td className="whitespace-nowrap px-8 py-4">
                                <div className="mt-2 flex gap-x-2 justify-center">
                                  <button
                                    className="bg-summer text-darkiblue font-bold px-2 py-1 text-xs rounded-md"
                                    onClick={() =>
                                      handleDeleteOtherProduct(product.id)
                                    }
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      <thead className="border-b bg-darkiblue text-white font-medium dark:border-neutral-500">
                        <tr>
                          <th className="pt-3 pb-3 px-8" colSpan={6}>
                            Precio Total:
                          </th>
                          <th className="pt-3 pb-3 px-8">
                            {calculateTotalPrice()}
                          </th>
                          <td className="whitespace-nowrap px-8 py-4">
                            <div className="mt-2 flex gap-x-2 justify-center">
                              <button
                                className="bg-summer text-darkiblue font-bold px-2 py-1 text-xs rounded-md"
                                onClick={() => handleSave()}
                              >
                                Guardar pedido
                              </button>
                            </div>
                          </td>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrders;
