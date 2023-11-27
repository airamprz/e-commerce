import { useEffect, useState } from "react";

const CookieMessage = () => {
  const [showMessage, setShowMessage] = useState(true);

  const handleAcceptCookie = () => {
    setShowMessage(false);
    localStorage.setItem("cookieAccepted", true);
  };

  useEffect(() => {
    if (localStorage.getItem("cookieAccepted")) {
      setShowMessage(false);
    }
  }, []);

  return showMessage ? (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white p-2">
      <p className="text-center">
        Este sitio web utiliza cookies para garantizar que obtengas la mejor
        experiencia en nuestra página web.
        <a
          href="/cookies"
          className="underline ml-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Leer más
        </a>
        <button
          className="ml-4 px-4 py-2 bg-black border border-white rounded"
          onClick={handleAcceptCookie}
        >
          Aceptar
        </button>
      </p>
    </div>
  ) : null;
};

export default CookieMessage;
