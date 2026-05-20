import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DriverHome() {
  const navigate = useNavigate();

  const [isOnline, setIsOnline] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [modal, setModal] = useState(null);
  const [selectedArea, setSelectedArea] = useState("Jakarta Selatan");

  const activities = [
    {
      type: "GoRide",
      title: "Pesanan Selesai",
      location: "Sudirman ke Thamrin",
      amount: "+ Rp 24.000",
      time: "14:20",
      icon: "🚗",
      bg: "#e8f8ed",
      color: "#00aa13",
    },
    {
      type: "GoFood",
      title: "Pesanan Selesai",
      location: "Martabak Pecenongan",
      amount: "+ Rp 18.500",
      time: "13:45",
      icon: "🛍️",
      bg: "#fff1e7",
      color: "#ff7a1a",
    },
    {
      type: "GoSend",
      title: "Pesanan Selesai",
      location: "Kuningan City Mall",
      amount: "+ Rp 32.000",
      time: "12:10",
      icon: "📦",
      bg: "#eaf1ff",
      color: "#2878ff",
    },
  ];

  const busyAreas = [
    {
      name: "Jakarta Selatan",
      demand: "Sangat Ramai",
      orders: "32 order tersedia",
      note: "Area perkantoran dan pusat kuliner sedang ramai.",
    },
    {
      name: "Kuningan",
      demand: "Ramai",
      orders: "21 order tersedia",
      note: "Banyak permintaan GoRide dan GoFood.",
    },
    {
      name: "Thamrin",
      demand: "Sedang",
      orders: "14 order tersedia",
      note: "Permintaan meningkat pada jam pulang kerja.",
    },
  ];

  const selectedBusyArea = busyAreas.find((area) => area.name === selectedArea);

  function openModal(type, data = null) {
    setModal({ type, data });
  }

  function closeModal() {
    setModal(null);
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
            <button style={{ ...styles.navItem, ...styles.navActive }}>
              <span style={styles.navIcon}>🏠</span>
              Home
            </button>

            <button
              style={styles.navItem}
              onClick={() => navigate("/driver/orders")}
            >
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
          <div style={styles.headerBrand}>
            <span style={styles.headerLogo}>gojek</span>
            <span style={styles.headerText}>Driver</span>
          </div>

          <div style={styles.headerActions}>
            <button
              style={{
                ...styles.onlineButton,
                background: isOnline ? "#00aa13" : "#9ca3af",
              }}
              onClick={() => setIsOnline(!isOnline)}
            >
              {isOnline ? "Go Online" : "Offline"}
              <span style={styles.onlineDot}></span>
            </button>

            <div style={styles.notificationWrapper}>
              <button
                style={styles.bellButton}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                🔔
              </button>

              {showNotifications && (
                <div style={styles.notificationBox}>
                  <h3 style={styles.notificationTitle}>Notifikasi</h3>

                  <div style={styles.notificationItem}>
                    <b>Order baru tersedia</b>
                    <p>Area Jakarta Selatan sedang ramai.</p>
                  </div>

                  <div style={styles.notificationItem}>
                    <b>Target bonus 80%</b>
                    <p>Selesaikan 20 poin lagi untuk bonus tambahan.</p>
                  </div>

                  <div style={styles.notificationItem}>
                    <b>Deteksi order aktif</b>
                    <p>Sistem akan memberi peringatan jika order mencurigakan.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div style={styles.statusBanner}>
          <span>{isOnline ? "🟢" : "⚪"}</span>
          <p>
            {isOnline
              ? "Anda sedang online dan siap menerima order."
              : "Anda sedang offline. Aktifkan Go Online untuk menerima order."}
          </p>
        </div>

        <section style={styles.topGrid}>
          <button
            style={styles.earningCard}
            onClick={() => openModal("earning")}
          >
            <div style={styles.cardHeader}>
              <div>
                <p style={styles.cardLabel}>Pendapatan Hari Ini</p>
                <h2 style={styles.amount}>Rp 342.500</h2>
              </div>

              <div style={styles.moneyIcon}>💵</div>
            </div>

            <div style={styles.earningDivider}></div>

            <div style={styles.earningStats}>
              <div>
                <p style={styles.statLabel}>Order Selesai</p>
                <h3 style={styles.statValue}>14</h3>
              </div>

              <div style={styles.verticalLine}></div>

              <div>
                <p style={styles.statLabel}>Insentif</p>
                <h3 style={{ ...styles.statValue, color: "#00aa13" }}>
                  + Rp 50.000
                </h3>
              </div>
            </div>
          </button>

          <button style={styles.bonusCard} onClick={() => openModal("bonus")}>
            <div style={styles.bonusIcon}>🎯</div>
            <h3 style={styles.bonusTitle}>Target Bonus</h3>
            <p style={styles.bonusText}>Dapatkan Rp 100rb lagi</p>

            <div style={styles.progressBar}>
              <div style={styles.progressFill}></div>
            </div>

            <p style={styles.bonusPoint}>80/100 Poin</p>
          </button>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Performa Anda</h2>

          <div style={styles.performanceGrid}>
            <button
              style={styles.performanceCard}
              onClick={() =>
                openModal("performance", {
                  title: "Penerimaan Order",
                  value: "98%",
                  desc: "Persentase order yang diterima dari seluruh order masuk.",
                })
              }
            >
              <Ring value="98%" ring="98" />
              <p style={styles.performanceLabel}>Penerimaan</p>
            </button>

            <button
              style={styles.performanceCard}
              onClick={() =>
                openModal("performance", {
                  title: "Rating Driver",
                  value: "5.0",
                  desc: "Nilai kepuasan customer terhadap layanan driver.",
                })
              }
            >
              <Ring value="5.0" ring="90" />
              <p style={styles.performanceLabel}>Rating</p>
            </button>

            <button
              style={styles.performanceCard}
              onClick={() =>
                openModal("performance", {
                  title: "Waktu Aktif",
                  value: "04:12",
                  desc: "Durasi driver aktif menerima order hari ini.",
                })
              }
            >
              <div style={styles.simpleIcon}>⏱️</div>
              <h3 style={styles.simpleValue}>04:12</h3>
              <p style={styles.performanceLabel}>Waktu Aktif</p>
            </button>

            <button
              style={styles.performanceCard}
              onClick={() =>
                openModal("performance", {
                  title: "Pembatalan",
                  value: "0%",
                  desc: "Persentase order yang dibatalkan oleh driver.",
                })
              }
            >
              <div style={styles.simpleIcon}>✕</div>
              <h3 style={styles.simpleValue}>0%</h3>
              <p style={styles.performanceLabel}>Pembatalan</p>
            </button>
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Aktivitas Hari Ini</h2>
            <button
              style={styles.seeAll}
              onClick={() => navigate("/driver/orders")}
            >
              Lihat Semua ›
            </button>
          </div>

          <div style={styles.activityList}>
            {activities.map((item, index) => (
              <button
                key={index}
                style={styles.activityCard}
                onClick={() => openModal("activity", item)}
              >
                <div
                  style={{
                    ...styles.activityIcon,
                    background: item.bg,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>

                <div>
                  <h3 style={styles.activityTitle}>
                    {item.type} <span>•</span> {item.title}
                  </h3>
                  <p style={styles.activityLocation}>{item.location}</p>
                </div>

                <div style={styles.activityAmount}>
                  <h3 style={styles.activityAmountValue}>{item.amount}</h3>
                  <p style={styles.activityAmountTime}>{item.time}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section style={styles.mapSection}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Area Ramai</h2>
              <p style={styles.sectionSubtitle}>
                Simulasi area dengan permintaan order paling tinggi.
              </p>
            </div>

            <button
              style={styles.seeAll}
              onClick={() =>
                openModal("map", {
                  title: selectedBusyArea.name,
                  desc: selectedBusyArea.note,
                })
              }
            >
              Detail Area ›
            </button>
          </div>

          <div style={styles.mapCard}>
            <button
              style={{ ...styles.mapPoint, left: "60%", top: "45%" }}
              onClick={() => setSelectedArea("Jakarta Selatan")}
            >
              ●
            </button>

            <button
              style={{ ...styles.mapPoint, left: "45%", top: "60%" }}
              onClick={() => setSelectedArea("Kuningan")}
            >
              ●
            </button>

            <button
              style={{ ...styles.mapPoint, left: "70%", top: "65%" }}
              onClick={() => setSelectedArea("Thamrin")}
            >
              ●
            </button>

            <div style={styles.mapOverlay}>
              <span style={styles.pin}>📍</span>
              <div>
                <strong>Area Ramai: {selectedBusyArea.name}</strong>
                <p style={styles.mapText}>
                  {selectedBusyArea.demand} • {selectedBusyArea.orders}
                </p>
              </div>
            </div>
          </div>

          <div style={styles.areaActions}>
            {busyAreas.map((area) => (
              <button
                key={area.name}
                style={{
                  ...styles.areaButton,
                  ...(selectedArea === area.name ? styles.areaButtonActive : {}),
                }}
                onClick={() => setSelectedArea(area.name)}
              >
                {area.name}
              </button>
            ))}
          </div>
        </section>
      </main>

      {modal && (
        <div style={styles.modalBackdrop} onClick={closeModal}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={closeModal}>
              ×
            </button>

            {modal.type === "earning" && (
              <>
                <h2 style={styles.modalTitle}>Detail Pendapatan Hari Ini</h2>
                <p style={styles.modalText}>
                  Pendapatan hari ini berasal dari 14 order selesai dan insentif
                  target harian.
                </p>

                <div style={styles.modalInfoGrid}>
                  <Info label="GoRide" value="Rp 168.000" />
                  <Info label="GoFood" value="Rp 92.500" />
                  <Info label="GoSend" value="Rp 32.000" />
                  <Info label="Insentif" value="Rp 50.000" />
                </div>
              </>
            )}

            {modal.type === "bonus" && (
              <>
                <h2 style={styles.modalTitle}>Target Bonus</h2>
                <p style={styles.modalText}>
                  Anda sudah mencapai 80 dari 100 poin. Selesaikan 20 poin lagi
                  untuk mendapatkan bonus Rp 100.000.
                </p>

                <div style={styles.progressBarModal}>
                  <div style={styles.progressFill}></div>
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
                  {modal.data.type} berhasil diselesaikan pada pukul{" "}
                  {modal.data.time}.
                </p>

                <div style={styles.modalInfoGrid}>
                  <Info label="Layanan" value={modal.data.type} />
                  <Info label="Lokasi" value={modal.data.location} />
                  <Info label="Pendapatan" value={modal.data.amount} />
                  <Info label="Status" value="Selesai" />
                </div>
              </>
            )}

            {modal.type === "map" && (
              <>
                <h2 style={styles.modalTitle}>Detail Area Ramai</h2>
                <p style={styles.modalText}>
                  <b>{selectedBusyArea.name}</b> sedang dalam status{" "}
                  <b>{selectedBusyArea.demand}</b>.
                </p>
                <p style={styles.modalText}>{selectedBusyArea.note}</p>

                <button
                  style={styles.modalPrimaryButton}
                  onClick={() => navigate("/driver/orders")}
                >
                  Lihat Order di Area Ini
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Ring({ value, ring }) {
  return (
    <div
      style={{
        ...styles.ring,
        background: `conic-gradient(#00aa13 0 ${ring}%, #e8f5e9 ${ring}% 100%)`,
      }}
    >
      <div style={styles.ringInner}>{value}</div>
    </div>
  );
}

function Info({ label, value }) {
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

  brandTitle: {
    margin: 0,
    fontSize: "34px",
    fontWeight: 900,
  },

  brandSubtitle: {
    margin: "8px 0 34px",
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
    padding: "38px 48px 60px",
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
    marginBottom: "18px",
  },

  headerBrand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  headerLogo: {
    color: "#00aa13",
    fontSize: "24px",
    fontWeight: 900,
  },

  headerText: {
    color: "#6b7280",
    fontSize: "16px",
  },

  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  onlineButton: {
    color: "white",
    border: "none",
    borderRadius: "999px",
    padding: "13px 20px",
    fontSize: "15px",
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,170,19,0.18)",
  },

  onlineDot: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "white",
    display: "inline-block",
  },

  bellButton: {
    border: "none",
    background: "transparent",
    fontSize: "22px",
    cursor: "pointer",
  },

  notificationWrapper: {
    position: "relative",
  },

  notificationBox: {
    position: "absolute",
    top: "42px",
    right: 0,
    width: "320px",
    background: "white",
    border: "1px solid #dde3df",
    borderRadius: "16px",
    boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
    padding: "16px",
    zIndex: 20,
  },

  notificationTitle: {
    margin: "0 0 12px",
    color: "#111827",
  },

  notificationItem: {
    borderBottom: "1px solid #eef2f1",
    padding: "10px 0",
    color: "#374151",
  },

  statusBanner: {
    background: "white",
    border: "1px solid #dde3df",
    borderRadius: "14px",
    padding: "14px 16px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "24px",
  },

  topGrid: {
    display: "grid",
    gridTemplateColumns: "1.45fr 1fr",
    gap: "24px",
    marginBottom: "34px",
  },

  earningCard: {
    background: "white",
    border: "1px solid #dde3df",
    borderRadius: "18px",
    padding: "26px 30px",
    textAlign: "left",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  cardLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "15px",
  },

  amount: {
    margin: "8px 0 0",
    fontSize: "30px",
    color: "#111827",
  },

  moneyIcon: {
    background: "#e8f8ed",
    color: "#00aa13",
    borderRadius: "10px",
    padding: "10px",
    fontSize: "22px",
  },

  earningDivider: {
    height: "1px",
    background: "#d7ded9",
    margin: "22px 0",
  },

  earningStats: {
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr",
    gap: "24px",
    alignItems: "center",
  },

  verticalLine: {
    width: "1px",
    height: "54px",
    background: "#d7ded9",
  },

  statLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "15px",
  },

  statValue: {
    margin: "6px 0 0",
    fontSize: "18px",
    color: "#111827",
  },

  bonusCard: {
    background: "linear-gradient(145deg, #00aa13, #008b10)",
    color: "white",
    border: "none",
    borderRadius: "18px",
    padding: "26px",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 14px 32px rgba(0,170,19,0.2)",
  },

  bonusIcon: {
    fontSize: "38px",
    marginBottom: "12px",
  },

  bonusTitle: {
    margin: 0,
    fontSize: "18px",
  },

  bonusText: {
    margin: "10px 0 20px",
    opacity: 0.95,
  },

  progressBar: {
    height: "8px",
    background: "rgba(255,255,255,0.22)",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "16px",
  },

  progressFill: {
    width: "80%",
    height: "100%",
    background: "white",
    borderRadius: "999px",
  },

  bonusPoint: {
    margin: 0,
    fontWeight: 800,
  },

  section: {
    marginBottom: "32px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    margin: "0 0 18px",
    fontSize: "20px",
    color: "#111827",
  },

  sectionSubtitle: {
    margin: "0 0 8px",
    color: "#6b7280",
    fontSize: "14px",
  },

  seeAll: {
    border: "none",
    background: "transparent",
    color: "#00aa13",
    fontSize: "15px",
    fontWeight: 800,
    cursor: "pointer",
    marginBottom: "18px",
  },

  performanceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
  },

  performanceCard: {
    background: "white",
    border: "1px solid #dde3df",
    borderRadius: "16px",
    padding: "22px 16px",
    minHeight: "140px",
    textAlign: "center",
    cursor: "pointer",
  },

  ring: {
    width: "76px",
    height: "76px",
    borderRadius: "50%",
    margin: "0 auto 12px",
    padding: "8px",
  },

  ringInner: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: 800,
  },

  simpleIcon: {
    fontSize: "34px",
    marginBottom: "10px",
  },

  simpleValue: {
    margin: "0 0 8px",
    fontSize: "20px",
  },

  performanceLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "15px",
  },

  activityList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  activityCard: {
    background: "white",
    border: "1px solid #dde3df",
    borderRadius: "16px",
    padding: "16px 20px",
    display: "grid",
    gridTemplateColumns: "54px 1fr auto",
    alignItems: "center",
    gap: "16px",
    cursor: "pointer",
    textAlign: "left",
  },

  activityIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  activityTitle: {
    margin: 0,
    fontSize: "16px",
    color: "#111827",
  },

  activityLocation: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },

  activityAmount: {
    textAlign: "right",
  },

  activityAmountValue: {
    margin: 0,
    color: "#00aa13",
    fontSize: "17px",
  },

  activityAmountTime: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: "12px",
  },

  mapSection: {
    marginBottom: "32px",
  },

  mapCard: {
    height: "230px",
    borderRadius: "18px",
    border: "1px solid #dde3df",
    overflow: "hidden",
    position: "relative",
    background:
      "linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55)), repeating-linear-gradient(35deg, #d8dedb 0 2px, transparent 2px 38px), repeating-linear-gradient(125deg, #d8dedb 0 2px, transparent 2px 46px)",
  },

  mapPoint: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    border: "4px solid white",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#00aa13",
    color: "#00aa13",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  },

  mapOverlay: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    borderRadius: "14px",
    padding: "18px 28px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
    fontSize: "16px",
  },

  mapText: {
    margin: "4px 0 0",
    color: "#6b7280",
    fontSize: "13px",
  },

  pin: {
    color: "#00aa13",
  },

  areaActions: {
    display: "flex",
    gap: "10px",
    marginTop: "14px",
  },

  areaButton: {
    border: "1px solid #dde3df",
    background: "white",
    color: "#374151",
    borderRadius: "999px",
    padding: "10px 14px",
    cursor: "pointer",
    fontWeight: 700,
  },

  areaButtonActive: {
    background: "#00aa13",
    color: "white",
    border: "1px solid #00aa13",
  },

  modalBackdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
  },

  modalCard: {
    width: "520px",
    maxWidth: "92vw",
    background: "white",
    borderRadius: "22px",
    padding: "28px",
    position: "relative",
    boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
  },

  modalClose: {
    position: "absolute",
    right: "18px",
    top: "14px",
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
  },

  modalBigValue: {
    color: "#00aa13",
    fontSize: "42px",
    margin: "8px 0",
  },

  modalInfoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "18px",
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

  progressBarModal: {
    height: "12px",
    background: "#e5e7eb",
    borderRadius: "999px",
    overflow: "hidden",
    marginTop: "20px",
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
    marginTop: "18px",
  },
};

export default DriverHome;