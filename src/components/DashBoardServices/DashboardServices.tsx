import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs";

import {

  PlusCircle,
} from "lucide-react"
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { DataTable } from "./DataTable";
import { Service, columns } from "./columns";
import { services } from "@/mocks/services";


export const DashboardServices = () => (

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
