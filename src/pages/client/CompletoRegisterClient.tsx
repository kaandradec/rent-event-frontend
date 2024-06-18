import {AxiosError} from "axios";
import React, {useEffect, useState} from "react";
import {Button, Input} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import {registerRequestClient} from "@/api/auth";
import {useNavigate} from "react-router-dom";
import {obtenerGeneros} from "@/api/generos.ts";

export const CompletoRegisterClient = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [generos, setGeneros] = useState<string[]>([]);
    const [prefijo, setPrefijo] = useState(-1);
    const [telefono, setTelefono] = useState(-1);
    const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set(["Género"]));

    const navigate = useNavigate();

    const resetInputs = () => {
        setNombre("");
        setApellido("");
        setCorreo("");
        setContrasenia("");
        setPrefijo(0);
        setTelefono(0);
        setSelectedKeys(new Set(["Género"]));
    }

    const selectedGender = React.useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys]
    );

    const validateInputs = () => {
        if (nombre === "" || apellido === "" || correo === "" || contrasenia === "" ||
            selectedGender === "" || selectedGender === "Género"|| prefijo <= 0 || telefono <= 0) {
            setErrMsg("Campos vacíos");
            return false;
        }
        return true;
    }

    const fetchGeneros = async () => {
        try {
            const data = await obtenerGeneros();
            if (Array.isArray(data.generos)) {
                setGeneros(data.generos);
            } else {
                console.error("Data returned is not an array:", typeof data.generos);
                setErrMsg("Error al obtener los géneros");
            }
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
        fetchGeneros();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validInputs = validateInputs();
        if (!validInputs) return;

        try {
            const response = await registerRequestClient(nombre, apellido, correo, contrasenia, selectedGender,prefijo,telefono);
            console.log(response);
            setSuccess(true);
            resetInputs();
            navigate("/auth/login");
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

    const msgStyle = {
        colorError: 'text-red-500',
        colorSuccess: 'text-green-500',
    }

    return (
        <main className="mt-32">
            <section className="max-w-sm border-2 rounded-xl p-4 mx-auto container flex">
                <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold mb-4 text-center">Registrarse</h1>
                    <Input
                        className="mb-5"
                        type="text"
                        label="Nombre"
                        isRequired={true}
                        variant="bordered"
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <Input
                        className="mb-5"
                        type="text"
                        isRequired={true}
                        label="Apellido"
                        variant="bordered"
                        onChange={(e) => setApellido(e.target.value)}
                    />
                    <Input
                        className="mb-5"
                        type="email"
                        isRequired={true}
                        label="Correo electrónico"
                        variant="bordered"
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    <Input
                        className="mb-5"
                        type="password"
                        label="Contraseña"
                        isRequired={true}
                        variant="bordered"
                        placeholder="Ingresa tu contraseña"
                        onChange={(e) => setContrasenia(e.target.value)}
                    />
                    <h3 className="text-medium font-semibold mb-2 text-start">Número de teléfono:</h3>
                    <div className={"flex gap-3 mb-5"}>
                        <Input
                            type="number"
                            labelPlacement="outside-left"
                            label={"+"}
                            placeholder="000"
                            isRequired={true}
                            onChange={(e) => setPrefijo(Number(e.target.value))}
                        />
                        <Input
                            type="number"
                            placeholder="00-0000-000"
                            isRequired={true}
                            onChange={(e) => setTelefono(Number(e.target.value))}
                        />
                    </div>
                    <div className="flex gap-3 mb-5">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered" className="flex w-full " aria-label={"Género"}>
                                    {selectedGender || "Género"}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                aria-label={"Género"}
                                selectedKeys={selectedKeys}
                                onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
                            >
                                {generos.map((genero) => (
                                    <DropdownItem value={genero} key={genero}>{genero}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                required
                            />
                        </div>
                        <label
                            htmlFor="terms"
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 select-none"
                        >
                            Acepto los{" "}
                            <a
                                href="https://youtu.be/ndenXpxSA9A?t=41"
                                className="text-blue-600 hover:underline dark:text-blue-500"
                            >
                                términos y condiciones
                            </a>
                        </label>
                    </div>
                    <p className={`h-5 text-center my-2 ${success ? msgStyle.colorSuccess : msgStyle.colorError}`}
                       aria-live="assertive">
                        {!success ? errMsg : '¡Registro exitoso!'}
                    </p>
                    <div className="text-center">
                        <Button color="primary" type="submit" size="lg">
                            Registrarse
                        </Button>
                    </div>
                </form>
            </section>
        </main>
    );
};
