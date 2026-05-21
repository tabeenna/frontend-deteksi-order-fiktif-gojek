import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DRIVERS = [
  { name: "Ahmad Subarkah", id: "DRV-90214-ID", status: "on_trip",   rating: 4.92, riskLabel: "Low Risk",    riskStyle: "low",    fictive: "0.8%",  flag: "No flags in last 48h" },
  { name: "Budi Santoso",   id: "DRV-55102-ID", status: "available", rating: 3.15, riskLabel: "High Risk",   riskStyle: "high",   fictive: "24.5%", flag: "No flags in last 24h" },
  { name: "Siti Rahayu",    id: "DRV-33190-ID", status: "available", rating: 4.88, riskLabel: "Medium Risk", riskStyle: "medium", fictive: "4.2%",  flag: "Rapid pickup anomaly (2h ago)" },
  { name: "Ahmad Subarkah", id: "DRV-90214-ID", status: "on_trip",   rating: 4.92, riskLabel: "Low Risk",    riskStyle: "low",    fictive: "0.8%",  flag: "No flags in last 48h" },
  { name: "Budi Santoso",   id: "DRV-55102-ID", status: "available", rating: 3.15, riskLabel: "High Risk",   riskStyle: "high",   fictive: "24.5%", flag: "No flags in last 24h" },
  { name: "Siti Rahayu",    id: "DRV-33190-ID", status: "available", rating: 4.88, riskLabel: "Medium Risk", riskStyle: "medium", fictive: "4.2%",  flag: "Rapid pickup anomaly (2h ago)" },
  { name: "Ahmad Subarkah", id: "DRV-90214-ID", status: "on_trip",   rating: 4.92, riskLabel: "Low Risk",    riskStyle: "low",    fictive: "0.8%",  flag: "No flags in last 48h" },
  { name: "Budi Santoso",   id: "DRV-55102-ID", status: "available", rating: 3.15, riskLabel: "High Risk",   riskStyle: "high",   fictive: "24.5%", flag: "No flags in last 24h" },
];

const NAV = [
  { id: "monitoring", label: "Monitoring", icon: "monitoring", path: "/superadmin" },
  { id: "orders",     label: "Orders",     icon: "orders",     path: "/superadmin/orders" },
  { id: "drivers",    label: "Drivers",    icon: "drivers",    path: "/superadmin/drivers" },
  { id: "security",   label: "Security",   icon: "security",   path: "/superadmin/security" },
  { id: "database",   label: "Database",   icon: "database",   path: "/superadmin/database" },
  { id: "audit",      label: "Audit Logs", icon: "audit",      path: "/superadmin/audit" },
];

const riskConfig = {
  low:    { color: "#276749", barColor: "#00AA13" },
  medium: { color: "#B45309", barColor: "#F59E0B" },
  high:   { color: "#D0021B", barColor: "#D0021B" },
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
    eye:          `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`,
    chevronLeft:  `<polyline points="15 18 9 12 15 6"/>`,
    chevronRight: `<polyline points="9 18 15 12 9 6"/>`,
    activeDrivers:`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
    hourglass:    `<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>`,
    star:         `<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>`,
    trendUp:      `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: paths[name] || "" }}
      style={{ display: "block", flexShrink: 0 }}
    />
  );
}

// Simple illustrated driver avatar using SVG (circles + shapes to represent a person)
function DriverAvatar({ seed }) {
  const bgColors = ["#D1FAE5", "#DBEAFE", "#FEF3C7", "#FCE7F3", "#EDE9FE"];
  const shirtColors = ["#059669", "#2563EB", "#D97706", "#DB2777", "#7C3AED"];
  const bg = bgColors[seed % bgColors.length];
  const shirt = shirtColors[seed % shirtColors.length];
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" style={{ borderRadius: "50%", flexShrink: 0 }}>
      <circle cx="21" cy="21" r="21" fill={bg} />
      {/* Body / shirt */}
      <ellipse cx="21" cy="33" rx="11" ry="8" fill={shirt} />
      {/* Head */}
      <circle cx="21" cy="17" r="8" fill="#FBBF80" />
      {/* Hair */}
      <ellipse cx="21" cy="11" rx="7" ry="4" fill="#92400E" />
    </svg>
  );
}

function StatusBadge({ status }) {
  if (status === "on_trip") {
    return (
      <span style={{ background: "#F0FFF4", color: "#00AA13", border: "1.5px solid #86EFAC", borderRadius: 6, padding: "4px 10px", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
        ON TRIP
      </span>
    );
  }
  return (
    <span style={{ background: "#F5F5F5", color: "#555", border: "1.5px solid #DDD", borderRadius: 6, padding: "4px 10px", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.5px", whiteSpace: "nowrap" }}>
      AVAILABLE
    </span>
  );
}

function RiskCell({ label, style, fictive }) {
  const cfg = riskConfig[style];
  const barWidth = style === "high" ? "80%" : style === "medium" ? "40%" : "10%";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: cfg.color }}>{label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: cfg.color }}>{fictive}</span>
        </div>
        <div style={{ width: 80, height: 4, background: "#F0F0F0", borderRadius: 99, overflow: "hidden" }}>
          <div style={{ width: barWidth, height: "100%", background: cfg.barColor, borderRadius: 99 }} />
        </div>
      </div>
    </div>
  );
}

export default function SuperAdminDrivers() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1248;

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
            const isActive = item.id === "drivers";
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
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#F5F5F0", borderRadius: 24, padding: "8px 16px", width: 220 }}>
            <SvgIcon name="search" size={15} color="#AAA" />
            <input placeholder="Search" style={{ border: "none", background: "transparent", outline: "none", fontSize: 13.5, color: "#333", width: "100%" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00AA13", display: "inline-block" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>System: Stable</span>
            </div>
            <button style={{ width: 36, height: 36, borderRadius: "50%", background: "#F5F5F0", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <SvgIcon name="refresh" size={16} color="#555" />
            </button>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1C1C1C", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>NP</div>
          </div>
        </header>

        {/* Page body */}
        <div style={{ padding: "28px 28px 48px", flex: 1 }}>

          {/* ── STAT CARDS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>

            {/* Active Drivers */}
            <div style={{ background: "white", borderRadius: 14, padding: "22px 26px", border: "1px solid #EBEBEB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "#F0FFF4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <SvgIcon name="activeDrivers" size={26} color="#00AA13" />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#AAA", letterSpacing: "0.7px", textTransform: "uppercase", marginBottom: 6 }}>Active Drivers</div>
                <div style={{ fontSize: 34, fontWeight: 800, color: "#111", letterSpacing: "-1px", lineHeight: 1, marginBottom: 6 }}>12,482</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#00AA13", fontSize: 13, fontWeight: 600 }}>
                  <SvgIcon name="trendUp" size={14} color="#00AA13" />
                  4.2% from last hour
                </div>
              </div>
            </div>

            {/* Standby Drivers */}
            <div style={{ background: "white", borderRadius: 14, padding: "22px 26px", border: "1px solid #EBEBEB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "#FFFBEB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <SvgIcon name="hourglass" size={26} color="#D97706" />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#AAA", letterSpacing: "0.7px", textTransform: "uppercase", marginBottom: 6 }}>Standby Drivers</div>
                <div style={{ fontSize: 34, fontWeight: 800, color: "#D97706", letterSpacing: "-1px", lineHeight: 1, marginBottom: 6 }}>3,921</div>
                <div style={{ fontSize: 13, color: "#AAA", fontWeight: 500 }}>Awaiting demand spike</div>
              </div>
            </div>
          </div>

          {/* ── FLEET HEALTH MONITORING TABLE ── */}
          <div style={{ background: "white", borderRadius: 14, border: "1px solid #EBEBEB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}>

            <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #F0F0EB" }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#111" }}>Fleet Health Monitoring</h3>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#FAFAF8" }}>
                  {["DRIVER IDENTITY", "STATUS", "RATING", "FICTIVE ORDER TAKEN", "RECENT FLAGGED ACTIVITY", "ACTIONS"].map(h => (
                    <th key={h} style={{ padding: "11px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#AAA", letterSpacing: "0.6px", borderBottom: "1px solid #F0F0EB", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DRIVERS.map((row, i) => (
                  <tr key={i}
                    style={{ borderBottom: i < DRIVERS.length - 1 ? "1px solid #F5F5F0" : "none" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#FAFAF8"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    {/* Driver Identity */}
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <DriverAvatar seed={i} />
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{row.name}</div>
                          <div style={{ fontSize: 12, color: "#AAA", marginTop: 2 }}>{row.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td style={{ padding: "14px 20px" }}>
                      <StatusBadge status={row.status} />
                    </td>

                    {/* Rating */}
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <SvgIcon name="star" size={14} color="#F59E0B" />
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{row.rating.toFixed(2)}</span>
                      </div>
                    </td>

                    {/* Fictive Order Taken */}
                    <td style={{ padding: "14px 20px" }}>
                      <RiskCell label={row.riskLabel} style={row.riskStyle} fictive={row.fictive} />
                    </td>

                    {/* Recent Flagged Activity */}
                    <td style={{ padding: "14px 20px", fontSize: 13.5, color: "#666" }}>{row.flag}</td>

                    {/* Actions */}
                    <td style={{ padding: "14px 20px" }}>
                      <button style={{ background: "none", border: "none", cursor: "pointer", color: "#BBB", padding: 2, display: "flex", alignItems: "center" }}
                        onMouseEnter={e => e.currentTarget.style.color = "#333"}
                        onMouseLeave={e => e.currentTarget.style.color = "#BBB"}
                      >
                        <SvgIcon name="eye" size={17} color="currentColor" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination footer */}
            <div style={{ padding: "14px 20px", borderTop: "1px solid #F0F0EB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "#888" }}>Showing 1-10 of 12,482 drivers</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <button style={{ width: 32, height: 32, borderRadius: 7, border: "1px solid #E0E0E0", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <SvgIcon name="chevronLeft" size={14} color="#888" />
                </button>
                {[1, 2, 3].map(p => (
                  <button key={p} onClick={() => setCurrentPage(p)} style={{
                    width: 32, height: 32, borderRadius: 7,
                    border: currentPage === p ? "none" : "1px solid #E0E0E0",
                    background: currentPage === p ? "#00AA13" : "white",
                    color: currentPage === p ? "white" : "#333",
                    fontSize: 13.5, fontWeight: currentPage === p ? 700 : 400, cursor: "pointer",
                  }}>{p}</button>
                ))}
                <span style={{ fontSize: 13, color: "#AAA", padding: "0 4px" }}>...</span>
                <button onClick={() => setCurrentPage(totalPages)} style={{
                  width: 32, height: 32, borderRadius: 7,
                  border: currentPage === totalPages ? "none" : "1px solid #E0E0E0",
                  background: currentPage === totalPages ? "#00AA13" : "white",
                  color: currentPage === totalPages ? "white" : "#333",
                  fontSize: 13.5, cursor: "pointer",
                }}>{totalPages}</button>
                <button style={{ width: 32, height: 32, borderRadius: 7, border: "1px solid #E0E0E0", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <SvgIcon name="chevronRight" size={14} color="#888" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
