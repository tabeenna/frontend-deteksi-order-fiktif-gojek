import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    monitoring:  `<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>`,
    orders:      `<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>`,
    drivers:     `<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
    security:    `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    database:    `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
    audit:       `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
    refresh:     `<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>`,
    save:        `<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>`,
    reset:       `<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.07"/>`,
    info:        `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
    check:       `<polyline points="20 6 9 17 4 12"/>`,
    warning:     `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
    zap:         `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
    bell:        `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>`,
    slider:      `<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>`,
    shield:      `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: paths[name] || "" }}
      style={{ display: "block", flexShrink: 0 }}
    />
  );
}

// Reusable number input with +/- buttons
function NumberInput({ value, onChange, min = 0, max = 100, step = 1, suffix = "" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1.5px solid #E0E0E0", borderRadius: 8, overflow: "hidden", width: "fit-content" }}>
      <button
        onClick={() => onChange(Math.max(min, value - step))}
        style={{ width: 32, height: 36, background: "#F5F5F0", border: "none", fontSize: 16, cursor: "pointer", color: "#555", fontWeight: 700 }}
      >−</button>
      <div style={{ padding: "0 12px", fontSize: 14, fontWeight: 700, color: "#111", minWidth: 52, textAlign: "center", lineHeight: "36px" }}>
        {value}{suffix}
      </div>
      <button
        onClick={() => onChange(Math.min(max, value + step))}
        style={{ width: 32, height: 36, background: "#F5F5F0", border: "none", fontSize: 16, cursor: "pointer", color: "#555", fontWeight: 700 }}
      >+</button>
    </div>
  );
}

// Slider component
function RangeSlider({ value, onChange, min = 0, max = 100, color = "#00AA13" }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ position: "relative", height: 20, display: "flex", alignItems: "center" }}>
      <div style={{ position: "absolute", left: 0, right: 0, height: 6, background: "#E5E7EB", borderRadius: 99 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99, transition: "width 0.1s" }} />
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ position: "absolute", left: 0, right: 0, width: "100%", opacity: 0, cursor: "pointer", height: 20 }}
      />
    </div>
  );
}

// Section card wrapper
function Section({ title, subtitle, icon, children }) {
  return (
    <div style={{ background: "white", borderRadius: 14, border: "1px solid #EBEBEB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)", marginBottom: 20, overflow: "hidden" }}>
      <div style={{ padding: "18px 24px 14px", borderBottom: "1px solid #F0F0EB", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: "#F0FFF4", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <SvgIcon name={icon} size={17} color="#00AA13" />
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#111" }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12.5, color: "#999", marginTop: 2 }}>{subtitle}</div>}
        </div>
      </div>
      <div style={{ padding: "20px 24px" }}>{children}</div>
    </div>
  );
}

// Row inside a section
function SettingRow({ label, description, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #F5F5F0" }}>
      <div style={{ flex: 1, paddingRight: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{label}</div>
        {description && <div style={{ fontSize: 12.5, color: "#999", marginTop: 3, lineHeight: 1.4 }}>{description}</div>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

// Toggle switch
function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: 44, height: 24, borderRadius: 99, border: "none", cursor: "pointer",
        background: value ? "#00AA13" : "#D1D5DB", position: "relative", transition: "background 0.2s",
      }}
    >
      <span style={{
        position: "absolute", top: 3, left: value ? 23 : 3,
        width: 18, height: 18, borderRadius: "50%", background: "white",
        transition: "left 0.2s", display: "block",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

const DEFAULTS = {
  // 1. Risk score thresholds
  lowToMedium: 31,
  mediumToHigh: 61,
  // 2. Factor weights (must total 100)
  weightVolume: 25,
  weightCancellation: 25,
  weightAddress: 25,
  weightAccountAge: 25,
  // 3. Factor trigger thresholds
  volumeOrdersPerDay: 5,
  cancellationRatePct: 20,
  addressChangeCount: 5,
  newAccountDays: 90,
  // 4. Auto-action rules
  autoActionRendah: "none",
  autoActionSedang: "flag",
  autoActionTinggi: "auto_cancel",
  // 5. Alert settings
  alertMinLevel: "Tinggi",
  alertBatchCount: 5,
  alertBatchMinutes: 10,
  alertEnabled: true,
};

const AUTO_ACTIONS = [
  { value: "none",        label: "No action" },
  { value: "flag",        label: "Flag for review" },
  { value: "require_otp", label: "Require OTP" },
  { value: "auto_cancel", label: "Auto-cancel order" },
  { value: "block",       label: "Block account" },
];

export default function SuperAdminSecurity() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(DEFAULTS);
  const [saved, setSaved] = useState(false);

  const set = (key, val) => {
    setSaved(false);
    setSettings(prev => ({ ...prev, [key]: val }));
  };

  const totalWeight = settings.weightVolume + settings.weightCancellation
    + settings.weightAddress + settings.weightAccountAge;

  const handleSave = () => {
    // In production: POST /api/superadmin/security-settings
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setSettings(DEFAULTS);
    setSaved(false);
  };

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
          {NAV.map(item => {
            const isActive = item.id === "security";
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
        <div style={{ padding: "0 16px 24px" }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button style={{ width: 36, height: 36, borderRadius: "50%", background: "#F5F5F0", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <SvgIcon name="refresh" size={16} color="#555" />
            </button>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1C1C1C", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>NP</div>
          </div>
        </header>

        {/* Body */}
        <div style={{ padding: "28px 28px 60px", flex: 1 }}>

          {/* Page title */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 800, color: "#111", letterSpacing: "-0.5px" }}>Security Settings</h1>
              <p style={{ margin: 0, fontSize: 14, color: "#888" }}>Configure fraud detection thresholds, weights, and automated responses.</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleReset} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 9, border: "1.5px solid #DDD", background: "white", color: "#555", fontSize: 13.5, fontWeight: 600, cursor: "pointer" }}>
                <SvgIcon name="reset" size={14} color="#555" />
                Reset to Defaults
              </button>
              <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 9, border: "none", background: saved ? "#059669" : "#00AA13", color: "white", fontSize: 13.5, fontWeight: 700, cursor: "pointer", transition: "background 0.2s" }}>
                <SvgIcon name={saved ? "check" : "save"} size={14} color="white" />
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </div>

          {/* ── RISK SCORE PREVIEW BAR ── */}
          <div style={{ background: "white", borderRadius: 14, border: "1px solid #EBEBEB", padding: "18px 24px", marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#555", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <SvgIcon name="slider" size={15} color="#555" />
              Risk Level Preview
            </div>
            <div style={{ position: "relative", height: 36 }}>
              {/* Background segments */}
              <div style={{ display: "flex", height: 10, borderRadius: 99, overflow: "hidden", marginBottom: 8 }}>
                <div style={{ width: `${settings.lowToMedium}%`, background: "#BBF7D0" }} />
                <div style={{ width: `${settings.mediumToHigh - settings.lowToMedium}%`, background: "#FED7AA" }} />
                <div style={{ width: `${100 - settings.mediumToHigh}%`, background: "#FECACA" }} />
              </div>
              {/* Labels */}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 700 }}>
                <span style={{ color: "#16803C" }}>RENDAH 0–{settings.lowToMedium - 1}</span>
                <span style={{ color: "#B45309" }}>SEDANG {settings.lowToMedium}–{settings.mediumToHigh - 1}</span>
                <span style={{ color: "#D0021B" }}>TINGGI {settings.mediumToHigh}–100</span>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

            {/* LEFT COLUMN */}
            <div>

              {/* 1. Risk Score Thresholds */}
              <Section title="Risk Score Thresholds" subtitle="Set when Low becomes Medium and Medium becomes High" icon="shield">
                <SettingRow
                  label="Low → Medium threshold"
                  description="Orders scoring at or above this are flagged Sedang"
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end", minWidth: 180 }}>
                    <NumberInput value={settings.lowToMedium} onChange={v => set("lowToMedium", Math.min(v, settings.mediumToHigh - 1))} min={1} max={99} />
                    <RangeSlider value={settings.lowToMedium} onChange={v => set("lowToMedium", Math.min(v, settings.mediumToHigh - 1))} color="#F59E0B" />
                  </div>
                </SettingRow>
                <SettingRow
                  label="Medium → High threshold"
                  description="Orders scoring at or above this are flagged Tinggi"
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end", minWidth: 180 }}>
                    <NumberInput value={settings.mediumToHigh} onChange={v => set("mediumToHigh", Math.max(v, settings.lowToMedium + 1))} min={1} max={100} />
                    <RangeSlider value={settings.mediumToHigh} onChange={v => set("mediumToHigh", Math.max(v, settings.lowToMedium + 1))} color="#DC2626" />
                  </div>
                </SettingRow>
              </Section>

              {/* 2. Factor Weights */}
              <Section title="Factor Weights" subtitle={`Controls how much each factor contributes to the score. Total: ${totalWeight}/100`} icon="slider">
                {totalWeight !== 100 && (
                  <div style={{ background: "#FEF3C7", border: "1px solid #FCD34D", borderRadius: 8, padding: "8px 12px", marginBottom: 14, fontSize: 12.5, color: "#92400E", display: "flex", alignItems: "center", gap: 6 }}>
                    <SvgIcon name="warning" size={14} color="#D97706" />
                    Weights must total 100. Current total: {totalWeight}
                  </div>
                )}
                {[
                  { key: "weightVolume",       label: "High Volume Orders",       color: "#6366F1" },
                  { key: "weightCancellation", label: "Frequent Cancellations",   color: "#F59E0B" },
                  { key: "weightAddress",      label: "Address Changes",           color: "#0EA5E9" },
                  { key: "weightAccountAge",   label: "New Account",               color: "#EC4899" },
                ].map(f => (
                  <SettingRow key={f.key} label={f.label} description={`Currently ${settings[f.key]} points out of 100`}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end", minWidth: 180 }}>
                      <NumberInput value={settings[f.key]} onChange={v => set(f.key, v)} min={0} max={100} suffix=" pts" />
                      <RangeSlider value={settings[f.key]} onChange={v => set(f.key, v)} color={f.color} />
                    </div>
                  </SettingRow>
                ))}
              </Section>

            </div>

            {/* RIGHT COLUMN */}
            <div>

              {/* 3. Factor Trigger Thresholds */}
              <Section title="Factor Trigger Values" subtitle="The thresholds that activate each fraud factor" icon="warning">
                <SettingRow
                  label="High volume: orders per day"
                  description="Flag if a user places this many orders in 24h"
                >
                  <NumberInput value={settings.volumeOrdersPerDay} onChange={v => set("volumeOrdersPerDay", v)} min={1} max={100} />
                </SettingRow>
                <SettingRow
                  label="Cancellation rate trigger"
                  description="Flag if cancellation rate exceeds this percentage"
                >
                  <NumberInput value={settings.cancellationRatePct} onChange={v => set("cancellationRatePct", v)} min={1} max={100} suffix="%" />
                </SettingRow>
                <SettingRow
                  label="Unique address changes"
                  description="Flag if user has this many distinct addresses in 30 days"
                >
                  <NumberInput value={settings.addressChangeCount} onChange={v => set("addressChangeCount", v)} min={1} max={100} />
                </SettingRow>
                <SettingRow
                  label="New account window (days)"
                  description="Accounts younger than this receive the new-account risk score"
                >
                  <NumberInput value={settings.newAccountDays} onChange={v => set("newAccountDays", v)} min={1} max={365} step={7} />
                </SettingRow>
              </Section>

              {/* 4. Auto-Action Rules */}
              <Section title="Auto-Action Rules" subtitle="What happens automatically when an order reaches each risk level" icon="zap">
                {[
                  { key: "autoActionRendah", label: "Rendah (Low)", color: "#16803C", bg: "#F0FFF4" },
                  { key: "autoActionSedang", label: "Sedang (Medium)", color: "#B45309", bg: "#FFFBEB" },
                  { key: "autoActionTinggi", label: "Tinggi (High)", color: "#D0021B", bg: "#FFF0F0" },
                ].map(row => (
                  <SettingRow key={row.key} label={<span style={{ color: row.color, fontWeight: 700 }}>{row.label}</span>} description="Action taken automatically on new orders">
                    <select
                      value={settings[row.key]}
                      onChange={e => set(row.key, e.target.value)}
                      style={{ padding: "7px 12px", borderRadius: 8, border: "1.5px solid #E0E0E0", background: "white", fontSize: 13, color: "#333", cursor: "pointer", outline: "none", fontFamily: "inherit", minWidth: 160 }}
                    >
                      {AUTO_ACTIONS.map(a => (
                        <option key={a.value} value={a.value}>{a.label}</option>
                      ))}
                    </select>
                  </SettingRow>
                ))}
              </Section>

              {/* 5. Alert Notification Settings */}
              <Section title="Alert Notifications" subtitle="When and how superadmins get notified of fraud spikes" icon="bell">
                <SettingRow label="Enable fraud alerts" description="Send alerts to superadmins when risk events occur">
                  <Toggle value={settings.alertEnabled} onChange={v => set("alertEnabled", v)} />
                </SettingRow>
                <SettingRow
                  label="Minimum level to alert"
                  description="Only notify for orders at or above this risk level"
                >
                  <select
                    value={settings.alertMinLevel}
                    onChange={e => set("alertMinLevel", e.target.value)}
                    style={{ padding: "7px 12px", borderRadius: 8, border: "1.5px solid #E0E0E0", background: "white", fontSize: 13, color: "#333", cursor: "pointer", outline: "none", fontFamily: "inherit" }}
                  >
                    <option value="Rendah">Rendah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Tinggi">Tinggi</option>
                  </select>
                </SettingRow>
                <SettingRow
                  label="Batch alert threshold"
                  description={`Send critical alert if ${settings.alertBatchCount} high-risk orders appear within ${settings.alertBatchMinutes} minutes`}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <NumberInput value={settings.alertBatchCount} onChange={v => set("alertBatchCount", v)} min={1} max={100} />
                    <span style={{ fontSize: 13, color: "#888" }}>in</span>
                    <NumberInput value={settings.alertBatchMinutes} onChange={v => set("alertBatchMinutes", v)} min={1} max={60} suffix=" min" />
                  </div>
                </SettingRow>
              </Section>

            </div>
          </div>

          {/* Bottom save bar */}
          <div style={{ position: "fixed", bottom: 0, left: 240, right: 0, background: "white", borderTop: "1px solid #E5E7EB", padding: "14px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 40 }}>
            <span style={{ fontSize: 13, color: "#888" }}>
              {saved
                ? <span style={{ color: "#059669", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}><SvgIcon name="check" size={14} color="#059669" /> Settings saved successfully</span>
                : "Unsaved changes will not take effect until you save."}
            </span>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleReset} style={{ padding: "9px 18px", borderRadius: 9, border: "1.5px solid #DDD", background: "white", color: "#555", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                Reset
              </button>
              <button onClick={handleSave} style={{ padding: "9px 18px", borderRadius: 9, border: "none", background: saved ? "#059669" : "#00AA13", color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "background 0.2s" }}>
                {saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
