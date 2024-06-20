import {useEffect, useState} from "react";
import {Button} from "@nextui-org/react";
import {useAuthStore} from "@/store/auth";
import {obtenerDetallesCliente} from "@/api/client";
import {AxiosError} from "axios";
import {PencilIcon} from "@/components/icons/PencilIcon";
import {Input} from "@/components/ui/input.tsx";
import {UserInfo} from "@/components/UserInfo.tsx";
import {useNavigate} from "react-router-dom";

export const ClientConfiguration = () => {
    const navigate = useNavigate();
    const {correo: correo} = useAuthStore();


    const [genero, setGenero] = useState("");
    const [pais, setPais] = useState("");
    const [prefijo, setPrefijo] = useState("");
    const [telefono, setTelefono] = useState("");

    const [errMsg, setErrMsg] = useState("");

    const fetchFullClient = async () => {
        try {
            const details = await obtenerDetallesCliente(correo || "");

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

    return (
        <main className="mt-40">
            <section className="max-w-lg border-2 rounded-3xl p-5 mx-auto">
                <UserInfo/>
                <div className="container flex align-super content-center gap-3 ">
                    <Input
                        className="mb-3 h-14 border-2"
                        type="text"
                        color={"primary"}
                        name="genero"
                        value={genero}
                        readOnly
                    />
                    <Button isIconOnly variant="light" className="min-w-16 h-14 text-black dark:text-white"
                            color={"success"}>
                        <PencilIcon/>
                    </Button>
                </div>
                <div className="container flex align-super content-center gap-3 ">
                    <Input
                        className="mb-3 h-14 border-2"
                        type="text"
                        color={"primary"}
                        name="Pais"
                        value={pais}
                        readOnly
                    />
                    <Button isIconOnly variant="light" className="min-w-16 h-14 text-black dark:text-white"
                            color={"success"} >
                        <PencilIcon/>
                    </Button>
                </div>
                <div className="container flex align-super content-center gap-3 ">
                    <Input
                        className="max-w-16 mb-3 h-14 border-2"
                        type="text"
                        color={"primary"}
                        name="Prefijo Telefonico"
                        value={"+ "+prefijo}
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
                            color={"success"} onClick={()=>navigate(`/account/config/telefono`)}>
                        <PencilIcon/>
                    </Button>
                </div>
            </section>
        </main>
    );
};
