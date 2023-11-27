import { useState } from "react";
import { createProduct } from "../../services/api-services";
import { useAuthContext } from "../../contexts/auth-context";
import { Navigate } from "react-router-dom";

function ProductCreatePage() {
  const { isAdmin } = useAuthContext();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    img: "",
    category: "otros",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setProduct({
        ...product,
        [name]: files[0],
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("img", product.img);
    formData.append("category", product.category);

    createProduct(formData)
      .then((response) => {
        console.log("Producto creado exitosamente:", response);
      })
      .catch((error) => {
        console.error("Error al crear el producto:", error);
      });
  };

  if (!isAdmin()) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-3xl text-center text-gray-600 mt-7 mb-10">
        CREAR PRODUCTO
      </h1>
      <form onSubmit={handleCreateProduct}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Nombre del Producto
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            value={product.name}
            onChange={handleChange}
            autoComplete="name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Descripción del Producto
          </label>
          <input
            id="description"
            name="description"
            type="text"
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            value={product.description}
            onChange={handleChange}
            autoComplete="description"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-600"
          >
            Categoría del Producto
          </label>
          <select
            id="category"
            name="category"
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            value={product.category}
            onChange={handleChange}
          >
            <option value="camisetas">Camisetas</option>
            <option value="sudaderas">Sudaderas</option>
            <option value="pantalones">Pantalones</option>
            <option value="accesorios">Accesorios</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Precio del Producto
          </label>
          <input
            id="price"
            name="price"
            type="text"
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            value={product.price}
            onChange={handleChange}
            autoComplete="price"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="img"
            className="block text-sm font-medium text-gray-600"
          >
            Imagen del Producto
          </label>
          <input
            id="img"
            name="img"
            type="file"
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:ring focus:ring-blue-400"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-purple-700 text-white px-4 py-2 rounded hover-bg-purple-800 focus:outline-none"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
}

export default ProductCreatePage;
