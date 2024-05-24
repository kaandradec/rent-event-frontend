import { AxiosError } from "axios";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { registerRequest } from "@/api/auth";

export const Register = () => {
  const [firstname, setFirstame] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);


  const resetInputs = () => {
    // borrar los estados y los inputs controlados
    setFirstame("");
    setLastname("");
    setEmail("");
    setPassword("");
  }

  const validateInputs = () => {
    if (firstname === "" || lastname === "" || email === "" || password === "") {
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
      const response = registerRequest(firstname, lastname, email, password);
      console.log(response);
      setSuccess(true);
      resetInputs();

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
    <main className="mt-40">
      <section className="max-w-sm border-2 rounded-xl p-4 mx-4 md:mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Registrarse</h1>
        <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
          <Input
            className="mb-5"
            type="text"
            label="Nombre"
            variant="bordered"
            onChange={(e) => setFirstame(e.target.value)}
          />
          <Input
            className="mb-5"
            type="text"
            label="Apellido"
            variant="bordered"
            onChange={(e) => setLastname(e.target.value)}
          />
          <Input
            className="mb-5"
            type="email"
            label="Correo electrónico"
            variant="bordered"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className="mb-5"
            type="password"
            label="Contraseña"
            variant="bordered"
            placeholder="Ingresa tu contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
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
          <p className={`h-5 text-center my-2 ${success ? msgStyle.colorSuccess : msgStyle.colorError}`} aria-live="assertive">
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
