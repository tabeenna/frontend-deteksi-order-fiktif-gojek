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
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminHome from "./pages/superadmin/SuperAdminHome";
import SuperAdminOrders from "./pages/superadmin/SuperAdminOrders";
import SuperAdminDrivers from "./pages/superadmin/SuperAdminDrivers";
import SuperAdminDatabase from "./pages/superadmin/SuperAdminDatabase";
import SuperAdminAuditLogs from "./pages/superadmin/SuperAdminAuditLogs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/superadmin" element={<SuperAdminHome />} />
        <Route path="/superadmin/orders" element={<SuperAdminOrders />} />
        <Route path="/superadmin/drivers" element={<SuperAdminDrivers />} />
        <Route path="/superadmin/database" element={<SuperAdminDatabase />} />
        <Route path="/superadmin/audit" element={<SuperAdminAuditLogs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;