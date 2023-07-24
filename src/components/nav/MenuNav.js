import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.jpg";

export class MenuNav extends Component {
  render() {
    return (
      <header className="z-50 bg-white flex justify-between items-center py-4 px-4 text-myblacki shadow-md fixed w-full inset-x-0">
        <Link to="/">
          <div className="w-6">
            <img
              className="absolute top-0 w-[70px]"
              alt="logo de la empresa"
              src={logo}
            />
          </div>
        </Link>
        <div>
          <Link
            to="/purchase-orders"
            className="px-4 py-4 rounded-sm text-sm hover:border-b-4 hover:border-summer"
          >
            Ordenes de Compra
          </Link>
          <Link
            to="/tee-designer-admin"
            className="px-4 py-4 rounded-sm text-sm hover:border-b-4 hover:border-summer"
          >
            Administrar Camisetas
          </Link>
          <Link
            to="/products"
            className="px-4 py-4 rounded-sm text-sm hover:border-b-4 hover:border-summer"
          >
            Administrar Otros Productos
          </Link>
        </div>
      </header>
    );
  }
}

export default MenuNav;
