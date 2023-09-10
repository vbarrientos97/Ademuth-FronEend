import MenuNav from "../../components/nav/MenuNav";
import Breadcrumb from "../nav/Breadcrumb";
import Accordion from "./Accordion";

function TeeDesignerAdmin() {
  const breadcrumbItems = [
    { label: "Inicio", url: "/purchase-orders" },
    { label: "Página Actual", url: "/products" },
  ];

  return (
    <div className="h-full">
      <div className="md:w-[80%] lg:w-[70%] mx-auto">
        <MenuNav />
        <div className="pt-28 pb-20">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="mb-6 text-darkiblue font-bold pt-10">
            Administrar Camisetas
          </h1>
          <Accordion />
        </div>
      </div>
    </div>
  );
}

export default TeeDesignerAdmin;
