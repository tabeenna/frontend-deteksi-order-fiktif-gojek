import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";
import DriverLayout, {
  Card,
  StatCard,
  Badge,
} from "../../components/driver/DriverLayout";

const defaultAccount = {
  profile: {
    driver_id: "DRV-2026-000",
    full_name: "Driver",
    initials: "DR",
    email: "-",
    phone: "-",
    operational_city: "Malang",
    status: "Aktif",
    registration_status: "verified",
  },
  stats: {
    rating: "5.0",
    completed_orders: 0,
    cancellation_rate: "0%",
    account_status: "Aktif",
  },
  vehicle: {
    vehicle_type: "GoRide",
    vehicle_brand: "-",
    vehicle_model: "-",
    plate_number: "-",
    vehicle_year: "-",
    vehicle_color: "-",
    status: "Aktif",
  },
  bank: {
    bank_name: "-",
    bank_account_name: "-",
    bank_account_number: "-",
    bank_account_number_masked: "••••",
    status: "Terverifikasi",
  },
  documents: [],
};

function DriverAccountPage() {
  const [modal, setModal] = useState(null);
  const [account, setAccount] = useState(defaultAccount);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [profileForm, setProfileForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    operational_city: "",
  });

  const [vehicleForm, setVehicleForm] = useState({
    vehicle_type: "",
    vehicle_brand: "",
    vehicle_model: "",
    plate_number: "",
    vehicle_year: "",
    vehicle_color: "",
  });

  const [bankForm, setBankForm] = useState({
    bank_name: "",
    bank_account_name: "",
    bank_account_number: "",
  });

  useEffect(() => {
    fetchAccount();
  }, []);

  async function fetchAccount() {
    try {
      const response = await apiRequest("/driver/account");
      const data = response.data || defaultAccount;

      setAccount(data);
      syncForms(data);
    } catch (err) {
      setError(err.message || "Gagal mengambil data akun driver.");
    } finally {
      setLoading(false);
    }
  }

  function syncForms(data) {
    setProfileForm({
      full_name: data.profile?.full_name || "",
      email: data.profile?.email || "",
      phone: data.profile?.phone || "",
      operational_city: data.profile?.operational_city || "",
    });

    setVehicleForm({
      vehicle_type: data.vehicle?.vehicle_type || "",
      vehicle_brand: data.vehicle?.vehicle_brand || "",
      vehicle_model: data.vehicle?.vehicle_model || "",
      plate_number: data.vehicle?.plate_number || "",
      vehicle_year: data.vehicle?.vehicle_year || "",
      vehicle_color: data.vehicle?.vehicle_color || "",
    });

    setBankForm({
      bank_name: data.bank?.bank_name || "",
      bank_account_name: data.bank?.bank_account_name || "",
      bank_account_number: data.bank?.bank_account_number || "",
    });
  }

  function openModal(type, data = null) {
    if (type === "profile") {
      setProfileForm({
        full_name: account.profile.full_name || "",
        email: account.profile.email || "",
        phone: account.profile.phone || "",
        operational_city: account.profile.operational_city || "",
      });
    }

    if (type === "vehicle") {
      setVehicleForm({
        vehicle_type: account.vehicle.vehicle_type || "",
        vehicle_brand: account.vehicle.vehicle_brand || "",
        vehicle_model: account.vehicle.vehicle_model || "",
        plate_number: account.vehicle.plate_number || "",
        vehicle_year: account.vehicle.vehicle_year || "",
        vehicle_color: account.vehicle.vehicle_color || "",
      });
    }

    if (type === "bank") {
      setBankForm({
        bank_name: account.bank.bank_name || "",
        bank_account_name: account.bank.bank_account_name || "",
        bank_account_number: account.bank.bank_account_number || "",
      });
    }

    setModal({ type, data });
  }

  function closeModal() {
    setModal(null);
  }

  async function saveProfile() {
    try {
      const response = await apiRequest("/driver/account/profile", {
        method: "PUT",
        body: JSON.stringify(profileForm),
      });

      setAccount(response.data || defaultAccount);
      syncForms(response.data || defaultAccount);
      window.dispatchEvent(
        new CustomEvent("driver-profile-updated", {
          detail: response.data?.profile,
        })
      );
      setModal({ type: "success", data: "Profil driver berhasil diperbarui." });
    } catch (err) {
      alert(err.message || "Gagal menyimpan profil.");
    }
  }

  async function saveVehicle() {
    try {
      const response = await apiRequest("/driver/account/vehicle", {
        method: "PUT",
        body: JSON.stringify(vehicleForm),
      });

      setAccount(response.data || defaultAccount);
      syncForms(response.data || defaultAccount);
      setModal({ type: "success", data: "Data kendaraan berhasil diperbarui." });
    } catch (err) {
      alert(err.message || "Gagal menyimpan data kendaraan.");
    }
  }

  async function saveBank() {
    try {
      const response = await apiRequest("/driver/account/bank", {
        method: "PUT",
        body: JSON.stringify(bankForm),
      });

      setAccount(response.data || defaultAccount);
      syncForms(response.data || defaultAccount);
      setModal({ type: "success", data: "Data rekening berhasil diperbarui." });
    } catch (err) {
      alert(err.message || "Gagal menyimpan data rekening.");
    }
  }

  async function logout() {
    try {
      await apiRequest("/driver/logout", {
        method: "POST",
      });
    } catch (err) {
      console.error("Logout backend gagal:", err.message);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
  }

  if (loading) {
    return (
      <DriverLayout
        activeMenu="Account"
        title="Driver Account"
        subtitle="Memuat data akun driver..."
      >
        <Card>
          <p>Sedang memuat data akun...</p>
        </Card>
      </DriverLayout>
    );
  }

  if (error) {
    return (
      <DriverLayout
        activeMenu="Account"
        title="Driver Account"
        subtitle="Terjadi kesalahan saat mengambil data akun."
      >
        <Card>
          <p style={{ color: "#b91c1c", fontWeight: 800 }}>{error}</p>
          <p style={{ color: "#68716c", fontSize: "13px" }}>
            Pastikan backend Laravel menyala dan kamu sudah login sebagai driver.
          </p>
        </Card>
      </DriverLayout>
    );
  }

  const profile = account.profile || defaultAccount.profile;
  const stats = account.stats || defaultAccount.stats;
  const vehicle = account.vehicle || defaultAccount.vehicle;
  const bank = account.bank || defaultAccount.bank;
  const documents = account.documents?.length
    ? account.documents
    : [
        {
          name: "KTP",
          status: "Belum Upload",
          desc: "Dokumen KTP belum tersedia.",
          icon: "ID",
        },
        {
          name: "Foto Wajah",
          status: "Belum Upload",
          desc: "Foto wajah belum tersedia.",
          icon: "FW",
        },
        {
          name: "Data Kendaraan",
          status: "Belum Lengkap",
          desc: "Data kendaraan belum lengkap.",
          icon: "DK",
        },
        {
          name: "Rekening Bank",
          status: "Belum Lengkap",
          desc: "Data rekening belum lengkap.",
          icon: "RB",
        },
      ];

  return (
    <DriverLayout
      activeMenu="Account"
      title="Driver Account"
      subtitle="Kelola profil, kendaraan, rekening, dokumen, dan keamanan akun driver."
    >
      <section style={styles.profileHero}>
        <div style={styles.profileLeft}>
          <div style={styles.bigAvatar}>{profile.initials || "DR"}</div>

          <div>
            <h2 style={styles.driverName}>{profile.full_name}</h2>
            <p style={styles.driverMeta}>Driver ID: {profile.driver_id}</p>

            <div style={styles.badgeRow}>
              <Badge>{profile.registration_status === "verified" ? "Terverifikasi" : "Terdaftar"}</Badge>
              <Badge>{profile.status || "Aktif"}</Badge>
            </div>
          </div>
        </div>

        <button
          style={styles.primarySmallButton}
          onClick={() => openModal("profile")}
        >
          Edit Profil
        </button>
      </section>

      <section style={styles.statGrid}>
        <StatCard
          label="Rating"
          value={String(stats.rating || "5.0")}
          note="Sangat baik"
          color="#087f23"
        />
        <StatCard
          label="Order Selesai"
          value={String(stats.completed_orders || 0)}
          note="Total order"
        />
        <StatCard
          label="Pembatalan"
          value={stats.cancellation_rate || "0%"}
          note="Aman"
          color="#087f23"
        />
        <StatCard
          label="Status Akun"
          value={stats.account_status || "Aktif"}
          note="Siap menerima order"
          color="#087f23"
        />
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

            <button
              style={styles.softButton}
              onClick={() => openModal("profile")}
            >
              Ubah
            </button>
          </div>

          <div style={styles.infoList}>
            <InfoItem label="Nama Lengkap" value={profile.full_name} />
            <InfoItem label="Email" value={profile.email} />
            <InfoItem label="Nomor Telepon" value={profile.phone} />
            <InfoItem
              label="Kota Operasional"
              value={profile.operational_city}
            />
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

            <button
              style={styles.softButton}
              onClick={() => openModal("vehicle")}
            >
              Ubah
            </button>
          </div>

          <button
            style={styles.vehicleBox}
            onClick={() => openModal("vehicle")}
          >
            <div style={styles.vehicleIcon}>GR</div>

            <div>
              <h3 style={styles.vehicleTitle}>
                {vehicle.vehicle_type || "GoRide"}
              </h3>
              <p style={styles.vehicleText}>
                {vehicle.vehicle_brand || "-"} {vehicle.vehicle_model || "-"} •{" "}
                {vehicle.plate_number || "-"}
              </p>
              <p style={styles.vehicleText}>
                Tahun kendaraan: {vehicle.vehicle_year || "-"}
              </p>
              <p style={styles.vehicleText}>
                Warna: {vehicle.vehicle_color || "-"}
              </p>
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

            <button
              style={styles.softButton}
              onClick={() => openModal("bank")}
            >
              Ubah
            </button>
          </div>

          <button style={styles.bankBox} onClick={() => openModal("bank")}>
            <div style={styles.bankIcon}>{bank.bank_name || "BANK"}</div>

            <div>
              <h3 style={styles.bankTitle}>{bank.bank_name || "-"}</h3>
              <p style={styles.bankText}>
                {bank.bank_account_number_masked || "••••"}
              </p>
              <p style={styles.bankText}>
                a.n. {bank.bank_account_name || "-"}
              </p>
            </div>

            <Badge>{bank.status || "Terverifikasi"}</Badge>
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
              value="Dikelola oleh sistem login"
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
              <p
                style={{
                  ...styles.documentStatus,
                  color:
                    doc.status === "Terverifikasi" || doc.status === "Aktif"
                      ? "#087f23"
                      : "#d97706",
                }}
              >
                {doc.status}
              </p>
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
                  Perubahan profil akan disimpan ke backend dan tampil kembali di halaman Account.
                </p>

                <div style={styles.formGrid}>
                  <Input
                    label="Nama Lengkap"
                    value={profileForm.full_name}
                    onChange={(value) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        full_name: value,
                      }))
                    }
                  />

                  <Input
                    label="Email"
                    value={profileForm.email}
                    onChange={(value) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        email: value,
                      }))
                    }
                  />

                  <Input
                    label="Nomor Telepon"
                    value={profileForm.phone}
                    onChange={(value) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        phone: value,
                      }))
                    }
                  />

                  <Input
                    label="Kota Operasional"
                    value={profileForm.operational_city}
                    onChange={(value) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        operational_city: value,
                      }))
                    }
                  />
                </div>

                <button style={styles.primaryButton} onClick={saveProfile}>
                  Simpan Perubahan
                </button>
              </>
            )}

            {modal.type === "vehicle" && (
              <>
                <h2 style={styles.modalTitle}>Edit Data Kendaraan</h2>
                <p style={styles.modalText}>
                  Data kendaraan akan digunakan untuk identitas driver saat menerima order.
                </p>

                <div style={styles.formGrid}>
                  <Input
                    label="Layanan"
                    value={vehicleForm.vehicle_type}
                    onChange={(value) =>
                      setVehicleForm((prev) => ({
                        ...prev,
                        vehicle_type: value,
                      }))
                    }
                  />

                  <Input
                    label="Merek"
                    value={vehicleForm.vehicle_brand}
                    onChange={(value) =>
                      setVehicleForm((prev) => ({
                        ...prev,
                        vehicle_brand: value,
                      }))
                    }
                  />

                  <Input
                    label="Model"
                    value={vehicleForm.vehicle_model}
                    onChange={(value) =>
                      setVehicleForm((prev) => ({
                        ...prev,
                        vehicle_model: value,
                      }))
                    }
                  />

                  <Input
                    label="Nomor Polisi"
                    value={vehicleForm.plate_number}
                    onChange={(value) =>
                      setVehicleForm((prev) => ({
                        ...prev,
                        plate_number: value,
                      }))
                    }
                  />

                  <Input
                    label="Tahun"
                    value={vehicleForm.vehicle_year}
                    onChange={(value) =>
                      setVehicleForm((prev) => ({
                        ...prev,
                        vehicle_year: value,
                      }))
                    }
                  />

                  <Input
                    label="Warna"
                    value={vehicleForm.vehicle_color}
                    onChange={(value) =>
                      setVehicleForm((prev) => ({
                        ...prev,
                        vehicle_color: value,
                      }))
                    }
                  />
                </div>

                <button style={styles.primaryButton} onClick={saveVehicle}>
                  Simpan Kendaraan
                </button>
              </>
            )}

            {modal.type === "bank" && (
              <>
                <h2 style={styles.modalTitle}>Edit Rekening Bank</h2>
                <p style={styles.modalText}>
                  Rekening ini digunakan untuk pencairan saldo driver.
                </p>

                <div style={styles.formGrid}>
                  <Input
                    label="Bank"
                    value={bankForm.bank_name}
                    onChange={(value) =>
                      setBankForm((prev) => ({
                        ...prev,
                        bank_name: value,
                      }))
                    }
                  />

                  <Input
                    label="Nomor Rekening"
                    value={bankForm.bank_account_number}
                    onChange={(value) =>
                      setBankForm((prev) => ({
                        ...prev,
                        bank_account_number: value,
                      }))
                    }
                  />

                  <Input
                    label="Nama Pemilik"
                    value={bankForm.bank_account_name}
                    onChange={(value) =>
                      setBankForm((prev) => ({
                        ...prev,
                        bank_account_name: value,
                      }))
                    }
                  />
                </div>

                <button style={styles.primaryButton} onClick={saveBank}>
                  Simpan Rekening
                </button>
              </>
            )}

            {modal.type === "success" && (
              <>
                <h2 style={styles.modalTitle}>Berhasil</h2>
                <p style={styles.modalText}>{modal.data}</p>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Mengerti
                </button>
              </>
            )}

            {modal.type === "security" && (
              <>
                <h2 style={styles.modalTitle}>{modal.data}</h2>
                <p style={styles.modalText}>
                  Pengaturan <b>{modal.data}</b> masih berupa simulasi prototype.
                  Untuk demo, status keamanan ditampilkan aktif.
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

                  <button style={styles.dangerButton} onClick={logout}>
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

function Input({ label, value, onChange }) {
  return (
    <label style={styles.inputGroup}>
      <span>{label}</span>
      <input
        style={styles.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
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
    marginBottom: "22px",
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