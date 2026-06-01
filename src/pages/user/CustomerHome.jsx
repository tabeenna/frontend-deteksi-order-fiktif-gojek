import { useNavigate } from "react-router-dom";

function CustomerHome() {
  const navigate = useNavigate();

  return (
    <div className="app-page">
      <header className="topbar">
        <input placeholder="Cari layanan, makanan, & tujuan" />
        <div className="profile">👤</div>
      </header>

      <main className="content">
        <section className="gopay-card">
          <p>GoPay</p>
          <h2>Rp125.000</h2>
          <span>Klik & cek riwayat</span>
        </section>

        <section className="service-grid">
          <div>🏍️<span>GoRide</span></div>
          <div>🚗<span>GoCar</span></div>
          <div>🍽️<span>GoFood</span></div>
          <div>📦<span>GoSend</span></div>
        </section>

        <section className="info-card">
          <h3>Deteksi Order Fiktif</h3>
          <p>
            Sistem menilai risiko order berdasarkan akun baru, riwayat
            pembatalan, lokasi mencurigakan, pola pesanan tidak wajar, dan
            verifikasi OTP/QR.
          </p>
        </section>

        <button onClick={() => navigate("/customer/order")}>
          Buat Simulasi Order
        </button>
      </main>
    </div>
  );
}

export default CustomerHome;