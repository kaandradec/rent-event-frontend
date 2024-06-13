import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { RentEventLogo } from "../components/icons/RentEventLogo";
import SwitchTheme from "./ui/SwitchTheme";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

export default function Header() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setRole = useAuthStore((state) => state.setRole);
  const logout = () => {
    navigate("/auth/login");
    setToken(null);
    setRole(null);
  };
  const myConfig = () => {
    navigate("/api/me");
    setToken(null);
    setRole(null);
  };
  return (
    <Navbar className="fixed">
      <NavbarBrand className="cursor-pointer">
        <Link to="/user/dashboard" className="flex">
          <RentEventLogo />
          <p className="font-bold text-inherit">Rent-Event</p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="primary" to="#">
            Eventos
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="primary" href="#">
            Pagos
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <SwitchTheme />

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Jason Hughes"
              size="sm"
              src="lunacat.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings" color ="success" onClick={myConfig}>My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={logout}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
