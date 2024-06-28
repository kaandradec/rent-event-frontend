import React, {useEffect, useState} from "react";
import {useAuthStore} from "@/store/auth";
import {obtenerDetallesCliente, updateRegionRequestClient} from "@/api/cliente.ts";
import {AxiosError} from "axios";
import {UserInfo} from "@/components/UserInfo";
import {Button} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {BotonPaises} from "@/components/BotonPaises.tsx";
import {BotonVolver} from "@/components/BotonVolver.tsx";


export const ClienteRegionConf = () => {

    const correo = useAuthStore().correo;
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [region, setRegion] = useState<string>("");
    const [pais, setPais] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validInputs = validateInputs();
        if (!validInputs) return;

        try {
            if (correo == null) return
            const mensaje = await updateRegionRequestClient(correo, region, pais);
            if (mensaje.status == 200) {
                setSuccess(true)
                setTimeout(() => {
                        navigate("/account/config")
                    },
                    2500);
            }
        } catch (err) {

            const error = err as AxiosError;
            if (!error?.response) {
                setErrMsg("El servidor no responde");
            } else if (error.response?.status === 409) {
                setErrMsg("Usuario ya registrado");
            } else {
                setErrMsg("Error desconocido");
            }
        }
    };
    const validateInputs = (): boolean => {
        if (region.length === 0 || pais.length === 0 || correo?.length === 0) {
            setErrMsg("Campos vacíos");
            return false;
        }
        return true;
    }
    const msgStyle = {
        colorError: 'text-red-500',
        colorSuccess: 'text-green-500',
    };

    const fetchClient = async () => {
        try {
            const details = await obtenerDetallesCliente(correo || "");
            setRegion(details.prefijo ?? "");
            setPais(details.telefono ?? "");
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
            <section className="max-w-lg border-2 rounded-3xl p-5 mx-auto">
                <form className="mx-auto" onSubmit={handleSubmit}>
                    <UserInfo/>
                    <p className="container mb-2 text-lg font-medium">Actualizar datos:</p>
                    <div className="container flex-auto align-super content-center gap-3">
                        <BotonPaises setSelectedCountry={setPais} setSelectedCity={setRegion}/>
                        <div className={"container flex"}>

                        <BotonVolver/>
                        <Button variant="bordered" className="container flex max-w-40 h-14 text-black dark:text-white"
                                color="success" type="submit">
                            Actualizar
                        </Button>
                        </div>
                    </div>
                </form>
                {errMsg && <p className="text-red-500">{errMsg}</p>}
                <p className={`h-5 text-center my-2 ${success ? msgStyle.colorSuccess : msgStyle.colorError}`}
                   aria-live="assertive">
                    {!success ? errMsg : '¡Cambio exitoso!'}
                </p>
            </section>
        </main>
    );
};
