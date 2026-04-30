import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CustomerHome from "./pages/CustomerHome";
import CustomerOrder from "./pages/CustomerOrder";
import DriverHome from "./pages/DriverHome";
import AdminDashboard from "./pages/AdminDashboard";
import SuperadminSettings from "./pages/SuperadminSettings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/customer/order" element={<CustomerOrder />} />
        <Route path="/driver" element={<DriverHome />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/superadmin" element={<SuperadminSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;