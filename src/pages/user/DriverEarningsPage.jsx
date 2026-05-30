import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";
import DriverLayout, {
  Card,
  StatCard,
  Badge,
} from "../../components/driver/DriverLayout";

function DriverEarningsPage() {
  const [modal, setModal] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [summary, setSummary] = useState({
  available_balance_label: "Rp 0",
  today_earnings_label: "Rp 0",
  incentive_label: "Rp 0",
  completed_orders_today: 0,
});

useEffect(() => {
  async function fetchEarnings() {
    try {
      const response = await apiRequest("/driver/earnings");

      setSummary(
        response.data.summary || {
          available_balance_label: "Rp 0",
          today_earnings_label: "Rp 0",
          incentive_label: "Rp 0",
          completed_orders_today: 0,
        }
      );

      setTransactions(response.data.transactions || []);
      setWeeklyData(
        response.data.weeklyData || [
          { day: "Sen", value: 0, amount_label: "Rp 0" },
          { day: "Sel", value: 0, amount_label: "Rp 0" },
          { day: "Rab", value: 0, amount_label: "Rp 0" },
          { day: "Kam", value: 0, amount_label: "Rp 0" },
          { day: "Jum", value: 0, amount_label: "Rp 0" },
          { day: "Sab", value: 0, amount_label: "Rp 0" },
          { day: "Min", value: 0, amount_label: "Rp 0" },
        ]
      );
    } catch (err) {
      setError(err.message || "Gagal mengambil data earnings.");
    } finally {
      setLoading(false);
    }
  }

  fetchEarnings();
}, []);

const [transactions, setTransactions] = useState([]);
const [weeklyData, setWeeklyData] = useState([
  { day: "Sen", value: 0, amount_label: "Rp 0" },
  { day: "Sel", value: 0, amount_label: "Rp 0" },
  { day: "Rab", value: 0, amount_label: "Rp 0" },
  { day: "Kam", value: 0, amount_label: "Rp 0" },
  { day: "Jum", value: 0, amount_label: "Rp 0" },
  { day: "Sab", value: 0, amount_label: "Rp 0" },
  { day: "Min", value: 0, amount_label: "Rp 0" },
]);

const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

  const filteredTransactions =
    activeFilter === "Semua"
      ? transactions
      : transactions.filter((item) => item.type === activeFilter);

  function openModal(type, data = null) {
    setModal({ type, data });
  }

  function closeModal() {
    setModal(null);
  }

  return (
    <DriverLayout
      activeMenu="Earnings"
      title="Earnings"
      subtitle="Pantau pendapatan, insentif, bonus, dan riwayat transaksi driver."
    >
      <section style={styles.summaryGrid}>
        <button
          style={styles.balanceCard}
          onClick={() => openModal("balance")}
        >
          <p style={styles.balanceLabel}>Saldo Tersedia</p>
          <h1 style={styles.balanceValue}>
            {summary.available_balance_label}
            </h1>
          <p style={styles.balanceText}>
            Bisa dicairkan ke rekening yang sudah terverifikasi.
          </p>

          <span style={styles.withdrawPill}>Cairkan Saldo →</span>
        </button>

        <StatCard
        label="Hari Ini"
        value={summary.today_earnings_label}
        note={`${summary.completed_orders_today} order selesai`}
        />
        <StatCard
          label="Insentif"
          value={summary.incentive_label}
          note="Target bonus"
          color="#087f23"
        />
        <StatCard
        label="Order Selesai"
        value={String(summary.completed_orders_today)}
        note="Hari ini"
        />
      </section>

      <section style={styles.contentGrid}>
        <Card>
          <div style={styles.sectionHead}>
            <div>
              <h2 style={styles.sectionTitle}>Pendapatan Mingguan</h2>
              <p style={styles.sectionText}>
                Simulasi pendapatan dalam tujuh hari terakhir.
              </p>
            </div>

            <Badge>Minggu Ini</Badge>
          </div>

          <div style={styles.chartArea}>
            {weeklyData.map((item) => (
              <button
                key={item.day}
                style={styles.barItem}
                onClick={() => openModal("daily", item)}
              >
                <div style={styles.barTrack}>
                  <div
                    style={{
                      ...styles.barFill,
                      height: `${item.value}%`,
                    }}
                  ></div>
                </div>
                <p style={styles.barLabel}>{item.day}</p>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div style={styles.bonusIcon}>◎</div>
          <h2 style={styles.bonusTitle}>Target Bonus</h2>
          <p style={styles.sectionText}>
            Selesaikan 20 order lagi untuk mendapatkan bonus tambahan.
          </p>

          <div style={styles.progressBar}>
            <div style={styles.progressFill}></div>
          </div>

          <div style={styles.progressRow}>
            <span>80/100 Poin</span>
            <strong>80%</strong>
          </div>

          <div style={styles.bonusInfo}>
            <p style={styles.bonusInfoLabel}>Bonus tersedia</p>
            <h3 style={styles.bonusInfoValue}>Rp 100.000</h3>
          </div>

          <button
            style={styles.primaryButton}
            onClick={() => openModal("bonus")}
          >
            Lihat Detail Bonus
          </button>
        </Card>
      </section>

      <Card>
        <div style={styles.sectionHead}>
          <div>
            <h2 style={styles.sectionTitle}>Riwayat Pendapatan</h2>
            <p style={styles.sectionText}>
              Transaksi terbaru dari order, bonus, dan insentif.
            </p>
          </div>

          <div style={styles.filterGroup}>
            {["Semua", "Order", "Bonus"].map((filter) => (
              <button
                key={filter}
                style={{
                  ...styles.filterButton,
                  ...(activeFilter === filter ? styles.filterActive : {}),
                }}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.transactionList}>
          {filteredTransactions.map((item) => (
            <button
              key={item.id}
              style={styles.transactionCard}
              onClick={() => openModal("transaction", item)}
            >
              <div style={styles.transactionIcon}>
                {item.type === "Bonus" ? "◎" : "▣"}
              </div>

              <div>
                <h3 style={styles.transactionTitle}>
                  {item.service} • {item.status}
                </h3>
                <p style={styles.transactionText}>{item.route}</p>
              </div>

              <div style={styles.transactionAmount}>
                <h3 style={styles.transactionAmountValue}>{item.amount}</h3>
                <p style={styles.transactionAmountTime}>{item.time}</p>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {modal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={closeModal}>
              ×
            </button>

            {modal.type === "balance" && (
              <>
                <h2 style={styles.modalTitle}>Cairkan Saldo</h2>
                <p style={styles.modalText}>
                  Saldo tersedia sebesar <b>Rp 742.500</b>. Pencairan akan
                  dikirim ke rekening bank yang telah terverifikasi.
                </p>

                <div style={styles.modalInfoBox}>
                  <p>Rekening tujuan</p>
                  <h3>BCA •••• 7890</h3>
                  <span>a.n. BUDI SANTOSO</span>
                </div>

                <button
                  style={styles.primaryButton}
                  onClick={() => openModal("withdrawSuccess")}
                >
                  Konfirmasi Pencairan
                </button>
              </>
            )}

            {modal.type === "withdrawSuccess" && (
              <>
                <h2 style={styles.modalTitle}>Pencairan Diproses</h2>
                <p style={styles.modalText}>
                  Permintaan pencairan saldo berhasil dibuat. Dana akan diproses
                  ke rekening terdaftar.
                </p>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Mengerti
                </button>
              </>
            )}

            {modal.type === "daily" && (
              <>
                <h2 style={styles.modalTitle}>Pendapatan Hari {modal.data.day}</h2>
                <p style={styles.modalText}>
                  Grafik ini menunjukkan simulasi performa pendapatan pada hari{" "}
                  <b>{modal.data.day}</b>.
                </p>

                <div style={styles.modalInfoGrid}>
                  <InfoBox label="Skor Pendapatan" value={`${modal.data.value}%`} />
                  <InfoBox label="Status" value="Produktif" />
                  <InfoBox label="Estimasi Order" value="12 order" />
                  <InfoBox label="Area Teramai" value="Jakarta Selatan" />
                </div>
              </>
            )}

            {modal.type === "bonus" && (
              <>
                <h2 style={styles.modalTitle}>Detail Target Bonus</h2>
                <p style={styles.modalText}>
                  Driver sudah mencapai 80 dari 100 poin. Selesaikan 20 poin
                  lagi untuk membuka bonus Rp 100.000.
                </p>

                <div style={styles.progressBarModal}>
                  <div style={styles.progressFill}></div>
                </div>

                <div style={styles.modalInfoGrid}>
                  <InfoBox label="Poin Saat Ini" value="80" />
                  <InfoBox label="Target" value="100" />
                  <InfoBox label="Sisa Poin" value="20" />
                  <InfoBox label="Bonus" value="Rp 100.000" />
                </div>
              </>
            )}

            {modal.type === "transaction" && (
              <>
                <h2 style={styles.modalTitle}>Detail Transaksi</h2>
                <p style={styles.modalText}>
                  Berikut detail transaksi pendapatan driver.
                </p>

                <div style={styles.modalInfoGrid}>
                  <InfoBox label="ID Transaksi" value={modal.data.id} />
                  <InfoBox label="Layanan" value={modal.data.service} />
                  <InfoBox label="Rute" value={modal.data.route} />
                  <InfoBox label="Pendapatan" value={modal.data.amount} />
                  <InfoBox label="Waktu" value={modal.data.time} />
                  <InfoBox label="Status" value={modal.data.status} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </DriverLayout>
  );
}

function InfoBox({ label, value }) {
  return (
    <div style={styles.infoBox}>
      <p style={styles.infoLabel}>{label}</p>
      <h3 style={styles.infoValue}>{value}</h3>
    </div>
  );
}

const styles = {
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "1.45fr 1fr 1fr 1fr",
    gap: "14px",
    marginBottom: "22px",
  },

  balanceCard: {
    background: "#087f23",
    color: "white",
    border: "none",
    borderRadius: "16px",
    padding: "20px",
    textAlign: "left",
    cursor: "pointer",
  },

  balanceLabel: {
    margin: 0,
    opacity: 0.85,
    fontSize: "13px",
  },

  balanceValue: {
    margin: "8px 0",
    fontSize: "28px",
    letterSpacing: "-0.5px",
  },

  balanceText: {
    margin: "0 0 16px",
    opacity: 0.88,
    fontSize: "13px",
    lineHeight: "1.5",
  },

  withdrawPill: {
    display: "inline-block",
    background: "white",
    color: "#087f23",
    borderRadius: "999px",
    padding: "9px 13px",
    fontSize: "12px",
    fontWeight: 900,
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1.45fr 1fr",
    gap: "22px",
  },

  sectionHead: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    alignItems: "flex-start",
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

  chartArea: {
    height: "220px",
    display: "flex",
    alignItems: "flex-end",
    gap: "12px",
    paddingTop: "18px",
  },

  barItem: {
    flex: 1,
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
  },

  barTrack: {
    height: "176px",
    background: "#eef2ef",
    borderRadius: "999px",
    display: "flex",
    alignItems: "flex-end",
    overflow: "hidden",
  },

  barFill: {
    width: "100%",
    background: "linear-gradient(180deg, #087f23, #0a6b21)",
    borderRadius: "999px",
  },

  barLabel: {
    margin: "10px 0 0",
    color: "#68716c",
    fontSize: "12px",
    fontWeight: 800,
    textAlign: "center",
  },

  bonusIcon: {
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "#e6f3e9",
    color: "#087f23",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: 900,
    marginBottom: "14px",
  },

  bonusTitle: {
    margin: 0,
    fontSize: "20px",
  },

  progressBar: {
    height: "9px",
    background: "#e5e7eb",
    borderRadius: "999px",
    overflow: "hidden",
    marginTop: "20px",
  },

  progressFill: {
    width: "80%",
    height: "100%",
    background: "#087f23",
    borderRadius: "999px",
  },

  progressRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    color: "#4b5563",
    fontSize: "13px",
  },

  bonusInfo: {
    background: "#f7f8f5",
    borderRadius: "14px",
    padding: "14px",
    marginTop: "18px",
    marginBottom: "16px",
  },

  bonusInfoLabel: {
    margin: 0,
    color: "#68716c",
    fontSize: "12px",
  },

  bonusInfoValue: {
    margin: "6px 0 0",
    color: "#087f23",
    fontSize: "20px",
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

  filterGroup: {
    display: "flex",
    gap: "8px",
  },

  filterButton: {
    border: "1px solid #dfe5de",
    background: "white",
    color: "#4b5563",
    borderRadius: "999px",
    padding: "8px 12px",
    fontWeight: 800,
    fontSize: "12px",
    cursor: "pointer",
  },

  filterActive: {
    background: "#087f23",
    color: "white",
    borderColor: "#087f23",
  },

  transactionList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  transactionCard: {
    display: "grid",
    gridTemplateColumns: "46px 1fr auto",
    alignItems: "center",
    gap: "14px",
    border: "1px solid #edf0eb",
    background: "#f7f8f5",
    borderRadius: "14px",
    padding: "14px",
    cursor: "pointer",
    textAlign: "left",
  },

  transactionIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#e6f3e9",
    color: "#087f23",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },

  transactionTitle: {
    margin: 0,
    fontSize: "14px",
  },

  transactionText: {
    margin: "5px 0 0",
    color: "#68716c",
    fontSize: "13px",
  },

  transactionAmount: {
    textAlign: "right",
  },

  transactionAmountValue: {
    margin: 0,
    color: "#087f23",
    fontSize: "15px",
  },

  transactionAmountTime: {
    margin: "5px 0 0",
    color: "#68716c",
    fontSize: "12px",
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
    width: "520px",
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

  modalInfoBox: {
    background: "#f7f8f5",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "16px",
  },

  modalInfoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "12px",
  },

  infoBox: {
    background: "#f7f8f5",
    borderRadius: "13px",
    padding: "13px",
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

  progressBarModal: {
    height: "10px",
    background: "#e5e7eb",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "16px",
  },
};

export default DriverEarningsPage;