import { useState } from "react";
import DriverLayout, {
  Card,
  StatCard,
  Badge,
} from "../../components/driver/DriverLayout";

function DriverAccountPage() {
  const [modal, setModal] = useState(null);

  const documents = [
    {
      name: "KTP",
      status: "Terverifikasi",
      desc: "Identitas driver sudah valid.",
      icon: "ID",
    },
    {
      name: "Foto Wajah",
      status: "Terverifikasi",
      desc: "Foto wajah sesuai dengan data akun.",
      icon: "FW",
    },
    {
      name: "Data Kendaraan",
      status: "Aktif",
      desc: "Kendaraan siap digunakan untuk menerima order.",
      icon: "DK",
    },
    {
      name: "Rekening Bank",
      status: "Terverifikasi",
      desc: "Rekening aktif untuk pencairan saldo.",
      icon: "RB",
    },
  ];

  function openModal(type, data = null) {
    setModal({ type, data });
  }

  function closeModal() {
    setModal(null);
  }

  return (
    <DriverLayout
      activeMenu="Account"
      title="Driver Account"
      subtitle="Kelola profil, kendaraan, rekening, dokumen, dan keamanan akun driver."
    >
      <section style={styles.profileHero}>
        <div style={styles.profileLeft}>
          <div style={styles.bigAvatar}>SD</div>

          <div>
            <h2 style={styles.driverName}>Sudirman</h2>
            <p style={styles.driverMeta}>Driver ID: DRV-2026-001</p>

            <div style={styles.badgeRow}>
              <Badge>Terverifikasi</Badge>
              <Badge>Aktif</Badge>
            </div>
          </div>
        </div>

        <button style={styles.primarySmallButton} onClick={() => openModal("profile")}>
          Edit Profil
        </button>
      </section>

      <section style={styles.statGrid}>
        <StatCard label="Rating" value="5.0" note="Sangat baik" color="#087f23" />
        <StatCard label="Order Selesai" value="142" note="Total simulasi" />
        <StatCard label="Pembatalan" value="0%" note="Aman" color="#087f23" />
        <StatCard label="Status Akun" value="Aktif" note="Siap menerima order" color="#087f23" />
      </section>

      <section style={styles.contentGrid}>
        <Card>
          <div style={styles.sectionHead}>
            <div>
              <h2 style={styles.sectionTitle}>Informasi Pribadi</h2>
              <p style={styles.sectionText}>
                Data dasar driver yang digunakan untuk identitas akun.
              </p>
            </div>

            <button style={styles.softButton} onClick={() => openModal("profile")}>
              Ubah
            </button>
          </div>

          <div style={styles.infoList}>
            <InfoItem label="Nama Lengkap" value="Sudirman" />
            <InfoItem label="Email" value="sudirman.driver@email.com" />
            <InfoItem label="Nomor Telepon" value="+62 812-3456-7890" />
            <InfoItem label="Kota Operasional" value="Malang" />
          </div>
        </Card>

        <Card>
          <div style={styles.sectionHead}>
            <div>
              <h2 style={styles.sectionTitle}>Data Kendaraan</h2>
              <p style={styles.sectionText}>
                Kendaraan yang digunakan driver untuk menerima order.
              </p>
            </div>

            <button style={styles.softButton} onClick={() => openModal("vehicle")}>
              Ubah
            </button>
          </div>

          <button style={styles.vehicleBox} onClick={() => openModal("vehicle")}>
            <div style={styles.vehicleIcon}>GR</div>

            <div>
              <h3 style={styles.vehicleTitle}>GoRide</h3>
              <p style={styles.vehicleText}>Honda Vario • N 1234 ABC</p>
              <p style={styles.vehicleText}>Tahun kendaraan: 2022</p>
            </div>
          </button>
        </Card>
      </section>

      <section style={styles.contentGrid}>
        <Card>
          <div style={styles.sectionHead}>
            <div>
              <h2 style={styles.sectionTitle}>Rekening Bank</h2>
              <p style={styles.sectionText}>
                Rekening yang digunakan untuk pencairan pendapatan.
              </p>
            </div>

            <button style={styles.softButton} onClick={() => openModal("bank")}>
              Ubah
            </button>
          </div>

          <button style={styles.bankBox} onClick={() => openModal("bank")}>
            <div style={styles.bankIcon}>BCA</div>

            <div>
              <h3 style={styles.bankTitle}>BCA</h3>
              <p style={styles.bankText}>•••• •••• 7890</p>
              <p style={styles.bankText}>a.n. BUDI SANTOSO</p>
            </div>

            <Badge>Terverifikasi</Badge>
          </button>
        </Card>

        <Card>
          <div style={styles.sectionHead}>
            <div>
              <h2 style={styles.sectionTitle}>Keamanan Akun</h2>
              <p style={styles.sectionText}>
                Pengaturan keamanan untuk melindungi akun driver.
              </p>
            </div>
          </div>

          <div style={styles.securityList}>
            <SecurityItem
              title="Password"
              value="Terakhir diubah 7 hari lalu"
              onClick={() => openModal("security", "Password")}
            />

            <SecurityItem
              title="OTP Login"
              value="Aktif"
              onClick={() => openModal("security", "OTP Login")}
            />

            <SecurityItem
              title="Deteksi Order Fiktif"
              value="Aktif"
              onClick={() => openModal("security", "Deteksi Order Fiktif")}
            />
          </div>
        </Card>
      </section>

      <Card>
        <div style={styles.sectionHead}>
          <div>
            <h2 style={styles.sectionTitle}>Status Dokumen</h2>
            <p style={styles.sectionText}>
              Dokumen dan data yang digunakan untuk proses verifikasi mitra.
            </p>
          </div>
        </div>

        <div style={styles.documentGrid}>
          {documents.map((doc) => (
            <button
              key={doc.name}
              style={styles.documentCard}
              onClick={() => openModal("document", doc)}
            >
              <div style={styles.documentIcon}>{doc.icon}</div>

              <h3 style={styles.documentName}>{doc.name}</h3>
              <p style={styles.documentStatus}>{doc.status}</p>
              <p style={styles.documentDesc}>{doc.desc}</p>
            </button>
          ))}
        </div>
      </Card>

      <section style={styles.dangerCard}>
        <div>
          <h2 style={styles.dangerTitle}>Keluar dari akun</h2>
          <p style={styles.dangerText}>
            Gunakan tombol ini untuk keluar dari dashboard driver.
          </p>
        </div>

        <button style={styles.logoutButton} onClick={() => openModal("logout")}>
          Logout
        </button>
      </section>

      {modal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={closeModal}>
              ×
            </button>

            {modal.type === "profile" && (
              <>
                <h2 style={styles.modalTitle}>Edit Profil Driver</h2>
                <p style={styles.modalText}>
                  Bagian ini merupakan simulasi perubahan data pribadi driver.
                </p>

                <div style={styles.formGrid}>
                  <Input label="Nama Lengkap" value="Sudirman" />
                  <Input label="Email" value="sudirman.driver@email.com" />
                  <Input label="Nomor Telepon" value="+62 812-3456-7890" />
                  <Input label="Kota Operasional" value="Malang" />
                </div>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Simpan Perubahan
                </button>
              </>
            )}

            {modal.type === "vehicle" && (
              <>
                <h2 style={styles.modalTitle}>Detail Kendaraan</h2>
                <p style={styles.modalText}>
                  Informasi kendaraan yang terdaftar pada akun driver.
                </p>

                <div style={styles.modalInfoGrid}>
                  <InfoBox label="Layanan" value="GoRide" />
                  <InfoBox label="Merek" value="Honda" />
                  <InfoBox label="Model" value="Vario" />
                  <InfoBox label="Nomor Polisi" value="N 1234 ABC" />
                  <InfoBox label="Tahun" value="2022" />
                  <InfoBox label="Status" value="Aktif" />
                </div>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Oke
                </button>
              </>
            )}

            {modal.type === "bank" && (
              <>
                <h2 style={styles.modalTitle}>Detail Rekening Bank</h2>
                <p style={styles.modalText}>
                  Rekening ini digunakan untuk pencairan saldo driver.
                </p>

                <div style={styles.modalInfoGrid}>
                  <InfoBox label="Bank" value="BCA" />
                  <InfoBox label="Nomor Rekening" value="•••• •••• 7890" />
                  <InfoBox label="Nama Pemilik" value="BUDI SANTOSO" />
                  <InfoBox label="Status" value="Terverifikasi" />
                </div>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Oke
                </button>
              </>
            )}

            {modal.type === "security" && (
              <>
                <h2 style={styles.modalTitle}>{modal.data}</h2>
                <p style={styles.modalText}>
                  Pengaturan <b>{modal.data}</b> masih berupa simulasi prototype.
                  Pada sistem asli, bagian ini terhubung dengan backend keamanan akun.
                </p>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Mengerti
                </button>
              </>
            )}

            {modal.type === "document" && (
              <>
                <h2 style={styles.modalTitle}>{modal.data.name}</h2>
                <p style={styles.modalText}>{modal.data.desc}</p>

                <div style={styles.modalInfoGrid}>
                  <InfoBox label="Dokumen" value={modal.data.name} />
                  <InfoBox label="Status" value={modal.data.status} />
                  <InfoBox label="Validasi" value="Sesuai" />
                  <InfoBox label="Catatan" value="Tidak ada masalah" />
                </div>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Tutup
                </button>
              </>
            )}

            {modal.type === "logout" && (
              <>
                <h2 style={styles.modalTitle}>Konfirmasi Logout</h2>
                <p style={styles.modalText}>
                  Apakah Anda yakin ingin keluar dari dashboard driver?
                </p>

                <div style={styles.modalActionGrid}>
                  <button style={styles.secondaryButton} onClick={closeModal}>
                    Batal
                  </button>

                  <button
                    style={styles.dangerButton}
                    onClick={() => {
                      window.location.href = "/";
                    }}
                  >
                    Ya, Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </DriverLayout>
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

function SecurityItem({ title, value, onClick }) {
  return (
    <button style={styles.securityItem} onClick={onClick}>
      <div style={styles.securityIcon}>●</div>

      <div>
        <h3 style={styles.securityTitle}>{title}</h3>
        <p style={styles.securityValue}>{value}</p>
      </div>
    </button>
  );
}

function Input({ label, value }) {
  return (
    <label style={styles.inputGroup}>
      <span>{label}</span>
      <input style={styles.input} defaultValue={value} />
    </label>
  );
}

function InfoBox({ label, value }) {
  return (
    <div style={styles.infoBox}>
      <p style={styles.infoBoxLabel}>{label}</p>
      <h3 style={styles.infoBoxValue}>{value}</h3>
    </div>
  );
}

const styles = {
  profileHero: {
    background: "#ffffff",
    border: "1px solid #dfe5de",
    borderRadius: "18px",
    padding: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
  },

  profileLeft: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  bigAvatar: {
    width: "78px",
    height: "78px",
    borderRadius: "18px",
    background: "#087f23",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: 900,
  },

  driverName: {
    margin: 0,
    fontSize: "24px",
    letterSpacing: "-0.3px",
  },

  driverMeta: {
    margin: "7px 0 12px",
    color: "#68716c",
    fontSize: "13px",
  },

  badgeRow: {
    display: "flex",
    gap: "8px",
  },

  primarySmallButton: {
    border: "none",
    background: "#087f23",
    color: "white",
    borderRadius: "999px",
    padding: "12px 16px",
    fontWeight: 900,
    fontSize: "13px",
    cursor: "pointer",
  },

  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "14px",
    marginBottom: "22px",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "22px",
  },

  sectionHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "14px",
    marginBottom: "18px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "18px",
  },

  sectionText: {
    margin: "6px 0 0",
    color: "#68716c",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  softButton: {
    border: "none",
    background: "#e6f3e9",
    color: "#087f23",
    borderRadius: "999px",
    padding: "9px 13px",
    fontWeight: 900,
    fontSize: "12px",
    cursor: "pointer",
  },

  infoList: {
    display: "grid",
    gap: "12px",
  },

  infoItem: {
    borderBottom: "1px solid #edf0eb",
    paddingBottom: "12px",
  },

  infoLabel: {
    margin: 0,
    color: "#68716c",
    fontSize: "12px",
  },

  infoValue: {
    margin: "6px 0 0",
    color: "#101828",
    fontSize: "14px",
  },

  vehicleBox: {
    width: "100%",
    border: "none",
    background: "#f7f8f5",
    borderRadius: "15px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    cursor: "pointer",
    textAlign: "left",
  },

  vehicleIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    background: "#e6f3e9",
    color: "#087f23",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: "13px",
  },

  vehicleTitle: {
    margin: 0,
    fontSize: "16px",
  },

  vehicleText: {
    margin: "5px 0 0",
    color: "#68716c",
    fontSize: "13px",
  },

  bankBox: {
    width: "100%",
    border: "none",
    background: "#f7f8f5",
    borderRadius: "15px",
    padding: "16px",
    display: "grid",
    gridTemplateColumns: "50px 1fr auto",
    alignItems: "center",
    gap: "14px",
    cursor: "pointer",
    textAlign: "left",
  },

  bankIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    background: "#e6f3e9",
    color: "#087f23",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: "12px",
  },

  bankTitle: {
    margin: 0,
    fontSize: "16px",
  },

  bankText: {
    margin: "5px 0 0",
    color: "#68716c",
    fontSize: "13px",
  },

  securityList: {
    display: "grid",
    gap: "12px",
  },

  securityItem: {
    border: "none",
    background: "#f7f8f5",
    borderRadius: "14px",
    padding: "14px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    textAlign: "left",
  },

  securityIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "#e6f3e9",
    color: "#087f23",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  securityTitle: {
    margin: 0,
    fontSize: "14px",
  },

  securityValue: {
    margin: "5px 0 0",
    color: "#68716c",
    fontSize: "12px",
  },

  documentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "14px",
  },

  documentCard: {
    border: "1px solid #edf0eb",
    background: "#f7f8f5",
    borderRadius: "15px",
    padding: "16px",
    cursor: "pointer",
    textAlign: "left",
  },

  documentIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "#e6f3e9",
    color: "#087f23",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
    fontSize: "12px",
    marginBottom: "12px",
  },

  documentName: {
    margin: 0,
    fontSize: "15px",
  },

  documentStatus: {
    margin: "6px 0",
    color: "#087f23",
    fontSize: "12px",
    fontWeight: 900,
  },

  documentDesc: {
    margin: 0,
    color: "#68716c",
    fontSize: "12px",
    lineHeight: "1.5",
  },

  dangerCard: {
    background: "#fff7f7",
    border: "1px solid #fecaca",
    borderRadius: "18px",
    padding: "22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
  },

  dangerTitle: {
    margin: 0,
    color: "#991b1b",
    fontSize: "18px",
  },

  dangerText: {
    margin: "6px 0 0",
    color: "#7f1d1d",
    fontSize: "13px",
  },

  logoutButton: {
    border: "none",
    background: "#b91c1c",
    color: "white",
    borderRadius: "999px",
    padding: "12px 18px",
    fontWeight: 900,
    fontSize: "13px",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
  },

  modalCard: {
    width: "540px",
    maxWidth: "92vw",
    background: "white",
    borderRadius: "18px",
    padding: "26px",
    position: "relative",
    boxShadow: "0 24px 60px rgba(0,0,0,0.22)",
  },

  modalClose: {
    position: "absolute",
    top: "12px",
    right: "16px",
    border: "none",
    background: "transparent",
    fontSize: "26px",
    cursor: "pointer",
  },

  modalTitle: {
    margin: "0 0 10px",
    fontSize: "20px",
  },

  modalText: {
    color: "#68716c",
    fontSize: "13px",
    lineHeight: "1.6",
    marginBottom: "16px",
  },

  formGrid: {
    display: "grid",
    gap: "12px",
    marginBottom: "16px",
  },

  inputGroup: {
    display: "grid",
    gap: "6px",
    color: "#4b5563",
    fontSize: "12px",
    fontWeight: 800,
  },

  input: {
    border: "1px solid #d6dde8",
    background: "#f8fafc",
    borderRadius: "12px",
    padding: "12px 14px",
    fontSize: "13px",
  },

  primaryButton: {
    width: "100%",
    border: "none",
    background: "#087f23",
    color: "white",
    padding: "13px",
    borderRadius: "999px",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: "13px",
  },

  secondaryButton: {
    width: "100%",
    border: "1px solid #dfe5de",
    background: "white",
    color: "#374151",
    padding: "13px",
    borderRadius: "999px",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: "13px",
  },

  dangerButton: {
    width: "100%",
    border: "none",
    background: "#b91c1c",
    color: "white",
    padding: "13px",
    borderRadius: "999px",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: "13px",
  },

  modalActionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  modalInfoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "16px",
  },

  infoBox: {
    background: "#f7f8f5",
    borderRadius: "13px",
    padding: "13px",
  },

  infoBoxLabel: {
    margin: 0,
    color: "#68716c",
    fontSize: "12px",
  },

  infoBoxValue: {
    margin: "6px 0 0",
    color: "#101828",
    fontSize: "14px",
  },
};

export default DriverAccountPage;