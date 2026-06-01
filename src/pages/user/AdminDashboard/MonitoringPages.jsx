import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const metrics = [
  { label: "Total Orders", value: "42,001", sub: "↑ 3.1% hari ini", subClass: "green" },
  { label: "Fraud Rate", value: "2.45%", sub: "↑ 0.3% dari kemarin", subClass: "red" },
  { label: "Risk Score", value: "18.4", sub: "⚠ Moderate", subClass: "yellow" },
  { label: "Flagged Cases", value: "312", sub: "↑ 24 baru", subClass: "red" },
];

const fraudCases = [
  { id: "#F-001", driver: "Andi S.", order: "GF-4421", value: "Rp 52.000", risk: "Tinggi", riskClass: "risk-high", status: "Flagged", statusClass: "badge-danger" },
  { id: "#F-002", driver: "Budi R.", order: "GF-4418", value: "Rp 18.500", risk: "Sedang", riskClass: "risk-mid", status: "Review", statusClass: "badge-warning" },
  { id: "#F-003", driver: "Citra M.", order: "GF-4415", value: "Rp 95.000", risk: "Tinggi", riskClass: "risk-high", status: "Flagged", statusClass: "badge-danger" },
  { id: "#F-004", driver: "Dedi K.", order: "GF-4410", value: "Rp 33.000", risk: "Rendah", riskClass: "risk-low", status: "Aman", statusClass: "badge-success" },
  { id: "#F-005", driver: "Eko P.", order: "GF-4408", value: "Rp 71.500", risk: "Sedang", riskClass: "risk-mid", status: "Review", statusClass: "badge-warning" },
  { id: "#F-006", driver: "Fajar N.", order: "GF-4402", value: "Rp 128.000", risk: "Tinggi", riskClass: "risk-high", status: "Flagged", statusClass: "badge-danger" },
];

const fraudDist = [
  { label: "Fake GPS", pct: 65, color: "#e24b4a" },
  { label: "Bonus Abuse", pct: 20, color: "#ef9f27" },
  { label: "Clone Account", pct: 15, color: "#00aa13" },
];

export default function MonitoringPages() {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <button className="back-btn" onClick={() => navigate("/admin")}>← Kembali</button>
          <h1>Monitoring</h1>
          <p>Data fraud real-time · Gojek Fraud Radar</p>
        </div>
        <div className="header-badge">● Live</div>
      </div>

      <div className="metrics-grid">
        {metrics.map((m) => (
          <div className="metric-card" key={m.label}>
            <p className="metric-label">{m.label}</p>
            <p className="metric-value">{m.value}</p>
            <p className={`metric-sub ${m.subClass}`}>{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="two-col">
        <div className="chart-card">
          <p className="chart-title">Distribusi Tipe Fraud</p>
          <div className="dist-list">
            {fraudDist.map((d) => (
              <div key={d.label} className="dist-item">
                <span className="dist-label">{d.label}</span>
                <div className="dist-bar-wrap">
                  <div className="dist-bar-fill" style={{ width: `${d.pct}%`, background: d.color }} />
                </div>
                <span className="dist-pct">{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-card">
          <p className="chart-title">Ringkasan Hari Ini</p>
          <div className="summary-grid">
            {[
              { label: "Order Masuk", val: "1.204", color: "#00aa13" },
              { label: "Flagged", val: "24", color: "#e24b4a" },
              { label: "Diselesaikan", val: "18", color: "#6699cc" },
              { label: "Pending", val: "6", color: "#ef9f27" },
            ].map((s) => (
              <div key={s.label} className="summary-item" style={{ borderLeftColor: s.color }}>
                <p className="summary-label">{s.label}</p>
                <p className="summary-val" style={{ color: s.color }}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-header">
        <span className="section-title">Faktor Operasional Fraud</span>
        <button className="btn-outline">Export CSV</button>
      </div>
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Case ID</th><th>Driver</th><th>Order</th><th>Nilai</th><th>Risk Level</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {fraudCases.map((c) => (
              <tr key={c.id}>
                <td className="mono">{c.id}</td>
                <td>{c.driver}</td>
                <td className="muted">{c.order}</td>
                <td>{c.value}</td>
                <td className={c.riskClass}>{c.risk}</td>
                <td><span className={`badge ${c.statusClass}`}>{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
