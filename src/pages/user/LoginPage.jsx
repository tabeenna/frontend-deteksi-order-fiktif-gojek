import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import heroImage from "../../assets/gojek-logo.jpeg";
import { apiRequest } from "../../services/api";

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Bersihkan sisa flow pendaftaran supaya tidak nyangkut ke bank/ktp.
      localStorage.removeItem("gojek_next_route");

      const response = await apiRequest("/login", {
        method: "POST",
        body: JSON.stringify(form),
      });

      const data = response.data;
      const role = data.user?.role || "driver";

      localStorage.setItem("gojek_token", data.token);
      localStorage.setItem("gojek_user", JSON.stringify(data.user));
      localStorage.setItem("gojek_role", role);

      if (data.driver) {
        localStorage.setItem("gojek_driver", JSON.stringify(data.driver));
      }

      // Pastikan setelah login tidak menyimpan next_route dari backend.
      localStorage.removeItem("gojek_next_route");

      if (role === "superadmin") {
        navigate("/superadmin");
        return;
      }

      if (role === "admin") {
        navigate("/admin");
        return;
      }

      // Driver login berhasil langsung ke dashboard utama.
      navigate("/driver");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
        <div style={styles.darkToggle}>◐</div>

        <div style={styles.formWrapper}>
          <h2 style={styles.title}>Masuk Ke Gojek</h2>

          <div style={styles.alert}>
            <span>🛡️</span>
            <p style={styles.alertText}>
              Aplikasi ini membantu melindungi Anda dari order fiktif
            </p>
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Email atau Nomor Telepon</label>
              <input
                style={styles.input}
                type="email"
                name="email"
                placeholder="Contoh: driver@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Kata Sandi</label>
              <div style={styles.passwordWrapper}>
                <input
                  style={{ ...styles.input, paddingRight: "48px" }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Masukkan kata sandi"
                  value={form.password}
                  onChange={handleChange}
                  required
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

            <div style={styles.forgotRow}>
              <a href="#" style={styles.forgotLink}>
                Lupa kata sandi?
              </a>
            </div>

            <button type="submit" style={styles.mainButton} disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <p style={styles.dividerText}>Atau</p>
            <span style={styles.dividerLine}></span>
          </div>

          <p style={styles.bottomText}>
            Belum punya akun?{" "}
            <Link to="/signup" style={styles.greenLink}>
              Daftar
            </Link>
          </p>

          <div style={styles.footer}>
            <span>Bantuan</span>
            <span>Syarat & Ketentuan</span>
            <span>Bahasa Indonesia (ID)</span>
          </div>
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
    position: "relative",
    padding: "40px",
    boxSizing: "border-box",
  },

  darkToggle: {
    position: "absolute",
    top: "32px",
    right: "32px",
    fontSize: "22px",
    color: "#111827",
  },

  formWrapper: {
    width: "100%",
    maxWidth: "450px",
  },

  title: {
    fontSize: "30px",
    margin: "0 0 28px",
    color: "#111827",
    fontWeight: 800,
  },

  alert: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#f8fbff",
    border: "1px solid #d8e4f2",
    padding: "14px 16px",
    borderRadius: "10px",
    color: "#4b5563",
    marginBottom: "28px",
  },

  alertText: {
    margin: 0,
    fontSize: "15px",
  },

  errorBox: {
    background: "#fee2e2",
    color: "#991b1b",
    border: "1px solid #fecaca",
    borderRadius: "10px",
    padding: "12px 14px",
    fontSize: "14px",
    marginBottom: "18px",
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
    boxSizing: "border-box",
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

  forgotRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "2px",
  },

  forgotLink: {
    color: "#00aa13",
    fontSize: "14px",
    fontWeight: 700,
    textDecoration: "none",
  },

  mainButton: {
    marginTop: "14px",
    width: "100%",
    padding: "17px",
    border: "none",
    borderRadius: "999px",
    background: "#00aa13",
    color: "white",
    fontSize: "16px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 12px 22px rgba(0, 170, 19, 0.18)",
  },

  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "32px 0 20px",
  },

  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#d1d5db",
  },

  dividerText: {
    margin: 0,
    color: "#6b7280",
    fontSize: "14px",
  },

  bottomText: {
    textAlign: "center",
    color: "#4b5563",
    fontSize: "16px",
  },

  greenLink: {
    color: "#00aa13",
    fontWeight: 800,
    textDecoration: "none",
  },

  footer: {
    marginTop: "54px",
    display: "flex",
    justifyContent: "center",
    gap: "22px",
    color: "#94a3b8",
    fontSize: "12px",
  },
};

export default LoginPage;