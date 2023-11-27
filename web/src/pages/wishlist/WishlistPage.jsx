import { useEffect, useState } from "react";
import { getWishlistByUserId } from "../../services/api-services";
import { useAuthContext } from "../../contexts/auth-context";
import { removeFromWishlist } from "../../services/api-services";

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    getWishlistByUserId(user._id)
      .then((data) => {
        setWishlist(data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de deseos:", error);
      });
  }, [user]);

  const handleRemoveFromWishlist = (productId, wishlistId) => {
    removeFromWishlist(wishlistId, productId)
      .then((data) => {
        setWishlist(data);
      })
      .catch((error) => {
        console.error("Error al eliminar el producto:", error);
      });
  };

  if (wishlist.length === 0) {
    return (
      <div>
        <h1 className="text-3xl text-center text-gray-600 mt-7">
          LISTA DE DESEOS
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl text-center text-gray-600 mt-7">
        LISTA DE DESEOS
      </h1>
      <div className="container">
        <table className="min-w-full bg-white border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Imagen</th>
              <th className="py-2 px-4 border-b">Producto</th>
              <th className="py-2 px-4 border-b"></th>{" "}
            </tr>
          </thead>
          <tbody>
            {wishlist.items.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="py-2 px-4 border-b">
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="w-20 rounded-lg"
                  />
                </td>
                <td className="py-2 px-4 border-b">{item.product.name}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() =>
                      handleRemoveFromWishlist(item.product._id, wishlist._id)
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
      </div>
    </div>
  );  
}

export default WishlistPage;
