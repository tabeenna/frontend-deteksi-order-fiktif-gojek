import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AUDIT_LOGS = [
  {
    date: "2023-10-19",
    time: "14:22:08",
    initials: "DN",
    admin: "Superadmin: Denis",
    actionType: "ACCESS REVOKED",
    actionStyle: "revoked",
    entity: "User: ID_9921_Beta",
    location: "Jakarta",
  },
  {
    date: "2023-10-19",
    time: "14:15:30",
    initials: "FF",
    admin: "Superadmin: Farel",
    actionType: "CONFIG CHANGED",
    actionStyle: "config",
    entity: "Sensitivity: Level 4 → 5",
    location: "Tangerang",
  },
  {
    date: "2023-10-19",
    time: "13:58:12",
    initials: "BT",
    admin: "Superadmin: Belva",
    actionType: "REPORT GENERATED",
    actionStyle: "report",
    entity: "Entity: Transactions_Q3",
    location: "Jakarta",
  },
  {
    date: "2023-10-19",
    time: "13:40:45",
    initials: "AJ",
    admin: "Admin: Adrian",
    actionType: "LOGIN BLOCKED",
    actionStyle: "blocked",
    entity: "Account: Driver_PX_02",
    location: "Depok",
  },
  {
    date: "2023-10-19",
    time: "13:35:10",
    initials: "BU",
    admin: "Admin: Bintang",
    actionType: "PROFILE VIEW",
    actionStyle: "view",
    entity: "User: X_Cust_88",
    location: "Bogor",
  },
];

const ACTION_BADGE = {
  revoked: { bg: "#FFF0F0", color: "#D0021B", border: "#FBC4C4" },
  config:  { bg: "#FFF8EC", color: "#B45309", border: "#F8D99C" },
  report:  { bg: "#F0FFF4", color: "#16803C", border: "#BBF7D0" },
  blocked: { bg: "#FFF0F5", color: "#BE185D", border: "#FBCFE8" },
  view:    { bg: "#F0FFF4", color: "#16803C", border: "#BBF7D0" },
};

const AVATAR_COLORS = {
  DN: "#6366F1",
  FF: "#EC4899",
  BT: "#F59E0B",
  AJ: "#10B981",
  BU: "#3B82F6",
};

const NAV = [
  { id: "monitoring", label: "Monitoring", icon: "monitoring", path: "/superadmin" },
  { id: "orders",     label: "Orders",     icon: "orders",     path: "/superadmin/orders" },
  { id: "drivers",    label: "Drivers",    icon: "drivers",    path: "/superadmin/drivers" },
  { id: "security",   label: "Security",   icon: "security",   path: "/superadmin/security" },
  { id: "database",   label: "Database",   icon: "database",   path: "/superadmin/database" },
  { id: "audit",      label: "Audit Logs", icon: "audit",      path: "/superadmin/audit" },
];

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
    info:         `<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>`,
    trendUp:      `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`,
    chevronDown:  `<polyline points="6 9 12 15 18 9"/>`,
    chevronLeft:  `<polyline points="15 18 9 12 15 6"/>`,
    chevronRight: `<polyline points="9 18 15 12 9 6"/>`,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: paths[name] || "" }}
      style={{ display: "block", flexShrink: 0 }}
    />
  );
}

export default function SuperAdminAuditLogs() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [actionFilter, setActionFilter] = useState("All");
  const totalResults = 14292;
  const totalPages = 715;

  const actionTypes = ["All", "ACCESS REVOKED", "CONFIG CHANGED", "REPORT GENERATED", "LOGIN BLOCKED", "PROFILE VIEW"];

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
            const isActive = item.id === "audit";
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                style={{
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

      </aside>

      {/* ── MAIN ── */}
      <main style={{ marginLeft: 240, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* Header */}
        <header style={{ background: "white", borderBottom: "1px solid #E8E8E3", padding: "0 28px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>
            <span style={{ color: "#111" }}>Gojek </span>
            <span style={{ color: "#00AA13" }}>Fraud Radar</span>
          </span>



          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* SUPERADMIN ONLY badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00AA13", display: "inline-block" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#333", letterSpacing: "0.3px" }}>SUPERADMIN ONLY</span>
            </div>
            <button style={{ width: 36, height: 36, borderRadius: "50%", background: "#F5F5F0", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <SvgIcon name="refresh" size={16} color="#555" />
            </button>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1C1C1C", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>NP</div>
          </div>
        </header>

        {/* Page body */}
        <div style={{ padding: "28px 28px 48px", flex: 1 }}>

          {/* Page title */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ margin: "0 0 6px", fontSize: 30, fontWeight: 800, color: "#111", letterSpacing: "-0.5px" }}>System Audit Logs</h1>
            <p style={{ margin: 0, fontSize: 14.5, color: "#666" }}>A chronological paper trail of all administrative actions and system modifications.</p>
          </div>

          {/* ── TWO STAT CARDS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20, marginBottom: 24 }}>

            {/* Total Logs Today */}
            <div style={{ background: "white", borderRadius: 14, padding: "28px 32px", border: "1px solid #EBEBEB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#888", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 12 }}>TOTAL LOGS TODAY</div>
              <div style={{ fontSize: 44, fontWeight: 800, color: "#111", letterSpacing: "-1px", marginBottom: 10 }}>
                {totalResults.toLocaleString()}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <SvgIcon name="trendUp" size={16} color="#00AA13" />
                <span style={{ fontSize: 13.5, fontWeight: 600, color: "#00AA13" }}>+12% from yesterday</span>
              </div>
            </div>

            {/* Active Monitors */}
            <div style={{ background: "#1C1C1C", borderRadius: 14, padding: "28px 32px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#777", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 10 }}>ACTIVE MONITORS</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "white", marginBottom: 16 }}>3 System Admins</div>
              {/* Avatar cluster */}
              <div style={{ display: "flex", alignItems: "center" }}>
                {["DN", "FF", "BT"].map((init, i) => (
                  <div
                    key={init}
                    style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: AVATAR_COLORS[init] || "#555",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 800, fontSize: 12, color: "white",
                      border: "2.5px solid #1C1C1C",
                      marginLeft: i === 0 ? 0 : -10,
                      zIndex: 3 - i,
                      position: "relative",
                    }}
                  >{init}</div>
                ))}
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "#333",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 12, color: "#AAA",
                  border: "2.5px solid #1C1C1C",
                  marginLeft: -10, position: "relative", zIndex: 0,
                }}>+3</div>
              </div>
            </div>
          </div>

          {/* ── AUDIT LOG TABLE ── */}
          <div style={{ background: "white", borderRadius: 14, border: "1px solid #EBEBEB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}>

            {/* Table header row */}
            <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #F0F0EB" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>Recent Activity</span>

              </div>

              {/* Action type filter */}
              <div style={{ position: "relative", display: "inline-block" }}>
                <select
                  value={actionFilter}
                  onChange={e => setActionFilter(e.target.value)}
                  style={{
                    appearance: "none",
                    padding: "8px 36px 8px 14px",
                    borderRadius: 8,
                    border: "1.5px solid #E0E0E0",
                    background: "white",
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: "#333",
                    cursor: "pointer",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                >
                  {actionTypes.map(t => (
                    <option key={t} value={t}>
                      {t === "All" ? "Action Type: All" : t}
                    </option>
                  ))}
                </select>
                <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <SvgIcon name="chevronDown" size={14} color="#888" />
                </div>
              </div>
            </div>

            {/* Column headers */}
            <div style={{ display: "grid", gridTemplateColumns: "200px 1fr 200px 120px", padding: "10px 24px", background: "#FAFAF8", borderBottom: "1px solid #F0F0EB" }}>
              {["TIMESTAMP", "ADMIN / USER ID", "ACTION TYPE", "LOCATION"].map(h => (
                <span key={h} style={{ fontSize: 11, fontWeight: 700, color: "#BBB", letterSpacing: "0.6px" }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            {AUDIT_LOGS.map((row, i) => {
              const badge = ACTION_BADGE[row.actionStyle];
              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "200px 1fr 200px 120px",
                    padding: "18px 24px",
                    alignItems: "center",
                    borderBottom: i < AUDIT_LOGS.length - 1 ? "1px solid #F5F5F0" : "none",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "#FAFAF8"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {/* Timestamp */}
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "#111", fontVariantNumeric: "tabular-nums" }}>{row.date}</div>
                    <div style={{ fontSize: 12, color: "#AAA", marginTop: 2, fontVariantNumeric: "tabular-nums" }}>{row.time}</div>
                  </div>

                  {/* Admin / User ID */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%",
                      background: AVATAR_COLORS[row.initials] || "#888",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 800, fontSize: 11, color: "white", flexShrink: 0,
                    }}>{row.initials}</div>
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: "#111" }}>{row.admin}</span>
                  </div>

                  {/* Action Type badge */}
                  <div>
                    <span style={{
                      background: badge.bg,
                      color: badge.color,
                      border: `1px solid ${badge.border}`,
                      borderRadius: 5,
                      padding: "4px 9px",
                      fontSize: 11, fontWeight: 800,
                      letterSpacing: "0.4px",
                      whiteSpace: "nowrap",
                    }}>{row.actionType}</span>
                  </div>

                  {/* Location */}
                  <div style={{ fontSize: 13.5, color: "#666" }}>{row.location}</div>


                </div>
              );
            })}

            {/* Pagination footer */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid #F0F0EB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "#888" }}>
                Showing 1 to 20 of {totalResults.toLocaleString()} results
              </span>

              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {/* Prev */}
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  style={{ width: 34, height: 34, borderRadius: 7, border: "1.5px solid #E0E0E0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <SvgIcon name="chevronLeft" size={15} color="#555" />
                </button>

                {[1, 2, 3].map(p => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    style={{
                      width: 34, height: 34, borderRadius: 7,
                      border: currentPage === p ? "none" : "1.5px solid #E0E0E0",
                      background: currentPage === p ? "#00AA13" : "white",
                      color: currentPage === p ? "white" : "#333",
                      fontSize: 13.5, fontWeight: currentPage === p ? 700 : 400,
                      cursor: "pointer",
                    }}
                  >{p}</button>
                ))}

                <span style={{ fontSize: 13.5, color: "#CCC", padding: "0 4px" }}>...</span>

                <button
                  onClick={() => setCurrentPage(totalPages)}
                  style={{
                    width: 34, height: 34, borderRadius: 7,
                    border: currentPage === totalPages ? "none" : "1.5px solid #E0E0E0",
                    background: currentPage === totalPages ? "#00AA13" : "white",
                    color: currentPage === totalPages ? "white" : "#333",
                    fontSize: 13.5, cursor: "pointer",
                  }}
                >{totalPages}</button>

                {/* Next */}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  style={{ width: 34, height: 34, borderRadius: 7, border: "1.5px solid #E0E0E0", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <SvgIcon name="chevronRight" size={15} color="#555" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
