import { useNavigate } from "react-router-dom";

function CustomerOrder() {
  const navigate = useNavigate();

  return (
    <div className="app-page">
      <header className="topbar">
        <h2>Simulasi Order</h2>
      </header>

      <main className="content">
        <section className="order-card">
          <h3>Pesanan Customer</h3>
          <p><b>Restoran:</b> WingStop</p>
          <p><b>Menu:</b> Crunchy Wings, Cheese Fries</p>
          <p><b>Total:</b> Rp109.000</p>

          <div className="warning-card">
            <h4>Verifikasi Keamanan Diperlukan</h4>
            <p>
              Order ini memiliki risiko sedang sehingga customer perlu
              melakukan verifikasi OTP/QR.
            </p>
          </div>

          <input placeholder="Masukkan kode OTP" />

          <button onClick={() => navigate("/driver")}>
            Konfirmasi dan Kirim ke Driver
          </button>
        </section>
      </main>
    </div>
  );
}

export default CustomerOrder;