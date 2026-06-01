function DriverHome() {
  return (
    <div className="app-page">
      <header className="topbar">
        <h2>Gojek Driver</h2>
      </header>

      <main className="content">
        <section className="order-card danger-card">
          <h3>Order Masuk</h3>
          <p><b>Customer:</b> Rahma</p>
          <p><b>Restoran:</b> WingStop</p>
          <p><b>Total:</b> Rp109.000</p>
          <p><b>Skor Risiko:</b> 85/100</p>
          <p><b>Kategori:</b> Risiko Tinggi</p>

          <p>
            Order ini terdeteksi mencurigakan. Driver disarankan untuk menolak
            order atau menunggu verifikasi tambahan.
          </p>

          <div className="button-row">
            <button className="danger-button">Tolak Order</button>
            <button>Lanjut Verifikasi</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default DriverHome;