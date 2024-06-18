import {useState, useEffect} from "react";
import {Avatar, Button, Input} from "@nextui-org/react";
import {useAuthStore} from "@/store/auth";
import {obtenerCliente} from "@/api/client";
import {AxiosError} from "axios";
import {PencilIcon} from "@/components/icons/PencilIcon";

export const ClientConfiguration = () => {
    const {correo: correo} = useAuthStore();

    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [genero, setGenero] = useState("");
    const [nacionalidad, setNacionalidad] = useState("");
    // const [success, setSuccess] = useState(false);

    // const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");

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
            <section className="max-w-md border-2 rounded-3xl p-5 mx-auto">
                <div className="container flex">
                    <Avatar isBordered color="secondary" radius="lg"  src={"/lunacat.png"}
                            className="object-contain min-w-12 min-h-12 sm:w-20 sm:h-20 mb-5"/>
                    <div className="ml-5">
                        <h2 className="mb-2 text-2xl font-medium">{email}</h2>
                        <h3 className="mb-2 text-lg font-medium">{firstname + " " + lastname}</h3>
                    </div>
                </div>

                <div className="container flex align-super content-center gap-3 ">
                    <Input
                        className="mb-3 h-14 border-primary"
                        type="text"
                        label="Género"
                        color={"primary"}
                        variant="bordered"
                        name="genero"
                        value={genero}
                        readOnly
                    />
                    {/*todo no se como centrarle bonito*/}
                    <Button isIconOnly variant="light" className="w-20 h-14 text-black dark:text-white" color={"success"}>
                        <PencilIcon />
                    </Button>
                </div>
                <div className="container flex align-super content-center gap-3 ">
                    <Input
                        className="mb-3 h-14"
                        type="text"
                        label="Nacionalidad"
                        color={"primary"}
                        variant="bordered"
                        name="nacionalidad"
                        value={nacionalidad}
                        readOnly
                    />
                    {/*todo no se como centrarle bonito*/}
                    <Button isIconOnly variant="light" className="w-20 h-14 text-black dark:text-white" color={"success"}>
                        <PencilIcon />
                    </Button>
                </div>
            </section>
        </main>
    );
};
