import { useSelector, useDispatch } from "react-redux";
import MenuNav from "../../components/nav/MenuNav";
import { Link } from "react-router-dom";
import {
  deleteColor,
  fetchColors,
} from "../../features/colorSlice";
import {
  deleteDesign,
  fetchDesigns,
} from "../../features/localDesignSlice";
import { useEffect } from "react";

function TeeDesignerAdmin() {
  const colors = useSelector((state) => state.colors.colors);
  const status = useSelector((state) => state.colors.status);
  const error = useSelector((state) => state.colors.error);

  const designs = useSelector((state) => state.designs.designs);
  const statusDesign = useSelector((state) => state.designs.status);
  const errorDesign = useSelector((state) => state.designs.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchColors());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDesigns());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteColor(id));
  };

  const handleDeleteDesign = (id) => {
    dispatch(deleteDesign(id));
  };

  return (
    <div className="h-full bg-graypage">
      <MenuNav />
      <div className="flex items-center justify-center h-full">
        <div className="flex justify-center flex-col content-center">
          <h1 className="mb-6 text-darkiblue font-bold">
            Administrar Camisetas
          </h1>

          <div className="flex justify-between gap-8">
            <div className="pt-8 mb-6">
              <div className="flex justify-between mb-2">
                <h2 className="text-darkiblue font-bold mb-2 text-center">
                  Colores disponibles:
                </h2>
                <Link
                  to={"/create-color"}
                  className="w-40 flex gap-2 justify-center items-center bg-mainblue text-white font-bold px-2 py-1 text-xs rounded-md"
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
                          {colors.map((color) => (
                            <tr key={color.id} className="border-b bg-white border-grayline">
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {color.id}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {color.name}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {color.code}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div style={{ backgroundColor: color.code, padding: "4px", border: "solid 1px", borderRadius: "4px"}}>
                                </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="mt-2 flex gap-x-2 justify-center">
                                  <Link
                                    className="bg-transparent text-babygray font-bold border-2 border-babygray px-2 py-1 text-xs rounded-md"
                                    to={`/edit-color/${color.id}`}
                                  >
                                    Editar
                                  </Link>
                                  <button
                                    className="bg-summer text-darkiblue font-bold px-2 py-1 text-xs rounded-md"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 mb-6">
              <div className="flex justify-between mb-2">
                <h2 className="text-darkiblue font-bold mb-2 text-center">
                  Diseños disponibles:
                </h2>
                <Link
                  to={"/create-design"}
                  className="w-40 flex gap-2 justify-center items-center bg-mainblue text-white font-bold px-2 py-1 text-xs rounded-md"
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
                          {designs.map((design, index) => (
                            <tr key={index} className="border-b bg-white border-grayline">
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                {design.id}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                {design.name}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                              <div key={index} className="px-4 w-[150px] h-auto">
                                <img
                                  src={design.image}
                                  alt={`Diseño ${index}`}
                                  className="w-[100%] h-[100%] object-cover rounded-lg shadow-md"
                                />
                              </div>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="mt-2 flex gap-x-2 justify-center">
                                  <Link
                                    className="bg-transparent text-babygray font-bold border-2 border-babygray px-2 py-1 text-xs rounded-md"
                                    to={`/edit-design/${design.id}`}
                                  >
                                    Editar
                                  </Link>
                                  <button
                                    className="bg-summer text-darkiblue font-bold px-2 py-1 text-xs rounded-md"
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
                      </div>
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
}

export default TeeDesignerAdmin;
