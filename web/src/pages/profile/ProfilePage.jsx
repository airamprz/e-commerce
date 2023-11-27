import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/auth-context";
import { getOrdersByUserId, updateAddress } from "../../services/api-services";

const Profile = () => {
  const { user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [updateData, setUpdateData] = useState({
    street: user.street,
    city: user.city,
    state: user.state,
    postalCode: user.postalCode,
    country: user.country,
  });
  const [showUpdateAddress, setShowUpdateAddress] = useState(false);

  useEffect(() => {
    getOrdersByUserId(user._id).then((orders) => setOrders(orders));
  }, [user._id]);

  const handleCopyReferralCode = () => {
    const referralCode = user.referralCode;
    const tempInput = document.createElement("input");
    tempInput.value = referralCode;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Código de referido copiado al portapapeles");
  };

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    updateAddress(user._id, updateData).then((user) => {
      alert("Dirección actualizada");
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-md">
        <div className="text-center">
          {user && (
            <div>
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-20 h-20 mx-auto rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">
                <strong>Código de Referido:</strong> {user.referralCode}
              </p>
              <button
                onClick={handleCopyReferralCode}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mb-4 mr-2"
              >
                Copiar Código de Referido
              </button>
              <button
                onClick={() => setShowUpdateAddress(!showUpdateAddress)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mb-4"
              >
                {showUpdateAddress
                  ? "Cancelar Actualización"
                  : "Actualizar Dirección"}
              </button>
              <hr className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mt-4">
                    Dirección de envío
                  </h3>
                  <p>
                    <strong>Calle:</strong> {user.street}
                  </p>
                  <p>
                    <strong>Ciudad:</strong> {user.city}
                  </p>
                  <p>
                    <strong>Estado:</strong> {user.state}
                  </p>
                  <p>
                    <strong>Código Postal:</strong> {user.postalCode}
                  </p>
                  <p>
                    <strong>País:</strong> {user.country}
                  </p>
                </div>
                <div>
                  {showUpdateAddress && (
                    <form onSubmit={handleUpdateAddress}>
                      <h3 className="text-xl font-semibold mt-4">
                        Actualizar Dirección
                      </h3>
                      <label>
                        Calle:
                        <input
                          type="text"
                          name="street"
                          value={updateData.street}
                          onChange={handleInputChange}
                        />
                      </label>
                      <label>
                        Ciudad:
                        <input
                          type="text"
                          name="city"
                          value={updateData.city}
                          onChange={handleInputChange}
                        />
                      </label>
                      <label>
                        Estado:
                        <input
                          type="text"
                          name="state"
                          value={updateData.state}
                          onChange={handleInputChange}
                        />
                      </label>
                      <label>
                        Código Postal:
                        <input
                          type="text"
                          name="postalCode"
                          value={updateData.postalCode}
                          onChange={handleInputChange}
                        />
                      </label>
                      <label>
                        País:
                        <input
                          type="text"
                          name="country"
                          value={updateData.country}
                          onChange={handleInputChange}
                        />
                      </label>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mb-4">
                        Actualizar
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mt-8">
                  Pedidos anteriores
                </h3>
                <ul>
                  {orders.map((order) => (
                    <li key={order._id} className="my-4">
                      <p>
                        <strong>Orden ID:</strong> {order._id}
                      </p>
                      <p>
                        <strong>Fecha de la Orden:</strong>{" "}
                        {new Date(order.orderDate).toLocaleString()}
                      </p>
                      <p>
                        <strong>Productos:</strong>
                      </p>
                      <ul>
                        {order.items.map((item) => (
                          <li key={item._id}>
                            {item.product.name} - Cantidad: {item.quantity}
                          </li>
                        ))}
                      </ul>
                      <p>
                        <strong>Total:</strong> €{order.total}
                      </p>
                      <p>
                        <strong className="text-red-600">Estado:</strong>{" "}
                        {order.status}
                      </p>
                      <hr />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
