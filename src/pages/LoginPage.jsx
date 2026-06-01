import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="logo">G</div>

        <h1>Masuk ke Gojek</h1>
        <p>Aplikasi simulasi deteksi order fiktif.</p>

        <label>Email atau Nomor Telepon</label>
        <input type="text" placeholder="Masukkan email atau nomor telepon" />

        <label>Kata Sandi</label>
        <input type="password" placeholder="Masukkan kata sandi" />

        <button onClick={() => navigate("/customer")}>
          Masuk sebagai Customer
        </button>

        <button onClick={() => navigate("/driver")}>
          Masuk sebagai Driver
        </button>

        <button onClick={() => navigate("/admin")}>
          Masuk sebagai Admin
        </button>

        <button onClick={() => navigate("/superadmin")}>
          Masuk sebagai Superadmin
        </button>
      </div>
    </div>
  );
}

export default LoginPage;