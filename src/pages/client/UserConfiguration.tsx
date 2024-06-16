import { useState, useEffect } from "react";
import {Avatar, Input, user} from "@nextui-org/react";
import { useAuthStore } from "@/store/auth";
import { obtenerCliente } from "@/api/client";
import { AxiosError } from "axios";

export const UserConfiguration = () => {
  const { correo: correo } = useAuthStore();

  const [firstname, setFirstame] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [genero, setGenero] = useState("");
  const [direccion, setDireccion] = useState("");
  //   const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // const navigate = useNavigate();

  const fetchClient = async () => {
    try {
      const data = await obtenerCliente(correo || "");
      console.log(data);
      setFirstame(data.nombre);
      setLastname(data.apellido);
      setEmail(data.correo);
      //   setPassword(data.password);

      setSuccess(true);
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
    }
  };

  useEffect(() => {
    fetchClient();
  }, []);

  return (
    <main className="mt-40">
      <section className="max-w-xl border-2 rounded-xl p-5 mx-4 md:mx-auto">
        <div className="flex gap-4 items-center mb-4">
          <h1 className="text-3xl font-bold">Usuario</h1>
        </div>
        <div className="flex gap-4 items-center mb-4">
          <Avatar isBordered radius="lg" src={"/lunacat.png"} className="w-20 h-20 text-large mb-4" />
        </div>
        <div className="max-w-xs mx-auto">
          <Input
            className="mb-5"
            type="text"
            label="Nombre de Usuario"
            variant="bordered"
            name="username"
            value={email}
            readOnly
          />
        </div>
      </section>
    </main>
  );
};
