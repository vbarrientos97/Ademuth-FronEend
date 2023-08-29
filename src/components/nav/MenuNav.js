import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/authSlice";
import { Link } from "react-router-dom";
import logo from "../../images/logo.jpg";

function MenuNav() {
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="z-50 bg-white flex justify-between items-center py-4 px-4 text-myblacki shadow-md fixed w-full inset-x-0">
      <Link to={isAdmin ? "/purchase-orders" : "/dashboard"}>
        <div className="w-6">
          <img
            className="absolute top-0 w-[70px]"
            alt="logo de la empresa"
            src={logo}
          />
        </div>
      </Link>
      <div>
        {isAdmin ? (
          <>
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
          </>
        ) : (
          <>
            <Link
              to="/customer-order"
              className="px-4 py-4 rounded-sm text-sm hover:border-b-4 hover:border-summer"
            >
              Carrito de Compras
            </Link>
          </>
        )}
        <Link
          to="/"
          onClick={handleLogout}
          className="px-4 py-4 rounded-sm text-sm hover:border-b-4 hover:border-summer"
        >
          Cerrar Sesión
        </Link>
      </div>
    </header>
  );
}

export default MenuNav;
