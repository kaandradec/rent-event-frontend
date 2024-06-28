import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import { registerRequestClient } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import { obtenerGeneros } from "@/api/generos.ts";
import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/icons/EyeSlashFilledIcon";
import { BotonPaises } from "@/components/BotonPaises.tsx";

export const RegisterClient = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const [otraContrasenia, setOtraContrasenia] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [generos, setGeneros] = useState<string[]>([]);
    const [prefijo, setPrefijo] = useState(-1);
    const [telefono, setTelefono] = useState(-1);
    const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set(["Género"]));
    const [isVisible, setIsVisible] = React.useState(false);
    const [selectedCountry, setSelectedCountry] = useState<string>("País");
    const [selectedCity, setSelectedCity] = useState<string>("Ciudad");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const navigate = useNavigate();

    const resetInputs = () => {
        setNombre("");
        setApellido("");
        setCorreo("");
        setContrasenia("");
        setOtraContrasenia("");
        setPrefijo(0);
        setTelefono(0);
        setSelectedKeys(new Set(["Género"]));
        setSelectedCountry("País");
        setSelectedCity("Ciudad");
    };

    const selectedGender = React.useMemo(
        () => Array.from(selectedKeys).join(", "),
        [selectedKeys]
    );

    const validateInputs = () => {
        if (nombre === "" || apellido === "" || correo === "" || contrasenia === "" ||
            selectedGender === "" || prefijo <= 0 || telefono <= 0 ||
            selectedCountry === "País" || selectedCity === "Ciudad" || selectedCity === "Elige una ciudad") {
            setErrMsg("Campos vacíos, completalos");
            return false;
        } else if (prefijo.toString().length > 5) {
            setErrMsg("Prefijo de teléfono no existe");
            return false;
        } else if (contrasenia !== otraContrasenia) {
            setErrMsg("Contraseñas distintas, corrígelas");
            return false;
        } else if (/\d/.test(nombre) || /\d/.test(apellido)) {
            setErrMsg("Nombre o Apellido contiene numeros");
            return false;
        }
        return true;
    };

    const fetchGeneros = async () => {
        try {
            const data = await obtenerGeneros();
            if (Array.isArray(data.generos)) {
                setGeneros(data.generos);
            } else {
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
            const response = await registerRequestClient(nombre, apellido, correo, contrasenia, selectedGender, prefijo, telefono, selectedCountry, selectedCity);
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
    };

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
                        label="Contraseña"
                        isRequired={true}
                        variant="bordered"
                        placeholder="Ingresa tu contraseña"
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
                        onChange={(e) => setContrasenia(e.target.value)}
                    />
                    <Input
                        className="mb-5"
                        label="Confirmar contraseña"
                        isRequired={true}
                        variant="bordered"
                        placeholder="Confirma tu contraseña"
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
                        onChange={(e) => setOtraContrasenia(e.target.value)}
                    />
                    <h3 className="text-medium font-semibold mb-2 text-start">Número de teléfono:</h3>
                    <div className={"flex gap-3 mb-5"}>
                        <Input
                            type="number"
                            variant="bordered"
                            labelPlacement="outside-left"
                            label={"+"}
                            placeholder="000"
                            isRequired={true}
                            onChange={(e) => setPrefijo(Number(e.target.value))}
                        />
                        <Input
                            type="number"
                            variant="bordered"
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
                    <div>
                        <BotonPaises setSelectedCountry={setSelectedCountry} setSelectedCity={setSelectedCity} />
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