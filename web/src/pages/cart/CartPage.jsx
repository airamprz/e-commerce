import { useAuthContext } from "../../contexts/auth-context";
import { getCartByUserId } from "../../services/api-services";
import { useEffect, useState } from "react";
import { removeFromCart } from "../../services/api-services";
import { createOrderFromCart } from "../../services/api-services";
import { updateCartQuantity } from "../../services/api-services";


function CartPage() {
  const [cart, setCart] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    getCartByUserId(user._id).then((data) => {
      setCart(data);
    });
  }, [user]);

  const handleUpdateCartQuantity = (cartId, productId, quantity) => {
    updateCartQuantity(cartId, productId, quantity)
      .then((data) => {
        setCart(data);
      })
      .catch((error) => {
        console.error("Error al actualizar la cantidad:", error);
      });
  };

  const handleRemoveFromCart = (productId, cartId) => {
    removeFromCart(cartId, productId)
      .then((data) => {
        setCart(data);
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
      });
  };

  const handleCreateOrderFromCart = () => {
    createOrderFromCart(user._id)
      .then((data) => {
        setCart(data);
      })
      .catch((error) => {
        console.error("Error al crear la orden:", error);
      });
  };

  const calculateSubtotal = () => {
    if (!cart) return 0;
    return cart.items.reduce(
      (accumulator, item) => accumulator + item.product.price * item.quantity,
      0
    );
  };

  if (!cart)
    return (
      <div>
        <h1 className="text-3xl text-center text-gray-600 mt-7">TU CARRITO</h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl text-center text-gray-600 mt-7">TU CARRITO</h1>
      <div className="container">
        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Imagen</th>
              <th className="py-2 px-4 border-b">Producto</th>
              <th className="py-2 px-4 border-b">Precio</th>
              <th className="py-2 px-4 border-b">Talla</th>
              <th className="py-2 px-4 border-b">Cantidad</th>
              <th className="py-2 px-4 border-b"></th>{" "}
            </tr>
          </thead>
          <tbody>
            {cart.items.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="py-2 px-4 border-b">
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="w-20 rounded-lg"
                  />
                </td>
                <td className="py-2 px-4 border-b">{item.product.name}</td>
                <td className="py-2 px-4 border-b">{item.product.price}€</td>
                <td className="py-2 px-4 border-b">{item.size}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() =>
                        handleUpdateCartQuantity(
                          cart._id,
                          item.product._id,
                          item.quantity - 1
                        )
                      }
                      className="hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-l"
                    >
                      -
                    </button>
                    <span className="py-2 px-4">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateCartQuantity(
                          cart._id,
                          item.product._id,
                          item.quantity + 1
                        )
                      }
                      className="hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() =>
                      handleRemoveFromCart(item.product._id, cart._id)
                    }
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          Impuestos incluidos y envío calculado al finalizar la compra.
        </div>
        <div className="flex justify-end mt-4">
          <p className="text-lg font-bold">Subtotal: {calculateSubtotal()}€</p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCreateOrderFromCart}
            className="bg-black text-white px-4 py-2 mt-4 rounded hover:bg-gray-900 focus:outline-none"
          >
            Hacer pedido
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
