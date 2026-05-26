import heroImage from "../assets/gojek-logo.jpeg";
function AuthLeftPanel() {
  return (
    <section style={styles.left}>
      <div style={styles.logoBox}>
        <img src={heroImage} alt="Gojek Logo" style={styles.logoImage} />
      </div>

      <h1 style={styles.leftTitle}>
        Selamat Datang di <br />
        Gojek Driver
      </h1>

      <p style={styles.leftText}>
        Bergabunglah dengan jutaan orang lainnya untuk menikmati kemudahan
        transportasi, pesan antar makanan, dan pembayaran digital dalam satu
        aplikasi.
      </p>

      <div style={styles.featureRow}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🚲</div>
          <div>
            Layanan Transportasi <br />
            Terpercaya
          </div>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🍴</div>
          <div>
            Pesan Antar Makanan <br />
            Tercepat
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  left: {
    minHeight: "100vh",
    height: "100%",
    background: "#00aa13",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "22px",
    padding: "40px 64px",
    textAlign: "center",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  logoBox: {
    width: "170px",
    height: "170px",
    background: "#06140a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "24px",
    overflow: "hidden",
    marginBottom: "8px",
  },

  logoImage: {
    width: "110px",
    height: "110px",
    objectFit: "contain",
  },

  leftTitle: {
    fontSize: "38px",
    lineHeight: "1.15",
    margin: 0,
    fontWeight: 800,
  },

  leftText: {
    maxWidth: "560px",
    fontSize: "17px",
    lineHeight: "1.7",
    margin: 0,
    opacity: 0.95,
  },

  featureRow: {
    display: "flex",
    gap: "20px",
    marginTop: "12px",
    justifyContent: "center",
  },

  featureCard: {
    width: "220px",
    padding: "22px 18px",
    border: "1px solid rgba(255,255,255,0.28)",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.08)",
    fontWeight: 700,
    lineHeight: "1.5",
    boxSizing: "border-box",
  },

  featureIcon: {
    fontSize: "28px",
    marginBottom: "10px",
  },
};

export default AuthLeftPanel;