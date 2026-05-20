import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DriverOrdersPage() {
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [modal, setModal] = useState(null);
  const [otpCode, setOtpCode] = useState("");
  const [reportReason, setReportReason] = useState("");

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
      accountAge: "1 tahun 4 bulan",
      cancelRate: "2%",
      paymentMethod: "GoPay",
      recommendation: "Order dapat diterima karena indikator risiko rendah.",
      indicators: [
        "Akun aktif lebih dari 1 tahun",
        "Riwayat pembatalan rendah",
        "Lokasi penjemputan normal",
        "Metode pembayaran terverifikasi",
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
      accountAge: "3 hari",
      cancelRate: "18%",
      paymentMethod: "Tunai",
      recommendation:
        "Order perlu diverifikasi menggunakan OTP/QR sebelum dilanjutkan.",
      indicators: [
        "Akun baru dibuat",
        "Alamat tujuan kurang lengkap",
        "Riwayat transaksi masih sedikit",
        "Perlu verifikasi tambahan",
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
      accountAge: "1 hari",
      cancelRate: "45%",
      paymentMethod: "Tunai",
      recommendation:
        "Order berisiko tinggi. Driver disarankan tidak langsung menerima order.",
      indicators: [
        "Riwayat pembatalan tinggi",
        "Lokasi penjemputan mencurigakan",
        "Tujuan tidak sesuai pola normal",
        "Identitas customer kurang jelas",
      ],
    },
  ];

  const filteredOrders =
    activeFilter === "Semua"
      ? orders
      : orders.filter((order) => order.riskLevel === activeFilter);

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

  function getRiskColor(level) {
    if (level === "Rendah") return "#00aa13";
    if (level === "Sedang") return "#f59e0b";
    return "#ef4444";
  }

  function openModal(type, order) {
    setModal({ type, order });
    setOtpCode("");
    setReportReason("");
  }

  function closeModal() {
    setModal(null);
    setOtpCode("");
    setReportReason("");
  }

  function handleAccept(order) {
    if (order.riskLevel === "Tinggi") {
      openModal("blocked", order);
      return;
    }

    openModal("accepted", order);
  }

  function handleVerifySubmit() {
    if (otpCode.length < 6) {
      alert("Kode OTP harus 6 digit.");
      return;
    }

    setModal({
      type: "verified",
      order: modal.order,
    });
  }

  function handleReportSubmit() {
    if (!reportReason) {
      alert("Pilih alasan laporan terlebih dahulu.");
      return;
    }

    setModal({
      type: "reported",
      order: modal.order,
    });
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

            <button
              style={styles.navItem}
              onClick={() => navigate("/driver/earnings")}
            >
              <span style={styles.navIcon}>💵</span>
              Earnings
            </button>

            <button
              style={styles.navItem}
              onClick={() => navigate("/driver/account")}
            >
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
          <button
            style={{
              ...styles.summaryCard,
              ...(activeFilter === "Semua" ? styles.summaryCardActive : {}),
            }}
            onClick={() => setActiveFilter("Semua")}
          >
            <p style={styles.summaryLabel}>Order Masuk</p>
            <h2 style={styles.summaryValue}>3</h2>
            <span style={styles.summaryHint}>Semua order</span>
          </button>

          <button
            style={{
              ...styles.summaryCard,
              ...(activeFilter === "Rendah" ? styles.summaryCardActive : {}),
            }}
            onClick={() => setActiveFilter("Rendah")}
          >
            <p style={styles.summaryLabel}>Risiko Rendah</p>
            <h2 style={{ ...styles.summaryValue, color: "#00aa13" }}>1</h2>
            <span style={styles.summaryHint}>Aman diterima</span>
          </button>

          <button
            style={{
              ...styles.summaryCard,
              ...(activeFilter === "Sedang" ? styles.summaryCardActive : {}),
            }}
            onClick={() => setActiveFilter("Sedang")}
          >
            <p style={styles.summaryLabel}>Perlu Verifikasi</p>
            <h2 style={{ ...styles.summaryValue, color: "#f59e0b" }}>1</h2>
            <span style={styles.summaryHint}>Butuh OTP/QR</span>
          </button>

          <button
            style={{
              ...styles.summaryCard,
              ...(activeFilter === "Tinggi" ? styles.summaryCardActive : {}),
            }}
            onClick={() => setActiveFilter("Tinggi")}
          >
            <p style={styles.summaryLabel}>Mencurigakan</p>
            <h2 style={{ ...styles.summaryValue, color: "#ef4444" }}>1</h2>
            <span style={styles.summaryHint}>Perlu laporan</span>
          </button>
        </section>

        <section style={styles.contentGrid}>
          <div style={styles.orderList}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Daftar Order Masuk</h2>
              <span style={styles.smallText}>
                Filter: {activeFilter === "Semua" ? "Semua order" : activeFilter}
              </span>
            </div>

            {filteredOrders.map((order) => (
              <button
                key={order.id}
                style={{
                  ...styles.orderCard,
                  border:
                    selectedOrder?.id === order.id
                      ? "2px solid #00aa13"
                      : "1px solid #dde3df",
                }}
                onClick={() => setSelectedOrder(order)}
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
              </button>
            ))}
          </div>

          <div style={styles.detailPanel}>
            {selectedOrder ? (
              <>
                <div style={styles.detailHeader}>
                  <div>
                    <p style={styles.orderId}>{selectedOrder.id}</p>
                    <h2 style={styles.detailTitle}>Detail Risiko Order</h2>
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
                      background: `conic-gradient(${getRiskColor(
                        selectedOrder.riskLevel
                      )} 0 ${selectedOrder.riskScore}%, #e5e7eb ${
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
                      {selectedOrder.recommendation}
                    </p>
                  </div>
                </div>

                <div style={styles.detailInfoGrid}>
                  <InfoBox label="Usia Akun" value={selectedOrder.accountAge} />
                  <InfoBox
                    label="Pembatalan"
                    value={selectedOrder.cancelRate}
                  />
                  <InfoBox
                    label="Pembayaran"
                    value={selectedOrder.paymentMethod}
                  />
                  <InfoBox label="Jarak" value={selectedOrder.distance} />
                </div>

                <div style={styles.indicatorBox}>
                  <h3 style={styles.indicatorTitle}>Indikator Risiko</h3>

                  {selectedOrder.indicators.map((item, index) => (
                    <div key={index} style={styles.indicatorItem}>
                      <span
                        style={{
                          ...styles.indicatorCheck,
                          background:
                            selectedOrder.riskLevel === "Tinggi"
                              ? "#ffecec"
                              : "#e8f8ed",
                          color:
                            selectedOrder.riskLevel === "Tinggi"
                              ? "#ef4444"
                              : "#00aa13",
                        }}
                      >
                        ✓
                      </span>
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
                    onClick={() => openModal("verify", selectedOrder)}
                  >
                    Verifikasi
                  </button>

                  <button
                    style={styles.reportButton}
                    onClick={() => openModal("report", selectedOrder)}
                  >
                    Laporkan
                  </button>
                </div>

                <div style={styles.secondaryGrid}>
                  <button
                    style={styles.secondaryButton}
                    onClick={() => openModal("route", selectedOrder)}
                  >
                    Lihat Rute
                  </button>

                  <button
                    style={styles.secondaryButton}
                    onClick={() => openModal("risk", selectedOrder)}
                  >
                    Lihat Detail Risiko
                  </button>
                </div>
              </>
            ) : (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📋</div>
                <h2 style={styles.emptyTitle}>Pilih salah satu order</h2>
                <p style={styles.emptyText}>
                  Klik order di sebelah kiri untuk melihat detail skor risiko,
                  indikator, dan rekomendasi tindakan.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {modal && (
        <div style={styles.modalBackdrop} onClick={closeModal}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={closeModal}>
              ×
            </button>

            {modal.type === "route" && (
              <>
                <h2 style={styles.modalTitle}>Detail Rute Order</h2>
                <p style={styles.modalText}>
                  Berikut simulasi rute perjalanan berdasarkan order yang dipilih.
                </p>

                <div style={styles.modalRouteBox}>
                  <div style={styles.modalRouteItem}>
                    <span style={styles.routeDotGreen}></span>
                    <div>
                      <p style={styles.routeLabel}>Lokasi Jemput</p>
                      <h3 style={styles.routeValue}>{modal.order.pickup}</h3>
                    </div>
                  </div>

                  <div style={styles.modalRouteLine}></div>

                  <div style={styles.modalRouteItem}>
                    <span style={styles.routeDotRed}></span>
                    <div>
                      <p style={styles.routeLabel}>Lokasi Tujuan</p>
                      <h3 style={styles.routeValue}>
                        {modal.order.destination}
                      </h3>
                    </div>
                  </div>
                </div>

                <div style={styles.fakeMap}>
                  <div style={styles.mapLabel}>
                    📍 Simulasi Peta Rute • {modal.order.distance}
                  </div>
                </div>
              </>
            )}

            {modal.type === "risk" && (
              <>
                <h2 style={styles.modalTitle}>Detail Analisis Risiko</h2>
                <p style={styles.modalText}>
                  Sistem menghitung risiko berdasarkan kombinasi data akun,
                  pembatalan, lokasi, pembayaran, dan kebutuhan verifikasi.
                </p>

                <div style={styles.riskDetailGrid}>
                  <InfoBox label="Skor Risiko" value={`${modal.order.riskScore}/100`} />
                  <InfoBox label="Kategori" value={modal.order.riskLevel} />
                  <InfoBox label="Usia Akun" value={modal.order.accountAge} />
                  <InfoBox label="Pembatalan" value={modal.order.cancelRate} />
                </div>

                <div style={styles.modalAlert}>
                  <b>Rekomendasi:</b> {modal.order.recommendation}
                </div>
              </>
            )}

            {modal.type === "verify" && (
              <>
                <h2 style={styles.modalTitle}>Verifikasi Customer</h2>
                <p style={styles.modalText}>
                  Masukkan kode OTP simulasi untuk memastikan customer benar-benar
                  melakukan pemesanan.
                </p>

                <input
                  style={styles.otpInput}
                  type="text"
                  maxLength="6"
                  placeholder="Masukkan 6 digit OTP"
                  value={otpCode}
                  onChange={(e) =>
                    setOtpCode(e.target.value.replace(/\D/g, ""))
                  }
                />

                <button style={styles.modalPrimaryButton} onClick={handleVerifySubmit}>
                  Verifikasi OTP
                </button>

                <button
                  style={styles.modalSecondaryButton}
                  onClick={() => alert("Kode OTP simulasi dikirim ulang.")}
                >
                  Kirim Ulang OTP
                </button>
              </>
            )}

            {modal.type === "verified" && (
              <>
                <h2 style={styles.modalTitle}>Verifikasi Berhasil</h2>
                <p style={styles.modalText}>
                  Customer berhasil diverifikasi. Order dapat dilanjutkan dengan
                  tingkat keamanan lebih baik.
                </p>

                <button style={styles.modalPrimaryButton} onClick={closeModal}>
                  Oke, lanjutkan
                </button>
              </>
            )}

            {modal.type === "report" && (
              <>
                <h2 style={styles.modalTitle}>Laporkan Order</h2>
                <p style={styles.modalText}>
                  Pilih alasan mengapa order ini dianggap mencurigakan.
                </p>

                <select
                  style={styles.selectInput}
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                >
                  <option value="">Pilih alasan laporan</option>
                  <option value="Alamat tidak jelas">Alamat tidak jelas</option>
                  <option value="Customer sulit dihubungi">
                    Customer sulit dihubungi
                  </option>
                  <option value="Lokasi mencurigakan">
                    Lokasi mencurigakan
                  </option>
                  <option value="Indikasi order fiktif">
                    Indikasi order fiktif
                  </option>
                </select>

                <button style={styles.reportSubmitButton} onClick={handleReportSubmit}>
                  Kirim Laporan
                </button>
              </>
            )}

            {modal.type === "reported" && (
              <>
                <h2 style={styles.modalTitle}>Laporan Dikirim</h2>
                <p style={styles.modalText}>
                  Order {modal.order.id} telah ditandai mencurigakan dan dikirim
                  ke admin untuk ditinjau.
                </p>

                <button style={styles.modalPrimaryButton} onClick={closeModal}>
                  Mengerti
                </button>
              </>
            )}

            {modal.type === "accepted" && (
              <>
                <h2 style={styles.modalTitle}>Order Diterima</h2>
                <p style={styles.modalText}>
                  Order {modal.order.id} berhasil diterima. Driver dapat menuju
                  lokasi penjemputan.
                </p>

                <button style={styles.modalPrimaryButton} onClick={closeModal}>
                  Mulai Perjalanan
                </button>
              </>
            )}

            {modal.type === "blocked" && (
              <>
                <h2 style={styles.modalTitle}>Order Berisiko Tinggi</h2>
                <p style={styles.modalText}>
                  Sistem mendeteksi order ini berisiko tinggi. Driver disarankan
                  melakukan verifikasi atau melaporkan order terlebih dahulu.
                </p>

                <div style={styles.modalButtonGrid}>
                  <button
                    style={styles.verifyButton}
                    onClick={() => openModal("verify", modal.order)}
                  >
                    Verifikasi
                  </button>

                  <button
                    style={styles.reportButton}
                    onClick={() => openModal("report", modal.order)}
                  >
                    Laporkan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
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
    cursor: "pointer",
    textAlign: "left",
  },

  summaryCardActive: {
    border: "2px solid #00aa13",
    background: "#f0fff4",
  },

  summaryLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "14px",
  },

  summaryValue: {
    margin: "8px 0 4px",
    color: "#111827",
    fontSize: "28px",
  },

  summaryHint: {
    color: "#6b7280",
    fontSize: "12px",
    fontWeight: 700,
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
    textAlign: "left",
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
    marginBottom: "18px",
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

  detailInfoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "20px",
  },

  infoBox: {
    background: "#f7f9f8",
    borderRadius: "14px",
    padding: "14px",
  },

  infoLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "13px",
  },

  infoValue: {
    margin: "6px 0 0",
    color: "#111827",
    fontSize: "16px",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },

  actionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "10px",
    marginBottom: "12px",
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

  secondaryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },

  secondaryButton: {
    border: "1px solid #dde3df",
    background: "white",
    color: "#374151",
    padding: "12px",
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

  emptyTitle: {
    margin: "0 0 8px",
    color: "#374151",
  },

  emptyText: {
    maxWidth: "360px",
    lineHeight: "1.6",
  },

  modalBackdrop: {
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
    borderRadius: "22px",
    padding: "28px",
    position: "relative",
    boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
  },

  modalClose: {
    position: "absolute",
    top: "16px",
    right: "18px",
    border: "none",
    background: "transparent",
    fontSize: "28px",
    cursor: "pointer",
  },

  modalTitle: {
    margin: "0 0 12px",
    color: "#111827",
  },

  modalText: {
    color: "#4b5563",
    lineHeight: "1.6",
    marginBottom: "18px",
  },

  modalRouteBox: {
    background: "#f7f9f8",
    borderRadius: "16px",
    padding: "18px",
    marginBottom: "18px",
  },

  modalRouteItem: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },

  modalRouteLine: {
    width: "2px",
    height: "28px",
    background: "#d1d5db",
    marginLeft: "6px",
  },

  routeDotGreen: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#00aa13",
    marginTop: "5px",
  },

  routeDotRed: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "#ef4444",
    marginTop: "5px",
  },

  routeLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "13px",
  },

  routeValue: {
    margin: "5px 0 0",
    color: "#111827",
    fontSize: "16px",
  },

  fakeMap: {
    height: "170px",
    borderRadius: "16px",
    background:
      "linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55)), repeating-linear-gradient(35deg, #d8dedb 0 2px, transparent 2px 38px), repeating-linear-gradient(125deg, #d8dedb 0 2px, transparent 2px 46px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  mapLabel: {
    background: "white",
    borderRadius: "12px",
    padding: "14px 18px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
    fontWeight: 800,
  },

  riskDetailGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "16px",
  },

  modalAlert: {
    background: "#f8fbff",
    border: "1px solid #d8e4f2",
    borderRadius: "14px",
    padding: "14px",
    color: "#374151",
    lineHeight: "1.6",
  },

  otpInput: {
    width: "100%",
    padding: "15px 16px",
    borderRadius: "12px",
    border: "1px solid #d6dde8",
    background: "#f8fafc",
    fontSize: "18px",
    letterSpacing: "6px",
    textAlign: "center",
    marginBottom: "14px",
  },

  selectInput: {
    width: "100%",
    padding: "15px 16px",
    borderRadius: "12px",
    border: "1px solid #d6dde8",
    background: "#f8fafc",
    fontSize: "15px",
    marginBottom: "14px",
  },

  modalPrimaryButton: {
    width: "100%",
    border: "none",
    background: "#00aa13",
    color: "white",
    padding: "14px",
    borderRadius: "999px",
    fontWeight: 800,
    cursor: "pointer",
    marginTop: "8px",
  },

  modalSecondaryButton: {
    width: "100%",
    border: "1px solid #dde3df",
    background: "white",
    color: "#374151",
    padding: "14px",
    borderRadius: "999px",
    fontWeight: 800,
    cursor: "pointer",
    marginTop: "10px",
  },

  reportSubmitButton: {
    width: "100%",
    border: "none",
    background: "#ef4444",
    color: "white",
    padding: "14px",
    borderRadius: "999px",
    fontWeight: 800,
    cursor: "pointer",
  },

  modalButtonGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "16px",
  },
};

export default DriverOrdersPage;