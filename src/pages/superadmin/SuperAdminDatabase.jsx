import { useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS = [
  { name: "Ahmad Rizky",   email: "rizky.ahmad@gojek-internal.com",     role: "superadmin", clearance: 5, lastActivity: "Today, 14:22" },
  { name: "Siti Aminah",   email: "siti.a@gojek-internal.com",          role: "admin",      clearance: 3, lastActivity: "2 hours ago" },
  { name: "Budi Santoso",  email: "budis_drv_jk112@partner.gojek.com",  role: "driver",     clearance: 1, lastActivity: "Yesterday, 18:05" },
  { name: "Lina Wijaya",   email: "lina.wijaya@gojek-internal.com",     role: "admin",      clearance: 4, lastActivity: "22 minutes ago" },
];

const NAV = [
  { id: "monitoring", label: "Monitoring", icon: "monitoring", path: "/superadmin" },
  { id: "orders",     label: "Orders",     icon: "orders",     path: "/superadmin/orders" },
  { id: "drivers",    label: "Drivers",    icon: "drivers",    path: "/superadmin/drivers" },
  { id: "security",   label: "Security",   icon: "security",   path: "/superadmin/security" },
  { id: "database",   label: "Database",   icon: "database",   path: "/superadmin/database" },
  { id: "audit",      label: "Audit Logs", icon: "audit",      path: "/superadmin/audit" },
];

const roleStyle = {
  superadmin: { bg: "#111", color: "white",    label: "SUPERADMIN" },
  admin:      { bg: "#F3F4F6", color: "#374151", label: "ADMIN" },
  driver:     { bg: "#F3F4F6", color: "#374151", label: "DRIVER" },
};

const clearanceStyle = {
  5: { icon: "shield",   color: "#00AA13", bg: "#F0FFF4", label: "Level 5" },
  4: { icon: "shield",   color: "#00AA13", bg: "#F0FFF4", label: "Level 4" },
  3: { icon: "shield",   color: "#D97706", bg: "#FFFBEB", label: "Level 3" },
  1: { icon: "lock",     color: "#6B7280", bg: "#F3F4F6", label: "Level 1" },
};

function SvgIcon({ name, size = 18, color = "currentColor" }) {
  const paths = {
    monitoring:   `<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>`,
    orders:       `<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>`,
    drivers:      `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
    security:     `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    database:     `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
    audit:        `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
    settings:     `<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>`,
    search:       `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
    refresh:      `<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>`,
    bell:         `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>`,
    filter:       `<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>`,
    userPlus:     `<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>`,
    chevronDown:  `<polyline points="6 9 12 15 18 9"/>`,
    chevronLeft:  `<polyline points="15 18 9 12 15 6"/>`,
    chevronRight: `<polyline points="9 18 15 12 9 6"/>`,
    shield:       `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    lock:         `<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
    zap:          `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
    eye:          `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`,
    moreVertical: `<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>`,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: paths[name] || "" }}
      style={{ display: "block", flexShrink: 0 }}
    />
  );
}

function DriverAvatar({ seed }) {
  const bgColors = ["#D1FAE5", "#DBEAFE", "#FEF3C7", "#FCE7F3"];
  const shirtColors = ["#059669", "#2563EB", "#D97706", "#DB2777"];
  const bg = bgColors[seed % bgColors.length];
  const shirt = shirtColors[seed % shirtColors.length];
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" style={{ borderRadius: "50%", flexShrink: 0 }}>
      <circle cx="20" cy="20" r="20" fill={bg} />
      <ellipse cx="20" cy="31" rx="10" ry="7" fill={shirt} />
      <circle cx="20" cy="16" r="7" fill="#FBBF80" />
      <ellipse cx="20" cy="10" rx="6.5" ry="3.5" fill="#92400E" />
    </svg>
  );
}

export default function SuperAdminDatabase() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 166;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif", background: "#F0F0EB" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{ width: 240, background: "#1C1C1C", position: "fixed", top: 0, left: 0, height: "100vh", display: "flex", flexDirection: "column", zIndex: 100 }}>
        <div style={{ padding: "24px 20px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 10, background: "#00AA13", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15, color: "white", flexShrink: 0 }}>NP</div>
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 14 }}>Nabila Putri</div>
            <div style={{ color: "#888", fontSize: 12, marginTop: 1 }}>Superadmin</div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "8px 12px" }}>
          {NAV.map((item) => {
            const isActive = item.id === "database";
            return (
              <button key={item.id} onClick={() => navigate(item.path)} style={{
                display: "flex", alignItems: "center", gap: 11, width: "100%",
                padding: "11px 14px", borderRadius: 9, marginBottom: 2,
                background: isActive ? "#00AA13" : "transparent",
                color: isActive ? "white" : "#999",
                border: "none", cursor: "pointer", textAlign: "left",
                fontSize: 14, fontWeight: isActive ? 600 : 400, transition: "all 0.15s",
              }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "#2A2A2A"; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                <SvgIcon name={item.icon} size={17} color={isActive ? "white" : "#999"} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: "0 16px 16px" }}>
          <button style={{ width: "100%", padding: "12px", borderRadius: 9, background: "#00AA13", border: "none", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            Generate Report
          </button>
        </div>

        <div style={{ padding: "0 12px 24px" }}>
          <button style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 14px", borderRadius: 9, background: "transparent", color: "#888", border: "none", cursor: "pointer", fontSize: 14 }}
            onMouseEnter={e => e.currentTarget.style.background = "#2A2A2A"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <SvgIcon name="settings" size={17} color="#888" />
            Settings
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ marginLeft: 240, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* Header */}
        <header style={{ background: "white", borderBottom: "1px solid #E8E8E3", padding: "0 28px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>
            <span style={{ color: "#111" }}>Gojek </span>
            <span style={{ color: "#00AA13" }}>Fraud Radar</span>
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F5F5F0", borderRadius: 24, padding: "8px 18px", width: 280 }}>
            <SvgIcon name="search" size={15} color="#AAA" />
            <input placeholder="Search user ID, email, or license..." style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#333", width: "100%" }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00AA13", display: "inline-block" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>System: Stable</span>
            </div>
            <button style={{ width: 36, height: 36, borderRadius: "50%", background: "#F5F5F0", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <SvgIcon name="refresh" size={16} color="#555" />
            </button>
            {/* Bell with red dot */}
            <button style={{ position: "relative", width: 36, height: 36, borderRadius: "50%", background: "#F5F5F0", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <SvgIcon name="bell" size={16} color="#555" />
              <span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, borderRadius: "50%", background: "#EF4444", border: "1.5px solid white" }} />
            </button>
            {/* Profile avatar */}
            <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", cursor: "pointer", flexShrink: 0 }}>
              <DriverAvatar seed={0} />
            </div>
          </div>
        </header>

        {/* Page body */}
        <div style={{ padding: "28px 28px 48px", flex: 1 }}>

          {/* Page title row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 800, color: "#111", letterSpacing: "-0.5px" }}>User Database</h1>
              <p style={{ margin: 0, fontSize: 14, color: "#888" }}>Manage internal access levels and audit external driver accounts.</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 9, border: "1.5px solid #DDD", background: "white", color: "#333", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
                <SvgIcon name="filter" size={15} color="#555" />
                Filters
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 9, border: "none", background: "#00AA13", color: "white", fontSize: 13.5, fontWeight: 700, cursor: "pointer" }}>
                <SvgIcon name="userPlus" size={15} color="white" />
                Create User
              </button>
            </div>
          </div>

          {/* ── TOP SECTION: Account Distribution + Critical Alerts ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 20, marginBottom: 24 }}>

            {/* Account Distribution */}
            <div style={{ background: "white", borderRadius: 14, padding: "22px 24px", border: "1px solid #EBEBEB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#111" }}>Account Distribution</h3>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#555", border: "1.5px solid #DDD", borderRadius: 6, padding: "3px 10px", letterSpacing: "0.4px" }}>LIVE METRICS</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
                {[
                  { label: "SUPERADMINS", value: "12",    color: "#111",    border: "#E5E7EB" },
                  { label: "ADMINS",      value: "148",   color: "#111",    border: "#E5E7EB" },
                  { label: "DRIVERS",     value: "42.5k", color: "#111",    border: "#E5E7EB" },
                  { label: "NEW TODAY",   value: "+89",   color: "#00AA13", border: "#BBF7D0" },
                ].map((item) => (
                  <div key={item.label} style={{ border: `1.5px solid ${item.border}`, borderRadius: 10, padding: "14px 16px" }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: "#AAA", letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 8 }}>{item.label}</div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: item.color, letterSpacing: "-0.5px" }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical Alerts */}
            <div style={{ background: "#1C1C1C", borderRadius: 14, padding: "22px 24px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <SvgIcon name="zap" size={18} color="#F59E0B" />
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "white" }}>Critical Alerts</h3>
              </div>

              {/* HIGH alert */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14, background: "#2A2A2A", borderRadius: 10, padding: "12px 14px" }}>
                <span style={{ background: "#DC2626", color: "white", fontSize: 10, fontWeight: 800, borderRadius: 4, padding: "2px 6px", whiteSpace: "nowrap", marginTop: 1, letterSpacing: "0.3px" }}>HIGH</span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "white", marginBottom: 3 }}>Unauthorized Access Attempt</div>
                  <div style={{ fontSize: 11.5, color: "#888" }}>User ID: AD-9902 | IP: 192.168.1.45</div>
                </div>
              </div>

              {/* MID alert */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 18, background: "#2A2A2A", borderRadius: 10, padding: "12px 14px" }}>
                <span style={{ background: "#D97706", color: "white", fontSize: 10, fontWeight: 800, borderRadius: 4, padding: "2px 8px", whiteSpace: "nowrap", marginTop: 1, letterSpacing: "0.3px" }}>MID</span>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "white", marginBottom: 3 }}>Clearance Upgrade Requested</div>
                  <div style={{ fontSize: 11.5, color: "#888" }}>Driver ID: DR-4431 | Level 4</div>
                </div>
              </div>

              <button style={{ background: "none", border: "none", color: "#AAA", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: 0, width: "100%", textAlign: "center" }}
                onMouseEnter={e => e.currentTarget.style.color = "white"}
                onMouseLeave={e => e.currentTarget.style.color = "#AAA"}
              >
                View All Security Logs
              </button>
            </div>
          </div>

          {/* ── USER TABLE ── */}
          <div style={{ background: "white", borderRadius: 14, border: "1px solid #EBEBEB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}>

            {/* Filter bar */}
            <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #F0F0EB" }}>
              <div style={{ display: "flex", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: "#AAA", letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 6 }}>Role</div>
                  <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 8, border: "1.5px solid #E0E0E0", background: "white", fontSize: 13.5, color: "#333", fontWeight: 500, cursor: "pointer" }}>
                    All Roles
                    <SvgIcon name="chevronDown" size={14} color="#888" />
                  </button>
                </div>
                <div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: "#AAA", letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 6 }}>Clearance Level</div>
                  <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 8, border: "1.5px solid #E0E0E0", background: "white", fontSize: 13.5, color: "#333", fontWeight: 500, cursor: "pointer" }}>
                    All Levels
                    <SvgIcon name="chevronDown" size={14} color="#888" />
                  </button>
                </div>
              </div>
              <span style={{ fontSize: 13, color: "#AAA" }}>Showing 15 of 2,490 accounts</span>
            </div>

            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 80px", padding: "10px 20px", background: "#FAFAF8", borderBottom: "1px solid #F0F0EB" }}>
              {["User Identity", "Role", "Clearance", "Last Activity", "Actions"].map(h => (
                <span key={h} style={{ fontSize: 12, fontWeight: 600, color: "#999", letterSpacing: "0.3px" }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            {USERS.map((user, i) => {
              const rs = roleStyle[user.role];
              const cs = clearanceStyle[user.clearance];
              return (
                <div key={i}
                  style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 80px", padding: "16px 20px", alignItems: "center", borderBottom: i < USERS.length - 1 ? "1px solid #F5F5F0" : "none", transition: "background 0.1s", cursor: "default" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FAFAF8"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {/* User Identity */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <DriverAvatar seed={i} />
                    <div>
                      <div style={{ fontSize: 14.5, fontWeight: 700, color: "#111" }}>{user.name}</div>
                      <div style={{ fontSize: 12, color: "#AAA", marginTop: 2 }}>{user.email}</div>
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <span style={{ background: rs.bg, color: rs.color, borderRadius: 6, padding: "4px 10px", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.4px", border: rs.bg === "#111" ? "none" : "1.5px solid #E5E7EB" }}>
                      {rs.label}
                    </span>
                  </div>

                  {/* Clearance */}
                  <div>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: cs.bg, color: cs.color, borderRadius: 7, padding: "5px 10px", fontSize: 13, fontWeight: 700 }}>
                      <SvgIcon name={cs.icon} size={13} color={cs.color} />
                      {cs.label}
                    </span>
                  </div>

                  {/* Last Activity */}
                  <div style={{ fontSize: 13.5, color: "#555" }}>{user.lastActivity}</div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#CCC", padding: 4, display: "flex", alignItems: "center", borderRadius: 5 }}
                      onMouseEnter={e => e.currentTarget.style.color = "#555"}
                      onMouseLeave={e => e.currentTarget.style.color = "#CCC"}
                    >
                      <SvgIcon name="eye" size={16} color="currentColor" />
                    </button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#CCC", padding: 4, display: "flex", alignItems: "center", borderRadius: 5 }}
                      onMouseEnter={e => e.currentTarget.style.color = "#555"}
                      onMouseLeave={e => e.currentTarget.style.color = "#CCC"}
                    >
                      <SvgIcon name="moreVertical" size={16} color="currentColor" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Pagination footer */}
            <div style={{ padding: "14px 20px", borderTop: "1px solid #F0F0EB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button style={{ padding: "7px 14px", borderRadius: 7, border: "1.5px solid #E0E0E0", background: "white", color: "#555", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Previous</button>
                {[1, 2, 3].map(p => (
                  <button key={p} onClick={() => setCurrentPage(p)} style={{
                    width: 32, height: 32, borderRadius: 7,
                    border: currentPage === p ? "none" : "1px solid #E0E0E0",
                    background: currentPage === p ? "#00AA13" : "white",
                    color: currentPage === p ? "white" : "#333",
                    fontSize: 13.5, fontWeight: currentPage === p ? 700 : 400, cursor: "pointer",
                  }}>{p}</button>
                ))}
                <span style={{ fontSize: 13, color: "#CCC", padding: "0 2px" }}>...</span>
                <button onClick={() => setCurrentPage(totalPages)} style={{
                  width: 32, height: 32, borderRadius: 7,
                  border: currentPage === totalPages ? "none" : "1px solid #E0E0E0",
                  background: currentPage === totalPages ? "#00AA13" : "white",
                  color: currentPage === totalPages ? "white" : "#333",
                  fontSize: 13.5, cursor: "pointer",
                }}>{totalPages}</button>
                <button style={{ padding: "7px 14px", borderRadius: 7, border: "1.5px solid #E0E0E0", background: "white", color: "#555", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>Next</button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, color: "#AAA" }}>Rows per page</span>
                <span style={{ background: "#F3F4F6", borderRadius: 7, padding: "5px 12px", fontSize: 13, fontWeight: 700, color: "#333" }}>15</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
