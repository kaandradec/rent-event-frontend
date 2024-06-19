import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
} from "@nextui-org/react";
import {RentEventLogo} from "../components/icons/RentEventLogo";
import SwitchTheme from "./ui/SwitchTheme";
import {Link, useNavigate} from "react-router-dom";

export default function HeaderPreLogin() {
    const navigate = useNavigate();
    const navigateLogin=()=>{
        navigate("/auth/login")
    }
    const navigateRegister=()=>{
        navigate("/auth/register")
    }

    return (
        <Navbar className="fixed">
            <NavbarBrand className="cursor-pointer">
                <Link to="/user/dashboard" className="flex">
                    <RentEventLogo/>
                    <p className="font-bold text-inherit">Rent-Event</p>
                </Link>
            </NavbarBrand>

            <NavbarContent as="div" justify="end">
                <SwitchTheme/>
                <Button
                    color="primary"
                    onClick={navigateLogin}
                >
                    Entrar
                </Button>
                <Button
                    color="success"
                    onClick={navigateRegister}
                >
                    Registrate
                </Button>
            </NavbarContent>
        </Navbar>
    );
}
