import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const dbMetrics = [
  { label: "Total Users", value: "3", sub: "admin accounts" },
  { label: "Active Sessions", value: "20", sub: "saat ini", subClass: "green" },
  { label: "Banned", value: "+33", sub: "bulan ini", subClass: "red" },
];

const userList = [
  { id: "#001", name: "Muhammad Puma", role: "Super Admin", roleClass: "green", email: "puma@gojek.com", status: "Active", statusClass: "badge-success" },
  { id: "#002", name: "Sari Indah", role: "Analyst", roleClass: "yellow", email: "sari@gojek.com", status: "Active", statusClass: "badge-success" },
  { id: "#003", name: "Rizky Putra", role: "Viewer", roleClass: "muted", email: "rizky@gojek.com", status: "Inactive", statusClass: "badge-warning" },
];

export default function DatabasePages() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", role: "Viewer", email: "" });

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <button className="back-btn" onClick={() => navigate("/admin")}>← Kembali</button>
          <h1>Database</h1>
          <p>Manajemen user & data · Gojek Fraud Radar</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>+ Add User</button>
      </div>

      <div className="metrics-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {dbMetrics.map((m) => (
          <div className="metric-card" key={m.label}>
            <p className="metric-label">{m.label}</p>
            <p className="metric-value">{m.value}</p>
            {m.sub && <p className={`metric-sub ${m.subClass || ""}`}>{m.sub}</p>}
          </div>
        ))}
      </div>

      <div className="section-header">
        <span className="section-title">User Accounts</span>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Nama</th><th>Role</th><th>Email</th><th>Status</th><th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((u) => (
              <tr key={u.id}>
                <td className="mono muted">{u.id}</td>
                <td>{u.name}</td>
                <td className={u.roleClass}>{u.role}</td>
                <td className="muted">{u.email}</td>
                <td><span className={`badge ${u.statusClass}`}>{u.status}</span></td>
                <td>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="btn-outline" style={{ padding: "2px 8px", fontSize: "11px" }}>Edit</button>
                    <button className="btn-danger" style={{ padding: "2px 8px", fontSize: "11px" }}>Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Tambah User Baru</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Nama Lengkap</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Muhammad Puma" className="form-input" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="user@gojek.com" className="form-input" />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="form-input">
                  <option>Super Admin</option>
                  <option>Analyst</option>
                  <option>Viewer</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={() => setShowModal(false)}>Batal</button>
              <button className="btn-primary" onClick={() => { alert(`User ${form.name} ditambahkan!`); setShowModal(false); }}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
