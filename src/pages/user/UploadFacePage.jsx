import { useNavigate } from "react-router-dom";
import { useState } from "react";
import heroImage from "../../assets/gojek-logo.jpeg";
import { apiRequest, saveAuthData } from "../../services/api";

function UploadFacePage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setError("Format foto harus JPG atau PNG.");
      return;
    }

    if (file.size > maxSize) {
      setError("Ukuran foto maksimal 2MB.");
      return;
    }

    setError("");
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!selectedFile) {
      setError("Silakan unggah foto wajah terlebih dahulu.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("face_photo", selectedFile);

      const response = await apiRequest("/driver/upload-face", {
        method: "POST",
        body: formData,
      });

      saveAuthData(response.data);
      navigate(response.data.next_route || "/bank-detail");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mengunggah foto wajah.");
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
            onClick={() => navigate("/upload-ktp")}
          >
            ← Kembali
          </button>

          <h2 style={styles.title}>Unggah Foto Wajah</h2>

          <p style={styles.subtitle}>
            Unggah foto wajah yang jelas untuk membantu proses verifikasi
            identitas driver.
          </p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.uploadBox}>
              <input
                type="file"
                accept="image/jpeg,image/png"
                style={styles.hiddenInput}
                onChange={handleFileChange}
              />

              {preview ? (
                <img src={preview} alt="Preview wajah" style={styles.previewImage} />
              ) : (
                <div style={styles.uploadContent}>
                  <div style={styles.faceCircle}>🙂</div>
                  <h3 style={styles.uploadTitle}>Klik untuk unggah foto wajah</h3>
                  <p style={styles.uploadText}>
                    Format JPG atau PNG, maksimal 2MB.
                  </p>
                </div>
              )}
            </label>

            <div style={styles.tipsBox}>
              <h4 style={styles.tipsTitle}>Tips foto wajah</h4>
              <ul style={styles.tipsList}>
                <li>Pastikan wajah terlihat jelas dan tidak tertutup.</li>
                <li>Gunakan pencahayaan yang cukup.</li>
                <li>Foto harus menghadap kamera.</li>
                <li>Hindari foto buram atau terlalu gelap.</li>
              </ul>
            </div>

            <button type="submit" style={styles.mainButton} disabled={loading}>
              {loading ? "Mengunggah..." : "Simpan & Lanjut →"}
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
    maxWidth: "520px",
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
    gap: "16px",
  },

  uploadBox: {
    width: "100%",
    minHeight: "260px",
    border: "2px dashed #d6dde8",
    borderRadius: "18px",
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    overflow: "hidden",
  },

  hiddenInput: {
    display: "none",
  },

  uploadContent: {
    textAlign: "center",
    padding: "24px",
  },

  faceCircle: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    background: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    fontSize: "58px",
  },

  uploadTitle: {
    margin: "0 0 8px",
    fontSize: "16px",
    color: "#111827",
  },

  uploadText: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },

  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  tipsBox: {
    background: "#f8fbff",
    border: "1px solid #d8e4f2",
    borderRadius: "12px",
    padding: "16px 18px",
  },

  tipsTitle: {
    margin: "0 0 10px",
    color: "#00aa13",
    fontSize: "15px",
  },

  tipsList: {
    margin: 0,
    paddingLeft: "20px",
    color: "#4b5563",
    fontSize: "14px",
    lineHeight: "1.8",
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

export default UploadFacePage;