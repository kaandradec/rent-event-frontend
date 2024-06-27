import {AxiosError} from "axios";
import React, {useState} from "react";
import {Button, Input} from "@nextui-org/react";
import {useAuthStore} from "@/store/auth";
import {changePasswClient} from "@/api/auth.ts";
import {EyeFilledIcon} from "@/components/icons/EyeFilledIcon";
import {EyeSlashFilledIcon} from "@/components/icons/EyeSlashFilledIcon";

export const ClientPassConf = () => {
    const correo = useAuthStore.getState().correo;
    const [contrasenia, setContrasenia] = useState("");
    const [contraseniaNueva, setContraseniaNueva] = useState("");
    const [contraseniaConfirmacion, setContraseniaConfirmacion] = useState("");
    const [errMsg, setErrMsg] = useState<string>("");
    const [success, setSuccess] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validInputs = validateInputs();
        if (!validInputs) return;
        await changePasswClient(correo, contrasenia, contraseniaNueva);
        try {
            setSuccess(true);
            resetInputs();
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

    const resetInputs = () => {
        setContrasenia("");
        setContraseniaNueva("");
        setContraseniaConfirmacion("");
    };

    const validateInputs = () => {
        if (contrasenia.length === 0 || contraseniaNueva.length === 0 || contraseniaConfirmacion.length === 0) {
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
        <main className="mt-40">
            <section className="container max-w-lg border-2 rounded-3xl p-5 mx-auto">
                <form className="mx-auto" onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold mb-10 text-center">Cambiar Contraseña</h1>
                    <p className="container mb-2 text-base font-medium">Contraseña Actual:</p>
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
                            value={contrasenia}
                            onChange={(e) => setContrasenia(e.target.value)}
                        />
                    </div>
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
                        <Button variant="bordered" className="flex-auto font-semibold text-black dark:text-white"
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
