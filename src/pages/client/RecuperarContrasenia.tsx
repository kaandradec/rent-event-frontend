import {validarCorreo} from "@/api/auth";
import {Button, Input} from "@nextui-org/react";
import {AxiosError} from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {PreguntaSeguraInput} from "@/components/PreguntaSeguraInput.tsx";

export const RecuperarContrasenia = () => {
    return (
        <main className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] lg:h-dvh">
            <section className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <RecuperarPass/>
                </div>
            </section>
            <section className="hidden bg-muted lg:block hfu lg:overflow-hidden">
                <img
                    src="/lunacat.png"
                    alt="Image"
                    className="dark:brightness-[0.2] dark:grayscale w-full"
                />
            </section>
        </main>
    )
}

const RecuperarPass = () => {
    const [correo, setCorreo] = useState("");
    // const [contrasenia, setContrasenia] = useState("");

    const [errMsg, setErrMsg] = useState("");
    const [existeCorreo, setExisteCorreo] = useState(false);
    const [pregunta, setPregunta] = useState("");
    const [respuesta, setRespuesta] = useState("");
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const validateInputs = () => {
        if (correo === "") {
            setErrMsg("Campos vacíos");
            return false;
        }
        return true;
    }

    const handleRequestCorreo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validInputs = validateInputs();
        if (!validInputs) return;

        try {
            await validarCorreo(correo);
            setExisteCorreo(true);
        } catch (err) {
            const error = err as AxiosError;
            console.log(error.response?.data);
            if (!error?.response) {
                setErrMsg("El servidor no responde");
            } else if (error.response?.status === 409 || error.response?.data === 'Bad credentials') {
                setErrMsg("Credenciales incorrectas");
            } else if (error.response?.status === 404) {
                setErrMsg("Correo no existe!");
            } else {
                setErrMsg("Error desconocido");
            }
        }
    };
    //todo: hacer la validacion de respuesta y la pantalla de cambio de contraseña
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validInputs = validateInputs();
        if (!validInputs) return;

        try {
            await validarCorreo(correo);
            setExisteCorreo(true);
        } catch (err) {
            const error = err as AxiosError;
            console.log(error.response?.data);
            if (!error?.response) {
                setErrMsg("El servidor no responde");
            } else if (error.response?.status === 409 || error.response?.data === 'Bad credentials') {
                setErrMsg("Credenciales incorrectas");
            } else if (error.response?.status === 404) {
                setErrMsg("Correo no existe!");
            } else {
                setErrMsg("Error desconocido");
            }
        }
    };

    const msgStyle = {
        colorError: 'text-red-500',
        colorSuccess: 'text-green-500',
    }

    return (
        <main>
            <section className="mt-28">
                <h1 className="text-4xl font-bold mb-4 text-center">
                    Recuperar Contraseña
                </h1>
                <form className="max-w-s mx-auto" onSubmit={!existeCorreo?handleRequestCorreo:handleSubmit}>
                    <Input
                        type="text"
                        label="Correo"
                        placeholder="ejemplo@email.com"
                        variant="bordered"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setCorreo(e.target.value)
                        }
                        className="mb-2"
                    />

                    <div className={`h-5 text-center my-2 ${existeCorreo ? "mb-28" : "mb-1"}`}
                         aria-live="assertive">
                        {!existeCorreo ?
                            <p className={`h-5 text-center my-2 ${existeCorreo ? msgStyle.colorSuccess : msgStyle.colorError}`}
                               aria-live="assertive">
                                {errMsg}
                            </p>
                            : <PreguntaSeguraInput correo={correo} setPregunta={setPregunta}
                                                   setRespuesta={setRespuesta}/>}
                    </div>
                    {existeCorreo ?
                        <Button className="w-full mb-2" color="success" type="submit" size="lg">
                            Enviar
                        </Button>
                        : <Button className="w-full mb-2" color="primary" type="submit" size="lg">
                            Validar
                        </Button>
                    }


                    <section className="flex justify-center cursor-pointer">
                    </section>
                </form>
            </section>
        </main>
    );
}

