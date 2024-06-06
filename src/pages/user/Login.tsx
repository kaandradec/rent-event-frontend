import { CustomPasswordInput } from "@/components/CustomPasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { AxiosError } from "axios";
import { useAuthStore } from "@/store/auth";
import { useState } from "react";
import { loginRequest } from "@/api/auth";
import { useNavigate } from "react-router-dom";

export const LoginUser = () => {
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
      const response = await loginRequest(email, password);
      console.log(response?.data); // token
      setToken(response?.data?.token);
      setRole(response?.data?.role);
      setSuccess(true);
      resetInputs();
      navigate("/user/dashboard");
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
    <main className="mt-40">
      <section className="max-w-sm border-2 rounded-xl p-4 mx-4 md:mx-auto">

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
          <p className={`h-5 text-center my-2 ${success ? msgStyle.colorSuccess : msgStyle.colorError}`} aria-live="assertive">
            {!success ? errMsg : '¡Acceso Exitoso!'}
          </p>
          <div className="text-center">
            <Button color="primary" type="submit" size="lg">
              Log In
            </Button>
          </div>
          <section className="flex justify-center my-2 cursor-pointer">
            <a
              onClick={() => navigate("/auth/user/register")}
              className="text-blue-600 hover:underline dark:text-blue-500 font-bold "
            >
              Registrarse
            </a>
          </section>
        </form>
      </section>
    </main>
  );
}

