import {AxiosError} from "axios";
import React, {useState} from "react";
import {Button, Input} from "@nextui-org/react";
import {changePassPreguntaCliente} from "@/api/auth.ts";
import {EyeFilledIcon} from "@/components/icons/EyeFilledIcon";
import {EyeSlashFilledIcon} from "@/components/icons/EyeSlashFilledIcon";
import {useNavigate} from "react-router-dom";

interface InputCorreoSeguraProps {
    correo: string;
}

export const CambiarPassPreguntaSegura: React.FC<InputCorreoSeguraProps> = ({correo}) => {

    const [contraseniaNueva, setContraseniaNueva] = useState("");
    const [contraseniaConfirmacion, setContraseniaConfirmacion] = useState("");
    const [errMsg, setErrMsg] = useState<string>("");
    const [success, setSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const validInputs = validateInputs();
            if (!validInputs) return;

            const mensaje = await changePassPreguntaCliente(correo, contraseniaNueva);
            if (mensaje.status == 200) {
                setSuccess(true)
                setTimeout(() => {
                        navigate("/auth/login")
                    },
                    2500);
            }
        } catch (err) {

            const error = err as AxiosError;
            if (!error?.response) {
                setErrMsg("El servidor no responde");
            } else {
                setErrMsg("Error desconocido");
            }
        }
    };
    const validateInputs = () => {
        if (contraseniaNueva.length === 0 || contraseniaConfirmacion.length === 0) {
            setErrMsg("Campos vacíos");
            return false;
        } else if (contraseniaNueva !== contraseniaConfirmacion) {
            setErrMsg("Las contraseñas no coinciden");
            return false;
        }
        return true;
    };

    const msgStyle = {
        colorError: 'text-red-500',
        colorSuccess: 'text-green-500',
    };

    return (
        <main className="mt-10">
            <section className="container max-w-lg border-2 rounded-3xl p-5 mx-auto">
                <form className="mx-auto" onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold mb-10 text-center">Cambiar Contraseña</h1>
                    <p className="container mb-2 text-base font-medium">Contraseña Nueva:</p>
                    <div className="container flex align-super content-center gap-3">
                        <Input
                            className="mb-5"
                            label="******************"
                            isRequired={true}
                            variant="bordered"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            value={contraseniaNueva}
                            onChange={(e) => setContraseniaNueva(e.target.value)}
                        />
                    </div>
                    <p className="container mb-2 text-base font-medium">Repetir Contraseña Nueva:</p>
                    <div className="container flex align-super content-center gap-3">
                        <Input
                            className="mb-5"
                            label="******************"
                            isRequired={true}
                            variant="bordered"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            value={contraseniaConfirmacion}
                            onChange={(e) => setContraseniaConfirmacion(e.target.value)}
                        />
                    </div>
                    <div className="container flex align-super content-center gap-3 ">

                        <Button variant="bordered"
                                className="container flex max-w-52 h-14 font-semibold text-black dark:text-white"
                                color={"success"} type="submit">
                            Cambiar Contraseña
                        </Button>
                    </div>
                </form>
                <p className={`h-5 text-center my-2 ${success ? msgStyle.colorSuccess : msgStyle.colorError}`}
                   aria-live="assertive">
                    {!success ? errMsg : '¡Cambio exitoso!'}
                </p>
            </section>
        </main>
    );
};
