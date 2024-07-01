import React, {useEffect, useState} from "react";
import {AxiosError} from "axios";
import {getPreguntaSeguraCliente} from "@/api/preguntas_seguras.ts";
import {Input} from "@nextui-org/react";

interface InputPreguntaSeguraProps {
    correo: string;
    setPregunta: React.Dispatch<React.SetStateAction<string>>;
    setRespuesta: React.Dispatch<React.SetStateAction<string>>;
}

export const PreguntaSeguraInput: React.FC<InputPreguntaSeguraProps> = ({correo, setPregunta, setRespuesta}) => {
    const [preguntaSegura, setPreguntaSegura] = useState<string>("");
    const [errMsg, setErrMsg] = useState("");

    const fetchPreguntaRandom = async () => {
        try {
            if (!correo) {
                throw new Error("Correo no definido");
            }
            const data =
                await getPreguntaSeguraCliente(correo);
            console.log(data.data.preguntasSeguras[0])
            setPreguntaSegura(data.data.preguntasSeguras[0]);
            setPregunta(data.data.preguntasSeguras[0]);
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
            console.log(errMsg)
        }
    };
    useEffect(() => {
        fetchPreguntaRandom();
    }, []);


    return (
        <div>
                <Input
                    type="text"
                    label="Pregunta Segura"
                    placeholder="No has registrado preguntas..."
                    variant="bordered"
                    isReadOnly={true}
                    value={preguntaSegura}
                    className="mb-2"
                />
                <Input
                    type="text"
                    label="Respuesta"
                    placeholder="Escribe tu respuesta secreta"
                    variant="bordered"
                    className="mb-5"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setRespuesta(e.target.value.toUpperCase());
                    }}
                />
        </div>
);
}
