import Navbar from "./components/Navbar";
import CookieMessage from "./components/Cookie";
import Footer from "./components/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/register/RegisterPage";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import CookiesPage from "./pages/terms/cookies/CookiesPage";
import Profile from "./pages/profile/ProfilePage";
import ProductCreatePage from "./pages/products/ProductCreatePage";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import DropPage from "./pages/drop/DropPage";
import CartPage from "./pages/cart/CartPage";
import WishlistPage from "./pages/wishlist/WishlistPage";
import OrdersPage from "./pages/orders/OrdersPage";
import EmailModal from "./components/EmailModal";
import DeliveryPage from "./pages/terms/delivery/DeliveryPage";
import CustomerPage from "./pages/terms/customer/CustomerPage";
import ConditionsPage from "./pages/terms/conditions/ConditionsPage";
import SearchPage from "./pages/search/SearchPage";








function App() {
  return (
    <div>
      <Navbar />


      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<ProductCreatePage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/drop" element={<DropPage />} />
          <Route path="/carts/:userId" element={<CartPage />} />
          <Route path="/wishlist/:userId" element={<WishlistPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/cookies" element={<CookiesPage/>} />
          <Route path="/delivery" element={<DeliveryPage/>} />
          <Route path="/customer" element={<CustomerPage/>} />
          <Route path="/conditions" element={<ConditionsPage/>} />
          <Route path="*" element={<Navigate to="/register" />} />
        </Routes>

      <EmailModal />
      <CookieMessage />
      <Footer />
    </div>
  );
}

export default App;

