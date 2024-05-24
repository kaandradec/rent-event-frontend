import axios from "axios";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";

export const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/register",
        JSON.stringify({
          username: email,
          password: password,
          lastname: lastname,
          firstname: name,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      // borrar los estados y los inputs controlados
      setEmail("");
      setPassword("");
      setName("");
      setLastname("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("El servidor no responde");
      } else if (err.response?.status === 409) {
        setErrMsg("Usuario ya registrado");
      } else {
        setErrMsg("Error desconocido");
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section className="max-w-sm mx-auto">
          <p className="text-red-500 font-bold h-5" aria-live="assertive">
            {errMsg}
          </p>
          <h1 className="text-3xl font-bold mb-4 text-center">Registrarse</h1>
          <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
            <Input
              className="mb-5"
              type="text"
              label="Nombre"
              variant="bordered"
              onChange={(e) => setName(e.target.value)}
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
              type="email"
              label="Contraseña"
              variant="bordered"
              placeholder="Ingresa tu contraseña"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-start mb-5">
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
            <div className="text-center">
              <Button color="primary" type="submit" className="font-bold">
                Registrarse
              </Button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};
