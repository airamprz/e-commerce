import { useEffect, useState } from "react";
import { getAllOrders, updateOrder } from "../../services/api-services";
import { useAuthContext } from "../../contexts/auth-context";
import { Navigate } from "react-router-dom";

function OrdersPage() {
  const { isAdmin } = useAuthContext();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders().then((orders) => {
      console.log(orders);
      setOrders(orders);
    });
  }, []);

  const handleUpdateOrder = (id, status) => {
    updateOrder(id, status).then((order) => {
      const orderIndex = orders.findIndex((o) => o._id === id);
      const newOrders = [...orders];
      newOrders[orderIndex] = order;
      setOrders(newOrders);
    });
  };

  if (!isAdmin()) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1 className="text-3xl text-center text-gray-600 mt-7">ORDENES</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <p>
              <strong>Orden ID:</strong> {order._id}
            </p>
            <p>
              <strong>Fecha de la Orden:</strong>{" "}
              {new Date(order.orderDate).toLocaleString()}
            </p>
            <p>
              <p>
                <strong>Usuario:</strong>{" "}
                {order.user ? order.user.name : "Usuario no disponible"}
              </p>
            </p>
            <p>
              <strong>Productos:</strong>
            </p>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.product.name} - Cantidad: {item.quantity} - Talla:{" "}
                  {item.product.size}
                </li>
              ))}
            </ul>
            <p>
              <strong>Total:</strong> €{order.total}
            </p>
            <p>
              <strong className="text-red-600">Estado:</strong> {order.status}
            </p>
            <select
              value={order.status}
              onChange={(e) => handleUpdateOrder(order._id, e.target.value)}
            >
              <option value="pendiente">Pendiente</option>
              <option value="enviado">Enviado</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
            </select>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersPage;
