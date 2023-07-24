import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Importa los íconos de Tailwind CSS
import logo from "../../images/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-darkiblue py-6 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center space-x-4 mb-4">
            <a
              href="https://www.facebook.com/CreacionesAdemuth"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-6 h-6" />{" "}
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6" />{" "}
            </a>
          </div>
          <div className="text-center mb-4">
            <p>Teléfono: +1 123 456 789</p>
            <p>Email: info@example.com</p>
          </div>
          <div className="flex justify-center">
            <img src={logo} alt="Logo" className="w-12 h-12" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
