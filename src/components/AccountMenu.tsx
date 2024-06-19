import {Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "@/store/auth.js";
import {useEffect, useState} from "react";
import {obtenerCliente} from "@/api/client.ts";
import {AxiosError} from "axios";


export default function AccountMenu() {
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
        navigate("/account/config");
    };

    const {correo} = useAuthStore();
    const [email, setEmail] = useState("");

    const fetchClient = async () => {
        try {
            if (!correo) {
                throw new Error("Correo no definido");
            }
            const data = await obtenerCliente(correo);
            if (data && data.correo) {
                setEmail(data.correo);
            } else {
                throw new Error("Datos de cliente inválidos");
            }
        } catch (err) {
            const error = err as AxiosError;
            if (!error.response) {
                setErrMsg("El servidor no responde");
            } else if (error.response?.status === 409 || error.response?.data === "Bad credentials") {
                setErrMsg("Credenciales incorrectas");
            } else {
                setErrMsg("Error desconocido");
            }
            console.log(errMsg);
        }
    };

    useEffect(() => {
        fetchClient();
    }, [correo]);
    useEffect(() => {
        fetchClient();
    }, []);

    return (

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
                <DropdownItem isDisabled={true} key="profile" className="h-14 gap-2">
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

    );
}
