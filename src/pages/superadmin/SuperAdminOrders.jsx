import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ORDERS = [
  { id: "F-9823102", customer: "Daenarys T.", customerInitials: "JD", customerColor: "#6366F1", driver: "Dedi Susanto", driverInitials: "DS", driverColor: "#0EA5E9", restaurant: "Martabak Boss Menteng", amount: "Rp 128.500", risk: "low" },
  { id: "R-4421908", customer: "Ahmad R.",    customerInitials: "AR", customerColor: "#8B5CF6", driver: "Budi Kurnia",  driverInitials: "BK", driverColor: "#10B981", restaurant: "Soekarno-Hatta Airport",   amount: "Rp 245.000", risk: "medium" },
  { id: "F-1102934", customer: "Siti Wulandari", customerInitials: "SW", customerColor: "#64748B", driver: "M. Ridwan", driverInitials: "MR", driverColor: "#F59E0B", restaurant: "KFC Kemang Timur",         amount: "Rp 542.000", risk: "high" },
  { id: "S-6672311", customer: "Tomy Lim",    customerInitials: "TL", customerColor: "#06B6D4", driver: "Putra H.",    driverInitials: "PH", driverColor: "#EC4899", restaurant: "Sudirman Central Business", amount: "Rp 82.000",  risk: "low" },
  { id: "F-2291033", customer: "Kevin L.",    customerInitials: "KL", customerColor: "#14B8A6", driver: "Agus Ardi",   driverInitials: "AA", driverColor: "#F97316", restaurant: "Bakmi GM Thamrin",          amount: "Rp 174.200", risk: "low" },
];

const NAV = [
  { id: "monitoring", label: "Monitoring", icon: "monitoring", path: "/superadmin" },
  { id: "orders",     label: "Orders",     icon: "orders",     path: "/superadmin/orders" },
  { id: "drivers",    label: "Drivers",    icon: "drivers",    path: "/superadmin/drivers" },
  { id: "security",   label: "Security",   icon: "security",   path: "/superadmin/security" },
  { id: "database",   label: "Database",   icon: "database",   path: "/superadmin/database" },
  { id: "audit",      label: "Audit Logs", icon: "audit",      path: "/superadmin/audit" },
];

const riskBadge = {
  high:   { bg: "#FFEAEA", color: "#CC0000", border: "#F5C6CB", label: "HIGH RISK" },
  medium: { bg: "#FFF8EC", color: "#B45309", border: "#F8D99C", label: "MEDIUM RISK" },
  low:    { bg: "#F0FFF4", color: "#276749", border: "#B2DFCC", label: "LOW RISK" },
};

function SvgIcon({ name, size = 18, color = "currentColor" }) {
  const paths = {
    monitoring: `<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>`,
    orders:     `<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>`,
    drivers:    `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
    security:   `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    database:   `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
    audit:      `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
    settings:   `<circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>`,
    search:     `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`,
    refresh:    `<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>`,
    filter:     `<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>`,
    calendar:   `<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,
    eye:        `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`,
    chevronDown:`<polyline points="6 9 12 15 18 9"/>`,
    chevronLeft:`<polyline points="15 18 9 12 15 6"/>`,
    chevronRight:`<polyline points="9 18 15 12 9 6"/>`,
    barChart:   `<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>`,
    xCircle:    `<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>`,
    warning:    `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
    chat:       `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: paths[name] || "" }}
      style={{ display: "block", flexShrink: 0 }}
    />
  );
}

function Avatar({ initials, color, size = 30 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color + "22", border: `1.5px solid ${color}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.35, fontWeight: 700, color, flexShrink: 0,
    }}>{initials}</div>
  );
}

export default function SuperAdminOrders() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 242;

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
            const isActive = item.id === "orders";
            return (
              <button key={item.id}
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
            <button style={{ width: 36, height: 36, borderRadius: "50%", background: "#F5F5F0", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <SvgIcon name="refresh" size={16} color="#555" />
            </button>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1C1C1C", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>NP</div>
          </div>
        </header>

        {/* Page body */}
        <div style={{ padding: "28px 28px 48px", flex: 1 }}>

          {/* ── STAT CARDS ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>

            {/* Total Volume */}
            <div style={{ background: "white", borderRadius: 14, padding: "20px 22px 18px", border: "1px solid #EBEBEB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "#F0FFF4", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SvgIcon name="barChart" size={18} color="#00AA13" />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#00AA13" }}>+12.5%</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#999", letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 6 }}>Total Volume</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#111", letterSpacing: "-0.5px", marginBottom: 4 }}>42,891</div>
              <div style={{ fontSize: 12.5, color: "#AAA" }}>Vs. 38,122 last month</div>
            </div>

            {/* Cancellation Rate */}
            <div style={{ background: "white", borderRadius: 14, padding: "20px 22px 18px", border: "1px solid #EBEBEB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "#FFF0F0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SvgIcon name="xCircle" size={18} color="#D0021B" />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#D0021B" }}>+0.4%</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#999", letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 6 }}>Cancellation Rate</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#111", letterSpacing: "-0.5px", marginBottom: 4 }}>2.45%</div>
              <div style={{ fontSize: 12.5, color: "#AAA" }}>Target benchmark: &lt; 1.5%</div>
            </div>

            {/* Average Risk Score */}
            <div style={{ background: "white", borderRadius: 14, padding: "20px 22px 18px", border: "1px solid #EBEBEB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "#FFFBEB", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SvgIcon name="warning" size={18} color="#D97706" />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#D0021B" }}>-1.2%</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#999", letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: 6 }}>Average Risk Score</div>
              <div style={{ fontSize: 30, fontWeight: 800, color: "#111", letterSpacing: "-0.5px", marginBottom: 4 }}>18.4</div>
              <div style={{ fontSize: 12.5, color: "#AAA" }}>Low probability average</div>
            </div>
          </div>

          {/* ── ORDERS TABLE CARD ── */}
          <div style={{ background: "white", borderRadius: 14, border: "1px solid #EBEBEB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", overflow: "hidden" }}>

            {/* Filters bar */}
            <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #F0F0EB" }}>
              <SvgIcon name="filter" size={16} color="#888" />

              {/* All Order Types */}
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: "1.5px solid #E0E0E0", background: "white", fontSize: 13.5, color: "#333", fontWeight: 500, cursor: "pointer" }}>
                All Order Types
              </button>

              {/* All Status */}
              <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: "1.5px solid #E0E0E0", background: "white", fontSize: 13.5, color: "#333", fontWeight: 500, cursor: "pointer" }}>
                All Status
                <SvgIcon name="chevronDown" size={14} color="#888" />
              </button>

              {/* Date picker */}
              <button style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 8, border: "1.5px solid #E0E0E0", background: "white", fontSize: 13.5, color: "#333", fontWeight: 500, cursor: "pointer" }}>
                <SvgIcon name="calendar" size={14} color="#888" />
                Jan 9th 2026
              </button>
            </div>

            {/* Table */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#FAFAF8" }}>
                  {["ORDER ID", "CUSTOMER", "DRIVER", "RESTAURANT", "AMOUNT", "RISK LEVEL", "ACTIONS"].map(h => (
                    <th key={h} style={{ padding: "11px 18px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#AAA", letterSpacing: "0.7px", borderBottom: "1px solid #F0F0EB" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((row, i) => {
                  const rb = riskBadge[row.risk];
                  return (
                    <tr key={row.id}
                      style={{ borderBottom: i < ORDERS.length - 1 ? "1px solid #F5F5F0" : "none" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#FAFAF8"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      {/* Order ID */}
                      <td style={{ padding: "16px 18px", fontSize: 13.5, fontWeight: 700, color: "#111" }}>{row.id}</td>

                      {/* Customer */}
                      <td style={{ padding: "16px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <Avatar initials={row.customerInitials} color={row.customerColor} />
                          <span style={{ fontSize: 13.5, color: "#222", fontWeight: 500 }}>{row.customer}</span>
                        </div>
                      </td>

                      {/* Driver */}
                      <td style={{ padding: "16px 18px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                          <Avatar initials={row.driverInitials} color={row.driverColor} />
                          <span style={{ fontSize: 13.5, color: "#222", fontWeight: 500 }}>{row.driver}</span>
                        </div>
                      </td>

                      {/* Restaurant */}
                      <td style={{ padding: "16px 18px", fontSize: 13.5, color: "#555" }}>{row.restaurant}</td>

                      {/* Amount */}
                      <td style={{ padding: "16px 18px", fontSize: 13.5, fontWeight: 600, color: "#111" }}>{row.amount}</td>

                      {/* Risk Level */}
                      <td style={{ padding: "16px 18px" }}>
                        <span style={{
                          background: rb.bg, color: rb.color, border: `1px solid ${rb.border}`,
                          borderRadius: 6, padding: "4px 10px", fontSize: 11.5,
                          fontWeight: 700, letterSpacing: "0.3px", whiteSpace: "nowrap",
                        }}>{rb.label}</span>
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "12px 18px" }}>
                        <select style={{
                          padding: "6px 10px", borderRadius: 7, border: "1.5px solid #E0E0E0",
                          background: "white", fontSize: 12.5, color: "#333", cursor: "pointer",
                          outline: "none", fontFamily: "inherit",
                        }}>
                          <option value="">Select Action</option>
                          <option value="taken">Order Taken</option>
                          <option value="taken_otp">Order Taken with OTP</option>
                          <option value="cancelled">Order Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination footer */}
            <div style={{ padding: "14px 20px", borderTop: "1px solid #F0F0EB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "#888" }}>Showing 1 to 5 of 1,208 entries</span>

              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {/* Prev */}
                <button style={{ width: 32, height: 32, borderRadius: 7, border: "1px solid #E0E0E0", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#888" }}>
                  <SvgIcon name="chevronLeft" size={14} color="#888" />
                </button>

                {/* Page numbers */}
                {[1, 2, 3].map(p => (
                  <button key={p} onClick={() => setCurrentPage(p)} style={{
                    width: 32, height: 32, borderRadius: 7,
                    border: currentPage === p ? "none" : "1px solid #E0E0E0",
                    background: currentPage === p ? "#00AA13" : "white",
                    color: currentPage === p ? "white" : "#333",
                    fontSize: 13.5, fontWeight: currentPage === p ? 700 : 400,
                    cursor: "pointer",
                  }}>{p}</button>
                ))}

                <span style={{ fontSize: 13, color: "#AAA", padding: "0 4px" }}>...</span>

                <button onClick={() => setCurrentPage(totalPages)} style={{
                  width: 32, height: 32, borderRadius: 7,
                  border: currentPage === totalPages ? "none" : "1px solid #E0E0E0",
                  background: currentPage === totalPages ? "#00AA13" : "white",
                  color: currentPage === totalPages ? "white" : "#333",
                  fontSize: 13.5, fontWeight: 400, cursor: "pointer",
                }}>{totalPages}</button>

                {/* Next */}
                <button style={{ width: 32, height: 32, borderRadius: 7, border: "1px solid #E0E0E0", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <SvgIcon name="chevronRight" size={14} color="#888" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating chat button */}
      <button style={{
        position: "fixed", bottom: 28, right: 28,
        width: 50, height: 50, borderRadius: "50%",
        background: "#00AA13", border: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", boxShadow: "0 4px 14px rgba(0,170,19,0.4)",
        zIndex: 200,
      }}>
        <SvgIcon name="chat" size={22} color="white" />
      </button>
    </div>
  );
}
