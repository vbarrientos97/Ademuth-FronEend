import MenuNav from "../../components/nav/MenuNav";
import ColorsTable from "./ColorsTable";
import DesignsTable from "./DesignsTable";
import TshirtPrice from "./TshirtPrice";
import Breadcrumb from "../nav/Breadcrumb";

function TeeDesignerAdmin() {
  const breadcrumbItems = [
    { label: "Inicio", url: "/purchase-orders" },
    { label: "Página Actual", url: "/products" },
  ];

  return (
    <div className="h-full bg-graypage">
      <MenuNav />
      <div className="flex items-center justify-center bg-graypage">
        <div className="flex justify-center flex-col content-center">
          <div className="pt-20">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="mb-6 text-darkiblue font-bold pt-10">
              Administrar Camisetas
            </h1>
            <TshirtPrice />
            <div className="flex justify-between gap-8">
              <ColorsTable />
              <DesignsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeeDesignerAdmin;
