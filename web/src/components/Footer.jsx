import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-black mb-3">
      <hr className="mt-20" />
      <div className="container mx-auto m-10">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1">
            <img
              src="/logoetiqueta.png"
              alt="Payment Options"
              className="ms-10 h-12"
            />
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <Link to="/delivery" className="text-black">
              DELIVERY & RETURNS+
            </Link>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <Link to="/customer" className="text-black">
              CUSTOMER CARE+
            </Link>
          </div>
          
          <div className="col-span-1 flex items-center justify-center">
            <Link to="/conditions" className="text-black">
            TERMS & CONDITIONS+
            </Link>
          </div>
        </div>
      </div>
      <hr className="border-t-4 border-red-500" />
      <div className="bg-gray-200 mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://cdn.shopify.com/s/files/1/1248/9105/files/payment-options.png?v=1665689916"
            alt="Payment Options"
            className="h-6 mr-4"
          />
        </div>
        <div>
          <span className="text-gray-500">
            &copy; 2023 elpuntoclothing | All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
