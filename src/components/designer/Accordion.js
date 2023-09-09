import React, { useState } from "react";
import ColorsTable from "./ColorsTable";
import DesignsTable from "./DesignsTable";
import TshirtPrice from "./TshirtPrice";

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSection = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const sections = [
    {
      title: "Precio para las camisetas sublimadas",
      content: <TshirtPrice />,
    },
    {
      title: "Administrar los colores de telas para las camisetas",
      content: <ColorsTable />,
    },
    {
      title: "Administrar los diseños para sublimar en las camisetas",
      content: <DesignsTable />,
    },
  ];

  return (
    <div className="w-full mx-auto">
      {sections.map((section, index) => (
        <div key={index} className="mb-2">
          <button
            className="w-full text-left p-2 bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={() => toggleSection(index)}
          >
            {section.title}
          </button>
          {activeIndex === index && (
            <div className="p-2 bg-white border border-gray-300">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
