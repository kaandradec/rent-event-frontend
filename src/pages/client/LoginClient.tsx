import { loginRequestClient } from "@/api/auth";
import { CustomPasswordInput } from "@/components/CustomPasswordInput";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { Input } from "@nextui-org/react";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginClient = () => {
  return (
    <main className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] lg:h-dvh">
      <section className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Login />
        </div>
      </section>
      <section className="hidden bg-muted lg:block hfu lg:overflow-hidden">
        <img
          src="/lunacat.png"
          alt="Image"
          className="dark:brightness-[0.2] dark:grayscale w-full"
        />
      </section>
    </main>
  )
}


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const setToken = useAuthStore((state) => state.setToken);
  const setRole = useAuthStore((state) => state.setRole);

  const navigate = useNavigate();

  const resetInputs = () => {
    // borrar los estados y los inputs controlados
    setEmail("");
    setPassword("");
  }

  const validateInputs = () => {
    if (email === "" || password === "") {
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
      const response = await loginRequestClient(email, password);
      console.log(response?.data);
      setToken(response?.data?.token);
      setRole(response?.data?.role);
      setSuccess(true);
      resetInputs();
      navigate("/api/me");
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.response?.data);
      if (!error?.response) {
        setErrMsg("El servidor no responde");
      } else if (error.response?.status === 409 || error.response?.data === 'Bad credentials') {
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
    <main>
      <section className="">
        <h1 className="text-4xl font-bold mb-4 text-center">
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
          <p className={`h-5 text-center my-2 ${success ? msgStyle.colorSuccess : msgStyle.colorError}`} aria-live="assertive">
            {!success ? errMsg : '¡Acceso Exitoso!'}
          </p>
          <Button className="w-full" color="primary" type="submit" size="lg">
            Log In
          </Button>
          <section className="flex justify-center my-2 cursor-pointer">
            <p>No tienes una cuenta? <a
              onClick={() => navigate("/auth/register")}
              className="text-blue-600 hover:underline dark:text-blue-500 font-bold "
            >
              Registrarse
            </a>
            </p>
          </section>
        </form>
      </section>
    </main>
  );
}


