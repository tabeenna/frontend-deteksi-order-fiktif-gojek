import { useNavigate } from "react-router-dom";
import { useState } from "react";
import heroImage from "../../assets/gojek-logo.jpeg";
import { apiRequest, saveAuthData } from "../../services/api";

function VerifyOtpPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(value, index) {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (value && nextInput) {
      nextInput.focus();
    }
  }

  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    setError("");

    const otpCode = otp.join("");

    if (otpCode.length < 6) {
      setError("Kode OTP harus 6 digit.");
      return;
    }

    setLoading(true);

    try {
      const response = await apiRequest("/verify-otp", {
        method: "POST",
        body: JSON.stringify({
          otp_code: otpCode,
        }),
      });

      saveAuthData(response.data);

      navigate(response.data.next_route || "/complete-profile");
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
        <div style={styles.formWrapper}>
          <h2 style={styles.title}>Verifikasi OTP</h2>

          <p style={styles.subtitle}>
            Masukkan 6 digit kode OTP yang dikirimkan ke nomor telepon atau
            email Anda. Untuk prototype ini, gunakan kode <b>123456</b>.
          </p>

          <div style={styles.alert}>
            <span>🛡️</span>
            <p style={styles.alertText}>
              Kode OTP digunakan untuk memastikan akun benar-benar dimiliki oleh
              pengguna yang mendaftar.
            </p>
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleVerify} style={styles.form}>
            <div style={styles.otpRow}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  style={styles.otpInput}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            <button type="submit" style={styles.mainButton} disabled={loading}>
              {loading ? "Memverifikasi..." : "Verifikasi OTP"}
            </button>
          </form>

          <p style={styles.resendText}>
            Belum menerima kode?{" "}
            <span style={styles.greenText}>Kirim ulang</span>
          </p>

          <button
            type="button"
            style={styles.backButton}
            onClick={() => navigate("/signup")}
          >
            ← Kembali
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
    lineHeight: "1.6",
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
    marginBottom: "18px",
  },
  alertText: {
    margin: 0,
    fontSize: "15px",
    lineHeight: "1.5",
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
    gap: "22px",
  },
  otpRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  otpInput: {
    width: "56px",
    height: "60px",
    borderRadius: "12px",
    border: "1px solid #d6dde8",
    background: "#f8fafc",
    textAlign: "center",
    fontSize: "24px",
    fontWeight: 800,
    outline: "none",
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
  resendText: {
    textAlign: "center",
    color: "#4b5563",
    fontSize: "15px",
    marginTop: "28px",
  },
  greenText: {
    color: "#00aa13",
    fontWeight: 800,
    cursor: "pointer",
  },
  backButton: {
    width: "100%",
    padding: "14px",
    border: "1px solid #d6dde8",
    borderRadius: "999px",
    background: "#ffffff",
    color: "#374151",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    marginTop: "12px",
  },
};

export default VerifyOtpPage;