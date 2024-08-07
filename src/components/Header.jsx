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

  const pathName = location.pathname;

  // Cart Icon Style
  const linkStyle = {
    div: "flex items-center space-x-1 py-1 pr-3 pl-1.5 text-gray-600 cursor-pointer\
    rounded-lg hover:border hover:text-cPrimary/90 hover:shadow-lg",
    activeLink: "border text-cPrimary/90 shadow-lg",
  };

  const cartQuantity = useStore((state) => state.cartQuantity);

  if (pathName.startsWith("/user/dashboard")) {
    return null; // No renderiza nada si el path comienza con /dashboard
  }

  const styles = {
    navbarItem: "text-white hover:text-blue-400",
  };
  return (
    <Navbar className="fixed">
      <NavbarBrand className="cursor-pointer">
        <Link to="/landing" className="flex">
          <RentEventLogo
            className={`${
              (pathName.includes("/landing", "orders") || pathName === "/") &&
              styles.navbarItem
            } `}
          />
          <p
            className={`${
              (pathName.includes("/landing", "orders") || pathName === "/") &&
              styles.navbarItem
            } font-bold text-inherit`}
          >
            Rent-Event
          </p>
        </Link>
      </NavbarBrand>

      <NavbarBrand className="cursor-pointer gap-4">
        {rol ? (
          <NavbarItem className="container flex">
            <Link
              color="primary"
              to="/eventos"
              className={`${
                (pathName.includes("/landing", "orders") || pathName === "/") &&
                styles.navbarItem
              } `}
            >
              MIS EVENTOS
            </Link>
          </NavbarItem>
        ) : (
          ""
        )}
        <NavbarItem className="container flex">
          <Link
            color="primary"
            to="/about"
            className={`${
              (pathName.includes("/landing", "orders") || pathName === "/") &&
              styles.navbarItem
            } `}
          >
            ACERCA DE
          </Link>
        </NavbarItem>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        {/* Cart */}

        <Link
          to="cart"
          className={`${"/cart" === pathName && linkStyle.activeLink} ${
            linkStyle.div
          } relative`}
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
