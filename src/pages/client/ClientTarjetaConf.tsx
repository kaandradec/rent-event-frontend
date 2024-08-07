import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import {obtenerTarjetasCliente, registerTarjetaClient} from "@/api/cliente.ts";
import { AxiosError } from "axios";
import { UserInfo } from "@/components/UserInfo";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { BotonVolver } from "@/components/BotonVolver.tsx";
import { obtenerTiposTarjetas } from "@/api/tipos_tarjetas.ts";
import TarjetaList from "@/components/TarjetaList";

export const ClientTarjetaConf: React.FC = () => {
    const correo = useAuthStore().correo;
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [prefijo, setPrefijo] = useState<string>("");
    const [errMsg, setErrMsg] = useState<string>("");
    const [nuevo, setNuevo] = useState<boolean>(false);
    const [nombre, setNombre] = useState<string>("");
    const [numeroTarjeta, setNumeroTarjeta] = useState<string>("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [tipoTarjeta, setTipoTarjeta] = useState<string[]>([]);
    const [tipoTarjetaSeleccionada, setTipoTarjetaSeleccionada] = useState<string>("Tipo de Tarjeta");
    const [listaTarjetas, setListaTarjetas] = useState<{ token: string; nombreTarjeta: string; }[]>([]);
    const [reemplazar, setReemplazar] = useState(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validInputs = validateInputs();
        if (!validInputs) return;

        try {
            if (correo == null) return;
            const mensaje =  await registerTarjetaClient(correo, nombre, numeroTarjeta, tipoTarjetaSeleccionada, prefijo, month, year);
            if (mensaje.status === 200) {
                setSuccess(true);
                setTimeout(() => {
                    navigate("/account/config");
                }, 2500);
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
        if (prefijo.length === 0 || numeroTarjeta.length === 0 || month.length === 0 || year.length === 0 || nombre.length === 0) {
            setErrMsg("Campos vacíos");
            return false;
        } else if (prefijo.length > 5) {
            setErrMsg("Codigo de tarjeta invalido");
            return false;
        } else if (numeroTarjeta.length !== 16) {
            setErrMsg("Numero de tarjeta invalido");
            return false;
        } else if (month.length > 2 || parseInt(month, 10) > 12 || parseInt(month, 10) < 1) {
            setErrMsg("Mes no existe");
            return false;
        } else if (year.length > 4 || parseInt(year, 10) < 2023) {
            setErrMsg("Año Incorrecto");
            return false;
        } else if (tipoTarjetaSeleccionada === "" || tipoTarjetaSeleccionada === "Tipo de Tarjeta") {
            setErrMsg("Selecciona una tarjeta");
            return false;
        }
        return true;
    };

    const msgStyle = {
        colorError: 'text-red-500',
        colorSuccess: 'text-green-500',
    };

    const fetchClientTarjeta = async () => {
        try {
            if (correo == null) return;

            const details = await obtenerTiposTarjetas();
            const tarjetas = await obtenerTarjetasCliente(correo);
            if (tarjetas && Array.isArray(tarjetas.tarjetaResponseList)) {
                setListaTarjetas(tarjetas.tarjetaResponseList);
            } else {
                console.error("Formato de respuesta incorrecto:", tarjetas);
            }
            setTipoTarjeta(details.tipoTarjeta);
            console.log(details);
        } catch (err) {
            const error = err as AxiosError;
            if (!error?.response) {
                setErrMsg("El servidor no responde");
            } else if (error.response?.status === 409 || error.response?.data === "Bad credentials") {
                setErrMsg("Credenciales incorrectas");
            } else {
                setErrMsg("Error desconocido");
            }
            console.log(errMsg);
        }
    };

    const handleCitySelection = (keys: Set<string>) => {
        const selected = Array.from(keys)[0];
        setTipoTarjetaSeleccionada(selected);
        console.log(tipoTarjetaSeleccionada);
    };

    useEffect(() => {
        fetchClientTarjeta();
    }, []);

    return (
        <main className="mt-40">
            <section className="max-w-lg border-2 rounded-3xl p-5 mx-auto">
                <form onSubmit={handleSubmit}>
                    <UserInfo />
                    <div className="container flex align-super content-center">
                        {nuevo || reemplazar? (
                            <div className="flex-auto">
                                <h1>Nombre Propietario</h1>
                                <Input
                                    className="mb-3 h-11 border-2"
                                    color="primary"
                                    autoCapitalize="capitalize"
                                    name="Número Telefonico"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                                <h1>Numero de tarjeta</h1>
                                <Input
                                    className="mb-3 h-11 border-2"
                                    type="number"
                                    color="primary"
                                    inputMode="numeric"
                                    value={numeroTarjeta}
                                    onChange={(e) => setNumeroTarjeta(e.target.value)}
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    <h1>Codigo de seguridad:</h1>
                                    <h1>Tipo de Tarjeta:</h1>
                                    <Input
                                        className="mb-3 h-11 border-2"
                                        type="number"
                                        color="primary"
                                        inputMode="numeric"
                                        value={prefijo}
                                        onChange={(e) => setPrefijo(e.target.value)}
                                    />
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button
                                                variant="bordered"
                                                className="flex w-full h-11 rounded-sm border-input"
                                                aria-label="Ciudad"
                                            >
                                                {tipoTarjetaSeleccionada}
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            variant="flat"
                                            disallowEmptySelection
                                            selectionMode="single"
                                            aria-label="Ciudad"
                                            selectedKeys={new Set([tipoTarjetaSeleccionada])}
                                            onSelectionChange={(keys) => handleCitySelection(keys as Set<string>)}
                                            className="max-h-60 overflow-auto"
                                        >
                                            {tipoTarjeta.length > 0 ? (
                                                tipoTarjeta.map((valor) => (
                                                    <DropdownItem value={valor} key={valor}>
                                                        {valor}
                                                    </DropdownItem>
                                                ))
                                            ) : (
                                                <DropdownItem key="no-cities">Intentalo mas tarde...</DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                                <h1>Fecha Expiracion</h1>
                                <div className="grid grid-cols-2 gap-3">
                                    <h1>Mes:</h1>
                                    <h1>Año:</h1>
                                    <Input
                                        className="mb-3 h-11 border-2"
                                        color="primary"
                                        type="number"
                                        value={month}
                                        onChange={(e) => setMonth(e.target.value)}
                                    />
                                    <Input
                                        className="mb-3 h-11 border-2"
                                        color="primary"
                                        type="number"
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                    />
                                </div>
                                <Button
                                    variant="bordered"
                                    className={"container flex max-w-52 h-14 font-semibold text-black dark:text-white"}
                                    color={reemplazar?"warning":"success"}
                                    type="submit"
                                >
                                    {reemplazar?"Reemplazar":"Añadir"}
                                </Button>
                            </div>
                        ) : (
                            <div className=" w-full grid grid-cols-1 flex">
                                <TarjetaList tarjetas={listaTarjetas} />
                                {!(listaTarjetas.length>=1)?
                                <Button
                                    variant="bordered"
                                    className="min-w-16 h-11 text-success dark:text-white text-lg flex-auto"
                                    color="success"
                                    onClick={() => setNuevo(true)}
                                >
                                    Añadir metodo de pago
                                </Button>:
                                    <Button
                                        variant="bordered"
                                        className="min-w-16 h-11 text-warning dark:text-white text-lg flex-auto"
                                        color="warning"
                                        onClick={() => setReemplazar(true)}
                                    >
                                        Reemplazar
                                    </Button>
                                }
                            </div>
                        )}
                    </div>
                </form>
                <p className={`h-5 text-center my-2 ${success ? msgStyle.colorSuccess : msgStyle.colorError}`} aria-live="assertive">
                    {!success ? errMsg : '¡Cambio exitoso!'}
                </p>
                <BotonVolver />
            </section>
        </main>
    );
};
