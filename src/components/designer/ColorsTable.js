import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteColor, fetchColors } from "../../features/colorSlice";

const ITEMS_PER_PAGE = 4;

function ColorsTable() {
  const colorsData = useSelector((state) => state.colors.colors);
  const status = useSelector((state) => state.colors.status);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchColors());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "succeeded") {
      setCurrentPage(0);
    }
  }, [status]);

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este color?")) {
      dispatch(deleteColor(id));
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedColors = colorsData.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(colorsData.length / ITEMS_PER_PAGE);

  return (
    <div className="pt-8 mb-6">
      <div className="flex justify-between mb-2">
        <h2 className="text-darkiblue font-bold mb-2 text-center">
          Colores disponibles:
        </h2>
        <Link
          to={"/create-color"}
          className="w-40 flex gap-2 justify-center items-center bg-mainblue hover:bg-blue-700 text-white font-bold px-2 py-1 text-xs rounded-md"
        >
          + Agregar Color
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
                        Nombre de Color
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Código de Color
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Vista de Color
                      </th>
                      <th scope="col" className="px-6 py-4">
                        Acción
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedColors.map((color, index) => (
                      <tr
                        key={index}
                        className="border-b bg-white border-grayline"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {color.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {color.code}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div
                            style={{
                              backgroundColor: color.code,
                              padding: "4px",
                              border: "solid 1px",
                              borderRadius: "4px",
                            }}
                          ></div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="mt-2 flex gap-x-2 justify-center">
                            <Link
                              className="bg-transparent text-babygray font-bold border-2 border-babygray hover:bg-babygray hover:text-white transition px-2 py-1 text-xs rounded-md"
                              to={`/edit-color/${color.id}`}
                            >
                              Editar
                            </Link>
                            <button
                              className="bg-summer text-darkiblue font-bold hover:bg-summerhovered transition px-2 py-1 text-xs rounded-md"
                              onClick={() => handleDelete(color.id)}
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
    </div>
  );
}

export default ColorsTable;
