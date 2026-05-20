import { useNavigate } from "react-router-dom";

function DriverEarningsPage() {
  const navigate = useNavigate();

  const transactions = [
    {
      id: "TRX-001",
      service: "GoRide",
      route: "Sudirman ke Thamrin",
      amount: "+ Rp 24.000",
      time: "14:20",
      status: "Selesai",
      icon: "🚗",
    },
    {
      id: "TRX-002",
      service: "GoFood",
      route: "Martabak Pecenongan",
      amount: "+ Rp 18.500",
      time: "13:45",
      status: "Selesai",
      icon: "🛍️",
    },
    {
      id: "TRX-003",
      service: "GoSend",
      route: "Kuningan City Mall",
      amount: "+ Rp 32.000",
      time: "12:10",
      status: "Selesai",
      icon: "📦",
    },
    {
      id: "TRX-004",
      service: "Bonus",
      route: "Target harian tercapai",
      amount: "+ Rp 50.000",
      time: "11:00",
      status: "Insentif",
      icon: "🎯",
    },
  ];

  const weeklyData = [
    { day: "Sen", value: 45 },
    { day: "Sel", value: 60 },
    { day: "Rab", value: 52 },
    { day: "Kam", value: 75 },
    { day: "Jum", value: 68 },
    { day: "Sab", value: 90 },
    { day: "Min", value: 82 },
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
            <button style={styles.navItem} onClick={() => navigate("/driver")}>
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

            <button style={{ ...styles.navItem, ...styles.navActive }}>
              <span style={styles.navIcon}>💵</span>
              Earnings
            </button>

            <button style={styles.navItem} onClick={() => navigate("/driver/account")}>
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
            <h1 style={styles.pageTitle}>Earnings</h1>
            <p style={styles.pageSubtitle}>
              Pantau pendapatan, insentif, dan riwayat transaksi driver.
            </p>
          </div>

          <button style={styles.onlineButton}>Go Online</button>
        </header>

        <section style={styles.summaryGrid}>
          <div style={styles.balanceCard}>
            <p style={styles.balanceLabel}>Saldo Tersedia</p>
            <h2 style={styles.balanceValue}>Rp 742.500</h2>
            <p style={styles.balanceNote}>
              Bisa dicairkan ke rekening bank yang sudah terdaftar.
            </p>

            <button style={styles.withdrawButton}>Cairkan Saldo</button>
          </div>

          <div style={styles.summaryCard}>
            <div style={styles.summaryIcon}>💰</div>
            <p style={styles.summaryLabel}>Hari Ini</p>
            <h2 style={styles.summaryValue}>Rp 342.500</h2>
          </div>

          <div style={styles.summaryCard}>
            <div style={styles.summaryIcon}>🎯</div>
            <p style={styles.summaryLabel}>Insentif</p>
            <h2 style={{ ...styles.summaryValue, color: "#00aa13" }}>
              Rp 50.000
            </h2>
          </div>

          <div style={styles.summaryCard}>
            <div style={styles.summaryIcon}>📋</div>
            <p style={styles.summaryLabel}>Order Selesai</p>
            <h2 style={styles.summaryValue}>14</h2>
          </div>
        </section>

        <section style={styles.contentGrid}>
          <div style={styles.chartCard}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Pendapatan Mingguan</h2>
                <p style={styles.sectionSubtitle}>
                  Simulasi pendapatan dalam tujuh hari terakhir.
                </p>
              </div>

              <span style={styles.weekBadge}>Minggu Ini</span>
            </div>

            <div style={styles.chartArea}>
              {weeklyData.map((item) => (
                <div key={item.day} style={styles.barItem}>
                  <div style={styles.barTrack}>
                    <div
                      style={{
                        ...styles.barFill,
                        height: `${item.value}%`,
                      }}
                    ></div>
                  </div>
                  <p style={styles.barLabel}>{item.day}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.bonusCard}>
            <div style={styles.bonusIcon}>🎯</div>
            <h2 style={styles.bonusTitle}>Target Bonus</h2>
            <p style={styles.bonusText}>
              Selesaikan 20 order lagi untuk mendapatkan bonus tambahan.
            </p>

            <div style={styles.progressBar}>
              <div style={styles.progressFill}></div>
            </div>

            <div style={styles.progressRow}>
              <span>80/100 Poin</span>
              <strong>80%</strong>
            </div>

            <div style={styles.bonusInfo}>
              <p style={styles.bonusInfoLabel}>Bonus tersedia</p>
              <h3 style={styles.bonusInfoValue}>Rp 100.000</h3>
            </div>
          </div>
        </section>

        <section style={styles.transactionSection}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Riwayat Pendapatan</h2>
              <p style={styles.sectionSubtitle}>
                Transaksi terbaru dari layanan driver.
              </p>
            </div>

            <button style={styles.filterButton}>Filter</button>
          </div>

          <div style={styles.transactionList}>
            {transactions.map((item) => (
              <div key={item.id} style={styles.transactionCard}>
                <div style={styles.transactionIcon}>{item.icon}</div>

                <div style={styles.transactionInfo}>
                  <h3 style={styles.transactionTitle}>
                    {item.service} • {item.status}
                  </h3>
                  <p style={styles.transactionRoute}>{item.route}</p>
                </div>

                <div style={styles.transactionAmount}>
                  <h3 style={styles.transactionAmountValue}>{item.amount}</h3>
                  <p style={styles.transactionAmountTime}>{item.time}</p>
                </div>
              </div>
            ))}
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
    gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
    gap: "16px",
    marginBottom: "24px",
  },

  balanceCard: {
    background: "linear-gradient(145deg, #00aa13, #008b10)",
    color: "white",
    borderRadius: "20px",
    padding: "24px",
  },

  balanceLabel: {
    margin: 0,
    opacity: 0.9,
    fontSize: "15px",
  },

  balanceValue: {
    margin: "8px 0",
    fontSize: "32px",
  },

  balanceNote: {
    margin: "0 0 22px",
    opacity: 0.9,
    fontSize: "14px",
    lineHeight: "1.5",
  },

  withdrawButton: {
    border: "none",
    background: "white",
    color: "#00aa13",
    padding: "12px 18px",
    borderRadius: "999px",
    fontWeight: 800,
    cursor: "pointer",
  },

  summaryCard: {
    background: "white",
    border: "1px solid #dde3df",
    borderRadius: "18px",
    padding: "20px",
  },

  summaryIcon: {
    fontSize: "28px",
    marginBottom: "12px",
  },

  summaryLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "14px",
  },

  summaryValue: {
    margin: "8px 0 0",
    color: "#111827",
    fontSize: "24px",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: "22px",
    marginBottom: "26px",
  },

  chartCard: {
    background: "white",
    border: "1px solid #dde3df",
    borderRadius: "20px",
    padding: "24px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "20px",
    color: "#111827",
  },

  sectionSubtitle: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },

  weekBadge: {
    background: "#e8f8ed",
    color: "#00aa13",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 800,
  },

  chartArea: {
    height: "230px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "14px",
    paddingTop: "24px",
  },

  barItem: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },

  barTrack: {
    width: "100%",
    height: "180px",
    background: "#eef2f1",
    borderRadius: "999px",
    display: "flex",
    alignItems: "flex-end",
    overflow: "hidden",
  },

  barFill: {
    width: "100%",
    background: "linear-gradient(180deg, #00aa13, #008b10)",
    borderRadius: "999px",
  },

  barLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "13px",
    fontWeight: 700,
  },

  bonusCard: {
    background: "white",
    border: "1px solid #dde3df",
    borderRadius: "20px",
    padding: "24px",
  },

  bonusIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "#e8f8ed",
    color: "#00aa13",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    marginBottom: "16px",
  },

  bonusTitle: {
    margin: 0,
    fontSize: "22px",
    color: "#111827",
  },

  bonusText: {
    margin: "10px 0 22px",
    color: "#6b7280",
    lineHeight: "1.5",
    fontSize: "14px",
  },

  progressBar: {
    height: "10px",
    background: "#e5e7eb",
    borderRadius: "999px",
    overflow: "hidden",
  },

  progressFill: {
    width: "80%",
    height: "100%",
    background: "#00aa13",
    borderRadius: "999px",
  },

  progressRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    color: "#4b5563",
    fontSize: "14px",
  },

  bonusInfo: {
    marginTop: "24px",
    background: "#f7f9f8",
    borderRadius: "14px",
    padding: "16px",
  },

  bonusInfoLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "14px",
  },

  bonusInfoValue: {
    margin: "6px 0 0",
    color: "#00aa13",
    fontSize: "22px",
  },

  transactionSection: {
    background: "white",
    border: "1px solid #dde3df",
    borderRadius: "20px",
    padding: "24px",
  },

  filterButton: {
    border: "none",
    background: "#e8f8ed",
    color: "#00aa13",
    padding: "10px 16px",
    borderRadius: "999px",
    fontWeight: 800,
    cursor: "pointer",
  },

  transactionList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  transactionCard: {
    display: "grid",
    gridTemplateColumns: "54px 1fr auto",
    alignItems: "center",
    gap: "16px",
    padding: "16px",
    border: "1px solid #eef2f1",
    borderRadius: "16px",
  },

  transactionIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#e8f8ed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  transactionInfo: {
    minWidth: 0,
  },

  transactionTitle: {
    margin: 0,
    fontSize: "16px",
    color: "#111827",
  },

  transactionRoute: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },

  transactionAmount: {
    textAlign: "right",
  },

  transactionAmountValue: {
    margin: 0,
    color: "#00aa13",
    fontSize: "17px",
  },

  transactionAmountTime: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: "12px",
  },
};

export default DriverEarningsPage;