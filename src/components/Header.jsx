import {
  Badge,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { RentEventLogo } from "../components/icons/RentEventLogo";
import SwitchTheme from "./ui/SwitchTheme";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AccountMenu from "@/components/AccountMenu.tsx";
import { useAuthStore } from "@/store/auth";
import { ShoppingCartIcon } from "lucide-react";
import { useStore } from "@/store/store";

export default function Header() {
  const rol = useAuthStore.getState().rol;
  const navigate = useNavigate();
  const location = useLocation();

  // Cart Icon Style
  const linkStyle = {
    div: "flex items-center space-x-1 py-1 pr-3 pl-1.5 text-gray-600 cursor-pointer\
    rounded-lg hover:border hover:text-cPrimary/90 hover:shadow-lg",
    activeLink: "border text-cPrimary/90 shadow-lg",
  };

  const cartQuantity = useStore((state) => state.cartQuantity);

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
        {/* Cart */}
        <Link
          to="cart"
          className={`${
            "/cart" === location.pathname && linkStyle.activeLink
          } ${linkStyle.div} relative`}
        >
          <Badge
            color="danger"
            content={cartQuantity}
            isInvisible={cartQuantity === 0}
            shape="circle"
          >
            <ShoppingCartIcon />
          </Badge>
        </Link>
        <SwitchTheme />
        {rol ? (
          <AccountMenu />
        ) : (
          <>
            <Button
              color="primary"
              onClick={() => navigate("/auth/login")}
              className={"font-bold"}
            >
              Entrar
            </Button>
            <Button
              className={"font-bold text-primary"}
              color="success"
              onClick={() => navigate("/auth/register")}
            >
              Registrate
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
