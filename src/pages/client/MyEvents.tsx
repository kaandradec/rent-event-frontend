import {useEffect, useState} from "react";
import {useAuthStore} from "@/store/auth";
import {AxiosError} from "axios";
import {getEventos} from "@/api/eventos.ts";
import {Event} from "@/components/Evento.tsx"
import {CrearEventoButton} from "@/components/CrearEventoButton";

export const MyEvents = () => {
    const correo = useAuthStore().correo,
        nombre = useAuthStore().nombre,
        apellido = useAuthStore().apellido,
        [errMsg, setErrMsg] = useState("");
    const [eventos, setEventos] = useState([]);
    const [fechas, setFechas] = useState([]);

    const fetchEventos = async () => {
        try {
            if (!correo) {
                setErrMsg("Correo no definido");
            }
            if (correo != null) {
                const response = await getEventos(correo);
                setEventos(response.data.nombreEvento);
                setFechas(response.data.fechaEvento);
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
        fetchEventos();
    }, []);


    return (
        <main className="mt-20">
            <div className="container flex">
                <section className="max-w-sm max-h-fit border-2 rounded-3xl p-5 mx-5">
                    <div className="container flex justify-center items-center h-screen ">
                        <div className="flex flex-col items-center">
                            <img src="/lunacat.png" className="rounded-full border-4 border-gray-200"/>
                            <p className="mt-4 text-primary">{correo}</p>
                            <p className="text-primary">{nombre + " " + apellido}</p>
                        </div>
                    </div>
                </section>
                <section className="w-full">
                    <h1 className="font-semibold text-4xl pb-4">Mis Eventos:</h1>

                    {eventos.length > 0 ? (
                        eventos.map((evento, index) => (
                            <Event key={index} nombre={evento} fecha={fechas[index]}/>
                        ))
                    ) : (
                        <div>
                            <p className="text-primary py-4">No hay eventos disponibles</p>
                            <CrearEventoButton/>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};
