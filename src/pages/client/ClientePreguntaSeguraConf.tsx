import React, {useEffect, useState} from "react";
import {useAuthStore} from "@/store/auth";
import {AxiosError} from "axios";
import {UserInfo} from "@/components/UserInfo";
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";
import {obtenerPreguntasSeguras, updatePreguntasSegurasClient} from "@/api/preguntas_seguras.ts";


export const ClientePreguntaSeguraConf = () => {

    const correo = useAuthStore().correo;
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [listaPreguntas, setListaPreguntas] = useState<string[]>([]);
    const [pregunta1, setPregunta1] = useState<string>("Pregunta 1");
    const [respuesta1, setRespuesta1] = useState<string>("");
    const [pregunta2, setPregunta2] = useState<string>("Pregunta 2");
    const [respuesta2, setRespuesta2] = useState<string>("");
    const [pregunta3, setPregunta3] = useState<string>("Pregunta 3");
    const [respuesta3, setRespuesta3] = useState<string>("");

    const [errMsg, setErrMsg] = useState<string>("");

    useEffect(() => {
        fetchClient();
    }, []);
    const validateInputs = (): boolean => {
        if (pregunta1 === "Pregunta 1" || pregunta2 === "Pregunta 2" || pregunta3 === "Pregunta 3"
            || respuesta1 === "" || respuesta2 === "" || respuesta3 === "") {
            setErrMsg("Campos vacíos");
            return false;
        }
        return true;
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validInputs = validateInputs();
        if (!validInputs) return;

        try {
            if (correo == null) return
            const mensaje = await updatePreguntasSegurasClient(correo, pregunta1, respuesta1, pregunta2, respuesta2, pregunta3, respuesta3);
            if (mensaje.status == 200) {
                setSuccess(true)
                setTimeout(() => {
                        navigate("/account/config")
                    },
                    2500);
            }
        } catch (err) {

            console.log(err)
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

    const msgStyle = {
        colorError: 'text-red-500',
        colorSuccess: 'text-green-500',
    };

    const fetchClient = async () => {
        try {
            const response = await obtenerPreguntasSeguras();
            console.log(response); // Para verificar la estructura del objeto devuelto

            // Asegúrate de que `preguntasSeguras` sea un array
            const preguntasArray = Array.isArray(response.preguntasSeguras) ? response.preguntasSeguras : [];
            setListaPreguntas(preguntasArray);
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


    const handleSelection1 = (keys: Set<string>) => {
        const selected = Array.from(keys)[0];
        setPregunta1(selected);
    };
    const handleSelection2 = (keys: Set<string>) => {
        const selected = Array.from(keys)[0];
        setPregunta2(selected);
    };
    const handleSelection3 = (keys: Set<string>) => {
        const selected = Array.from(keys)[0];
        setPregunta3(selected);
    };


    return (
        <main className="mt-20">
            <section className="max-w-lg border-2 rounded-3xl p-5 mx-auto">
                <form className="mx-auto" onSubmit={handleSubmit}>
                    <UserInfo/>
                    <p className="container mb-4 text-lg font-medium">Actualizar datos:</p>

                    <div className="container flex-auto align-super content-center gap-3 mb-5">
                        <p className="mb-1 text-medium font-medium">- Pregunta de Seguridad 1:</p>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered" className="flex w-full mb-1" aria-label={"Pregunta 1"}>
                                    {pregunta1}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                aria-label={"Pregunta 1"}
                                selectedKeys={new Set([pregunta1])}
                                onSelectionChange={
                                    (keys) => {
                                        handleSelection1(keys as Set<string>)
                                    }

                                }
                                className="max-h-60 overflow-auto"
                            >
                                {listaPreguntas.map((pregunta) => (
                                    <DropdownItem value={pregunta} key={pregunta}>{pregunta}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Input
                            className="mb-5"
                            type="text"
                            label="Respuesta 1"
                            isRequired={true}
                            variant="bordered"
                            onChange={(e) => setRespuesta1(e.target.value)}
                        />
                    </div>
                    <div className="container flex-auto align-super content-center gap-3 mb-5">
                        <p className="mb-1 text-medium font-medium">- Pregunta de Seguridad 2:</p>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered" className="flex w-full mb-1" aria-label={"Pregunta 2"}>
                                    {pregunta2}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                aria-label={"Pregunta 2"}
                                selectedKeys={new Set([pregunta2])}
                                onSelectionChange={
                                    (keys) => {
                                        handleSelection2(keys as Set<string>)
                                    }

                                }
                                className="max-h-60 overflow-auto"
                            >
                                {listaPreguntas.map((pregunta) => (
                                    <DropdownItem value={pregunta} key={pregunta}>{pregunta}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Input
                            className="mb-5"
                            type="text"
                            label="Respuesta 2"
                            isRequired={true}
                            variant="bordered"
                            onChange={(e) => setRespuesta2(e.target.value.toUpperCase())}
                        />
                    </div>
                    <div className="container flex-auto align-super content-center gap-3">
                        <p className="mb-1 text-medium font-medium">- Pregunta de Seguridad 3:</p>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered" className="flex w-full mb-1" aria-label={"Pregunta 1"}>
                                    {pregunta3}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                aria-label={"Pregunta 3"}
                                selectedKeys={new Set([pregunta3])}
                                className="max-h-60 overflow-auto"
                                onSelectionChange={
                                    (keys) => {
                                        handleSelection3(keys as Set<string>)
                                    }

                                }>
                                {listaPreguntas.map((pregunta) => (
                                    <DropdownItem value={pregunta} key={pregunta}>{pregunta}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Input
                            className="mb-5"
                            type="text"
                            label="Respuesta 3"
                            isRequired={true}
                            variant="bordered"
                            onChange={(e) => setRespuesta3(e.target.value.toUpperCase())
                            }
                        />
                    </div>
                    <Button variant="bordered" className="container flex max-w-40 h-14 text-black dark:text-white"
                            color="success" type="submit">
                        Confirmar
                    </Button>
                </form>
                <p className={`h-5 text-center my-2 ${success ? msgStyle.colorSuccess : msgStyle.colorError}`}
                   aria-live="assertive">
                    {!success ? errMsg : '¡Cambio exitoso!'}
                </p>
            </section>
        </main>
    );
};
