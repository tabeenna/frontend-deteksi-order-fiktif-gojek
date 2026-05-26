import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/user/LoginPage";
import SignUpPage from "./pages/user/SignUpPage";
import VerifyOtpPage from "./pages/user/VerifyOtpPage";
import CompleteProfilePage from "./pages/user/CompleteProfilePage";
import UploadKtpPage from "./pages/user/UploadKtpPage";
import UploadFacePage from "./pages/user/UploadFacePage";
import BankDetailPage from "./pages/user/BankDetailPage";
import RegistrationSuccessPage from "./pages/user/RegistrationSuccessPage";
import DriverOrdersPage from "./pages/user/DriverOrdersPage";
import DriverHome from "./pages/user/DriverHome";
import CustomerHome from "./pages/user/CustomerHome";
import CustomerOrder from "./pages/user/CustomerOrder";
import DriverEarningsPage from "./pages/user/DriverEarningsPage";
import DriverAccountPage from "./pages/user/DriverAccountPage";
import DriverHistoryPage from "./pages/user/DriverHistoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/driver/earnings" element={<DriverEarningsPage />} />
        <Route path="/driver/history" element={<DriverHistoryPage />} />
        <Route path="/driver/orders" element={<DriverOrdersPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/complete-profile" element={<CompleteProfilePage />} />
        <Route path="/upload-ktp" element={<UploadKtpPage />} />
        <Route path="/upload-face" element={<UploadFacePage />} />
        <Route path="/bank-detail" element={<BankDetailPage />} />
        <Route path="/registration-success" element={<RegistrationSuccessPage />} />
        <Route path="/driver" element={<DriverHome />} />
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/customer/order" element={<CustomerOrder />} />
        <Route path="/driver/account" element={<DriverAccountPage />} />
        <Route path="/" element={<LoginPage />} /> 
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/driver" element={<DriverHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;