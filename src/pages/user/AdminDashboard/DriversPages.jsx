import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const driverMetrics = [
  { label: "Total Driver", value: "3.021" },
  { label: "Active", value: "2.847", sub: "94.2% online", subClass: "green" },
  { label: "Suspended", value: "94", sub: "bulan ini", subClass: "red" },
  { label: "Flagged", value: "80", sub: "perlu review", subClass: "yellow" },
];

const driverList = [
  { id: "DRV-0091", name: "Andi Setiawan", city: "Malang", trips: 34, risk: 87, status: "Flagged", statusClass: "badge-danger", riskClass: "risk-high" },
  { id: "DRV-0088", name: "Budi Raharja", city: "Batu", trips: 121, risk: 52, status: "Review", statusClass: "badge-warning", riskClass: "risk-mid" },
  { id: "DRV-0075", name: "Citra Maharani", city: "Malang", trips: 287, risk: 12, status: "Aman", statusClass: "badge-success", riskClass: "risk-low" },
  { id: "DRV-0062", name: "Dedi Kurniawan", city: "Kepanjen", trips: 412, risk: 8, status: "Aman", statusClass: "badge-success", riskClass: "risk-low" },
  { id: "DRV-0059", name: "Eko Purnomo", city: "Blitar", trips: 98, risk: 61, status: "Review", statusClass: "badge-warning", riskClass: "risk-mid" },
  { id: "DRV-0044", name: "Fajar Nugroho", city: "Pasuruan", trips: 15, risk: 91, status: "Suspended", statusClass: "badge-danger", riskClass: "risk-high" },
];

export default function DriversPages() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = driverList.filter(
    (d) => d.name.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <button className="back-btn" onClick={() => navigate("/admin")}>← Kembali</button>
          <h1>Drivers</h1>
          <p>Monitor aktivitas driver · Gojek Fraud Radar</p>
        </div>
        <button className="btn-primary">+ Tambah Driver</button>
      </div>

      <div className="metrics-grid">
        {driverMetrics.map((m) => (
          <div className="metric-card" key={m.label}>
            <p className="metric-label">{m.label}</p>
            <p className="metric-value">{m.value}</p>
            {m.sub && <p className={`metric-sub ${m.subClass || ""}`}>{m.sub}</p>}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Cari driver by nama atau ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
        style={{ width: "280px" }}
      />

      <div className="driver-list">
        {filtered.map((d) => (
          <div
            key={d.id}
            className={`driver-row ${selected?.id === d.id ? "selected" : ""}`}
            onClick={() => setSelected(selected?.id === d.id ? null : d)}
          >
            <div className="driver-avatar-sm">{d.name.split(" ").map(n => n[0]).join("").slice(0,2)}</div>
            <div className="driver-info">
              <p className="driver-name">{d.name}</p>
              <p className="driver-meta">{d.id} · {d.city}</p>
            </div>
            <div className="driver-risk-wrap">
              <p className={`driver-risk ${d.riskClass}`}>Risk: {d.risk}</p>
              <p className="driver-trips">{d.trips} trips</p>
            </div>
            <span className={`badge ${d.statusClass}`}>{d.status}</span>
          </div>
        ))}
        {filtered.length === 0 && <p className="empty-row">Tidak ada driver ditemukan</p>}
      </div>

      {selected && (
        <div className="driver-detail">
          <div className="driver-detail-header">
            <div className="driver-detail-left">
              <div className="driver-avatar-lg">{selected.name.split(" ").map(n => n[0]).join("").slice(0,2)}</div>
              <div>
                <p className="driver-detail-name">{selected.name}</p>
                <p className="driver-meta">{selected.id} · {selected.city}</p>
              </div>
            </div>
            <button className="close-btn" onClick={() => setSelected(null)}>✕</button>
          </div>
          <div className="driver-detail-stats">
            <div className="detail-stat">
              <p className="detail-stat-label">Risk Score</p>
              <p className={`detail-stat-val ${selected.riskClass}`}>{selected.risk}</p>
            </div>
            <div className="detail-stat">
              <p className="detail-stat-label">Total Trips</p>
              <p className="detail-stat-val">{selected.trips}</p>
            </div>
            <div className="detail-stat">
              <p className="detail-stat-label">Status</p>
              <span className={`badge ${selected.statusClass}`}>{selected.status}</span>
            </div>
          </div>
          <div className="driver-detail-actions">
            <button className="btn-outline">Lihat History</button>
            {selected.status !== "Aman" && (
              <button className="btn-danger">Suspend Driver</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
