import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../services/api";
import DriverLayout, {
  Card,
  StatCard,
  Badge,
} from "../../components/driver/DriverLayout";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function DriverHome() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [selectedArea, setSelectedArea] = useState("Lowokwaru");

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const response = await apiRequest("/driver/home");
        setDashboard(response.data);
      } catch (err) {
        setError(err.message || "Gagal mengambil data dashboard driver.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  function openModal(type, data = null) {
    setModal({ type, data });
  }

  function closeModal() {
    setModal(null);
  }

  if (loading) {
    return (
      <DriverLayout
        activeMenu="Home"
        title="Driver Dashboard"
        subtitle="Memuat data dashboard driver..."
      >
        <Card>
          <p>Sedang memuat data dashboard...</p>
        </Card>
      </DriverLayout>
    );
  }

  if (error) {
    return (
      <DriverLayout
        activeMenu="Home"
        title="Driver Dashboard"
        subtitle="Terjadi kesalahan saat memuat dashboard."
      >
        <Card>
          <p style={{ color: "#b91c1c", fontWeight: 700 }}>{error}</p>
          <p style={{ color: "#68716c", fontSize: "13px" }}>
            Kalau muncul Unauthorized, login ulang sebagai driver dulu.
          </p>
        </Card>
      </DriverLayout>
    );
  }

  const summary = dashboard?.summary || {};
  const bonus = dashboard?.bonus || {};
  const activities = dashboard?.activities || [];
  const fraudDetection = dashboard?.fraud_detection || {};
  const recommendations = dashboard?.recommendations || [];
  const busyAreas = dashboard?.busy_areas || {};

  const selectedAreaData =
    busyAreas[selectedArea] ||
    Object.values(busyAreas)[0] || {
      level: "-",
      orders: "0 order tersedia",
      dominant: "-",
      note: "Data area belum tersedia.",
    };

    const mapCenter =
  selectedAreaData.lat && selectedAreaData.lng
    ? [selectedAreaData.lat, selectedAreaData.lng]
    : [-7.9666, 112.6326];

  return (
    <DriverLayout
      activeMenu="Home"
      title="Driver Dashboard"
      subtitle="Ringkasan performa, pendapatan, order, dan rekomendasi area driver di Kota Malang."
    >
      <section style={styles.heroGrid}>
        <button
          style={styles.earningCard}
          onClick={() => openModal("earning")}
        >
          <div style={styles.cardTop}>
            <div>
              <p style={styles.smallLabel}>Pendapatan Hari Ini</p>
              <h1 style={styles.bigAmount}>
                {formatCurrency(summary.today_earning)}
              </h1>
              <p style={styles.cardText}>
                Pendapatan dari {summary.completed_orders || 0} order selesai
                dan insentif harian.
              </p>
            </div>

            <div style={styles.iconCircle}>Rp</div>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.twoCol}>
            <div>
              <p style={styles.muted}>Order Selesai</p>
              <h3 style={styles.value}>{summary.completed_orders || 0}</h3>
            </div>

            <div>
              <p style={styles.muted}>Insentif</p>
              <h3 style={{ ...styles.value, color: "#087f23" }}>
                {formatPlusCurrency(summary.incentive)}
              </h3>
            </div>
          </div>
        </button>

        <button style={styles.bonusCard} onClick={() => openModal("bonus")}>
          <div style={styles.bonusIcon}>◎</div>
          <h2 style={styles.bonusTitle}>Target Bonus</h2>
          <p style={styles.bonusText}>
            Selesaikan {bonus.remaining_points || 0} poin lagi untuk membuka
            bonus {formatCurrency(bonus.bonus_amount)}.
          </p>

          <div style={styles.progress}>
            <div
              style={{
                ...styles.progressFill,
                width: `${bonus.progress_percent || 0}%`,
              }}
            ></div>
          </div>

          <div style={styles.progressRow}>
            <span>
              {bonus.current_points || 0}/{bonus.target_points || 0} Poin
            </span>
            <strong>{bonus.progress_percent || 0}%</strong>
          </div>
        </button>
      </section>

      <section style={styles.statGrid}>
        <button
          style={styles.statButton}
          onClick={() =>
            openModal("performance", {
              title: "Penerimaan Order",
              value: `${summary.acceptance_rate || 0}%`,
              desc: "Persentase order yang diterima dari seluruh order masuk. Nilai ini menunjukkan driver cukup responsif.",
            })
          }
        >
          <StatCard
            label="Penerimaan"
            value={`${summary.acceptance_rate || 0}%`}
            note="Order diterima"
          />
        </button>

        <button
          style={styles.statButton}
          onClick={() =>
            openModal("performance", {
              title: "Rating Driver",
              value: summary.rating || "-",
              desc: "Rating berasal dari penilaian customer setelah order selesai.",
            })
          }
        >
          <StatCard
            label="Rating"
            value={String(summary.rating || "-")}
            note="Sangat baik"
          />
        </button>

        <button
          style={styles.statButton}
          onClick={() =>
            openModal("performance", {
              title: "Waktu Aktif",
              value: summary.active_time || "00:00",
              desc: "Durasi driver aktif dalam sistem hari ini.",
            })
          }
        >
          <StatCard
            label="Waktu Aktif"
            value={summary.active_time || "00:00"}
            note="Hari ini"
          />
        </button>

        <button
          style={styles.statButton}
          onClick={() =>
            openModal("performance", {
              title: "Pembatalan",
              value: `${summary.cancellation_rate || 0}%`,
              desc: "Persentase pembatalan order oleh driver. Semakin rendah, semakin baik.",
            })
          }
        >
          <StatCard
            label="Pembatalan"
            value={`${summary.cancellation_rate || 0}%`}
            note="Aman"
            color="#087f23"
          />
        </button>
      </section>

      <section style={styles.contentGrid}>
        <Card>
          <div style={styles.sectionHead}>
            <div>
              <h2 style={styles.sectionTitle}>Aktivitas Hari Ini</h2>
              <p style={styles.sectionText}>
                Riwayat order terbaru yang sudah selesai di area Malang.
              </p>
            </div>

            <button
              style={styles.softButton}
              onClick={() => navigate("/driver/orders")}
            >
              Lihat Semua
            </button>
          </div>

          <div style={styles.activityList}>
            {activities.map((item) => (
              <button
                key={item.id}
                style={styles.activity}
                onClick={() => openModal("activity", item)}
              >
                <div style={styles.activityIcon}>▣</div>

                <div>
                  <h3 style={styles.activityTitle}>
                    {item.service} • {item.title}
                  </h3>
                  <p style={styles.activityText}>{item.detail}</p>
                </div>

                <div style={styles.activityRight}>
                  <h3>{formatPlusCurrency(item.amount)}</h3>
                  <p>{item.time}</p>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div style={styles.sectionHead}>
            <div>
              <h2 style={styles.sectionTitle}>Deteksi Order Fiktif</h2>
              <p style={styles.sectionText}>
                Sistem memantau skor risiko berdasarkan akun customer, lokasi,
                pembayaran, dan pola order.
              </p>
            </div>

            <Badge>{fraudDetection.status || "Aktif"}</Badge>
          </div>

          <button style={styles.fraudBox} onClick={() => openModal("fraud")}>
            <p style={styles.fraudLabel}>Status Proteksi</p>
            <h3 style={styles.fraudValue}>
              {fraudDetection.status || "Aktif"}
            </h3>
            <p style={styles.sectionText}>
              {fraudDetection.total_analyzed || 0} order masuk sudah dianalisis
              hari ini.
            </p>
          </button>

          <div style={styles.fraudMiniGrid}>
            <InfoBox
              label="Risiko Rendah"
              value={`${fraudDetection.low_risk || 0} order`}
            />
            <InfoBox
              label="Risiko Sedang"
              value={`${fraudDetection.medium_risk || 0} order`}
            />
            <InfoBox
              label="Risiko Tinggi"
              value={`${fraudDetection.high_risk || 0} order`}
            />
            <InfoBox
              label="Auto Cancel"
              value={`${fraudDetection.auto_cancel || 0} order`}
            />
          </div>

          <button
            style={styles.primaryButton}
            onClick={() => navigate("/driver/orders")}
          >
            Lihat Analisis Order
          </button>
        </Card>
      </section>

      <section style={styles.contentGrid}>
        <Card>
          <div style={styles.sectionHead}>
            <div>
              <h2 style={styles.sectionTitle}>Rekomendasi Sistem</h2>
              <p style={styles.sectionText}>
                Saran otomatis agar driver bisa mengambil keputusan lebih cepat.
              </p>
            </div>
          </div>

          {recommendations.map((item) => (
            <button
              key={item.number || item.title}
              style={styles.recommendationCard}
              onClick={() =>
                openModal("recommendation", {
                  title: item.title,
                  desc: item.desc,
                })
              }
            >
              <div style={styles.recommendationIcon}>{item.number}</div>
              <div>
                <h3 style={styles.recommendationTitle}>{item.title}</h3>
                <p style={styles.recommendationText}>{item.short_desc}</p>
              </div>
            </button>
          ))}
        </Card>

        <Card>
          <div style={styles.sectionHead}>
            <div>
              <h2 style={styles.sectionTitle}>Shortcut Driver</h2>
              <p style={styles.sectionText}>
                Akses cepat ke fitur utama dashboard.
              </p>
            </div>
          </div>

          <div style={styles.shortcutGrid}>
            <button
              style={styles.shortcutButton}
              onClick={() => navigate("/driver/orders")}
            >
              <span>▤</span>
              <strong>Orders</strong>
              <p>Cek order dan risiko</p>
            </button>

            <button
              style={styles.shortcutButton}
              onClick={() => navigate("/driver/earnings")}
            >
              <span>▣</span>
              <strong>Earnings</strong>
              <p>Lihat pendapatan</p>
            </button>

            <button
              style={styles.shortcutButton}
              onClick={() => navigate("/driver/account")}
            >
              <span>◉</span>
              <strong>Account</strong>
              <p>Kelola akun</p>
            </button>

            <button
              style={styles.shortcutButton}
              onClick={() => openModal("support")}
            >
              <span>?</span>
              <strong>Bantuan</strong>
              <p>Hubungi support</p>
            </button>
          </div>
        </Card>
      </section>

      <Card>
        <div style={styles.sectionHead}>
          <div>
            <h2 style={styles.sectionTitle}>Area Ramai Kota Malang</h2>
            <p style={styles.sectionText}>
              Simulasi area dengan permintaan order tertinggi di Malang.
            </p>
          </div>

          <button
            style={styles.softButton}
            onClick={() => openModal("area", selectedAreaData)}
          >
            Detail Area
          </button>
        </div>

       <div style={styles.mapCard}>
  <MapContainer
    key={selectedArea}
    center={mapCenter}
    zoom={13}
    scrollWheelZoom={false}
    style={styles.leafletMap}
  >
    <TileLayer
      attribution='&copy; OpenStreetMap contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    {Object.keys(busyAreas).map((areaName) => {
      const area = busyAreas[areaName];

      if (!area.lat || !area.lng) return null;

      return (
        <Marker
          key={areaName}
          position={[area.lat, area.lng]}
          eventHandlers={{
            click: () => setSelectedArea(areaName),
          }}
        >
          <Popup>
            <strong>{areaName}</strong>
            <br />
            {area.level}
            <br />
            {area.orders}
            <br />
            {area.dominant}
          </Popup>
        </Marker>
      );
    })}
  </MapContainer>

  <div style={styles.mapOverlay}>
    <strong>Area Ramai: {selectedArea}</strong>
    <p>
      {selectedAreaData.level} • {selectedAreaData.orders}
    </p>
    <span>{selectedAreaData.dominant}</span>
  </div>
</div>

        <div style={styles.areaButtons}>
          {Object.keys(busyAreas).map((item) => (
            <button
              key={item}
              style={{
                ...styles.areaButton,
                ...(selectedArea === item ? styles.areaButtonActive : {}),
              }}
              onClick={() => setSelectedArea(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </Card>

      {modal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={closeModal}>
              ×
            </button>

            {modal.type === "earning" && (
              <>
                <h2 style={styles.modalTitle}>Detail Pendapatan Hari Ini</h2>
                <p style={styles.modalText}>
                  Total pendapatan hari ini berasal dari order selesai dan
                  insentif target harian.
                </p>

                <div style={styles.modalInfoGrid}>
                  <InfoBox
                    label="Pendapatan"
                    value={formatCurrency(summary.today_earning)}
                  />
                  <InfoBox
                    label="Order Selesai"
                    value={String(summary.completed_orders || 0)}
                  />
                  <InfoBox
                    label="Insentif"
                    value={formatCurrency(summary.incentive)}
                  />
                  <InfoBox
                    label="Rating"
                    value={String(summary.rating || "-")}
                  />
                </div>

                <button
                  style={styles.primaryButton}
                  onClick={() => navigate("/driver/earnings")}
                >
                  Buka Halaman Earnings
                </button>
              </>
            )}

            {modal.type === "bonus" && (
              <>
                <h2 style={styles.modalTitle}>Detail Target Bonus</h2>
                <p style={styles.modalText}>
                  Driver sudah mencapai {bonus.current_points || 0} dari{" "}
                  {bonus.target_points || 0} poin. Selesaikan{" "}
                  {bonus.remaining_points || 0} poin lagi untuk mendapatkan
                  bonus tambahan {formatCurrency(bonus.bonus_amount)}.
                </p>

                <div style={styles.progressModal}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${bonus.progress_percent || 0}%`,
                    }}
                  ></div>
                </div>

                <div style={styles.modalInfoGrid}>
                  <InfoBox
                    label="Poin Saat Ini"
                    value={String(bonus.current_points || 0)}
                  />
                  <InfoBox
                    label="Target"
                    value={String(bonus.target_points || 0)}
                  />
                  <InfoBox
                    label="Sisa Poin"
                    value={String(bonus.remaining_points || 0)}
                  />
                  <InfoBox
                    label="Bonus"
                    value={formatCurrency(bonus.bonus_amount)}
                  />
                </div>
              </>
            )}

            {modal.type === "performance" && (
              <>
                <h2 style={styles.modalTitle}>{modal.data.title}</h2>
                <h1 style={styles.modalBigValue}>{modal.data.value}</h1>
                <p style={styles.modalText}>{modal.data.desc}</p>
              </>
            )}

            {modal.type === "activity" && (
              <>
                <h2 style={styles.modalTitle}>Detail Aktivitas</h2>
                <p style={styles.modalText}>
                  Aktivitas ini menunjukkan order yang sudah selesai pada hari
                  ini.
                </p>

                <div style={styles.modalInfoGrid}>
                  <InfoBox label="ID" value={modal.data.id} />
                  <InfoBox label="Layanan" value={modal.data.service} />
                  <InfoBox label="Rute" value={modal.data.detail} />
                  <InfoBox
                    label="Pendapatan"
                    value={formatPlusCurrency(modal.data.amount)}
                  />
                  <InfoBox label="Waktu" value={modal.data.time} />
                  <InfoBox label="Risiko" value={modal.data.risk} />
                </div>
              </>
            )}

            {modal.type === "fraud" && (
              <>
                <h2 style={styles.modalTitle}>Deteksi Order Fiktif</h2>
                <p style={styles.modalText}>
                  Sistem memberi skor risiko pada setiap order. Risiko rendah
                  bisa diterima, risiko sedang perlu verifikasi OTP dan QR, lalu
                  risiko tinggi dibatalkan otomatis.
                </p>

                <div style={styles.modalInfoGrid}>
                  <InfoBox
                    label="Total Order"
                    value={String(fraudDetection.total_analyzed || 0)}
                  />
                  <InfoBox
                    label="Risiko Rendah"
                    value={String(fraudDetection.low_risk || 0)}
                  />
                  <InfoBox
                    label="Risiko Sedang"
                    value={String(fraudDetection.medium_risk || 0)}
                  />
                  <InfoBox
                    label="Risiko Tinggi"
                    value={String(fraudDetection.high_risk || 0)}
                  />
                </div>

                <button
                  style={styles.primaryButton}
                  onClick={() => navigate("/driver/orders")}
                >
                  Buka Analisis Order
                </button>
              </>
            )}

            {modal.type === "recommendation" && (
              <>
                <h2 style={styles.modalTitle}>{modal.data.title}</h2>
                <p style={styles.modalText}>{modal.data.desc}</p>
              </>
            )}

            {modal.type === "area" && (
              <>
                <h2 style={styles.modalTitle}>Detail Area Ramai Malang</h2>
                <p style={styles.modalText}>
                  Area <b>{selectedArea}</b> sedang berada pada status{" "}
                  <b>{selectedAreaData.level}</b>.
                </p>

                <div style={styles.modalInfoGrid}>
                  <InfoBox label="Area" value={selectedArea} />
                  <InfoBox label="Status" value={selectedAreaData.level} />
                  <InfoBox label="Order" value={selectedAreaData.orders} />
                  <InfoBox label="Dominan" value={selectedAreaData.dominant} />
                </div>

                <p style={styles.modalText}>{selectedAreaData.note}</p>
              </>
            )}

            {modal.type === "support" && (
              <>
                <h2 style={styles.modalTitle}>Bantuan Driver</h2>
                <p style={styles.modalText}>
                  Fitur bantuan ini merupakan simulasi. Pada sistem asli,
                  driver dapat menghubungi admin atau support jika ada kendala
                  order, akun, atau pembayaran.
                </p>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Mengerti
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </DriverLayout>
  );
}

function InfoBox({ label, value }) {
  return (
    <div style={styles.infoBox}>
      <p style={styles.infoLabel}>{label}</p>
      <h3 style={styles.infoValue}>{value}</h3>
    </div>
  );
}

function formatCurrency(value) {
  if (typeof value === "string" && value.includes("Rp")) {
    return value;
  }

  return `Rp ${Number(value || 0).toLocaleString("id-ID")}`;
}

function formatPlusCurrency(value) {
  if (typeof value === "string") {
    return value.startsWith("+") ? value : `+ ${value}`;
  }

  return `+ Rp ${Number(value || 0).toLocaleString("id-ID")}`;
}

const styles = {
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: "22px",
    marginBottom: "22px",
  },

  earningCard: {
    background: "#ffffff",
    border: "1px solid #dfe5de",
    borderRadius: "18px",
    padding: "24px",
    cursor: "pointer",
    textAlign: "left",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "18px",
  },

  smallLabel: {
    margin: 0,
    color: "#68716c",
    fontSize: "13px",
  },

  bigAmount: {
    margin: "10px 0 0",
    fontSize: "32px",
    letterSpacing: "-0.6px",
  },

  cardText: {
    margin: "8px 0 0",
    color: "#68716c",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  iconCircle: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "#e6f3e9",
    color: "#087f23",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },

  divider: {
    height: "1px",
    background: "#dfe5de",
    margin: "22px 0",
  },

  twoCol: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
  },

  muted: {
    margin: 0,
    color: "#68716c",
    fontSize: "13px",
  },

  value: {
    margin: "6px 0 0",
    fontSize: "18px",
  },

  bonusCard: {
    background: "#087f23",
    color: "white",
    border: "none",
    borderRadius: "18px",
    padding: "24px",
    textAlign: "center",
    cursor: "pointer",
  },

  bonusIcon: {
    fontSize: "32px",
    marginBottom: "14px",
  },

  bonusTitle: {
    margin: 0,
    fontSize: "20px",
  },

  bonusText: {
    margin: "10px 0 20px",
    fontSize: "14px",
    opacity: 0.9,
    lineHeight: "1.5",
  },

  progress: {
    height: "8px",
    background: "rgba(255,255,255,0.25)",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "14px",
  },

  progressFill: {
    width: "80%",
    height: "100%",
    background: "white",
  },

  progressRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
  },

  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "14px",
    marginBottom: "22px",
  },

  statButton: {
    border: "none",
    background: "transparent",
    padding: 0,
    textAlign: "left",
    cursor: "pointer",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr",
    gap: "22px",
    marginBottom: "22px",
  },

  sectionHead: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    marginBottom: "16px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "18px",
  },

  sectionText: {
    margin: "6px 0 0",
    color: "#68716c",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  softButton: {
    border: "none",
    background: "#e6f3e9",
    color: "#087f23",
    borderRadius: "999px",
    padding: "9px 13px",
    fontWeight: 900,
    fontSize: "12px",
    cursor: "pointer",
    height: "fit-content",
  },

  activityList: {
    display: "grid",
    gap: "12px",
  },

  activity: {
    display: "grid",
    gridTemplateColumns: "46px 1fr auto",
    alignItems: "center",
    gap: "14px",
    border: "1px solid #edf0eb",
    background: "#f7f8f5",
    borderRadius: "14px",
    padding: "14px",
    cursor: "pointer",
    textAlign: "left",
  },

  activityIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#e6f3e9",
    color: "#087f23",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },

  activityTitle: {
    margin: 0,
    fontSize: "14px",
  },

  activityText: {
    margin: "5px 0 0",
    color: "#68716c",
    fontSize: "13px",
  },

  activityRight: {
    textAlign: "right",
    color: "#087f23",
    fontSize: "13px",
  },

  fraudBox: {
    width: "100%",
    border: "none",
    background: "#f7f8f5",
    borderRadius: "14px",
    padding: "18px",
    marginBottom: "14px",
    cursor: "pointer",
    textAlign: "left",
  },

  fraudLabel: {
    margin: 0,
    color: "#68716c",
    fontSize: "13px",
  },

  fraudValue: {
    margin: "8px 0",
    color: "#087f23",
    fontSize: "26px",
  },

  fraudMiniGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "14px",
  },

  primaryButton: {
    width: "100%",
    border: "none",
    background: "#087f23",
    color: "white",
    borderRadius: "999px",
    padding: "13px",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: "13px",
    marginTop: "10px",
  },

  recommendationCard: {
    width: "100%",
    border: "1px solid #edf0eb",
    background: "#f7f8f5",
    borderRadius: "14px",
    padding: "14px",
    display: "grid",
    gridTemplateColumns: "40px 1fr",
    gap: "12px",
    cursor: "pointer",
    textAlign: "left",
    marginBottom: "12px",
  },

  recommendationIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#e6f3e9",
    color: "#087f23",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },

  recommendationTitle: {
    margin: 0,
    fontSize: "14px",
  },

  recommendationText: {
    margin: "5px 0 0",
    color: "#68716c",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  shortcutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  shortcutButton: {
    border: "1px solid #edf0eb",
    background: "#f7f8f5",
    borderRadius: "14px",
    padding: "16px",
    cursor: "pointer",
    textAlign: "left",
  },

  mapCard: {
  height: "320px",
  position: "relative",
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid #dfe5de",
},

leafletMap: {
  height: "100%",
  width: "100%",
  zIndex: 1,
},

  mapPoint: {
    position: "absolute",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    border: "4px solid white",
    background: "#087f23",
    cursor: "pointer",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 8px 18px rgba(0,0,0,0.18)",
  },

  mapOverlay: {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  borderRadius: "14px",
  padding: "16px 22px",
  boxShadow: "0 14px 30px rgba(0,0,0,0.14)",
  fontSize: "13px",
  minWidth: "260px",
  zIndex: 500,
},

  areaButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "14px",
  },

  areaButton: {
    border: "1px solid #dfe5de",
    background: "white",
    borderRadius: "999px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "12px",
  },

  areaButtonActive: {
    background: "#087f23",
    color: "white",
  },

  infoBox: {
    background: "#f7f8f5",
    borderRadius: "13px",
    padding: "13px",
  },

  infoLabel: {
    margin: 0,
    color: "#68716c",
    fontSize: "12px",
  },

  infoValue: {
    margin: "6px 0 0",
    color: "#101828",
    fontSize: "14px",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
  },

  modalCard: {
    width: "540px",
    maxWidth: "92vw",
    background: "white",
    borderRadius: "18px",
    padding: "26px",
    position: "relative",
    boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
  },

  modalClose: {
    position: "absolute",
    top: "12px",
    right: "16px",
    border: "none",
    background: "transparent",
    fontSize: "26px",
    cursor: "pointer",
  },

  modalTitle: {
    margin: "0 0 10px",
    fontSize: "20px",
  },

  modalText: {
    color: "#68716c",
    fontSize: "13px",
    lineHeight: "1.6",
    marginBottom: "16px",
  },

  modalInfoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "14px",
  },

  modalBigValue: {
    margin: "8px 0 12px",
    fontSize: "38px",
    color: "#087f23",
  },

  progressModal: {
    height: "10px",
    background: "#e5e7eb",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "16px",
  },
};

export default DriverHome;