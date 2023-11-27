import { useEffect, useState } from "react";
import { listProducts } from "../../services/api-services";
import { Link } from "react-router-dom";

function DropPage() {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("price-asc");

  const loadProducts = () => {
    listProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        const sortedProducts = data.sort((a, b) => {
          switch (sortOption) {
            case "price-asc":
              return a.price - b.price;
            case "price-desc":
              return b.price - a.price;
            case "name-asc":
              return a.name.localeCompare(b.name);
            case "name-desc":
              return b.name.localeCompare(a.name);
            case "newest":
              return b.createdAt.localeCompare(a.createdAt);
            case "oldest":
              return a.createdAt.localeCompare(b.createdAt);
            default:
              return 0;
          }
        });
        setProducts(sortedProducts);
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, [sortOption]);

  return (
    <div>
      <nav className="text-center mb-8 bg-gray-200 p-2">
        <span
          className="text-3xl text-gray-500"
          style={{
            fontSize: "13px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          NUEVO DROP
          <div>
            <select
              className="bg-gray-200 text-gray-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="price-asc">Precio Ascendente</option>
              <option value="price-desc">Precio Descendente</option>
              <option value="name-asc">Alfabeticamente A-Z</option>
              <option value="name-desc">Alfabeticamente Z-A</option>
              <option value="newest">Más Reciente</option>
              <option value="oldest">Más Antiguo</option>
            </select>
          </div>
        </span>
      </nav>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <Link to={`/products/${product._id}`} key={i} className="relative">
              <div className="flex flex-col">
                <img
                  src={product.img}
                  alt={product.name}
                  className="rounded-lg shadow-md hover:shadow-xl"
                />
                <div className="p-4 flex flex-col items-center">
                  <h3
                    className="text-xl font-semibold mb-1"
                    style={{ fontSize: "15px" }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-gray-600" style={{ fontSize: "14px" }}>
                    €{product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DropPage;
