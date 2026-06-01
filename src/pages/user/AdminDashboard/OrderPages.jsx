import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const orderMetrics = [
  { label: "Total Orders", value: "12.482", sub: "bulan ini" },
  { label: "Selesai", value: "11.904", sub: "95.4% completion", subClass: "green" },
  { label: "Dibatalkan", value: "578", sub: "4.6% cancel rate", subClass: "red" },
  { label: "Pending", value: "34", sub: "sedang diproses", subClass: "yellow" },
];

const orderList = [
  { id: "GF-4422", customer: "Siti N.", driver: "Andi S.", route: "Malang → Batu", value: "Rp 45.000", status: "Selesai", statusClass: "badge-success" },
  { id: "GF-4421", customer: "Rudi H.", driver: "Budi R.", route: "Malang → Kepanjen", value: "Rp 52.000", status: "Fraud", statusClass: "badge-danger" },
  { id: "GF-4420", customer: "Maya K.", driver: "Citra M.", route: "Batu → Malang", value: "Rp 38.500", status: "Review", statusClass: "badge-warning" },
  { id: "GF-4419", customer: "Hendra W.", driver: "Dedi K.", route: "Malang → Blitar", value: "Rp 82.000", status: "Selesai", statusClass: "badge-success" },
  { id: "GF-4418", customer: "Nina A.", driver: "Eko P.", route: "Kepanjen → Malang", value: "Rp 29.000", status: "Selesai", statusClass: "badge-success" },
  { id: "GF-4417", customer: "Tono S.", driver: "Fajar N.", route: "Malang → Pasuruan", value: "Rp 128.000", status: "Fraud", statusClass: "badge-danger" },
];

const filters = ["Semua", "Selesai", "Fraud", "Review", "Pending"];

export default function OrderPages() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const filtered = orderList.filter((o) => {
    const matchFilter = filter === "Semua" || o.status === filter;
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <button className="back-btn" onClick={() => navigate("/admin")}>← Kembali</button>
          <h1>Orders</h1>
          <p>Kelola semua pesanan · Gojek Fraud Radar</p>
        </div>
        <button className="btn-outline">Export</button>
      </div>

      <div className="metrics-grid">
        {orderMetrics.map((m) => (
          <div className="metric-card" key={m.label}>
            <p className="metric-label">{m.label}</p>
            <p className="metric-value">{m.value}</p>
            {m.sub && <p className={`metric-sub ${m.subClass || ""}`}>{m.sub}</p>}
          </div>
        ))}
      </div>

      <div className="table-controls">
        <div className="filter-tabs">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`filter-tab ${filter === f ? "active" : ""}`}>{f}</button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Cari order atau customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Order ID</th><th>Customer</th><th>Driver</th><th>Rute</th><th>Nilai</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id}>
                <td className="mono">{o.id}</td>
                <td>{o.customer}</td>
                <td className="muted">{o.driver}</td>
                <td className="muted">{o.route}</td>
                <td>{o.value}</td>
                <td><span className={`badge ${o.statusClass}`}>{o.status}</span></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="empty-row">Tidak ada data ditemukan</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
