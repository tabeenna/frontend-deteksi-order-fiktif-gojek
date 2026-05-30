import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";
import { useNavigate } from "react-router-dom";
import DriverLayout, {
  Card,
  StatCard,
  Badge,
} from "../../components/driver/DriverLayout";

function DriverHistoryPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [modal, setModal] = useState(null);
  const [histories, setHistories] = useState([]);
const [summary, setSummary] = useState({
  total: 0,
  completed: 0,
  driver_cancelled: 0,
  auto_cancelled: 0,
});
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  async function fetchHistories() {
    try {
      const response = await apiRequest("/driver/history");

      const apiHistories = response.data.histories || [];

      setHistories(apiHistories);
      setSummary(
        response.data.summary || {
          total: 0,
          completed: 0,
          driver_cancelled: 0,
          auto_cancelled: 0,
        }
      );

      if (apiHistories.length > 0) {
        setSelectedHistory(apiHistories[0]);
      } else {
        setSelectedHistory(null);
      }
    } catch (err) {
      setError(err.message || "Gagal mengambil data riwayat order.");
    } finally {
      setLoading(false);
    }
  }

  fetchHistories();
}, []);

  const filteredHistories =
    activeFilter === "Semua"
      ? histories
      : histories.filter((item) => item.status === activeFilter);

  function getBadgeType(riskLevel) {
    if (riskLevel === "Rendah") return "green";
    if (riskLevel === "Sedang") return "yellow";
    return "red";
  }

  function getStatusStyle(status) {
    if (status === "Selesai") {
      return {
        background: "#e6f3e9",
        color: "#087f23",
      };
    }

    if (status === "Auto Cancel") {
      return {
        background: "#fee2e2",
        color: "#b91c1c",
      };
    }

    return {
      background: "#fff7e6",
      color: "#a16207",
    };
  }

  function openModal(type, data = null) {
    setModal({ type, data });
  }

  function closeModal() {
    setModal(null);
  }

  function DriverHistoryPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [modal, setModal] = useState(null);

  const [histories, setHistories] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    completed: 0,
    driver_cancelled: 0,
    auto_cancelled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHistories() {
      try {
        const response = await apiRequest("/driver/history");

        const apiHistories = response.data.histories || [];

        setHistories(apiHistories);
        setSummary(
          response.data.summary || {
            total: 0,
            completed: 0,
            driver_cancelled: 0,
            auto_cancelled: 0,
          }
        );

        if (apiHistories.length > 0) {
          setSelectedHistory(apiHistories[0]);
        } else {
          setSelectedHistory(null);
        }
      } catch (err) {
        setError(err.message || "Gagal mengambil data riwayat order.");
      } finally {
        setLoading(false);
      }
    }

    fetchHistories();
  }, []);

  const filteredHistories =
    activeFilter === "Semua"
      ? histories
      : histories.filter((item) => item.status === activeFilter);

  function getBadgeType(riskLevel) {
    if (riskLevel === "Rendah") return "green";
    if (riskLevel === "Sedang") return "yellow";
    return "red";
  }

  function getStatusStyle(status) {
    if (status === "Selesai") {
      return {
        background: "#e6f3e9",
        color: "#087f23",
      };
    }

    if (status === "Auto Cancel") {
      return {
        background: "#fee2e2",
        color: "#b91c1c",
      };
    }

    return {
      background: "#fff7e6",
      color: "#a16207",
    };
  }

  function openModal(type, data = null) {
    setModal({ type, data });
  }

  function closeModal() {
    setModal(null);
  }

  // TEMPEL LOADING DI SINI
  if (loading) {
    return (
      <DriverLayout
        activeMenu="History"
        title="Order History"
        subtitle="Memuat riwayat order driver..."
      >
        <Card>
          <p>Sedang memuat riwayat order...</p>
        </Card>
      </DriverLayout>
    );
  }

  // TEMPEL ERROR DI SINI
  if (error) {
    return (
      <DriverLayout
        activeMenu="History"
        title="Order History"
        subtitle="Terjadi kesalahan saat mengambil riwayat order."
      >
        <Card>
          <p style={{ color: "#b91c1c", fontWeight: 800 }}>{error}</p>
          <p style={{ color: "#68716c", fontSize: "13px" }}>
            Pastikan backend Laravel menyala dan endpoint /driver/history sudah tersedia.
          </p>
        </Card>
      </DriverLayout>
    );
  }

  // INI RETURN UTAMA YANG DIMAKSUD
  return (
    <DriverLayout
      activeMenu="History"
      title="Order History"
      subtitle="Riwayat order yang sudah selesai, dibatalkan, atau dibatalkan otomatis oleh sistem."
    >
      {/* isi tampilan history kamu tetap di bawah sini */}
    </DriverLayout>
  );
}
  return (
    <DriverLayout
      activeMenu="History"
      title="Order History"
      subtitle="Riwayat order yang sudah selesai, dibatalkan, atau dibatalkan otomatis oleh sistem."
    >
      <section style={styles.summaryGrid}>
        <button
          style={{
            ...styles.summaryButton,
            ...(activeFilter === "Semua" ? styles.summaryActive : {}),
          }}
          onClick={() => setActiveFilter("Semua")}
        >
          <StatCard
  label="Total Riwayat"
  value={String(summary.total)}
  note="Semua order"
/>
        </button>

        <button
          style={{
            ...styles.summaryButton,
            ...(activeFilter === "Selesai" ? styles.summaryActive : {}),
          }}
          onClick={() => setActiveFilter("Selesai")}
        >
          <StatCard
            label="Selesai"
            value={String(summary.completed)}
            note="Pendapatan masuk"
            color="#087f23"
          />
        </button>

        <button
          style={{
            ...styles.summaryButton,
            ...(activeFilter === "Dibatalkan Driver" ? styles.summaryActive : {}),
          }}
          onClick={() => setActiveFilter("Dibatalkan Driver")}
        >
          <StatCard
            label="Dibatalkan"
            value={String(summary.driver_cancelled)}
            note="Oleh driver"
            color="#d97706"
          />
        </button>

        <button
          style={{
            ...styles.summaryButton,
            ...(activeFilter === "Auto Cancel" ? styles.summaryActive : {}),
          }}
          onClick={() => setActiveFilter("Auto Cancel")}
        >
          <StatCard
            label="Auto Cancel"
            value={String(summary.auto_cancelled)}
            note="Risiko tinggi"
            color="#b91c1c"
          />
        </button>
      </section>

      <section style={styles.contentGrid}>
        <Card>
          <div style={styles.sectionHead}>
            <div>
              <h2 style={styles.sectionTitle}>Daftar Riwayat Order</h2>
              <p style={styles.sectionText}>
                Klik salah satu riwayat untuk melihat detail perjalanan,
                verifikasi, dan pendapatan.
              </p>
            </div>

            <button
              style={styles.softButton}
              onClick={() => navigate("/driver/orders")}
            >
              Kembali ke Orders
            </button>
          </div>

          <div style={styles.historyList}>
  {filteredHistories.length === 0 ? (
    <div style={styles.emptyListBox}>
      <h3>Belum ada riwayat order</h3>
      <p>
        Riwayat akan muncul setelah order diselesaikan, dibatalkan driver,
        atau dibatalkan otomatis oleh sistem.
      </p>
    </div>
  ) : (
    filteredHistories.map((item) => (
      <button
        key={item.id}
        style={{
          ...styles.historyCard,
          ...(selectedHistory?.id === item.id
            ? styles.historyCardActive
            : {}),
        }}
        onClick={() => setSelectedHistory(item)}
      >
        <div style={styles.historyTop}>
          <div>
            <p style={styles.historyId}>{item.orderId}</p>
            <h3 style={styles.historyTitle}>
              {item.service} • {item.customer}
            </h3>
            <p style={styles.historyRoute}>{item.route}</p>
          </div>

          <span
            style={{
              ...styles.statusBadge,
              ...getStatusStyle(item.status),
            }}
          >
            {item.status}
          </span>
        </div>

        <div style={styles.historyMeta}>
          <span>{item.date}</span>
          <span>{item.time}</span>
          <span>{item.fare}</span>
        </div>
      </button>
    ))
  )}
</div>
        </Card>

        <Card style={styles.detailCard}>
          {selectedHistory ? (
            <>
              <div style={styles.detailHeader}>
                <div>
                  <p style={styles.historyId}>{selectedHistory.orderId}</p>
                  <h2 style={styles.detailTitle}>Detail Riwayat Order</h2>
                </div>

                <Badge type={getBadgeType(selectedHistory.riskLevel)}>
                  Risiko {selectedHistory.riskLevel}
                </Badge>
              </div>

              <div style={styles.detailStatusBox}>
                <div>
                  <p style={styles.detailLabel}>Status Order</p>
                  <h3 style={styles.detailStatus}>{selectedHistory.status}</h3>
                </div>

                <div>
                  <p style={styles.detailLabel}>Skor Risiko</p>
                  <h3 style={styles.detailStatus}>
                    {selectedHistory.riskScore}/100
                  </h3>
                </div>
              </div>

              <div style={styles.infoGrid}>
                <InfoBox label="Layanan" value={selectedHistory.service} />
                <InfoBox label="Customer" value={selectedHistory.customer} />
                <InfoBox label="Tanggal" value={selectedHistory.date} />
                <InfoBox label="Jam" value={selectedHistory.time} />
                <InfoBox label="Durasi" value={selectedHistory.duration} />
                <InfoBox label="Jarak" value={selectedHistory.distance} />
                <InfoBox label="Tarif" value={selectedHistory.fare} />
                <InfoBox label="Pembayaran" value={selectedHistory.payment} />
              </div>

              <div style={styles.routeBox}>
                <div>
                  <p style={styles.detailLabel}>Titik Awal</p>
                  <h3 style={styles.routeTitle}>{selectedHistory.pickup}</h3>
                </div>

                <div style={styles.routeLine}></div>

                <div>
                  <p style={styles.detailLabel}>Titik Akhir</p>
                  <h3 style={styles.routeTitle}>
                    {selectedHistory.destination}
                  </h3>
                </div>
              </div>

              <div style={styles.verificationBox}>
                <p style={styles.detailLabel}>Verifikasi</p>
                <h3 style={styles.verificationTitle}>
                  {selectedHistory.verification}
                </h3>
                <p style={styles.verificationText}>{selectedHistory.note}</p>
              </div>

              <div style={styles.timelineBox}>
                <h3 style={styles.timelineTitle}>Timeline Order</h3>

                {selectedHistory.timeline.map((step, index) => (
                  <div key={index} style={styles.timelineItem}>
                    <span style={styles.timelineNumber}>{index + 1}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>

              <div style={styles.actionGrid}>
                <button
                  style={styles.secondaryButton}
                  onClick={() => openModal("detail", selectedHistory)}
                >
                  Lihat Detail Lengkap
                </button>

                <button
                  style={styles.primaryButton}
                  onClick={() => navigate("/driver/earnings")}
                  disabled={selectedHistory.status !== "Selesai"}
                >
                  Lihat Earnings
                </button>
              </div>
            </>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>◷</div>
              <h2 style={styles.emptyTitle}>Pilih riwayat order</h2>
              <p style={styles.emptyText}>
                Detail order akan tampil di sini, termasuk status, risiko,
                timeline, verifikasi, dan pendapatan.
              </p>
            </div>
          )}
        </Card>
      </section>

      {modal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={closeModal}>
              ×
            </button>

            {modal.type === "detail" && (
              <>
                <h2 style={styles.modalTitle}>Detail Lengkap Riwayat</h2>
                <p style={styles.modalText}>
                  Riwayat ini menunjukkan status akhir order dan proses yang
                  sudah dilalui oleh driver.
                </p>

                <div style={styles.modalInfoGrid}>
                  <InfoBox label="Order ID" value={modal.data.orderId} />
                  <InfoBox label="Status" value={modal.data.status} />
                  <InfoBox label="Risiko" value={modal.data.riskLevel} />
                  <InfoBox label="Skor" value={`${modal.data.riskScore}/100`} />
                  <InfoBox label="Tarif" value={modal.data.fare} />
                  <InfoBox label="Pembayaran" value={modal.data.payment} />
                </div>

                <div style={styles.modalNote}>
                  <b>Catatan:</b> {modal.data.note}
                </div>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Tutup
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

const styles = {
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "14px",
    marginBottom: "22px",
  },

  summaryButton: {
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
    textAlign: "left",
  },

  summaryActive: {
    outline: "2px solid #087f23",
    borderRadius: "16px",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.05fr",
    gap: "22px",
    alignItems: "start",
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

  historyList: {
  display: "grid",
  gap: "12px",
},

emptyListBox: {
  background: "#f7f8f5",
  border: "1px solid #dfe5de",
  borderRadius: "16px",
  padding: "18px",
  color: "#68716c",
  fontSize: "13px",
  lineHeight: "1.6",
},

historyCard: {
  border: "1px solid #dfe5de",
  background: "#f7f8f5",
  borderRadius: "16px",
  padding: "16px",
  cursor: "pointer",
  textAlign: "left",
},

  historyCardActive: {
    border: "2px solid #087f23",
    background: "#f0f7f1",
  },

  historyTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    marginBottom: "12px",
  },

  historyId: {
    margin: "0 0 5px",
    color: "#68716c",
    fontSize: "12px",
    fontWeight: 800,
  },

  historyTitle: {
    margin: 0,
    fontSize: "15px",
    color: "#101828",
  },

  historyRoute: {
    margin: "6px 0 0",
    color: "#68716c",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  statusBadge: {
    borderRadius: "999px",
    padding: "7px 10px",
    fontSize: "12px",
    fontWeight: 900,
    height: "fit-content",
    whiteSpace: "nowrap",
  },

  historyMeta: {
    display: "flex",
    justifyContent: "space-between",
    color: "#68716c",
    fontSize: "12px",
    fontWeight: 800,
  },

  detailCard: {
    minHeight: "600px",
  },

  detailHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    marginBottom: "18px",
  },

  detailTitle: {
    margin: 0,
    fontSize: "20px",
  },

  detailStatusBox: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    background: "#f7f8f5",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "16px",
  },

  detailLabel: {
    margin: 0,
    color: "#68716c",
    fontSize: "12px",
  },

  detailStatus: {
    margin: "6px 0 0",
    fontSize: "16px",
    color: "#101828",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "16px",
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

  routeBox: {
    background: "#f7f8f5",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "16px",
  },

  routeTitle: {
    margin: "6px 0 0",
    fontSize: "14px",
  },

  routeLine: {
    width: "2px",
    height: "28px",
    background: "#d1d5db",
    margin: "10px 0 10px 6px",
  },

  verificationBox: {
    background: "#fff7e6",
    border: "1px solid #fcd9a5",
    borderRadius: "14px",
    padding: "14px",
    marginBottom: "16px",
  },

  verificationTitle: {
    margin: "6px 0",
    fontSize: "14px",
    color: "#7c4a03",
  },

  verificationText: {
    margin: 0,
    color: "#7c4a03",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  timelineBox: {
    marginBottom: "16px",
  },

  timelineTitle: {
    margin: "0 0 12px",
    fontSize: "15px",
  },

  timelineItem: {
    display: "grid",
    gridTemplateColumns: "28px 1fr",
    gap: "10px",
    alignItems: "start",
    marginBottom: "10px",
    color: "#374151",
    fontSize: "13px",
  },

  timelineNumber: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#087f23",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: 900,
  },

  actionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
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
  },

  secondaryButton: {
    width: "100%",
    border: "1px solid #dfe5de",
    background: "white",
    color: "#374151",
    borderRadius: "999px",
    padding: "13px",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: "13px",
  },

  emptyState: {
    minHeight: "520px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  emptyIcon: {
    fontSize: "42px",
    marginBottom: "12px",
    color: "#68716c",
  },

  emptyTitle: {
    margin: "0 0 8px",
    fontSize: "20px",
  },

  emptyText: {
    margin: 0,
    maxWidth: "340px",
    color: "#68716c",
    lineHeight: "1.6",
    fontSize: "13px",
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

  modalNote: {
    background: "#f7f8f5",
    borderRadius: "14px",
    padding: "14px",
    margin: "16px 0",
    color: "#374151",
    fontSize: "13px",
    lineHeight: "1.6",
  },
};

export default DriverHistoryPage;