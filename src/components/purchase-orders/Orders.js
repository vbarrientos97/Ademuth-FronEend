import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuNav from "../../components/nav/MenuNav";
import { fetchOrders } from "../../features/orderSlice";
import OrdersTable from "./OrdersTable";

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  return (
    <div className="bg-graypage h-full">
      <MenuNav />
      <div className="md:w-[80%] lg:w-[70%] mx-auto pt-36 pb-16">
        <div>
          <div className="flex flex-col">
            <h1 className="mb-6 text-darkiblue font-bold">Órdenes de Compra</h1>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <OrdersTable />
                  <div className="flex justify-end px-6 pt-2 pb-2 bg-white">
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
  );
};

export default Orders;
