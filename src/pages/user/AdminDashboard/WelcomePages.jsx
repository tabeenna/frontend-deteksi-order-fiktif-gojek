import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const stats = [
  { value: "24", label: "Active Alerts" },
  { value: "98.2%", label: "Uptime" },
  { value: "12", label: "Flagged Today" },
];

const navCards = [
  { path: "/admin/monitoring", icon: "📊", label: "Monitoring", desc: "Lihat data fraud real-time" },
  { path: "/admin/orders", icon: "📋", label: "Orders", desc: "Kelola semua pesanan" },
  { path: "/admin/drivers", icon: "🛵", label: "Drivers", desc: "Monitor aktivitas driver" },
  { path: "/admin/database", icon: "🗄️", label: "Database", desc: "Manajemen user & data" },
];

export default function WelcomePages() {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <div className="welcome-container">
        <div className="welcome-logo">🛡️</div>
        <div className="welcome-title-wrap">
          <p className="welcome-sub">Selamat Datang di</p>
          <h1 className="welcome-title">Gojek Fraud Radar</h1>
        </div>
        <div className="welcome-user-card">
          <div className="welcome-avatar">MP</div>
          <div>
            <p className="welcome-name">Muhammad Puma</p>
            <p className="welcome-online">● Super Admin · Online</p>
          </div>
        </div>
        <div className="welcome-stats">
          {stats.map((s) => (
            <div key={s.label} className="welcome-stat">
              <p className="welcome-stat-val">{s.value}</p>
              <p className="welcome-stat-lbl">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="welcome-nav-grid">
          {navCards.map((n) => (
            <button key={n.path} className="welcome-nav-card" onClick={() => navigate(n.path)}>
              <span className="welcome-nav-icon">{n.icon}</span>
              <p className="welcome-nav-label">{n.label}</p>
              <p className="welcome-nav-desc">{n.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
