import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/api-services";
import { useAuthContext } from "../../contexts/auth-context";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { onLogin } = useAuthContext();

  function handleLogin(data) {
    login(data).then((response) => {
      onLogin(response);
      navigate("/");
    });
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <div className="flex items-center justify-center mb-4">
        <img
          src="/logoetiqueta.png"
          alt="Logo de la página"
          className="w-36 mx-auto mb-4"
        />
      </div>

      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-gray-600 text-sm mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            className="p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            id="email"
            {...register("email")}
            autoComplete="email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block font-medium text-gray-600 text-sm mb-2">
            Contraseña
          </label>
          <input
            {...register("password")}
            type="password"
            className="p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            id="password"
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 focus:outline-none">
          Iniciar sesión
        </button>

        <Link className="block mt-2 text-blue-500 hover:underline" to="/register">
          Registrarse
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
