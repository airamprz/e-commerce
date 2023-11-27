import { useState, useEffect } from "react";
import { sendEmail } from "../services/api-services";

const EmailModal = () => {
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSendEmail = () => {
    const hasEmailBeenSent = localStorage.getItem("emailSent");

    if (!hasEmailBeenSent) {
      sendEmail({ email })
        .then(() => {
          localStorage.setItem("emailSent", true);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    } else {
      setIsModalOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    if (email) {
      sendEmail({ email })
        .then(() => {
          localStorage.setItem("emailSent", true);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Error sending email:", error);
        });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const hasEmailBeenSent = localStorage.getItem("emailSent");

    if (hasEmailBeenSent) {
      setIsModalOpen(false);
    }
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
        isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-black p-6 rounded-md shadow-md">
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleCloseModal}
          >
            X
          </button>
        </div>
        <p className="font-semibold mb-10 text-center text-white">
          NO TE PIERDAS NINGUN DROP
        </p>
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            className="border border-gray-400 rounded-md w-80 h-10 p-2 mb-7"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
            name="email"
          />
          <button
            className="bg-white text-black rounded-md w-80 h-10 p-2 mb-16"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
