import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../services/api-services";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const password = data.password;
    const confirmPassword = data.confirmPassword;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const formData = new FormData();
    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("street", data.street);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("postalCode", data.postalCode);
    formData.append("country", data.country);
    if (data.referralCode) {
      formData.append("referralCode", data.referralCode);
    }

    try {
      const user = await createUser(formData);
      console.log(user);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <div className="flex items-center justify-center mb-4">
        <img
          src="/logoetiqueta.png"
          alt="Logo de la página"
          className="w-36 mx-auto mb-4"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Nombre
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            {...register("name")}
            autoComplete="name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            {...register("email")}
            autoComplete="email"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="referralCode"
            className="block text-sm font-medium text-gray-600"
          >
            Código de Referencia (opcional)
          </label>
          <input
            id="referralCode"
            name="referralCode"
            type="text"
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            {...register("referralCode")}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="street"
            className="block text-sm font-medium text-gray-600"
          >
            Calle
          </label>
          <input
            id="street"
            name="street"
            type="text"
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            {...register("street")}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-600"
          >
            Ciudad
          </label>
          <input
            id="city"
            name="city"
            type="text"
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            {...register("city")}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-600"
          >
            Estado
          </label>
          <input
            id="state"
            name="state"
            type="text"
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            {...register("state")}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="zip"
            className="block text-sm font-medium text-gray-600"
          >
            Código postal
          </label>
          <input
            id="postalCode"
            name="postalCode"
            type="text"
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            {...register("postalCode")}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-600"
          >
            País
          </label>
          <input
            id="country"
            name="country"
            type="text"
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            {...register("country")}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            {...register("password")}
            autoComplete="new-password"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600"
          >
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            {...register("confirmPassword")}
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 focus:outline-none"
        >
          Regístrate
        </button>

        <Link className="block mt-2 text-blue-500" to="/login">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </form>
    </div>
  );
}

export default RegisterPage;
