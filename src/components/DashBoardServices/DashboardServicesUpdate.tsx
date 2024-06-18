import { DashboardMenu } from "@/components/DashboardMenu"
import { DashboardHeader } from "@/components/DashboardHeader";
import { useState } from "react";

import DashboardServicesNew from "./DashboardServicesNew";
import { useParams } from "react-router-dom";

export default function DashboardServicesUpdate() {

  const [selectedItemMenu, setSelectedItemMenu] = useState(2)
  const { codigo } = useParams()

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardMenu selectedItemMenu={selectedItemMenu} setSelectedItemMenu={setSelectedItemMenu} />
      <div className="flex flex-col">
        <DashboardHeader />
        <DashboardServicesNew code={codigo} />
      </div>
    </div>
  )
}

