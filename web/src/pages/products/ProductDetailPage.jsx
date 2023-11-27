import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { detailProduct } from "../../services/api-services";
import { addToCart } from "../../services/api-services";
import { addToWishlist } from "../../services/api-services";
import { getCartByUserId } from "../../services/api-services";
import { getWishlistByUserId } from "../../services/api-services";
import { useAuthContext } from "../../contexts/auth-context";

function ProductDetailPage() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState(null);
  const [wishlist, setWishlist] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const loadProductDetails = () => {
      detailProduct(id).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setProduct(data);
        }
      });
    };
    loadProductDetails();
  }, [id]);

  useEffect(() => {
    if (user) {
      const loadCart = () => {
        getCartByUserId(user._id).then((data) => {
          setCart(data);
        });
      };
      loadCart();

      const loadWishlist = () => {
        getWishlistByUserId(user._id).then((data) => {
          setWishlist(data);
        });
      };
      loadWishlist();
    }
  }, [user]);

  const handleAddToCart = (productId, cartId, size) => {
    if (user) {
      addToCart(cartId, productId, size)
        .then((data) => {
          setCart(data);
        })
        .catch((error) => {
          console.error("Error al agregar el producto:", error);
        });
    }
  };

  const handleAddToWishlist = (productId, wishlistId) => {
    if (user) {
      addToWishlist(wishlistId, productId)
        .then((data) => {
          setWishlist(data);
        })
        .catch((error) => {
          console.error("Error al agregar el producto:", error);
        });
    }
  };

  return (
    <div>
      <nav className="mb-8 bg-gray-200 p-2">
        <RouterLink
          to="/drop"
          className="text-3xl text-gray-500 hover:underline ml-4"
          style={{ fontSize: "13px" }}
        >
          <i className="fas fa-arrow-left"></i> VOLVER AL DROP
        </RouterLink>
      </nav>
      <div className="container mx-auto p-8">
        {product && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.img}
                alt={product.name}
                className={`rounded-lg ${
                  isHovered ? "transform scale-110 transition-transform" : ""
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            </div>
            <div className="text-center flex flex-col">
              <h2 className="text-3xl mb-8">{product.name}</h2>
              <p className="text-gray-600">€{product.price}</p>
              <hr />
              <p className="text-gray-600 mt-4">Tamaño:</p>
              <select
                className="border border-gray-300 rounded px-4 py-2 mt-4"
                value={selectedSize}
                onChange={(event) => setSelectedSize(event.target.value)}
              >
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              <hr />
              {user ? (
                <>
                  <button
                    onClick={() =>
                      handleAddToCart(product._id, cart._id, selectedSize)
                    }
                    className="bg-black text-white px-4 py-2 mt-4 rounded hover:bg-gray-900 focus:outline-none"
                  >
                    Agregar al carrito
                  </button>
                  <button
                    onClick={() =>
                      handleAddToWishlist(product._id, wishlist._id)
                    }
                    className="bg-black text-white px-4 py-2 mt-4 rounded hover:bg-gray-900 focus:outline-none"
                  >
                    <i className="fa fa-heart" />
                  </button>
                </>
              ) : (
                <button className="bg-black text-white px-4 py-2 mt-4 rounded hover:bg-gray-900 focus:outline-none">
                  <RouterLink to="/login" className="text-white">
                    Inicia sesión para agregar al carrito o a la lista de deseos
                  </RouterLink>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailPage;
