import { CustomPasswordInput } from "@/components/CustomPasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const setToken = useAuthStore((state) => state.setToken);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        JSON.stringify({
          username: email,
          password: password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true,
        }
      );
      console.log(response?.data?.token); // token
      setToken(response?.data?.token);

      setSuccess(true);
      // borrar los estados y los inputs controlados
      setEmail("");
      setPassword("");
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      if (!error?.response) {
        setErrMsg("El servidor no responde");
      }
      else if (email === "" && password === "") {
        setErrMsg("Campos vacíos");
      }
      else if (error.response?.status === 409 || error.response?.data === 'Bad credentials') {
        setErrMsg("Credenciales incorrectas");
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
    <main className="mt-40">
      <section className="max-w-sm border-2 rounded-xl p-4 py-8 mx-4 md:mx-auto">

        <h1 className="text-3xl font-bold mb-4 text-center">
          Iniciar sesión
        </h1>
        <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
          <Input
            type="text"
            label="Correo"
            placeholder="ejemplo@email.com"
            variant="bordered"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="mb-5"
          />
          <CustomPasswordInput
            label="Contraseña"
            placeholder="***********"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <p className={`font-bold h-5 text-center my-2 ${success ? msgStyle.colorSuccess : msgStyle.colorError}`} aria-live="assertive">
            {!success ? errMsg : '¡Acceso Exitoso!'}
          </p>
          <div className="text-center">
            <Button color="primary" type="submit" size="lg">
              Log In
            </Button>
          </div>
        </form>
      </section>

    </main>
  );
}
