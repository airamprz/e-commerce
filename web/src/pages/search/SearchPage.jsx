import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { search } from "../../services/api-services";

function SearchPage() {
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get("term");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = `Resultados de "${searchTerm}" | ELPUNTOCLOTHING`;

    search(searchTerm)
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => {
        console.error("Error en la búsqueda:", error);
        setError("Error al realizar la búsqueda. Por favor, inténtalo de nuevo más tarde.");
      });

  }, [searchTerm]);

  return (
    <div>
      <h1 className="text-3xl text-center text-gray-600 mt-7">Resultados de {searchTerm}</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((result) => (
            <li key={result.id} className="mb-8">
              <img src={result.img} alt={result.name} className="rounded-lg" />
              <h2 className="text-xl font-semibold mb-2 text-center">{result.name}</h2>
              <p className="text-gray-500 mt-2 text-center">€{result.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchPage;
