import { useNavigate } from "react-router-dom";
import { useState } from "react";
import heroImage from "../../assets/gojek-logo.jpeg";
import { apiRequest, saveAuthData } from "../../services/api";

function CompleteProfilePage() {
  const navigate = useNavigate();

  const [city, setCity] = useState("");
  const [vehicleType, setVehicleType] = useState("goride");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [year, setYear] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cityOptions = [
    "Malang",
    "Batu",
    "Surabaya",
    "Jakarta",
    "Bandung",
    "Yogyakarta",
    "Kediri",
    "Blitar",
    "Pasuruan",
    "Sidoarjo",
    "Madiun",
    "Semarang",
  ];

  const motorBrands = ["Honda", "Yamaha", "Suzuki", "Kawasaki", "Vespa"];
  const carBrands = ["Toyota", "Honda", "Daihatsu", "Suzuki", "Mitsubishi", "Wuling"];

  const brandOptions = vehicleType === "goride" ? motorBrands : carBrands;

  function handleVehicleTypeChange(type) {
    setVehicleType(type);
    setBrand("");
    setModel("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!city || !vehicleType || !brand || !model || !plateNumber || !year) {
      setError("Mohon lengkapi semua data terlebih dahulu.");
      return;
    }

    setLoading(true);

    try {
      const response = await apiRequest("/driver/complete-profile", {
        method: "POST",
        body: JSON.stringify({
          operational_city: city,
          vehicle_type: vehicleType,
          vehicle_brand: brand,
          vehicle_model: model,
          plate_number: plateNumber,
          vehicle_year: year,
        }),
      });

      saveAuthData(response.data);

      navigate(response.data.next_route || "/upload-ktp");
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
          <button
            style={styles.backButton}
            onClick={() => navigate("/verify-otp")}
          >
            ← Kembali
          </button>

          <h2 style={styles.title}>Lengkapi Profil Driver</h2>
          <p style={styles.subtitle}>
            Isi kota operasional dan data kendaraan Anda dalam satu langkah.
          </p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Kota Operasional</label>
              <input
                style={styles.input}
                type="text"
                list="city-options"
                placeholder="Pilih atau ketik kota operasional"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <datalist id="city-options">
                {cityOptions.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Jenis Kendaraan</label>

              <div style={styles.vehicleGrid}>
                <div
                  style={{
                    ...styles.vehicleCard,
                    ...(vehicleType === "goride"
                      ? styles.vehicleCardActive
                      : {}),
                  }}
                  onClick={() => handleVehicleTypeChange("goride")}
                >
                  <div style={styles.vehicleIcon}>🛵</div>
                  <div style={styles.vehicleTitle}>GoRide</div>
                  <div style={styles.vehicleDesc}>Motor Roda Dua</div>
                </div>

                <div
                  style={{
                    ...styles.vehicleCard,
                    ...(vehicleType === "gocar"
                      ? styles.vehicleCardActive
                      : {}),
                  }}
                  onClick={() => handleVehicleTypeChange("gocar")}
                >
                  <div style={styles.vehicleIcon}>🚗</div>
                  <div style={styles.vehicleTitle}>GoCar</div>
                  <div style={styles.vehicleDesc}>Mobil Roda Empat</div>
                </div>
              </div>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>
                Detail Kendaraan {vehicleType === "goride" ? "Motor" : "Mobil"}
              </label>

              <input
                style={styles.input}
                type="text"
                list="brand-options"
                placeholder={
                  vehicleType === "goride"
                    ? "Pilih atau ketik merek motor"
                    : "Pilih atau ketik merek mobil"
                }
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />

              <datalist id="brand-options">
                {brandOptions.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>

              <input
                style={styles.input}
                type="text"
                placeholder={
                  vehicleType === "goride"
                    ? "Contoh: Beat / Vario"
                    : "Contoh: Avanza / Brio"
                }
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />

              <input
                style={styles.input}
                type="text"
                placeholder="Nomor plat kendaraan"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
              />

              <select
                style={styles.input}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Pilih tahun kendaraan</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
              </select>
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
    gap: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "10px",
    border: "1px solid #d6dde8",
    background: "#f8fafc",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },
  vehicleGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },
  vehicleCard: {
    border: "1px solid #d6dde8",
    borderRadius: "14px",
    padding: "18px",
    background: "#f8fafc",
    cursor: "pointer",
  },
  vehicleCardActive: {
    border: "2px solid #00aa13",
    background: "#f0fff4",
  },
  vehicleIcon: {
    fontSize: "28px",
    marginBottom: "10px",
  },
  vehicleTitle: {
    fontWeight: 800,
    color: "#111827",
    marginBottom: "4px",
  },
  vehicleDesc: {
    color: "#6b7280",
    fontSize: "14px",
  },
  mainButton: {
    marginTop: "8px",
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

export default CompleteProfilePage;