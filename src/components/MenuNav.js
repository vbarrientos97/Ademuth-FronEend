import React, { Component } from "react";
import { Link } from "react-router-dom";

export class MenuNav extends Component {
  render() {
    return (
      <header className="flex justify-between items-center py-4 px-4 text-myblacki shadow-md fixed w-full inset-x-0">
        <div className="logo-ademuth">
          <span>logo</span>
        </div>
        <div>
          <Link
            to="/create-product"
            className="bg-indigo-600 px-4 py-4 rounded-sm text-sm hover:border-b-4 hover:border-summer"
          >
            Agregar un producto a la lista
          </Link>
          <Link
            to="/tee-designer"
            className="bg-indigo-600 px-4 py-4 rounded-sm text-sm hover:border-b-4 hover:border-summer"
          >
            Personalizar camiseta
          </Link>
        </div>
      </header>
    );
  }
}

export default MenuNav;
