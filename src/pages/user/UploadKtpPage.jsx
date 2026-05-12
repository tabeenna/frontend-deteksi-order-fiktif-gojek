import { useNavigate } from "react-router-dom";
import { useState } from "react";
import heroImage from "../../assets/gojek-logo.jpeg";

function UploadKtpPage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert("Format file harus JPG, PNG, atau PDF.");
      return;
    }

    if (file.size > maxSize) {
      alert("Ukuran file maksimal 5MB.");
      return;
    }

    setSelectedFile(file);

    if (file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!selectedFile) {
      alert("Silakan unggah file KTP terlebih dahulu.");
      return;
    }

    alert("KTP berhasil diunggah.");
    navigate("/upload-face");
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
          <button style={styles.backButton} onClick={() => navigate("/complete-profile")}>
            ← Kembali
          </button>

          <h2 style={styles.title}>Unggah Foto KTP</h2>

          <p style={styles.subtitle}>
            Pastikan foto KTP terlihat jelas, tidak terpotong, dan seluruh data mudah dibaca.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <label htmlFor="ktp-upload" style={styles.uploadBox}>
              {preview ? (
                <img src={preview} alt="Preview KTP" style={styles.previewImage} />
              ) : selectedFile ? (
                <div style={styles.uploadContent}>
                  <div style={styles.uploadIcon}>📄</div>
                  <h3 style={styles.uploadTitle}>{selectedFile.name}</h3>
                  <p style={styles.uploadText}>File sudah dipilih</p>
                </div>
              ) : (
                <div style={styles.uploadContent}>
                  <div style={styles.uploadIcon}>🪪</div>
                  <h3 style={styles.uploadTitle}>Ketuk untuk unggah file KTP</h3>
                  <p style={styles.uploadText}>Format JPG, PNG, atau PDF. Maks. 5MB</p>
                </div>
              )}

              <input
                id="ktp-upload"
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                style={styles.hiddenInput}
              />
            </label>

            <div style={styles.tipsBox}>
              <h4 style={styles.tipsTitle}>Tips Unggah Foto</h4>
              <ul style={styles.tipsList}>
                <li>Gunakan pencahayaan yang cukup</li>
                <li>Pastikan KTP tidak blur</li>
                <li>Seluruh bagian KTP terlihat jelas</li>
                <li>Data pada KTP mudah dibaca</li>
              </ul>
            </div>

            <button type="submit" style={styles.mainButton}>
              Unggah & Lanjut →
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  uploadBox: {
    width: "100%",
    minHeight: "230px",
    border: "2px dashed #d6dde8",
    borderRadius: "16px",
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
  uploadIcon: {
    width: "54px",
    height: "54px",
    borderRadius: "50%",
    background: "#e8f8ed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 14px",
    fontSize: "24px",
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

export default UploadKtpPage;