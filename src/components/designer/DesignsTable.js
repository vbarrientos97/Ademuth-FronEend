import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteDesign, fetchDesigns } from "../../features/localDesignSlice";
import config from "../../api/config";
import Modal from "react-modal"; // Importa Modal aquí

const ITEMS_PER_PAGE = 2;

function DesignsTable() {
  const designs = useSelector((state) => state.designs.designs);
  const statusDesign = useSelector((state) => state.designs.status);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Nuevo estado para el modal
  const [designToDeleteId, setDesignToDeleteId] = useState(null); // Nuevo estado para almacenar el ID del diseño a eliminar
  const dispatch = useDispatch();

  useEffect(() => {
    if (statusDesign === "idle") {
      dispatch(fetchDesigns());
    }
  }, [statusDesign, dispatch]);

  const handleDeleteDesign = (id) => {
    setDesignToDeleteId(id); // Almacena el ID del diseño a eliminar
    setIsModalOpen(true); // Abre el modal de confirmación
  };

  const handleConfirmDelete = async () => {
    if (designToDeleteId) {
      await dispatch(deleteDesign(designToDeleteId));
      setIsModalOpen(false); // Cierra el modal después de la eliminación
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedDesigns = designs.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(designs.length / ITEMS_PER_PAGE);

  return (
    <div className="pt-8 mb-6">
      <div className="flex justify-between mb-2">
        <h2 className="text-darkiblue font-bold mb-2 text-center">
          Diseños disponibles:
        </h2>
        <Link
          to={"/create-design"}
          className="w-40 flex gap-2 justify-center items-center bg-mainblue hover:bg-blue-700 text-white font-bold px-2 py-1 text-xs rounded-md"
        >
          + Agregar Diseño
        </Link>
      </div>
      <div>
        <div className="flex flex-col">
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
                        Nombre del Diseño
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Imagen
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDesigns.map((design, index) => (
                      <tr
                        key={index}
                        className="border-b bg-white border-grayline"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {design.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div key={index} className="px-4 w-[150px] h-auto">
                            <img
                              src={config.backendBaseUrl + design.image}
                              alt={`Diseño ${index}`}
                              className="w-[100%] h-[100%] object-cover rounded-lg shadow-md"
                            />
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="mt-2 flex gap-x-2 justify-center">
                            <Link
                              className="bg-transparent text-babygray font-bold border-2 border-babygray hover:bg-babygray hover:text-white transition px-2 py-1 text-xs rounded-md"
                              to={`/edit-design/${design.id}`}
                            >
                              Editar
                            </Link>
                            <button
                              className="bg-summer text-darkiblue font-bold hover:bg-summerhovered transition px-2 py-1 text-xs rounded-md"
                              onClick={() => handleDeleteDesign(design.id)}
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmation Modal"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0"
      >
        <div className="bg-black opacity-90 absolute inset-0"></div>
        <div className="bg-white p-6 rounded-md shadow-md text-center relative">
          <p className="mb-4">
            ¿Estás seguro de que deseas eliminar este diseño?
          </p>
          <button
            className="bg-mainblue hover:bg-blue-700 text-white px-3 py-1 rounded-md mt-3 mr-2"
            onClick={handleConfirmDelete}
          >
            Eliminar
          </button>
          <button
            className="bg-summer text-darkiblue hover:bg-summerhovered transition px-3 py-1 rounded-md mt-3"
            onClick={() => setIsModalOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default DesignsTable;
