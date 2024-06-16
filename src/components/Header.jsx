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
import {RentEventLogo} from "../components/icons/RentEventLogo";
import SwitchTheme from "./ui/SwitchTheme";
import {Link, useNavigate} from "react-router-dom";
import {useAuthStore} from "@/store/auth";
import {useEffect, useState} from "react";
import {obtenerCliente} from "@/api/client.ts";


export default function Header() {
    const navigate = useNavigate();
    const setToken = useAuthStore((state) => state.setToken);
    const setRole = useAuthStore((state) => state.setRol);
    const [errMsg, setErrMsg] = useState("");
    const logout = () => {
        setToken(null);
        setRole(null);
        navigate("/auth/login");
    };
    const myConfig = () => {
        setToken(null);
        setRole(null);
        navigate("/account/config");
    };

    const {correo: correo} = useAuthStore();
    const [email, setEmail] = useState("");
    const fetchClient = async () => {
        try {
            const data = await obtenerCliente(correo || "");
            setEmail(data.correo);
        } catch (err) {
            const error = err;
            if (!error?.response) {
                setErrMsg("El servidor no responde");
            } else if (
                error.response?.status === 409 ||
                error.response?.data === "Bad credentials"
            ) {
                setErrMsg("Credenciales incorrectas");
            } else {
                setErrMsg("Error desconocido");
            }
            console.log(errMsg)
        }
    };
    useEffect(() => {
        fetchClient();
    }, []);

    return (
        <Navbar className="fixed">
            <NavbarBrand className="cursor-pointer">
                <Link to="/user/dashboard" className="flex">
                    <RentEventLogo/>
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
                <SwitchTheme/>
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
                            <p className="font-semibold">{email}</p>
                        </DropdownItem>
                        <DropdownItem key="settings" color="success" onClick={myConfig}>
                            My Settings
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger" onClick={logout}>
                            Logout
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}
