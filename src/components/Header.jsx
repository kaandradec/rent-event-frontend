import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { RentEventLogo } from "../components/icons/RentEventLogo";
import SwitchTheme from "./ui/SwitchTheme";
import { Link } from "react-router-dom";

import AccountMenu from "@/components/AccountMenu.tsx";

export default function Header() {
  return (
    <Navbar className="fixed">
      <NavbarBrand className="cursor-pointer">
        <Link to="/landing" className="flex">
          <RentEventLogo />
          <p className="font-bold text-inherit">Rent-Event</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="primary" to="/about" className="hover:font-semibold">
            ACERCA DE
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="primary" to="#" className="hover:font-semibold">
            MIS EVENTOS
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <SwitchTheme />
        <AccountMenu />
      </NavbarContent>
    </Navbar>
  );
}
