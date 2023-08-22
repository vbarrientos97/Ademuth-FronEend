import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuNav from "../../components/nav/MenuNav";
import { Link } from "react-router-dom";
import { fetchOrders, deleteOrder } from "../../features/orderSlice";

const ITEMS_PER_PAGE = 3;

const Orders = () => {
  const orders = useSelector((state) => state.orders.orders);
  const status = useSelector((state) => state.orders.status);
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrders());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedOrders = orders.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  return (
    <div>
      <MenuNav />
      <div>
        <div className="max-w-[70%] mx-auto pt-40 pb-16">
          <div>
            <div className="flex flex-col">
              <h1 className="mb-6 text-darkiblue font-bold">
                Órdenes de Compra
              </h1>
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="border-b bg-darkiblue text-white font-medium dark:border-neutral-500">
                        <tr>
                          <th scope="col" className="px-6 py-4">
                            #
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Nombre del cliente
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Apellido
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Color
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Diseño para sublimar
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Talla de camiseta
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Cantidad de camisetas
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Comentarios
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Acción
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedOrders.map((order, index) => (
                          <tr
                            key={index}
                            className="border-b bg-graypage border-grayline"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.customerName}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.customerLastname}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div
                                style={{
                                  backgroundColor: order.color,
                                  padding: "4px",
                                  border: "solid 1px",
                                  borderRadius: "4px",
                                }}
                              ></div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div
                                key={index}
                                className="px-4 w-[150px] h-auto"
                              >
                                <img
                                  src={order.localDesign}
                                  alt={`Diseño ${index}`}
                                  className="w-[100%] h-[100%] object-cover rounded-lg shadow-md"
                                />
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.size}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.amount}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.comments}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <div className="mt-2 flex gap-x-2 justify-center">
                                <button
                                  className="bg-summer text-darkiblue font-bold px-2 py-1 text-xs rounded-md"
                                  onClick={() => handleDelete(order.id)}
                                >
                                  Eliminar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Paginacion */}
                    <div className="flex justify-end px-6 pt-2 pb-2 bg-graypage">
                      <nav className="inline-flex rounded-md shadow">
                        <button
                          onClick={() => handlePageChange(0)}
                          disabled={currentPage === 0}
                          className="px-3 py-1 rounded-l-md border border-gray-300 bg-white hover:bg-gray-50"
                        >
                          {"<<"}
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                          <button
                            key={index}
                            onClick={() => handlePageChange(index)}
                            className={`px-3 py-1 ${
                              currentPage === index
                                ? "bg-mainblue text-white font-bold"
                                : "bg-white hover:bg-gray-50"
                            } border-t border-b border-gray-300`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => handlePageChange(totalPages - 1)}
                          disabled={currentPage === totalPages - 1}
                          className="px-3 py-1 rounded-r-md border border-gray-300 bg-white hover:bg-gray-50"
                        >
                          {">>"}
                        </button>
                      </nav>
                    </div>
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

export default Orders;
