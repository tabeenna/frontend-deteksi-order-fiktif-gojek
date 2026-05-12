import { useNavigate } from "react-router-dom";

function DriverHome() {
  const navigate = useNavigate();

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

            <button style={styles.navItem} onClick={() => navigate("/driver/orders")}>
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
            <button style={styles.profileArrow}>›</button>
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
            <button style={styles.onlineButton}>
              Go Online
              <span style={styles.onlineDot}></span>
            </button>

            <button style={styles.bellButton}>🔔</button>
          </div>
        </header>

        <section style={styles.topGrid}>
          <div style={styles.earningCard}>
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
          </div>

          <div style={styles.bonusCard}>
            <div style={styles.bonusIcon}>🎯</div>
            <h3 style={styles.bonusTitle}>Target Bonus</h3>
            <p style={styles.bonusText}>Dapatkan Rp 100rb lagi</p>

            <div style={styles.progressBar}>
              <div style={styles.progressFill}></div>
            </div>

            <p style={styles.bonusPoint}>80/100 Poin</p>
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Performa Anda</h2>

          <div style={styles.performanceGrid}>
            <MetricCard value="98%" label="Penerimaan" ring="98" />
            <MetricCard value="5.0" label="Rating" ring="90" />
            <SimpleMetric icon="⏱️" value="04:12" label="Waktu Aktif" />
            <SimpleMetric icon="✕" value="0%" label="Pembatalan" muted />
          </div>
        </section>

        <section style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Aktivitas Hari Ini</h2>
            <button style={styles.seeAll}>Lihat Semua ›</button>
          </div>

          <div style={styles.activityList}>
            {activities.map((item, index) => (
              <div key={index} style={styles.activityCard}>
                <div
                  style={{
                    ...styles.activityIcon,
                    background: item.bg,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>

                <div style={styles.activityInfo}>
                  <h3 style={styles.activityTitle}>
                    {item.type} <span>•</span> {item.title}
                  </h3>
                  <p style={styles.activityLocation}>{item.location}</p>
                </div>

                <div style={styles.activityAmount}>
                  <h3 style={styles.activityAmountValue}>{item.amount}</h3>
                  <p style={styles.activityAmountTime}>{item.time}</p>
                  </div>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.mapCard}>
          <div style={styles.mapOverlay}>
            <span style={styles.pin}>📍</span>
            <span>Area Ramai: Jakarta Selatan</span>
          </div>
        </section>
      </main>
    </div>
  );
}

function MetricCard({ value, label, ring }) {
  return (
    <div style={styles.performanceCard}>
      <div
        style={{
          ...styles.ring,
          background: `conic-gradient(#00aa13 0 ${ring}%, #e8f5e9 ${ring}% 100%)`,
        }}
      >
        <div style={styles.ringInner}>{value}</div>
      </div>
      <p style={styles.performanceLabel}>{label}</p>
    </div>
  );
}

function SimpleMetric({ icon, value, label, muted }) {
  return (
    <div style={styles.performanceCard}>
      <div
        style={{
          ...styles.simpleIcon,
          color: muted ? "#555" : "#00aa13",
        }}
      >
        {icon}
      </div>
      <h3 style={styles.simpleValue}>{value}</h3>
      <p style={styles.performanceLabel}>{label}</p>
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
  },

  brand: {
    marginBottom: "34px",
  },

  brandTitle: {
    margin: 0,
    fontSize: "34px",
    fontWeight: 900,
    letterSpacing: "-1px",
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
    boxShadow: "0 16px 40px rgba(0,0,0,0.14)",
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

  profileArrow: {
    marginLeft: "auto",
    border: "none",
    background: "transparent",
    color: "white",
    fontSize: "24px",
    cursor: "pointer",
  },

  main: {
    padding: "34px 48px",
    maxWidth: "980px",
    width: "100%",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "24px",
    borderBottom: "1px solid #e5e7eb",
    marginBottom: "30px",
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
    background: "#00aa13",
    color: "white",
    border: "none",
    borderRadius: "999px",
    padding: "12px 18px",
    fontSize: "15px",
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,170,19,0.2)",
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
    borderRadius: "18px",
    padding: "26px",
    textAlign: "center",
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
    boxShadow: "0 10px 24px rgba(0,0,0,0.035)",
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
    boxShadow: "0 8px 20px rgba(0,0,0,0.03)",
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

  activityInfo: {
    minWidth: 0,
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

  mapCard: {
    height: "180px",
    borderRadius: "18px",
    border: "1px solid #dde3df",
    overflow: "hidden",
    position: "relative",
    background:
      "linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.55)), repeating-linear-gradient(35deg, #e5e7eb 0 2px, transparent 2px 38px), repeating-linear-gradient(125deg, #e5e7eb 0 2px, transparent 2px 46px)",
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
    fontSize: "17px",
  },

  pin: {
    color: "#00aa13",
  },
};

export default DriverHome;