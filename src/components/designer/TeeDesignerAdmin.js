import React, { useState } from "react";
import MenuNav from "../../components/nav/MenuNav";
import ColorsTable from "./ColorsTable";
import DesignsTable from "./DesignsTable";
import TshirtPrice from "./TshirtPrice";

function TeeDesignerAdmin() {
  return (
    <div className="h-full bg-graypage">
      <MenuNav />
      <div className="flex items-center justify-center pt-40 bg-graypage">
        <div className="flex justify-center flex-col content-center">
          <h1 className="mb-6 text-darkiblue font-bold">
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
  );
}

export default TeeDesignerAdmin;
