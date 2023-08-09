function CustomerOrder(selectedData) {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Orden de Compra</h2>
      <p>Diseño de camiseta: {selectedData.localDesign}</p>
      <p>Color: {selectedData.color}</p>
      <p>Talla: {selectedData.size}</p>
      {selectedData.customDesign && (
        <p>Diseño personalizado: {selectedData.customDesign}</p>
      )}
      <p>Cantidad: {selectedData.amount}</p>
      <p>Nombre del cliente: {selectedData.customerName}</p>
      <p>Apellido del cliente: {selectedData.customerLastname}</p>
      <p>Comentarios: {selectedData.comments}</p>
    </div>
  );
}

export default CustomerOrder;
