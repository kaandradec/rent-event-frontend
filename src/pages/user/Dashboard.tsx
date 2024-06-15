import { Button } from "@/components/ui/button"
import { DashboardMenu } from "@/components/DashboardMenu"
import { DashboardHeader } from "@/components/DashboardHeader";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Image } from "@nextui-org/react";
import { Badge } from "@/components/ui/badge";
import { DashboardServices } from "@/components/DashboardServices";

export default function Dashboard() {

  const [selectedItemMenu, setSelectedItemMenu] = useState(0)

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardMenu selectedItemMenu={selectedItemMenu} setSelectedItemMenu={setSelectedItemMenu} />
      <div className="flex flex-col">
        <DashboardHeader />
        {
          selectedItemMenu === 0 && <DashboardDashboard />
        }
        {
          selectedItemMenu === 1 && <DashboardOrders />
        }
        {
          selectedItemMenu === 2 && <DashboardServices />
        }
        {
          selectedItemMenu === 3 && <DashboardClients />
        }
        {
          selectedItemMenu === 4 && <DashboardIncidents />
        }
        {
          selectedItemMenu === 5 && <DashboardAnalytics />
        }
      </div>
    </div>
  )
}

// TODO: Crear ficheros para cada componente listado en el Dashboard ⬇️
const DashboardDashboard = () => (<>
  <h1>Panel General</h1>
  <p>Aqui se muestra el panel general de la aplicación</p>
</>)

const DashboardOrders = () => (<>
  <h1>Gestion de ordenes</h1>
  <p>Aqui se gestionan las ordenes de generación del evento del cliente</p>
</>)



const DashboardClients = () => (<>
  <h1>Gestion de Clientes</h1>
  <p>Aqui se gestionan los clientes que contratan los eventos</p>
</>)


const DashboardIncidents = () => (<>
  <h1>Gestion de Incidencias</h1>
  <p>Aqui se gestionan las incidencias que se presentan en los eventos</p>
</>)

const DashboardAnalytics = () => (<>
  <h1>Analíticas</h1>
  <p>Aqui se muestran las analíticas de los eventos</p>
</>)






