import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EVENTS = [
  { time: "14:02:11", entityIcon: "person", entity: "Driver #88219", type: "GPS Spoofing Attempt", risk: "HIGH RISK", riskStyle: "high", location: "South Jakarta", action: "Investigate" },
  { time: "14:01:45", entityIcon: "order", entity: "Order #GO-9128", type: "Unusual Cashback Usage", risk: "MEDIUM RISK", riskStyle: "medium", location: "Surabaya", action: "Investigate" },
  { time: "13:59:02", entityIcon: "system", entity: "System Core", type: "Batch Processing Complete", risk: "LOW RISK", riskStyle: "low", location: "Cloud Region 1", action: "View Log" },
];

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
    monitoring: `<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>`,
    orders: `<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>`,
    drivers: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
    security: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    database: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
    audit: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
    settings: `<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>`,
    search: `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
    refresh: `<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>`,
    alert: `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
    chart: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
    person: `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
    order: `<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>`,
    system: `<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>`,
    arrow: `<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: paths[name] || "" }}
      style={{ display: "block", flexShrink: 0 }}
    />
  );
}

const riskBadge = {
  high:   { bg: "#FFF0F0", color: "#D0021B", border: "#F5C6CB" },
  medium: { bg: "#FFF8EC", color: "#B45309", border: "#F8D99C" },
  low:    { bg: "#F0FFF4", color: "#276749", border: "#B2DFCC" },
};

export default function SuperAdminHome() {
  const navigate = useNavigate();
  const [active, setActive] = useState("monitoring");

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif", background: "#F0F0EB" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width: 240, background: "#1C1C1C", position: "fixed",
        top: 0, left: 0, height: "100vh", display: "flex",
        flexDirection: "column", zIndex: 100,
      }}>
        {/* User identity */}
        <div style={{ padding: "24px 20px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 10,
            background: "#00AA13", display: "flex", alignItems: "center",
            justifyContent: "center", fontWeight: 800, fontSize: 15, color: "white", flexShrink: 0,
          }}>NP</div>
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 14 }}>Nabila Putri</div>
            <div style={{ color: "#888", fontSize: 12, marginTop: 1 }}>Superadmin</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "8px 12px" }}>
          {NAV.map((item) => {
            const isActive = active === item.id;
            return (
              <button key={item.id} onClick={() => { setActive(item.id); if (item.path) navigate(item.path); }} style={{
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

        {/* Generate Report */}
        <div style={{ padding: "0 16px 16px" }}>
          <button style={{
            width: "100%", padding: "12px", borderRadius: 9,
            background: "#00AA13", border: "none", color: "white",
            fontWeight: 700, fontSize: 14, cursor: "pointer",
          }}>
            Generate Report
          </button>
        </div>

        {/* Settings */}
        <div style={{ padding: "0 12px 24px" }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%",
            padding: "10px 14px", borderRadius: 9, background: "transparent",
            color: "#888", border: "none", cursor: "pointer", fontSize: 14,
          }}
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

        {/* Top header */}
        <header style={{
          background: "white", borderBottom: "1px solid #E8E8E3",
          padding: "0 28px", height: 60, display: "flex",
          alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, zIndex: 50,
        }}>
          {/* Brand */}
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>
            <span style={{ color: "#111" }}>Gojek </span>
            <span style={{ color: "#00AA13" }}>Fraud Radar</span>
          </span>

          {/* Center search */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#F5F5F0", borderRadius: 24, padding: "8px 16px", width: 220,
          }}>
            <SvgIcon name="search" size={15} color="#AAA" />
            <input placeholder="Search" style={{
              border: "none", background: "transparent", outline: "none",
              fontSize: 13.5, color: "#333", width: "100%",
            }} />
          </div>

          {/* Right cluster */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00AA13", display: "inline-block" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>System: Stable</span>
            </div>
            <button style={{
              width: 36, height: 36, borderRadius: "50%", background: "#F5F5F0",
              border: "none", display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer",
            }}>
              <SvgIcon name="refresh" size={16} color="#555" />
            </button>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "#1C1C1C", display: "flex",
              alignItems: "center", justifyContent: "center",
              color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer",
            }}>NP</div>
          </div>
        </header>

        {/* Page body */}
        <div style={{ padding: "28px 28px 48px", flex: 1 }}>

          {/* ── WELCOME BANNER ── */}
          <div style={{
            background: "white", borderRadius: 16, marginBottom: 20,
            display: "flex", overflow: "hidden", minHeight: 220,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}>
            {/* Left text */}
            <div style={{ flex: 1, padding: "36px 36px 32px" }}>
              <h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: 800, color: "#111", letterSpacing: "-0.5px" }}>
                Welcome back, Nabila!
              </h1>
              <p style={{ margin: "0 0 28px", fontSize: 15, color: "#555" }}>
                Gojek Fraud Radar is currently monitoring{" "}
                <span style={{ color: "#00AA13", fontWeight: 700 }}>14,208</span> live transactions.
              </p>
              {/* Profile card */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 0,
                border: "1px solid #E8E8E3", borderRadius: 12, overflow: "hidden",
              }}>
                <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 10,
                    background: "#00AA13", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontWeight: 800, fontSize: 17, color: "white",
                  }}>NP</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>Nabila Putri</div>
                    <div style={{ fontSize: 12.5, color: "#888", marginTop: 2 }}>Worker ID: GID-882109</div>
                  </div>
                </div>
                <div style={{ width: 1, background: "#E8E8E3", alignSelf: "stretch" }} />
                <div style={{ padding: "16px 20px" }}>
                  <div style={{ fontSize: 10.5, color: "#AAA", fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 6 }}>Access Level</div>
                  <div style={{
                    background: "#111", color: "white",
                    borderRadius: 6, padding: "4px 10px",
                    fontSize: 12, fontWeight: 700, letterSpacing: "0.5px",
                    display: "inline-block",
                  }}>SUPERADMIN</div>
                </div>
              </div>
            </div>

            {/* Right image panel */}
            <div style={{
              width: 320, flexShrink: 0,
              background: "linear-gradient(135deg, #0D1A0F 0%, #0A1510 50%, #12100D 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
            }}>
              {/* Decorative glow orbs */}
              <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,140,50,0.5) 0%, transparent 70%)", top: 30, right: 50 }} />
              <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,200,50,0.4) 0%, transparent 70%)", bottom: 40, left: 30 }} />
              {/* Monitor SVG */}
              <svg width="220" height="140" viewBox="0 0 220 140" style={{ position: "relative", zIndex: 1 }}>
                {/* Screen body */}
                <rect x="10" y="5" width="200" height="115" rx="8" fill="#0A2010" stroke="#1A4020" strokeWidth="1.5"/>
                <rect x="18" y="13" width="184" height="95" rx="4" fill="#061208"/>
                {/* Chart bars */}
                {[0,1,2,3,4,5,6,7].map((i) => {
                  const heights = [30,50,35,60,45,70,40,55];
                  const h = heights[i];
                  return <rect key={i} x={26 + i * 22} y={90 - h} width="14" height={h} rx="2" fill={i === 5 ? "#00CC16" : "#1A5A20"} opacity={i === 5 ? 1 : 0.7}/>;
                })}
                {/* Line graph */}
                <polyline points="22,75 44,60 66,68 88,45 110,52 132,38 154,44 176,30 198,35" fill="none" stroke="#00AA13" strokeWidth="2"/>
                {/* Dots */}
                {[[22,75],[88,45],[132,38],[198,35]].map(([x,y],i) => (
                  <circle key={i} cx={x} cy={y} r="3" fill="#00FF20"/>
                ))}
                {/* Stand */}
                <rect x="95" y="120" width="30" height="6" rx="2" fill="#1A3020"/>
                <rect x="80" y="126" width="60" height="5" rx="2" fill="#1A3020"/>
              </svg>
            </div>
          </div>

          {/* ── TWO CARDS ROW ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>

            {/* Pending Fraud Alerts */}
            <div style={{
              background: "white", borderRadius: 14, padding: "28px 28px 24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #F0F0EB",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  border: "2px solid #F5C6CB", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <SvgIcon name="alert" size={20} color="#D0021B" />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#D0021B", letterSpacing: "0.5px" }}>ACTION REQUIRED</span>
              </div>
              <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800, color: "#111" }}>Pending Fraud Alerts</h3>
              <p style={{ margin: "0 0 24px", fontSize: 14, color: "#666", lineHeight: 1.5 }}>
                12 high-priority anomalies detected in the last 60 minutes.
              </p>
              <button style={{
                width: "100%", padding: "13px", borderRadius: 8,
                border: "1.5px solid #D0021B", background: "white",
                color: "#D0021B", fontWeight: 700, fontSize: 14,
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", gap: 8,
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#FFF5F5"}
                onMouseLeave={e => e.currentTarget.style.background = "white"}
              >
                Review Alerts
                <SvgIcon name="arrow" size={15} color="#D0021B" />
              </button>
            </div>

            {/* Operational Status */}
            <div style={{
              background: "#00AA13", borderRadius: 14, padding: "28px 28px 24px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <SvgIcon name="chart" size={20} color="white" />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.85)", letterSpacing: "0.5px" }}>OPERATIONAL STATUS</span>
              </div>
              <h3 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 800, color: "white" }}>99.98% Healthy</h3>
              <p style={{ margin: "0 0 24px", fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.5, flex: 1 }}>
                Latency: 42ms. All nodes in Singapore and Jakarta clusters are operational.
              </p>
              {/* Progress bar */}
              <div>
                <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.25)", overflow: "hidden" }}>
                  <div style={{ width: "99.98%", height: "100%", background: "white", borderRadius: 99 }} />
                </div>
                <div style={{ textAlign: "right", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", marginTop: 6, letterSpacing: "0.5px" }}>NORMAL</div>
              </div>
            </div>
          </div>

          {/* ── RECENT OPERATIONAL EVENTS ── */}
          <div style={{
            background: "white", borderRadius: 14,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: "1px solid #F0F0EB",
            overflow: "hidden",
          }}>
            {/* Header */}
            <div style={{
              padding: "20px 24px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderBottom: "1px solid #F0F0EB",
            }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#111" }}>Recent Operational Events</h3>
              <div style={{ display: "flex", gap: 10 }}>
                <button style={{
                  padding: "7px 16px", borderRadius: 7,
                  border: "1.5px solid #DDD", background: "white",
                  color: "#333", fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}>Filter</button>
                <button style={{
                  padding: "7px 16px", borderRadius: 7,
                  border: "none", background: "#00AA13",
                  color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}>Live Feed</button>
              </div>
            </div>

            {/* Table */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#FAFAF8" }}>
                  {["TIMESTAMP", "ENTITY", "EVENT TYPE", "RISK LEVEL", "LOCATION", "ACTIONS"].map((h) => (
                    <th key={h} style={{
                      padding: "11px 20px", textAlign: "left",
                      fontSize: 11, fontWeight: 700, color: "#AAA",
                      letterSpacing: "0.7px", borderBottom: "1px solid #F0F0EB",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EVENTS.map((row, i) => {
                  const rs = riskBadge[row.riskStyle];
                  return (
                    <tr key={i} style={{ borderBottom: i < EVENTS.length - 1 ? "1px solid #F5F5F0" : "none" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#FAFAF8"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <td style={{ padding: "16px 20px", fontSize: 13.5, color: "#333", fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>{row.time}</td>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <SvgIcon name={row.entityIcon} size={15} color="#888" />
                          <span style={{ fontSize: 13.5, color: "#111", fontWeight: 500 }}>{row.entity}</span>
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px", fontSize: 13.5, color: "#444" }}>{row.type}</td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{
                          background: rs.bg, color: rs.color,
                          border: `1px solid ${rs.border}`,
                          borderRadius: 5, padding: "3px 9px",
                          fontSize: 11.5, fontWeight: 700, letterSpacing: "0.3px",
                        }}>{row.risk}</span>
                      </td>
                      <td style={{ padding: "16px 20px", fontSize: 13.5, color: "#666" }}>{row.location}</td>
                      <td style={{ padding: "16px 20px" }}>
                        <button style={{
                          background: "none", border: "none",
                          color: "#00AA13", fontWeight: 700,
                          fontSize: 13.5, cursor: "pointer", padding: 0,
                        }}>{row.action}</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Footer link */}
            <div style={{ padding: "16px 24px", borderTop: "1px solid #F0F0EB" }}>
              <button style={{
                background: "none", border: "none", color: "#00AA13",
                fontWeight: 700, fontSize: 14, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6, padding: 0,
              }}>
                View all system activity
                <SvgIcon name="arrow" size={15} color="#00AA13" />
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
