import { useAuthStore } from "@/store/auth";
import { useState, useEffect } from "react";

const DevTool = () => {
  const [collapsed, setCollapsed] = useState(true);

  const {
    token: globalToken,
    rol: globalRole,
    nombre: globalFirstName,
    apellido: globalLastName,
    correo: globalUsername,
    setToken: setGlobalToken,
    setRol: setGlobalRole,
    setNombre: setGlobalFirstName,
    setApellido: setGlobalLastName,
    setCorreo: setGlobalUsername,
  } = useAuthStore();

  const [token, setToken] = useState(globalToken);
  const [role, setRole] = useState(globalRole);
  const [firstName, setFirstName] = useState(globalFirstName);
  const [lastName, setLastName] = useState(globalLastName);
  const [username, setUsername] = useState(globalUsername);
  const [btnClicked, setBtnClicked] = useState(false);

  useEffect(() => {
    setToken(globalToken);
    setRole(globalRole);
    setFirstName(globalFirstName);
    setLastName(globalLastName);
    setUsername(globalUsername);
  }, [
    globalToken,
    globalRole,
    globalFirstName,
    globalLastName,
    globalUsername,
  ]);

  const handleSubmit = () => {
    if (token !== globalToken) setGlobalToken(token);
    if (role !== globalRole) setGlobalRole(role);
    if (firstName !== globalFirstName) setGlobalFirstName(firstName);
    if (lastName !== globalLastName) setGlobalLastName(lastName);
    if (username !== globalUsername) setGlobalUsername(username);
    // time span
    setBtnClicked(true);
    setTimeout(() => {
      setBtnClicked(false);
    }, 2000);
  };

  return (
    <>
      <div className="fixed bottom-0 p-2">
        <section className="flex gap-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xs bg-blue-500 text-white  py-1 px-2 rounded"
          >
            {collapsed ? "Herramienta de desarrollo" : "Cerrar"}
          </button>
          {!collapsed && (
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-1 px-2 rounded"
            >
              Cambiar estados globales
            </button>
          )}
          {btnClicked && <span className="text-lg text-green-500">🔄️✅</span>}
        </section>

        {!collapsed && (
          <div
            className="grid grid-cols-2 gap-4 mt-1 p-2 rounded-md bg-gray-200 dark:bg-gray-800 shadow-md
          "
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Token
              </label>
              <input
                placeholder="Token"
                value={token || ""}
                onChange={(e) => setToken(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>
              <select
                value={role || ""}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">SIN ROL</option>
                <option value="CLIENTE">CLIENTE</option>
                <option value="USUARIO">USUARIO</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input
                placeholder="First Name"
                value={firstName || ""}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                placeholder="Last Name"
                value={lastName || ""}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>
              <input
                placeholder="Username"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DevTool;
