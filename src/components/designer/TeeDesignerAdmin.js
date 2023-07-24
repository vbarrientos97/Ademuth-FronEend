import React from "react";
import MenuNav from "../../components/nav/MenuNav";
import { Link } from "react-router-dom";

function TeeDesignerAdmin() {
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
                  to={"/create-product"}
                  className="w-40 flex gap-2 justify-center items-center bg-mainblue text-white font-bold px-2 py-1 text-xs rounded-md"
                >
                  + Agregar Producto
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
                                Codigo de Color
                              </th>
                              <th scope="col" className="px-6 py-4">
                                Vista
                              </th>
                              <th scope="col" className="px-6 py-4">
                                Acción
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b bg-white border-grayline">
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                1
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                Mark
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                Otto
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="mt-2 flex gap-x-2 justify-center">
                                  <Link
                                    className="bg-transparent text-babygray font-bold border-2 border-babygray px-2 py-1 text-xs rounded-md"
                                    to={"/"}
                                  >
                                    Editar
                                  </Link>
                                  <button
                                    className="bg-summer text-darkiblue font-bold px-2 py-1 text-xs rounded-md"
                                    onClick={"/"}
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr className="border-b text-darkiblue bg-white border-grayline">
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                2
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                Jacob
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                Thornton
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="mt-2 flex gap-x-2 justify-center">
                                  <Link
                                    className="bg-transparent text-babygray font-bold border-2 border-babygray px-2 py-1 text-xs rounded-md"
                                    to={"/"}
                                  >
                                    Editar
                                  </Link>
                                  <button
                                    className="bg-summer text-darkiblue font-bold px-2 py-1 text-xs rounded-md"
                                    onClick={"/"}
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr className="border-b bg-white border-grayline">
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                3
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                Mark
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                Otto
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="mt-2 flex gap-x-2 justify-center">
                                  <Link
                                    className="bg-transparent text-babygray font-bold border-2 border-babygray px-2 py-1 text-xs rounded-md"
                                    to={"/"}
                                  >
                                    Editar
                                  </Link>
                                  <button
                                    className="bg-summer text-darkiblue font-bold px-2 py-1 text-xs rounded-md"
                                    onClick={"/"}
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 mb-6">
              <div className="flex justify-between mb-2">
                <h2 className="text-darkiblue font-bold mb-2 text-center">
                  Diseños propios disponibles:
                </h2>
                <Link
                  to={"/create-product"}
                  className="w-40 flex gap-2 justify-center items-center bg-mainblue text-white font-bold px-2 py-1 text-xs rounded-md"
                >
                  + Agregar Producto
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
                                Codigo de Color
                              </th>
                              <th scope="col" className="px-6 py-4">
                                Vista
                              </th>
                              <th scope="col" className="px-6 py-4">
                                Acción
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b bg-white border-grayline">
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                1
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                Mark
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                Otto
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="mt-2 flex gap-x-2 justify-center">
                                  <Link
                                    className="bg-transparent text-babygray font-bold border-2 border-babygray px-2 py-1 text-xs rounded-md"
                                    to={"/"}
                                  >
                                    Editar
                                  </Link>
                                  <button
                                    className="bg-summer text-darkiblue font-bold px-2 py-1 text-xs rounded-md"
                                    onClick={"/"}
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr className="border-b text-darkiblue bg-white border-grayline">
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                2
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                Jacob
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                Thornton
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="mt-2 flex gap-x-2 justify-center">
                                  <Link
                                    className="bg-transparent text-babygray font-bold border-2 border-babygray px-2 py-1 text-xs rounded-md"
                                    to={"/"}
                                  >
                                    Editar
                                  </Link>
                                  <button
                                    className="bg-summer text-darkiblue font-bold px-2 py-1 text-xs rounded-md"
                                    onClick={"/"}
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </td>
                            </tr>
                            <tr className="border-b bg-white border-grayline">
                              <td className="whitespace-nowrap px-6 py-4 font-medium">
                                3
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                Mark
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                Otto
                              </td>
                              <td className="whitespace-nowrap px-6 py-4">
                                <div className="mt-2 flex gap-x-2 justify-center">
                                  <Link
                                    className="bg-transparent text-babygray font-bold border-2 border-babygray px-2 py-1 text-xs rounded-md"
                                    to={"/"}
                                  >
                                    Editar
                                  </Link>
                                  <button
                                    className="bg-summer text-darkiblue font-bold px-2 py-1 text-xs rounded-md"
                                    onClick={"/"}
                                  >
                                    Eliminar
                                  </button>
                                </div>
                              </td>
                            </tr>
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
