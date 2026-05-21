import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import heroImage from "../../assets/gojek-logo.jpeg";

function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  function handleSignUp(e) {
    e.preventDefault();
    alert("Kode OTP telah dikirim.");
    navigate("/verify-otp");
  }

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
        <div style={styles.formWrapper}>
          <h2 style={styles.title}>Daftar Akun Baru</h2>
          <p style={styles.subtitle}>Silakan lengkapi data diri Anda untuk memulai.</p>

          <div style={styles.alert}>
            <span>🛡️</span>
            <p style={styles.alertText}>
              Data Anda dilindungi oleh sistem keamanan untuk menghindari transaksi tidak resmi.
            </p>
          </div>

          <form onSubmit={handleSignUp} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Nama Lengkap</label>
              <input style={styles.input} type="text" placeholder="Contoh: Budi Sudarsono" />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input style={styles.input} type="email" placeholder="nama@email.com" />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Nomor Telepon</label>
              <input style={styles.input} type="text" placeholder="+62 812-xxxx-xxxx" />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Kata Sandi</label>
              <div style={styles.passwordWrapper}>
                <input
                  style={{ ...styles.input, paddingRight: "48px" }}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 karakter"
                />

                <button
                  type="button"
                  style={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <p style={styles.policy}>
              Dengan mendaftar, saya menyetujui{" "}
              <span style={styles.greenText}>Ketentuan Layanan</span> dan{" "}
              <span style={styles.greenText}>Kebijakan Privasi</span>.
            </p>

            <button type="submit" style={styles.mainButton}>
              Daftar →
            </button>
          </form>

          <p style={styles.bottomText}>
            Sudah punya akun?{" "}
            <Link to="/" style={styles.greenLink}>
              Masuk
            </Link>
          </p>
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
  formWrapper: {
    width: "100%",
    maxWidth: "450px",
  },
  title: {
    fontSize: "30px",
    margin: "0 0 10px",
    color: "#111827",
    fontWeight: 800,
  },
  subtitle: {
    color: "#64748b",
    fontSize: "15px",
    margin: "0 0 28px",
  },
  alert: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    background: "#f8fbff",
    border: "1px solid #d8e4f2",
    padding: "14px 16px",
    borderRadius: "10px",
    color: "#1e40af",
    marginBottom: "26px",
  },
  alertText: {
    margin: 0,
    fontSize: "15px",
    lineHeight: "1.5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "15px 16px",
    borderRadius: "10px",
    border: "1px solid #d6dde8",
    background: "#f8fafc",
    fontSize: "15px",
    outline: "none",
  },
  passwordWrapper: {
    position: "relative",
  },
  eyeButton: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    fontSize: "16px",
  },
  policy: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "#64748b",
    margin: "4px 0 0",
  },
  greenText: {
    color: "#00aa13",
    fontWeight: 700,
  },
  mainButton: {
    marginTop: "12px",
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
  bottomText: {
    textAlign: "center",
    color: "#4b5563",
    fontSize: "16px",
    marginTop: "32px",
  },
  greenLink: {
    color: "#00aa13",
    fontWeight: 800,
    textDecoration: "none",
  },
};

export default SignUpPage;