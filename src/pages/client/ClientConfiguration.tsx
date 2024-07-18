import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useAuthStore } from "@/store/auth";
import { obtenerDetallesCliente } from "@/api/cliente.ts";
import { AxiosError } from "axios";
import { PencilIcon } from "@/components/icons/PencilIcon";
import { Input } from "@/components/ui/input.tsx";
import { UserInfo } from "@/components/UserInfo.tsx";
import { useNavigate, useLocation } from "react-router-dom";

export const ClientConfiguration = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { correo: correo } = useAuthStore();

    const [genero, setGenero] = useState("");
    const [pais, setPais] = useState("");
    const [region, setRegion] = useState("");
    const [prefijo, setPrefijo] = useState("");
    const [telefono, setTelefono] = useState("");

    const [errMsg, setErrMsg] = useState("");

    const fetchFullClient = async () => {
        try {
            const details = await obtenerDetallesCliente(correo || "");
            setRegion(details.region)
            setGenero(details.genero ?? "");
            setPais(details.pais ?? "");
            setPrefijo(details.prefijo ?? "");
            setTelefono(details.telefono ?? "");

        } catch (err) {
            const error = err as AxiosError;
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
            console.log(errMsg);
        }
    };

    useEffect(() => {
        fetchFullClient();
    }, []);

    // Clear inputs when the location (page) changes
    useEffect(() => {
        setGenero("");
        setPais("");
        setPrefijo("");
        setTelefono("");
    }, [location]);

    return (
        <main className="mt-40">
            <section className="container max-w-lg border-2 rounded-3xl p-5 mx-auto">
                <UserInfo />
                <p className="container mb-2 text-lg font-medium">Genero:</p>
                <div className="container flex align-super content-center gap-3 ">
                    <Input
                        className="mb-3 h-14 border-2"
                        type="text"
                        color={"primary"}
                        name="genero"
                        value={genero}
                        readOnly
                    />

                </div>
                <p className="container mb-2 text-lg font-medium">País:</p>
                <div className="container flex align-super content-center gap-3 ">
                    <Input
                        className="mb-3 h-14 border-2"
                        type="text"
                        color={"primary"}
                        name="Pais"
                        value={pais}
                        readOnly
                    />
                    <Input
                        className="mb-3 h-14 border-2"
                        type="text"
                        color={"primary"}
                        name="Region"
                        value={region}
                        readOnly
                    />
                    <Button isIconOnly variant="light" className="min-w-16 h-14 text-black dark:text-white"
                            color={"success"} onClick={() => navigate(`/account/config/region`)}>
                        <PencilIcon />
                    </Button>
                </div>
                <p className="container mb-2 text-lg font-medium">Teléfono:</p>
                <div className="container flex align-super content-center gap-3 ">
                    <Input
                        className="max-w-16 mb-3 h-14 border-2"
                        type="text"
                        color={"primary"}
                        name="Prefijo Telefonico"
                        value={"+ " + prefijo}
                        readOnly
                    />
                    <Input
                        className="mb-3 h-14 border-2"
                        type="text"
                        color={"primary"}
                        name="Número Telefonico"
                        value={telefono}
                        readOnly
                    />
                    <Button isIconOnly variant="light" className="min-w-16 h-14 text-black dark:text-white"
                            color={"success"} onClick={() => navigate(`/account/config/telefono`)}>
                        <PencilIcon />
                    </Button>
                </div>
                <div className="container flex align-super content-center gap-3 mb-3">
                    <Button isIconOnly variant="bordered" className=" flex w-full text-black dark:text-white"
                            color={"success"} onClick={() => navigate(`/account/config/pregunta-segura`)}>
                        Preguntas Seguras
                    </Button>
                </div>
                <div className="container flex align-super content-center gap-3 mb-3">
                    <Button isIconOnly variant="bordered" className=" flex w-full text-black dark:text-white"
                            color={"primary"} onClick={() => navigate(`/account/config/pass`)}>
                        Cambiar Contraseña
                    </Button>
                </div>
                <div className="container flex align-super content-center gap-3 mb-3">
                    <Button isIconOnly variant="bordered" className=" flex w-full text-black dark:text-white"
                            color={"primary"} onClick={() => navigate(`/account/config/tarjeta`)}>
                        Metodos de Pago
                    </Button>
                </div>
                <div className="container flex align-super content-center gap-3 mb-3">
                    <Button isIconOnly variant="bordered" className=" flex w-full text-black dark:text-white"
                            color={"primary"} onClick={() => navigate(`/account/config/datos-facturacion`)}>
                        Mis Datos de Facturacion
                    </Button>
                </div>
            </section>
        </main>
    );
};
