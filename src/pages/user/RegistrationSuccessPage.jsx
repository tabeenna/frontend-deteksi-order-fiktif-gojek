import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/gojek-logo.jpeg";

function RegistrationSuccessPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
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

      <section style={styles.right}>
        <div style={styles.contentBox}>
          <div style={styles.checkCircle}>
            <div style={styles.checkIcon}>✓</div>
          </div>

          <h1 style={styles.title}>Pendaftaran Berhasil Dikirim</h1>

          <p style={styles.description}>
            Data Anda sedang dalam proses pengecekan 2–5 hari kerja. Kami akan
            mengirimkan SMS setelah akun Anda aktif.
          </p>

          <div style={styles.stepList}>
            <div style={styles.stepItem}>
              <div style={styles.stepDotActive}></div>
              <strong>1. Pengecekan Data</strong>
            </div>

            <div style={styles.stepLine}></div>

            <div style={styles.stepItem}>
              <div style={styles.stepDot}></div>
              <strong>2. Aktivasi Akun via SMS</strong>
            </div>

            <div style={styles.stepLine}></div>

            <div style={styles.stepItem}>
              <div style={styles.stepDot}></div>
              <strong>3. Pengambilan Atribut</strong>
            </div>
          </div>

          <button
          type="button"
          style={styles.mainButton}
          onClick={() => {
            localStorage.clear();
            navigate("/");
            }}
            >
              Masuk ke Halaman Login
              </button>
              
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
  minHeight: "100vh",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  background: "#ffffff",
  fontFamily: "Arial, sans-serif",
},
  left: {
  minHeight: "100vh",
  background: "#00aa13",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "22px",
  padding: "48px 70px",
  textAlign: "center",
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
  marginBottom: "18px",
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
},

featureIcon: {
  fontSize: "28px",
  marginBottom: "10px",
  },
  right: {
    minHeight: "100vh",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  contentBox: {
    width: "100%",
    maxWidth: "520px",
  },
  checkCircle: {
    width: "112px",
    height: "112px",
    borderRadius: "50%",
    background: "#f1f5f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "34px",
  },
  checkIcon: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#00aa13",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 900,
    fontSize: "18px",
  },
  title: {
    fontSize: "32px",
    lineHeight: "1.25",
    color: "#111827",
    margin: "0 0 18px",
    fontWeight: 800,
  },
  description: {
    fontSize: "17px",
    lineHeight: "1.6",
    color: "#4b5563",
    margin: "0 0 42px",
  },
  stepList: {
    marginBottom: "44px",
  },
  stepItem: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    color: "#374151",
    fontSize: "16px",
  },
  stepDotActive: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "#00aa13",
    border: "6px solid #e8f5e9",
  },
  stepDot: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "#dbe1ea",
    border: "6px solid #edf1f7",
  },
  stepLine: {
    width: "2px",
    height: "34px",
    background: "#dbe1ea",
    marginLeft: "7px",
  },
  mainButton: {
    width: "100%",
    padding: "17px",
    border: "none",
    borderRadius: "999px",
    background: "#00aa13",
    color: "white",
    fontSize: "16px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 12px 22px rgba(0,170,19,0.18)",
  },
};

export default RegistrationSuccessPage;