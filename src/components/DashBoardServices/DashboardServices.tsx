import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs";

import {
  PlusCircle,
} from "lucide-react"
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { DataTable } from "./DataTable";
import { Service, useColumns } from "./columns";
import { useEffect, useState } from "react";
import { getServices } from "@/api/services";
import DashboardServicesNew from "./DashboardServicesNew";


export const DashboardServices = () => {
  const [subpage, setSubpage] = useState(0)

  return (
    <>
      {subpage === 0 && <ServiceTable setSubpage={setSubpage} />}
      {subpage === 1 && <DashboardServicesNew setSubpage={setSubpage} />}
    </>
  )

}
const ServiceTable = ({ setSubpage }: { setSubpage: React.Dispatch<React.SetStateAction<number>> }) => {
  const [services, setServices] = useState<Service[]>([])

  const { columns } = useColumns()

  type ResponseService = {
    id: string | number
    codigo: string
    nombre: string,
    estado: "ACTIVO" | "INACTIVO",
    tipo: "CATERING" | "DECORACION" | "ENTRETENIMIENTO" | "FOTOGRAFIA" | "MUSICA" | "ILUMINACION" | "SEGURIDAD" | "TRANSPORTE" | "OTROS",
    costo: number | string,
    descripcion?: string,
    imagenes?: { url: string }[],
    proveedor?: { nombre: string }
  }

  const mapData = (data: ResponseService[]) => {
    return data.map((service: ResponseService) => {
      return {
        id: service.id,
        code: service.codigo,
        name: service.nombre,
        state: service.estado,
        type: service.tipo,
        cost: service.costo,
        description: service.descripcion,
        image: service.imagenes?.[0]?.url ?? "",
        provider: service.proveedor?.nombre
      }
    })
  }

  const fetchServices = async () => {
    const services = await getServices();
    console.log(services.data)
    setServices(mapData(services.data))
  }

  useEffect(() => {
    fetchServices()
  }, [])

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 md:py-6">
      <Tabs defaultValue="all">

        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <section className="flex px-6 pt-6">
              <div>
                <CardTitle>Servicios</CardTitle>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button
                  onClick={() => setSubpage(1)}
                  size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Añadir servicio
                  </span>
                </Button>
              </div>
            </section>
            <CardContent>
              <DataTable<Service, unknown> columns={columns} data={services} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}


