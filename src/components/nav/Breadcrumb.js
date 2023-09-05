import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="text-sm font-medium">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && <span className="mx-2">/</span>}
            {index === items.length - 1 ? (
              <span className="text-gray-600">{item.label}</span>
            ) : (
              <Link to={item.url} className="text-blue-500 hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
