import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Image } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"

export type Service = {
  id: string | number
  code: string
  name: string,
  type: "CATERING" | "DECORACION" | "ENTRETENIMIENTO" | "FOTOGRAFIA" | "MUSICA" | "ILUMINACION" | "SEGURIDAD" | "TRANSPORTE" | "OTROS",
  cost: number | string,
  description?: string,
  image?: string,
  provider?: string
  state: "ACTIVO" | "INACTIVO"
}

export function useColumns() {
  const navigate = useNavigate()

  const columns: ColumnDef<Service>[] = [
    {
      accessorKey: "image",
      header: "",
      cell: ({ row }) => {
        const image = row.getValue("image")
        return <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover min-w-10 min-h-10"
          height="64"
          src={image ? String(image) : "https://ui.shadcn.com/placeholder.svg"}
          width="64"
        />
      },
    },
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "state",
      header: "Estado",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "cost",
      header: ({ column }) => <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Costo
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("cost"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount)

        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "provider",
      header: "Proveedor",
    },
    {
      accessorKey: "description",
      header: "Descripción",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const servicio = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(servicio.code)}
              >
                Copias código
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigate(`/user/dashboard/services/update/${servicio.code}`)}
              >
                Actualizar
              </DropdownMenuItem>
              <DropdownMenuItem>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu >
        )
      },
    },
  ]

  return { columns }
}



