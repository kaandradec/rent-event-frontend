import axios from "axios";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "./icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "./icons/EyeFilledIcon";

export const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
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
          lastname: apellido,
          firstname: nombre,
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
      setNombre("");
      setApellido("");
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
          <h1 className="text-3xl font-bold mb-4">Registrarse</h1>
          <form className="max-w-xs" onSubmit={handleSubmit}>
            <CustomInput
              label="Nombre"
              type="text"
              onChange={(e) => setNombre(e.target.value)}
            />
            <CustomInput
              label="Apellido"
              type="text"
              onChange={(e) => setApellido(e.target.value)}
            />
            <CustomInput
              label="Correo electrónico"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomPasswordInput
              label="Contraseña"
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
            <Button color="primary" type="submit">
              Registrarse
            </Button>
          </form>
        </section>
      )}
    </>
  );
};

const CustomInput = ({
  label,
  type,
  variant = "bordered",
  onChange,
  placeholder,
}) => {
  return (
    <div className="mb-5">
      <Input
        type={type}
        label={label}
        variant={variant}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

const CustomPasswordInput = ({
  label,
  variant = "bordered",
  placeholder,
  onChange,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="mb-5">
      <Input
        label={label}
        variant={variant}
        placeholder={placeholder}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
        onChange={onChange}
      />
    </div>
  );
};
