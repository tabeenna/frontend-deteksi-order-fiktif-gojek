import { useNavigate } from "react-router-dom";

function DriverAccountPage() {
  const navigate = useNavigate();

  const documents = [
    {
      name: "KTP",
      status: "Terverifikasi",
      icon: "🪪",
    },
    {
      name: "Foto Wajah",
      status: "Terverifikasi",
      icon: "🙂",
    },
    {
      name: "Data Kendaraan",
      status: "Aktif",
      icon: "🛵",
    },
    {
      name: "Rekening Bank",
      status: "Terverifikasi",
      icon: "🏦",
    },
  ];

  function handleEdit(section) {
    alert(`Fitur edit ${section} masih berupa simulasi prototype.`);
  }

  function handleLogout() {
    alert("Anda berhasil keluar.");
    navigate("/");
  }

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.brand}>
            <h1 style={styles.brandTitle}>Gojek</h1>
            <p style={styles.brandSubtitle}>Driver Portal</p>
          </div>

          <nav style={styles.nav}>
            <button style={styles.navItem} onClick={() => navigate("/driver")}>
              <span style={styles.navIcon}>🏠</span>
              Home
            </button>

            <button
              style={styles.navItem}
              onClick={() => navigate("/driver/orders")}
            >
              <span style={styles.navIcon}>📋</span>
              Orders
            </button>

            <button
              style={styles.navItem}
              onClick={() => navigate("/driver/earnings")}
            >
              <span style={styles.navIcon}>💵</span>
              Earnings
            </button>

            <button style={{ ...styles.navItem, ...styles.navActive }}>
              <span style={styles.navIcon}>👤</span>
              Account
            </button>
          </nav>
        </div>

        <div style={styles.profileCard}>
          <div style={styles.profileTop}>
            <div style={styles.avatar}>👤</div>
            <div>
              <h3 style={styles.profileName}>Sudirman</h3>
              <p style={styles.profileRole}>Driver</p>
            </div>
          </div>

          <div style={styles.profileDivider}></div>

          <div style={styles.profileMeta}>
            <span>⭐ 5.0</span>
            <span style={styles.metaDivider}></span>
            <span>🛡️ Terverifikasi</span>
          </div>
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.pageTitle}>Account</h1>
            <p style={styles.pageSubtitle}>
              Kelola profil, kendaraan, rekening, dan status verifikasi akun driver.
            </p>
          </div>

          <button style={styles.onlineButton}>Go Online</button>
        </header>

        <section style={styles.profileHero}>
          <div style={styles.heroLeft}>
            <div style={styles.bigAvatar}>👤</div>

            <div>
              <h2 style={styles.driverName}>Sudirman</h2>
              <p style={styles.driverId}>Driver ID: DRV-2026-001</p>

              <div style={styles.badgeRow}>
                <span style={styles.verifiedBadge}>Terverifikasi</span>
                <span style={styles.activeBadge}>Aktif</span>
              </div>
            </div>
          </div>

          <button
            style={styles.editButton}
            onClick={() => handleEdit("profil")}
          >
            Edit Profil
          </button>
        </section>

        <section style={styles.summaryGrid}>
          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Rating</p>
            <h2 style={styles.summaryValue}>5.0</h2>
            <span style={styles.summaryNote}>Sangat baik</span>
          </div>

          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Order Selesai</p>
            <h2 style={styles.summaryValue}>142</h2>
            <span style={styles.summaryNote}>Total simulasi</span>
          </div>

          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Pembatalan</p>
            <h2 style={styles.summaryValue}>0%</h2>
            <span style={styles.summaryNote}>Aman</span>
          </div>

          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Status Akun</p>
            <h2 style={{ ...styles.summaryValue, color: "#00aa13" }}>Aktif</h2>
            <span style={styles.summaryNote}>Siap menerima order</span>
          </div>
        </section>

        <section style={styles.contentGrid}>
          <div style={styles.card}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Informasi Pribadi</h2>
                <p style={styles.sectionSubtitle}>
                  Data dasar akun driver yang terdaftar.
                </p>
              </div>

              <button
                style={styles.smallButton}
                onClick={() => handleEdit("informasi pribadi")}
              >
                Ubah
              </button>
            </div>

            <div style={styles.infoList}>
              <InfoItem label="Nama Lengkap" value="Sudirman" />
              <InfoItem label="Email" value="sudirman.driver@email.com" />
              <InfoItem label="Nomor Telepon" value="+62 812-3456-7890" />
              <InfoItem label="Kota Operasional" value="Malang" />
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Data Kendaraan</h2>
                <p style={styles.sectionSubtitle}>
                  Kendaraan yang digunakan untuk menerima order.
                </p>
              </div>

              <button
                style={styles.smallButton}
                onClick={() => handleEdit("kendaraan")}
              >
                Ubah
              </button>
            </div>

            <div style={styles.vehicleBox}>
              <div style={styles.vehicleIcon}>🛵</div>

              <div>
                <h3 style={styles.vehicleTitle}>GoRide</h3>
                <p style={styles.vehicleText}>Honda Vario • N 1234 ABC</p>
                <p style={styles.vehicleText}>Tahun kendaraan: 2022</p>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.contentGrid}>
          <div style={styles.card}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Rekening Bank</h2>
                <p style={styles.sectionSubtitle}>
                  Rekening untuk pencairan pendapatan driver.
                </p>
              </div>

              <button
                style={styles.smallButton}
                onClick={() => handleEdit("rekening bank")}
              >
                Ubah
              </button>
            </div>

            <div style={styles.bankCard}>
              <div style={styles.bankIcon}>🏦</div>

              <div>
                <h3 style={styles.bankName}>BCA</h3>
                <p style={styles.bankText}>•••• •••• 7890</p>
                <p style={styles.bankText}>a.n. BUDI SANTOSO</p>
              </div>

              <span style={styles.bankBadge}>Terverifikasi</span>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Keamanan Akun</h2>
                <p style={styles.sectionSubtitle}>
                  Pengaturan keamanan dan perlindungan akun.
                </p>
              </div>
            </div>

            <div style={styles.securityList}>
              <SecurityItem icon="🔐" title="Password" value="Terakhir diubah 7 hari lalu" />
              <SecurityItem icon="📱" title="OTP Login" value="Aktif" />
              <SecurityItem icon="🛡️" title="Deteksi Order Fiktif" value="Aktif" />
            </div>
          </div>
        </section>

        <section style={styles.card}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Status Dokumen</h2>
              <p style={styles.sectionSubtitle}>
                Dokumen dan data yang digunakan untuk proses verifikasi mitra.
              </p>
            </div>
          </div>

          <div style={styles.documentGrid}>
            {documents.map((doc) => (
              <div key={doc.name} style={styles.documentCard}>
                <div style={styles.documentIcon}>{doc.icon}</div>

                <div>
                  <h3 style={styles.documentName}>{doc.name}</h3>
                  <p style={styles.documentStatus}>{doc.status}</p>
                </div>

                <span style={styles.documentCheck}>✓</span>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.dangerCard}>
          <div>
            <h2 style={styles.dangerTitle}>Keluar dari akun</h2>
            <p style={styles.dangerText}>
              Gunakan tombol ini untuk keluar dari dashboard driver.
            </p>
          </div>

          <button style={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </section>
      </main>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div style={styles.infoItem}>
      <p style={styles.infoLabel}>{label}</p>
      <h3 style={styles.infoValue}>{value}</h3>
    </div>
  );
}

function SecurityItem({ icon, title, value }) {
  return (
    <div style={styles.securityItem}>
      <div style={styles.securityIcon}>{icon}</div>

      <div>
        <h3 style={styles.securityTitle}>{title}</h3>
        <p style={styles.securityValue}>{value}</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "310px 1fr",
    background: "#f7f9f8",
    fontFamily: "Arial, sans-serif",
    color: "#1f2933",
  },

  sidebar: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #00aa13 0%, #007f0e 100%)",
    color: "white",
    padding: "42px 32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
  },

  brand: {
    marginBottom: "34px",
  },

  brandTitle: {
    margin: 0,
    fontSize: "34px",
    fontWeight: 900,
  },

  brandSubtitle: {
    margin: "8px 0 0",
    fontSize: "15px",
    opacity: 0.85,
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  navItem: {
    width: "100%",
    border: "none",
    background: "transparent",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontSize: "17px",
    fontWeight: 700,
    padding: "16px 18px",
    borderRadius: "14px",
    cursor: "pointer",
    textAlign: "left",
    opacity: 0.92,
  },

  navActive: {
    background: "rgba(255,255,255,0.18)",
    opacity: 1,
  },

  navIcon: {
    fontSize: "20px",
    width: "26px",
  },

  profileCard: {
    background: "rgba(255,255,255,0.11)",
    border: "1px solid rgba(255,255,255,0.16)",
    borderRadius: "18px",
    padding: "18px",
  },

  profileTop: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  avatar: {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    background: "white",
    color: "#00aa13",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },

  profileName: {
    margin: 0,
    fontSize: "17px",
    fontWeight: 800,
  },

  profileRole: {
    margin: "4px 0 0",
    opacity: 0.85,
    fontSize: "14px",
  },

  profileDivider: {
    height: "1px",
    background: "rgba(255,255,255,0.16)",
    margin: "16px 0",
  },

  profileMeta: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontSize: "14px",
    fontWeight: 700,
  },

  metaDivider: {
    width: "1px",
    height: "18px",
    background: "rgba(255,255,255,0.28)",
  },

  main: {
    padding: "38px 48px",
    maxWidth: "1100px",
    width: "100%",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "24px",
    borderBottom: "1px solid #e5e7eb",
    marginBottom: "28px",
  },

  pageTitle: {
    margin: 0,
    fontSize: "32px",
    color: "#111827",
  },

  pageSubtitle: {
    margin: "8px 0 0",
    color: "#6b7280",
    fontSize: "15px",
  },

  onlineButton: {
    background: "#00aa13",
    color: "white",
    border: "none",
    borderRadius: "999px",
    padding: "13px 22px",
    fontWeight: 800,
    cursor: "pointer",
  },

  profileHero: {
    background: "linear-gradient(145deg, #ffffff, #f0fff4)",
    border: "1px solid #dde3df",
    borderRadius: "22px",
    padding: "26px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  heroLeft: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  bigAvatar: {
    width: "88px",
    height: "88px",
    borderRadius: "50%",
    background: "#e8f8ed",
    color: "#00aa13",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "42px",
  },

  driverName: {
    margin: 0,
    fontSize: "28px",
    color: "#111827",
  },

  driverId: {
    margin: "8px 0 12px",
    color: "#6b7280",
    fontSize: "14px",
  },

  badgeRow: {
    display: "flex",
    gap: "10px",
  },

  verifiedBadge: {
    background: "#e8f8ed",
    color: "#00aa13",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 800,
  },

  activeBadge: {
    background: "#eef2ff",
    color: "#4f46e5",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 800,
  },

  editButton: {
    border: "none",
    background: "#00aa13",
    color: "white",
    padding: "13px 20px",
    borderRadius: "999px",
    fontWeight: 800,
    cursor: "pointer",
  },

  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },

  summaryCard: {
    background: "white",
    border: "1px solid #dde3df",
    borderRadius: "18px",
    padding: "20px",
  },

  summaryLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "14px",
  },

  summaryValue: {
    margin: "8px 0",
    color: "#111827",
    fontSize: "26px",
  },

  summaryNote: {
    color: "#6b7280",
    fontSize: "13px",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "22px",
    marginBottom: "24px",
  },

  card: {
    background: "white",
    border: "1px solid #dde3df",
    borderRadius: "20px",
    padding: "24px",
    marginBottom: "24px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "20px",
    color: "#111827",
  },

  sectionSubtitle: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: "14px",
    lineHeight: "1.5",
  },

  smallButton: {
    border: "none",
    background: "#e8f8ed",
    color: "#00aa13",
    padding: "10px 16px",
    borderRadius: "999px",
    fontWeight: 800,
    cursor: "pointer",
  },

  infoList: {
    display: "grid",
    gap: "14px",
  },

  infoItem: {
    borderBottom: "1px solid #eef2f1",
    paddingBottom: "12px",
  },

  infoLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "13px",
  },

  infoValue: {
    margin: "6px 0 0",
    color: "#111827",
    fontSize: "16px",
  },

  vehicleBox: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    background: "#f7f9f8",
    borderRadius: "16px",
    padding: "18px",
  },

  vehicleIcon: {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    background: "#e8f8ed",
    color: "#00aa13",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },

  vehicleTitle: {
    margin: 0,
    color: "#111827",
    fontSize: "18px",
  },

  vehicleText: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },

  bankCard: {
    display: "grid",
    gridTemplateColumns: "58px 1fr auto",
    gap: "16px",
    alignItems: "center",
    background: "#f7f9f8",
    borderRadius: "16px",
    padding: "18px",
  },

  bankIcon: {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    background: "#e8f8ed",
    color: "#00aa13",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
  },

  bankName: {
    margin: 0,
    color: "#111827",
    fontSize: "18px",
  },

  bankText: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },

  bankBadge: {
    background: "#e8f8ed",
    color: "#00aa13",
    padding: "8px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 800,
  },

  securityList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  securityItem: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
    background: "#f7f9f8",
    borderRadius: "14px",
    padding: "14px",
  },

  securityIcon: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background: "#e8f8ed",
    color: "#00aa13",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  securityTitle: {
    margin: 0,
    color: "#111827",
    fontSize: "16px",
  },

  securityValue: {
    margin: "5px 0 0",
    color: "#6b7280",
    fontSize: "13px",
  },

  documentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
  },

  documentCard: {
    background: "#f7f9f8",
    borderRadius: "16px",
    padding: "18px",
    position: "relative",
  },

  documentIcon: {
    fontSize: "30px",
    marginBottom: "14px",
  },

  documentName: {
    margin: 0,
    color: "#111827",
    fontSize: "16px",
  },

  documentStatus: {
    margin: "6px 0 0",
    color: "#00aa13",
    fontSize: "13px",
    fontWeight: 800,
  },

  documentCheck: {
    position: "absolute",
    top: "14px",
    right: "14px",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    background: "#00aa13",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    fontWeight: 900,
  },

  dangerCard: {
    background: "#fff7f7",
    border: "1px solid #fecaca",
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dangerTitle: {
    margin: 0,
    color: "#991b1b",
    fontSize: "20px",
  },

  dangerText: {
    margin: "8px 0 0",
    color: "#7f1d1d",
    fontSize: "14px",
  },

  logoutButton: {
    border: "none",
    background: "#ef4444",
    color: "white",
    padding: "13px 22px",
    borderRadius: "999px",
    fontWeight: 800,
    cursor: "pointer",
  },
};

export default DriverAccountPage;