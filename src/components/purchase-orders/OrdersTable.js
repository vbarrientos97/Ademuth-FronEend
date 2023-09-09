import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderDetailsModal from "./OrderDetailsModal";
import { deleteOrder } from "../../features/orderSlice";

const OrderTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };

  const openModal = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="container mx-auto border-b border-solid">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-darkiblue text-white font-medium">
          <tr>
            <th className="px-6 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider">
              Productos
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider">
              Precio Total
            </th>
            <th className="px-6 py-3 text-left text-xs leading-4 font-medium uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-6 py-4 whitespace-no-wrap">
                {order.customerName} {order.customerLastname}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                <ul>
                  {order.products.map((product) => (
                    <li key={product.id}>
                      {product.name || "Camiseta Sublimada"} - {product.size}, ₡
                      {product.price}, Cantidad: {product.amount}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap">
                ₡{order.totalPrice}
              </td>
              <td className="px-6 py-4 whitespace-no-wraps text-right">
                <button
                  onClick={() => openModal(order)}
                  className="bg-transparent text-babygray font-bold border-2 border-babygray hover:bg-babygray hover:text-white transition px-2 py-1 text-xs rounded-md mr-2"
                >
                  Ver Detalles
                </button>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="bg-summer text-darkiblue font-bold hover:bg-summerhovered transition px-2 py-1 text-xs rounded-md"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOrder && (
        <OrderDetailsModal
          isOpen={!!selectedOrder}
          onClose={closeModal}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default OrderTable;
