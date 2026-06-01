function SuperadminSettings() {
  return (
    <div className="dashboard-page">
      <h1>Superadmin Settings</h1>
      <p>Pengaturan threshold dan bobot risiko order fiktif.</p>

      <div className="settings-grid">
        <section className="info-card">
          <h3>Threshold Risiko</h3>
          <p>0–39 = Risiko Rendah</p>
          <p>40–69 = Risiko Sedang</p>
          <p>70–100 = Risiko Tinggi</p>
        </section>

        <section className="info-card">
          <h3>Bobot Indikator</h3>
          <p>Akun baru: 15%</p>
          <p>Riwayat pembatalan: 30%</p>
          <p>Lokasi mencurigakan: 20%</p>
          <p>Pola pesanan tidak wajar: 20%</p>
          <p>Gagal verifikasi OTP/QR: 15%</p>
        </section>
      </div>
    </div>
  );
}

export default SuperadminSettings;