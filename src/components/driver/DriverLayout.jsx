import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DriverLayout({ activeMenu, title, subtitle, children }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  const menus = [
  { name: "Home", icon: "⌂", path: "/driver" },
  { name: "Orders", icon: "▤", path: "/driver/orders" },
  { name: "History", icon: "◷", path: "/driver/history" },
  { name: "Earnings", icon: "▣", path: "/driver/earnings" },
  { name: "Account", icon: "◉", path: "/driver/account" },
];

  return (
    <div
      style={{
        ...styles.page,
        gridTemplateColumns: sidebarOpen ? "260px 1fr" : "86px 1fr",
      }}
    >
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.profileArea}>
            <div style={styles.avatar}>SD</div>

            {sidebarOpen && (
              <div>
                <h3 style={styles.profileName}>Sudirman</h3>
                <p style={styles.profileRole}>Gojek Driver</p>
              </div>
            )}
          </div>

          <button
            style={styles.collapseButton}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? "Tutup sidebar" : "Buka sidebar"}
          >
            {sidebarOpen ? "‹" : "›"}
          </button>

          <nav style={styles.nav}>
            {menus.map((menu) => (
              <button
                key={menu.name}
                style={{
                  ...styles.navItem,
                  ...(activeMenu === menu.name ? styles.navActive : {}),
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                }}
                onClick={() => navigate(menu.path)}
              >
                <span style={styles.navIcon}>{menu.icon}</span>
                {sidebarOpen && <span>{menu.name}</span>}
              </button>
            ))}
          </nav>
        </div>

        <div>
          {sidebarOpen && (
            <div style={styles.sidebarCard}>
              <p style={styles.sidebarCardLabel}>Status Akun</p>
              <h3 style={styles.sidebarCardTitle}>Terverifikasi</h3>
              <p style={styles.sidebarCardText}>Siap menerima order</p>
            </div>
          )}

          <button style={styles.logoutButton} onClick={() => navigate("/")}>
            {sidebarOpen ? "Keluar" : "×"}
          </button>
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.topbar}>
          <div>
            <h1 style={styles.pageTitle}>{title}</h1>
            <p style={styles.pageSubtitle}>{subtitle}</p>
          </div>

          <div style={styles.topActions}>
            <button
              style={{
                ...styles.onlineButton,
                background: isOnline ? "#087f23" : "#6b7280",
              }}
              onClick={() => setIsOnline(!isOnline)}
            >
              {isOnline ? "Go Online" : "Offline"}
              <span style={styles.onlineDot}></span>
            </button>

            <button style={styles.iconButton}>🔔</button>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}

export function Card({ children, style }) {
  return <section style={{ ...styles.card, ...style }}>{children}</section>;
}

export function StatCard({ label, value, note, color = "#101828" }) {
  return (
    <div style={styles.statCard}>
      <p style={styles.statLabel}>{label}</p>
      <h2 style={{ ...styles.statValue, color }}>{value}</h2>
      {note && <p style={styles.statNote}>{note}</p>}
    </div>
  );
}

export function Badge({ children, type = "green" }) {
  const badgeStyle =
    type === "red"
      ? styles.badgeRed
      : type === "yellow"
      ? styles.badgeYellow
      : styles.badgeGreen;

  return <span style={{ ...styles.badge, ...badgeStyle }}>{children}</span>;
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    background: "#eef1eb",
    fontFamily: "Arial, sans-serif",
    color: "#101828",
    transition: "grid-template-columns 0.25s ease",
  },

  sidebar: {
    minHeight: "100vh",
    background: "#141816",
    color: "white",
    padding: "24px 16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
  },

  profileArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px",
  },

  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    background: "#087f23",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: "14px",
    flexShrink: 0,
  },

  profileName: {
    margin: 0,
    fontSize: "14px",
    fontWeight: 800,
  },

  profileRole: {
    margin: "4px 0 0",
    color: "#9ca3af",
    fontSize: "12px",
  },

  collapseButton: {
    width: "40px",
    height: "40px",
    border: "1px solid #2c332f",
    background: "#1f2521",
    color: "#d1d5db",
    borderRadius: "50%",
    cursor: "pointer",
    marginBottom: "18px",
    fontSize: "24px",
    fontWeight: 900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  navItem: {
    width: "100%",
    border: "none",
    background: "transparent",
    color: "#cbd5d1",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "14px",
    fontWeight: 700,
    padding: "12px 14px",
    borderRadius: "12px",
    cursor: "pointer",
    textAlign: "left",
  },

  navActive: {
    background: "#087f23",
    color: "white",
  },

  navIcon: {
    width: "20px",
    textAlign: "center",
    fontSize: "15px",
  },

  sidebarCard: {
    background: "#1f2521",
    border: "1px solid #2c332f",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "14px",
  },

  sidebarCardLabel: {
    margin: 0,
    color: "#9ca3af",
    fontSize: "12px",
  },

  sidebarCardTitle: {
    margin: "8px 0 4px",
    fontSize: "15px",
  },

  sidebarCardText: {
    margin: 0,
    color: "#9ca3af",
    fontSize: "12px",
  },

  logoutButton: {
    width: "100%",
    border: "none",
    background: "#2b312d",
    color: "white",
    borderRadius: "12px",
    padding: "12px",
    cursor: "pointer",
    fontWeight: 800,
    fontSize: "13px",
  },

  main: {
    minHeight: "100vh",
    padding: "0 28px 38px",
  },

  topbar: {
    minHeight: "76px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #d8ded8",
    marginBottom: "24px",
  },

  pageTitle: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 900,
    letterSpacing: "-0.4px",
  },

  pageSubtitle: {
    margin: "6px 0 0",
    color: "#66706b",
    fontSize: "13px",
  },

  topActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  onlineButton: {
    border: "none",
    color: "white",
    borderRadius: "999px",
    padding: "10px 16px",
    fontSize: "13px",
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },

  onlineDot: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "white",
  },

  iconButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    background: "#f6f7f4",
    cursor: "pointer",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #dfe5de",
    borderRadius: "18px",
    padding: "24px",
    marginBottom: "22px",
  },

  statCard: {
    background: "#ffffff",
    border: "1px solid #dfe5de",
    borderRadius: "16px",
    padding: "18px",
  },

  statLabel: {
    margin: 0,
    color: "#68716c",
    fontSize: "13px",
  },

  statValue: {
    margin: "8px 0 4px",
    fontSize: "24px",
    fontWeight: 900,
  },

  statNote: {
    margin: 0,
    color: "#7b837f",
    fontSize: "12px",
  },

  badge: {
    display: "inline-block",
    borderRadius: "999px",
    padding: "7px 10px",
    fontSize: "12px",
    fontWeight: 800,
  },

  badgeGreen: {
    background: "#e6f3e9",
    color: "#06751a",
  },

  badgeYellow: {
    background: "#fff7e6",
    color: "#a16207",
  },

  badgeRed: {
    background: "#fee2e2",
    color: "#b91c1c",
  },
};


export default DriverLayout;