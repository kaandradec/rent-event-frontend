import {useEffect, useState} from "react";
import {useAuthStore} from "@/store/auth";
import {obtenerDetallesCliente} from "@/api/cliente.ts";
import {AxiosError} from "axios";
import {Input} from "@/components/ui/input";
import {UserInfo} from "@/components/UserInfo";
import {useParams} from "react-router-dom";
import {Button} from "@nextui-org/react";
import {SendIcon} from "@/components/icons/SendIcon";
import {dataFormApi} from "@/lib/axios.ts";


export const ClientTelefonoConf = () => {
    // const navigate = useNavigate();
    const {codigo} = useParams()

    const {correo} = useAuthStore();
    // const [success, setSuccess] = useState(false);
    // const [loading, setLoading] = useState(false);

    const [prefijo, setPrefijo] = useState<string>("");
    const [telefono, setTelefono] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");

    const handleSubmmit = async () => {
        if (!validateInputs()) return;
        // setLoading(true);
        if (codigo) {// URL PARAM
            console.log("Actualizando servicio");
            sendUpdateCliente();
        } else {
            console.log("Creando nuevo servicio");
        }
    }
    const validateInputs = (): boolean => {
        if (prefijo.length === 0 || telefono.length === 0) {
            setErrMsg("Campos vacíos");
            return false;
        }
        return true;
    }

    const sendUpdateCliente = async () => {
        const formData = new FormData();

        formData.append('correo', correo || "");
        formData.append('prefijo', prefijo);
        formData.append('telefono', telefono);

        try {
            const response = await dataFormApi.put(`/clientes/actualizar/telefono/`,
                formData,
            );
            console.log(response.data);
            // setSuccess(true);
        } catch (err) {
            console.error('Error:', err);
        }

        // setLoading(false);

        setTimeout(() => {
            // setSuccess(false);
        }, 1500);
    }


    const fetchClient = async () => {
        try {
            const details = await obtenerDetallesCliente(correo || "");
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
        fetchClient();
    }, []);

    // const displayInfo = () => {
    //     if (success) return <span className="text-green-500">Guardado con éxito</span>
    //     if (loading) return <span className="text-muted-foreground">Guardando...</span>
    //     if (error) return <span className="text-red-500">{error}</span>
    //     return null;
    // }

    return (
        <main className="mt-40">
            <section className="max-w-lg border-2 rounded-3xl p-5 mx-auto">
                <form className="mx-auto" onSubmit={handleSubmmit}>
                    <UserInfo/>
                    <div className="container flex align-super content-center gap-3">
                        <Input
                            className="max-w-8 h-14 border-0"
                            type="text"
                            color="disable"
                            value="+"
                            readOnly
                        />
                        <Input
                            className="max-w-16 mb-3 h-14 border-2"
                            type="number"
                            color="primary"
                            name="Prefijo Telefonico"
                            value={prefijo}
                            onChange={(e) => setPrefijo(e.target.value)}
                        />
                        <Input
                            className="mb-3 h-14 border-2"
                            type="number"
                            color="primary"
                            name="Número Telefonico"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                        <Button isIconOnly variant="bordered" className="min-w-16 h-14 text-black dark:text-white"
                                color="success" type="submit">
                            <SendIcon/>
                        </Button>
                    </div>
                    {errMsg && <p className="text-red-500">{errMsg}</p>}
                </form>
            </section>
        </main>
    );
};
