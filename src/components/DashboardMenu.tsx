import {Link} from "@nextui-org/react";
import {RentEventLogo} from "./icons/RentEventLogo";
import {Package, ShoppingCart,} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import React from "react";

type DashboardMenuProps = {
  selectedItemMenu: number,
  setSelectedItemMenu: React.Dispatch<React.SetStateAction<number>>
}

export const DashboardMenu = ({ selectedItemMenu, setSelectedItemMenu }: DashboardMenuProps) => {

  const menuItemsStyles = {
    selected: "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary",
    default: "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
  }

  const isItemSelected = (index: number) => {
    if (selectedItemMenu === index)
      return menuItemsStyles.selected
    return menuItemsStyles.default
  }

  return (
    < div className="hidden border-r bg-muted/40 md:block" >
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link className="flex items-center gap-2 font-semibold">
            <RentEventLogo />
            <p className="font-bold text-inherit">Rent Event - Dashboard</p>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {/*<Link*/}
            {/*  href="#"*/}
            {/*  className={`${isItemSelected(0)}`}*/}
            {/*  onClick={() => setSelectedItemMenu(0)}*/}
            {/*>*/}
            {/*  <Home className="h-4 w-4" />*/}
            {/*  Dashboard*/}
            {/*</Link>*/}
            <Link
              href="#"
              className={`${isItemSelected(1)}`}
              onClick={() => setSelectedItemMenu(1)}
            >
              <ShoppingCart className="h-4 w-4" />
              Ordenes
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              href="#"
              className={`${isItemSelected(2)}`}
              onClick={() => setSelectedItemMenu(2)}
            >
              <Package className="h-4 w-4" />
              Servicios{" "}
            </Link>
            {/*<Link*/}
            {/*  href="#"*/}
            {/*  className={`${isItemSelected(3)}`}*/}
            {/*  onClick={() => setSelectedItemMenu(3)}*/}
            {/*>*/}
            {/*  <Users className="h-4 w-4" />*/}
            {/*  Clientes*/}
            {/*</Link>*/}
            {/*<Link*/}
            {/*  href="#"*/}
            {/*  className={`${isItemSelected(4)}`}*/}
            {/*  onClick={() => setSelectedItemMenu(4)}*/}
            {/*>*/}
            {/*  <Users className="h-4 w-4" />*/}
            {/*  Incidentes*/}
            {/*</Link>*/}
            {/*<Link*/}
            {/*  href="#"*/}
            {/*  className={`${isItemSelected(5)}`}*/}
            {/*  onClick={() => setSelectedItemMenu(5)}*/}
            {/*>*/}
            {/*  <LineChart className="h-4 w-4" />*/}
            {/*  Analíticas*/}
            {/*</Link>*/}
          </nav>
        </div>
      </div>
    </div >
  )
}