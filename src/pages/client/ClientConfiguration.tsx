import { useState, useEffect } from "react";
import { Avatar, Button, Input } from "@nextui-org/react";
import { useAuthStore } from "@/store/auth";
import { obtenerCliente } from "@/api/client";
import { AxiosError } from "axios";
import { PencilIcon } from "@/components/icons/PencilIcon";

export const ClientConfiguration = () => {
    const { correo: correo } = useAuthStore();

    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [genero, setGenero] = useState("");
    const [nacionalidad, setNacionalidad] = useState("");

    const [errMsg, setErrMsg] = useState("");
    // const [success, setSuccess] = useState(false);

    // const navigate = useNavigate();

    const fetchClient = async () => {
        try {
            const data = await obtenerCliente(correo || "");
            console.log(data);
            setFirstname(data.nombre ?? "");
            setLastname(data.apellido ?? "");
            setEmail(data.correo ?? "");
            setGenero(data.genero ?? "");
            setNacionalidad(data.nacionalidad ?? "");

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
        fetchClient();
    }, []);

    return (
        <main className="mt-40">
            <section className="max-w-md border-2 rounded-xl p-5 mx-4 md:mx-auto">
                <div className="flex gap-4 items-center mb-5">
                    <h1 className="text-3xl font-bold">Usuario:</h1>
                </div>
                <div className="container ">
                    <Avatar isBordered radius="lg" src={"/lunacat.png"} className="w-20 h-20 text-large mb-5" />
                </div>
                <div className="container flex align-super content-center gap-3 ">
                    <Input
                        className="mb-3 h-14"
                        type="text"
                        label="Correo"
                        variant="bordered"
                        name="correo"
                        value={email}
                        readOnly
                    />

                </div>
                <div className="container flex align-super content-center gap-3 ">
                    <Input
                        className="mb-3 h-14"
                        type="text"
                        label="Nombre"
                        variant="bordered"
                        name="nombre"
                        value={firstname}
                        readOnly
                    />
                    <Button isIconOnly variant="solid" className="w-20 h-14">
                        <PencilIcon />
                    </Button>
                </div>
                <div className="container flex align-super content-center gap-3 ">
                    <Input
                        className="mb-3 h-14"
                        type="text"
                        label="Apellido"
                        variant="bordered"
                        name="apellido"
                        value={lastname}
                        readOnly
                    />
                    {/*todo no se como centrarle bonito*/}
                    <Button isIconOnly variant="solid" className="w-20 h-14">
                        <PencilIcon />
                    </Button>
                </div>
                <div className="container flex align-super content-center gap-3 ">
                    <Input
                        className="mb-3 h-14"
                        type="text"
                        label="Genero"
                        variant="bordered"
                        name="genero"
                        value={genero}
                        readOnly
                    />
                    {/*todo no se como centrarle bonito*/}
                    <Button isIconOnly variant="solid" className="w-20 h-14">
                        <PencilIcon />
                    </Button>
                </div>
                <div className="container flex align-super content-center gap-3 ">
                    <Input
                        className="mb-3 h-14"
                        type="text"
                        label="Nacionalidad"
                        variant="bordered"
                        name="nacionalidad"
                        value={nacionalidad}
                        readOnly
                    />
                    {/*todo no se como centrarle bonito*/}
                    <Button isIconOnly variant="solid" className="w-20 h-14">
                        <PencilIcon />
                    </Button>
                </div>
            </section>
        </main>
    );
};
