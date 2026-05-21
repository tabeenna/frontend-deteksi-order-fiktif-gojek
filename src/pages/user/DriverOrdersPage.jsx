import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DriverOrdersPage() {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [message, setMessage] = useState("");

  const orders = [
    {
      id: "ORD-001",
      service: "GoRide",
      customer: "Raka Pratama",
      pickup: "Mall Olympic Garden",
      destination: "Universitas Brawijaya",
      fare: "Rp 24.000",
      distance: "4.2 km",
      riskScore: 22,
      riskLevel: "Rendah",
      status: "Aman",
      indicators: [
        "Akun aktif lebih dari 1 tahun",
        "Riwayat pembatalan rendah",
        "Lokasi penjemputan normal",
      ],
    },
    {
      id: "ORD-002",
      service: "GoFood",
      customer: "User Baru",
      pickup: "Restoran Cepat Saji",
      destination: "Alamat tidak lengkap",
      fare: "Rp 18.500",
      distance: "2.1 km",
      riskScore: 58,
      riskLevel: "Sedang",
      status: "Perlu Verifikasi",
      indicators: [
        "Akun baru dibuat",
        "Alamat tujuan kurang lengkap",
        "Perlu verifikasi OTP/QR",
      ],
    },
    {
      id: "ORD-003",
      service: "GoRide",
      customer: "Akun Tanpa Nama Jelas",
      pickup: "Lokasi sepi",
      destination: "Titik tidak sesuai peta",
      fare: "Rp 42.000",
      distance: "8.9 km",
      riskScore: 84,
      riskLevel: "Tinggi",
      status: "Mencurigakan",
      indicators: [
        "Riwayat pembatalan tinggi",
        "Lokasi penjemputan mencurigakan",
        "Tujuan tidak sesuai pola normal",
      ],
    },
  ];

  function getRiskStyle(level) {
    if (level === "Rendah") {
      return {
        background: "#e8f8ed",
        color: "#008b10",
        border: "1px solid #b7efc5",
      };
    }

    if (level === "Sedang") {
      return {
        background: "#fff7e6",
        color: "#b86b00",
        border: "1px solid #ffd899",
      };
    }

    return {
      background: "#ffecec",
      color: "#c62828",
      border: "1px solid #ffb4b4",
    };
  }

  function handleAccept(order) {
    if (order.riskLevel === "Tinggi") {
      setMessage(
        "Order berisiko tinggi. Sistem menyarankan driver tidak langsung menerima order."
      );
      return;
    }

    setMessage("Order diterima. Driver dapat melanjutkan proses penjemputan.");
  }

  function handleVerify(order) {
    setMessage(
      `Permintaan verifikasi OTP/QR dikirim untuk ${order.customer}.`
    );
  }

  function handleReport(order) {
    setMessage(
      `Order ${order.id} telah dilaporkan ke admin karena terindikasi mencurigakan.`
    );
  }

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.brand}>
            <h1 style={styles.brandTitle}>Gojek</h1>
            <p style={styles.brandSubtitle}>Driver Portal</p>
          </div>

          <nav style={styles.nav}>
            <button style={styles.navItem} onClick={() => navigate("/driver")}>
              <span style={styles.navIcon}>🏠</span>
              Home
            </button>

            <button style={{ ...styles.navItem, ...styles.navActive }}>
              <span style={styles.navIcon}>📋</span>
              Orders
            </button>

            <button style={styles.navItem}>
              <span style={styles.navIcon}>💵</span>
              Earnings
            </button>

            <button style={styles.navItem}>
              <span style={styles.navIcon}>👤</span>
              Account
            </button>
          </nav>
        </div>

        <div style={styles.profileCard}>
          <div style={styles.profileTop}>
            <div style={styles.avatar}>👤</div>
            <div>
              <h3 style={styles.profileName}>Sudirman</h3>
              <p style={styles.profileRole}>Driver</p>
            </div>
          </div>

          <div style={styles.profileDivider}></div>

          <div style={styles.profileMeta}>
            <span>⭐ 5.0</span>
            <span style={styles.metaDivider}></span>
            <span>🛡️ Terverifikasi</span>
          </div>
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.pageTitle}>Orders</h1>
            <p style={styles.pageSubtitle}>
              Pantau order masuk dan cek potensi order fiktif sebelum diterima.
            </p>
          </div>

          <button style={styles.onlineButton}>Go Online</button>
        </header>

        <section style={styles.summaryGrid}>
          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Order Masuk</p>
            <h2 style={styles.summaryValue}>3</h2>
          </div>

          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Risiko Rendah</p>
            <h2 style={{ ...styles.summaryValue, color: "#00aa13" }}>1</h2>
          </div>

          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Perlu Verifikasi</p>
            <h2 style={{ ...styles.summaryValue, color: "#f59e0b" }}>1</h2>
          </div>

          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Mencurigakan</p>
            <h2 style={{ ...styles.summaryValue, color: "#ef4444" }}>1</h2>
          </div>
        </section>

        {message && <div style={styles.messageBox}>{message}</div>}

        <section style={styles.contentGrid}>
          <div style={styles.orderList}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Daftar Order Masuk</h2>
              <span style={styles.smallText}>Simulasi data prototype</span>
            </div>

            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  ...styles.orderCard,
                  border:
                    selectedOrder?.id === order.id
                      ? "2px solid #00aa13"
                      : "1px solid #dde3df",
                }}
                onClick={() => {
                  setSelectedOrder(order);
                  setMessage("");
                }}
              >
                <div style={styles.orderTop}>
                  <div>
                    <p style={styles.orderId}>{order.id}</p>
                    <h3 style={styles.orderTitle}>
                      {order.service} • {order.customer}
                    </h3>
                  </div>

                  <span
                    style={{
                      ...styles.riskBadge,
                      ...getRiskStyle(order.riskLevel),
                    }}
                  >
                    {order.riskLevel}
                  </span>
                </div>

                <div style={styles.routeBox}>
                  <p style={styles.routeText}>📍 {order.pickup}</p>
                  <p style={styles.routeText}>🏁 {order.destination}</p>
                </div>

                <div style={styles.orderBottom}>
                  <span>{order.fare}</span>
                  <span>{order.distance}</span>
                  <span>Skor {order.riskScore}/100</span>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.detailPanel}>
            {selectedOrder ? (
              <>
                <div style={styles.detailHeader}>
                  <div>
                    <p style={styles.orderId}>{selectedOrder.id}</p>
                    <h2 style={styles.detailTitle}>
                      Detail Risiko Order
                    </h2>
                  </div>

                  <span
                    style={{
                      ...styles.riskBadge,
                      ...getRiskStyle(selectedOrder.riskLevel),
                    }}
                  >
                    Risiko {selectedOrder.riskLevel}
                  </span>
                </div>

                <div style={styles.scoreArea}>
                  <div
                    style={{
                      ...styles.scoreCircle,
                      background: `conic-gradient(${
                        selectedOrder.riskLevel === "Tinggi"
                          ? "#ef4444"
                          : selectedOrder.riskLevel === "Sedang"
                          ? "#f59e0b"
                          : "#00aa13"
                      } 0 ${selectedOrder.riskScore}%, #e5e7eb ${
                        selectedOrder.riskScore
                      }% 100%)`,
                    }}
                  >
                    <div style={styles.scoreInner}>
                      {selectedOrder.riskScore}
                    </div>
                  </div>

                  <div>
                    <h3 style={styles.statusTitle}>{selectedOrder.status}</h3>
                    <p style={styles.statusText}>
                      Sistem menilai order berdasarkan akun customer, histori
                      pembatalan, pola lokasi, dan kebutuhan verifikasi tambahan.
                    </p>
                  </div>
                </div>

                <div style={styles.indicatorBox}>
                  <h3 style={styles.indicatorTitle}>Indikator Risiko</h3>

                  {selectedOrder.indicators.map((item, index) => (
                    <div key={index} style={styles.indicatorItem}>
                      <span style={styles.indicatorCheck}>✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div style={styles.actionGrid}>
                  <button
                    style={styles.acceptButton}
                    onClick={() => handleAccept(selectedOrder)}
                  >
                    Terima
                  </button>

                  <button
                    style={styles.verifyButton}
                    onClick={() => handleVerify(selectedOrder)}
                  >
                    Verifikasi
                  </button>

                  <button
                    style={styles.reportButton}
                    onClick={() => handleReport(selectedOrder)}
                  >
                    Laporkan
                  </button>
                </div>
              </>
            ) : (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📋</div>
                <h2>Pilih salah satu order</h2>
                <p>
                  Klik order di sebelah kiri untuk melihat detail skor risiko dan
                  rekomendasi tindakan.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "310px 1fr",
    background: "#f7f9f8",
    fontFamily: "Arial, sans-serif",
    color: "#1f2933",
  },

  sidebar: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #00aa13 0%, #007f0e 100%)",
    color: "white",
    padding: "42px 32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
  },

  brand: {
    marginBottom: "34px",
  },

  brandTitle: {
    margin: 0,
    fontSize: "34px",
    fontWeight: 900,
  },

  brandSubtitle: {
    margin: "8px 0 0",
    fontSize: "15px",
    opacity: 0.85,
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  navItem: {
    width: "100%",
    border: "none",
    background: "transparent",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontSize: "17px",
    fontWeight: 700,
    padding: "16px 18px",
    borderRadius: "14px",
    cursor: "pointer",
    textAlign: "left",
    opacity: 0.92,
  },

  navActive: {
    background: "rgba(255,255,255,0.18)",
    opacity: 1,
  },

  navIcon: {
    fontSize: "20px",
    width: "26px",
  },

  profileCard: {
    background: "rgba(255,255,255,0.11)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "18px",
    padding: "18px",
  },

  profileTop: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  avatar: {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    background: "white",
    color: "#00aa13",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },

  profileName: {
    margin: 0,
    fontSize: "17px",
    fontWeight: 800,
  },

  profileRole: {
    margin: "4px 0 0",
    opacity: 0.85,
    fontSize: "14px",
  },

  profileDivider: {
    height: "1px",
    background: "rgba(255,255,255,0.16)",
    margin: "16px 0",
  },

  profileMeta: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontSize: "14px",
    fontWeight: 700,
  },

  metaDivider: {
    width: "1px",
    height: "18px",
    background: "rgba(255,255,255,0.28)",
  },

  main: {
    padding: "38px 48px",
    maxWidth: "1100px",
    width: "100%",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "24px",
    borderBottom: "1px solid #e5e7eb",
    marginBottom: "28px",
  },

  pageTitle: {
    margin: 0,
    fontSize: "32px",
    color: "#111827",
  },

  pageSubtitle: {
    margin: "8px 0 0",
    color: "#6b7280",
    fontSize: "15px",
  },

  onlineButton: {
    background: "#00aa13",
    color: "white",
    border: "none",
    borderRadius: "999px",
    padding: "13px 22px",
    fontWeight: 800,
    cursor: "pointer",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "22px",
  },

  summaryCard: {
    background: "white",
    border: "1px solid #dde3df",
    borderRadius: "16px",
    padding: "18px",
  },

  summaryLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "14px",
  },

  summaryValue: {
    margin: "8px 0 0",
    color: "#111827",
    fontSize: "28px",
  },

  messageBox: {
    background: "#f8fbff",
    border: "1px solid #d8e4f2",
    color: "#374151",
    borderRadius: "14px",
    padding: "14px 16px",
    marginBottom: "22px",
    fontSize: "14px",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "22px",
    alignItems: "start",
  },

  orderList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "20px",
    color: "#111827",
  },

  smallText: {
    color: "#6b7280",
    fontSize: "13px",
  },

  orderCard: {
    background: "white",
    borderRadius: "18px",
    padding: "18px",
    cursor: "pointer",
  },

  orderTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "14px",
  },

  orderId: {
    margin: "0 0 6px",
    color: "#6b7280",
    fontSize: "13px",
    fontWeight: 700,
  },

  orderTitle: {
    margin: 0,
    color: "#111827",
    fontSize: "17px",
  },

  riskBadge: {
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 800,
    height: "fit-content",
    whiteSpace: "nowrap",
  },

  routeBox: {
    background: "#f7f9f8",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "14px",
  },

  routeText: {
    margin: "6px 0",
    color: "#4b5563",
    fontSize: "14px",
  },

  orderBottom: {
    display: "flex",
    justifyContent: "space-between",
    color: "#6b7280",
    fontSize: "13px",
    fontWeight: 700,
  },

  detailPanel: {
    background: "white",
    border: "1px solid #dde3df",
    borderRadius: "20px",
    padding: "24px",
    minHeight: "520px",
  },

  detailHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    marginBottom: "24px",
  },

  detailTitle: {
    margin: 0,
    color: "#111827",
    fontSize: "24px",
  },

  scoreArea: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
    background: "#f7f9f8",
    borderRadius: "16px",
    padding: "18px",
    marginBottom: "20px",
  },

  scoreCircle: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    padding: "8px",
    flexShrink: 0,
  },

  scoreInner: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: 900,
  },

  statusTitle: {
    margin: "0 0 8px",
    color: "#111827",
  },

  statusText: {
    margin: 0,
    color: "#6b7280",
    fontSize: "14px",
    lineHeight: "1.5",
  },

  indicatorBox: {
    marginBottom: "22px",
  },

  indicatorTitle: {
    margin: "0 0 12px",
    color: "#111827",
    fontSize: "17px",
  },

  indicatorItem: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "10px",
    color: "#374151",
    fontSize: "14px",
  },

  indicatorCheck: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "#e8f8ed",
    color: "#00aa13",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },

  actionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "10px",
  },

  acceptButton: {
    border: "none",
    background: "#00aa13",
    color: "white",
    padding: "13px",
    borderRadius: "12px",
    fontWeight: 800,
    cursor: "pointer",
  },

  verifyButton: {
    border: "none",
    background: "#f59e0b",
    color: "white",
    padding: "13px",
    borderRadius: "12px",
    fontWeight: 800,
    cursor: "pointer",
  },

  reportButton: {
    border: "none",
    background: "#ef4444",
    color: "white",
    padding: "13px",
    borderRadius: "12px",
    fontWeight: 800,
    cursor: "pointer",
  },

  emptyState: {
    height: "100%",
    minHeight: "460px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#6b7280",
  },

  emptyIcon: {
    fontSize: "48px",
    marginBottom: "14px",
  },
};

export default DriverOrdersPage;