import { useNavigate } from "react-router-dom";
import { useState } from "react";
import heroImage from "../../assets/gojek-logo.jpeg";
import { apiRequest, saveAuthData } from "../../services/api";

function BankDetailPage() {
  const navigate = useNavigate();

  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountOwner, setAccountOwner] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bankOptions = [
    "BCA",
    "BRI",
    "BNI",
    "Mandiri",
    "BSI",
    "CIMB Niaga",
    "BTN",
    "Permata",
    "Danamon",
    "OCBC",
    "Maybank",
    "Bank Jatim",
    "SeaBank",
    "Jago",
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!bankName || !accountNumber || !accountOwner) {
      setError("Mohon lengkapi detail rekening bank terlebih dahulu.");
      return;
    }

    setLoading(true);

    try {
      const savedDriver = JSON.parse(localStorage.getItem("gojek_driver") || "{}");

      const response = await apiRequest("/driver/bank-detail", {
        method: "POST",
        body: JSON.stringify({
          bank_name: bankName,
          bank_account_number: accountNumber,
          bank_account_name: accountOwner,
          operational_city:
            savedDriver.operational_city || savedDriver.city || "Malang",
        }),
      });

      saveAuthData(response.data);

      navigate("/registration-success");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat menyimpan data bank.");
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
          <button
            type="button"
            style={styles.backButton}
            onClick={() => navigate("/upload-face")}
          >
            ← Kembali
          </button>

          <h2 style={styles.title}>Detail Rekening Bank</h2>

          <p style={styles.subtitle}>
            Pastikan data bank sesuai dengan identitas KTP Anda untuk kelancaran
            pencairan dana.
          </p>

          <div style={styles.alertBox}>
            <span style={styles.alertIcon}>ⓘ</span>
            <div>
              <h4 style={styles.alertTitle}>Rekening harus atas nama sendiri</h4>
              <p style={styles.alertText}>
                Nama rekening bank harus sama persis dengan nama di KTP yang
                terdaftar.
              </p>
            </div>
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Nama Bank</label>
              <input
                style={styles.input}
                type="text"
                list="bank-options"
                placeholder="Pilih atau ketik nama bank"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />

              <datalist id="bank-options">
                {bankOptions.map((bank) => (
                  <option key={bank} value={bank} />
                ))}
              </datalist>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Nomor Rekening</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Contoh: 1234567890"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Nama Pemilik Rekening</label>

              <div style={styles.ownerWrapper}>
                <input
                  style={{ ...styles.input, paddingRight: "44px" }}
                  type="text"
                  placeholder="Masukkan nama pemilik rekening"
                  value={accountOwner}
                  onChange={(e) => setAccountOwner(e.target.value)}
                />

                <span style={styles.checkIcon}>✓</span>
              </div>

              <p style={styles.helperText}>
                Sesuaikan dengan nama KTP yang Anda daftarkan sebelumnya.
              </p>
            </div>

            <button type="submit" style={styles.mainButton} disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan & Lanjut →"}
            </button>
          </form>
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
    maxWidth: "480px",
  },

  backButton: {
    background: "transparent",
    border: "none",
    color: "#4b5563",
    cursor: "pointer",
    fontSize: "14px",
    marginBottom: "16px",
    padding: 0,
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
    margin: "0 0 26px",
  },

  alertBox: {
    display: "flex",
    gap: "14px",
    background: "#f0f5ff",
    border: "1px solid #d8e4f2",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "18px",
  },

  alertIcon: {
    color: "#00aa13",
    fontWeight: 800,
  },

  alertTitle: {
    margin: "0 0 6px",
    fontSize: "14px",
    color: "#374151",
    fontWeight: 800,
  },

  alertText: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
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
    gap: "18px",
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

  ownerWrapper: {
    position: "relative",
  },

  checkIcon: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#00aa13",
    color: "white",
    fontSize: "13px",
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  helperText: {
    margin: 0,
    color: "#6b7280",
    fontSize: "13px",
  },

  mainButton: {
    marginTop: "22px",
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

export default BankDetailPage;