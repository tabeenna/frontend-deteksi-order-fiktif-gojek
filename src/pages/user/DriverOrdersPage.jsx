import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { apiRequest } from "../../services/api";
import DriverLayout, {
  Card,
  StatCard,
  Badge,
} from "../../components/driver/DriverLayout";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function DriverOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [modal, setModal] = useState(null);

  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({
    total_orders: 0,
    low_risk: 0,
    medium_risk: 0,
    high_risk: 0,
  });
  const emptySummary = {
  total_orders: 0,
  low_risk: 0,
  medium_risk: 0,
  high_risk: 0,
};

const [isDriverOnline, setIsDriverOnline] = useState(() => {
  return localStorage.getItem("driver_online_status") !== "offline";
});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [navigationData, setNavigationData] = useState(null);

  const [otpVerifiedOrders, setOtpVerifiedOrders] = useState({});
  const [qrScannedOrders, setQrScannedOrders] = useState({});
  const [cancelledOrders, setCancelledOrders] = useState({});
  const [completedOrders, setCompletedOrders] = useState({});
  const [activeTrip, setActiveTrip] = useState(null);

  const [chatMessages, setChatMessages] = useState({});
  const [chatInput, setChatInput] = useState("");
  const [savedNotes, setSavedNotes] = useState({});
  const [noteInput, setNoteInput] = useState("");
  const [reportedOrders, setReportedOrders] = useState({});

  useEffect(() => {
  async function fetchOrders(onlineStatus = null) {
    const currentOnlineStatus =
      onlineStatus ?? localStorage.getItem("driver_online_status") !== "offline";

    setIsDriverOnline(currentOnlineStatus);

    if (!currentOnlineStatus) {
      setOrders([]);
      setSummary(emptySummary);
      setSelectedOrder(null);
      setLoading(false);
      return;
    }

    try {
      const response = await apiRequest("/driver/orders");

      const apiOrders = response.data.orders || [];

      setOrders(apiOrders);
      setSummary(response.data.summary || emptySummary);

      if (apiOrders.length > 0) {
        setSelectedOrder(apiOrders[0]);
      } else {
        setSelectedOrder(null);
      }
    } catch (err) {
      setError(err.message || "Gagal mengambil data order driver.");
    } finally {
      setLoading(false);
    }
  }

  fetchOrders();

  function handleOnlineStatusChanged(event) {
    const nextStatus = event.detail?.isOnline ?? true;

    setIsDriverOnline(nextStatus);

    if (!nextStatus) {
      setOrders([]);
      setSummary(emptySummary);
      setSelectedOrder(null);
      setActiveTrip(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchOrders(true);
  }

  window.addEventListener(
    "driver-online-status-changed",
    handleOnlineStatusChanged
  );

  return () => {
    window.removeEventListener(
      "driver-online-status-changed",
      handleOnlineStatusChanged
    );
  };
}, []);

  const filteredOrders =
    activeFilter === "Semua"
      ? orders
      : orders.filter((order) => order.riskLevel === activeFilter);

  const activeTripForSelected =
    selectedOrder && activeTrip?.order?.id === selectedOrder.id
      ? activeTrip
      : null;

  function getBadgeType(level) {
    if (level === "Rendah") return "green";
    if (level === "Sedang") return "yellow";
    return "red";
  }

  function getRiskColor(level) {
    if (level === "Rendah") return "#087f23";
    if (level === "Sedang") return "#d97706";
    return "#b91c1c";
  }

  function getDisplayedStatus(order) {
    if (completedOrders[order.id]) return "Selesai";
    if (cancelledOrders[order.id]) return "Dibatalkan Driver";

    if (activeTrip?.order?.id === order.id) {
      const labels = {
        toPickup: "Menuju Lokasi Jemput",
        arrivedPickup: "Sampai Lokasi Jemput",
        onTrip: "Perjalanan Berlangsung",
        toMerchant: "Menuju Restoran",
        atMerchant: "Sampai Restoran",
        toCustomer: "Menuju Customer",
        atCustomer: "Sampai di Customer",
        completed: "Selesai",
      };

      return labels[activeTrip.step] || order.status;
    }

    return order.status;
  }

  function openModal(type, order, extra = {}) {
    setModal({ type, order, ...extra });
  }

  function closeModal() {
    setModal(null);
  }

  function getDefaultChatMessages(order) {
    if (!order) return [];

    if (order.defaultChat && order.defaultChat.length > 0) {
      return order.defaultChat;
    }

    return [
      {
        sender: "customer",
        text:
          order.service === "GoFood"
            ? "Halo kak, nanti kalau sudah dekat kabari ya."
            : "Halo kak, saya tunggu di titik jemput ya.",
        time: "Baru saja",
      },
    ];
  }

  function getOrderMessages(order) {
    if (!order) return [];
    return chatMessages[order.id] || getDefaultChatMessages(order);
  }

  function mapTripStepToApiStatus(step) {
    const map = {
      toPickup: "to_pickup",
      arrivedPickup: "arrived_pickup",
      onTrip: "on_trip",
      toMerchant: "to_merchant",
      atMerchant: "at_merchant",
      toCustomer: "to_customer",
      atCustomer: "at_customer",
      completed: "completed",
    };

    return map[step] || "accepted";
  }

  async function updateOrderStatusApi(order, status) {
    try {
      await apiRequest(`/driver/orders/${order.id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      console.error("Gagal update status order:", err.message);
    }
  }

  async function fetchNavigation(order) {
    try {
      const response = await apiRequest(`/driver/orders/${order.id}/navigation`);

      setNavigationData(response.data);

      setModal({
        type: "navigation",
        order,
        navigation: response.data,
      });
    } catch (err) {
      setModal({
        type: "apiError",
        order,
        message: err.message || "Gagal mengambil data navigasi.",
      });
    }
  }

  async function sendChatMessage(order, customText = null) {
    const text = customText || chatInput;

    if (!text.trim()) return;

    try {
      const response = await apiRequest(`/driver/orders/${order.id}/chat`, {
        method: "POST",
        body: JSON.stringify({
          message: text.trim(),
        }),
      });

      const previousMessages = getOrderMessages(order);

      setChatMessages((prev) => ({
        ...prev,
        [order.id]: [...previousMessages, response.data.chat],
      }));

      setChatInput("");
    } catch (err) {
      alert(err.message || "Gagal mengirim chat.");
    }
  }

  function openDriverNote(order) {
    setNoteInput(savedNotes[order.id] || "");
    openModal("driverNote", order);
  }

  async function saveDriverNote(order) {
    if (!noteInput.trim()) return;

    try {
      const response = await apiRequest(`/driver/orders/${order.id}/note`, {
        method: "POST",
        body: JSON.stringify({
          note: noteInput.trim(),
        }),
      });

      setSavedNotes((prev) => ({
        ...prev,
        [order.id]: response.data.note,
      }));

      setModal({
        type: "noteSaved",
        order,
      });
    } catch (err) {
      alert(err.message || "Gagal menyimpan catatan.");
    }
  }

  async function reportSuspiciousOrder(order) {
    try {
      await apiRequest(`/driver/orders/${order.id}/report`, {
        method: "POST",
        body: JSON.stringify({
          reason: "Dilaporkan driver karena order terlihat mencurigakan.",
        }),
      });

      setReportedOrders((prev) => ({
        ...prev,
        [order.id]: true,
      }));

      setModal({
        type: "reportSuccess",
        order,
      });
    } catch (err) {
      alert(err.message || "Gagal melaporkan order.");
    }
  }

  async function cancelOrder(order) {
    await updateOrderStatusApi(order, "cancelled");

    setCancelledOrders((prev) => ({
      ...prev,
      [order.id]: true,
    }));

    if (activeTrip?.order?.id === order.id) {
      setActiveTrip(null);
    }

    setModal({
      type: "cancelled",
      order,
    });
  }

  async function startLowRiskTrip(order) {
    await updateOrderStatusApi(order, "accepted");

    setActiveTrip({
      order,
      flow: "ride",
      step: "toPickup",
    });

    closeModal();
  }

  async function startMediumRiskTrip(order) {
    await updateOrderStatusApi(order, "to_merchant");

    setActiveTrip({
      order,
      flow: "food",
      step: "toMerchant",
    });

    closeModal();
  }

  async function updateTripStep(step) {
    if (activeTrip?.order) {
      await updateOrderStatusApi(activeTrip.order, mapTripStepToApiStatus(step));
    }

    setActiveTrip((prev) =>
      prev
        ? {
            ...prev,
            step,
          }
        : prev
    );
  }

  async function handleSendOtp(order) {
    await updateOrderStatusApi(order, "otp_sent");
    openModal("otpSent", order);
  }

  async function handleCustomerOtpVerified(order) {
    await updateOrderStatusApi(order, "otp_verified");

    setOtpVerifiedOrders((prev) => ({
      ...prev,
      [order.id]: true,
    }));

    setModal({
      type: "otpVerified",
      order,
    });
  }

  function handleScanQr(order) {
    if (!otpVerifiedOrders[order.id]) {
      openModal("otpRequired", order);
      return;
    }

    openModal("scanQr", order);
  }

  async function handleQrSuccess(order) {
    await updateOrderStatusApi(order, "qr_scanned");

    setQrScannedOrders((prev) => ({
      ...prev,
      [order.id]: true,
    }));

    setModal({
      type: "qrSuccess",
      order,
    });
  }

  async function completeOrder(order) {
    await updateOrderStatusApi(order, "completed");

    setCompletedOrders((prev) => ({
      ...prev,
      [order.id]: true,
    }));

    setActiveTrip((prev) =>
      prev?.order?.id === order.id ? { ...prev, step: "completed" } : prev
    );

    setModal({
      type: "receipt",
      order,
    });
  }

  if (loading) {
    return (
      <DriverLayout
        activeMenu="Orders"
        title="Orders Monitoring"
        subtitle="Memuat data order driver..."
      >
        <Card>
          <p>Sedang memuat data order...</p>
        </Card>
      </DriverLayout>
    );
  }

  if (error) {
    return (
      <DriverLayout
        activeMenu="Orders"
        title="Orders Monitoring"
        subtitle="Terjadi kesalahan saat mengambil data order."
      >
        <Card>
          <p style={{ color: "#b91c1c", fontWeight: 800 }}>{error}</p>
          <p style={{ color: "#68716c", fontSize: "13px" }}>
            Pastikan backend Laravel menyala dan kamu sudah login sebagai
            driver.
          </p>
        </Card>
      </DriverLayout>
    );
  }

  if (!isDriverOnline) {
  return (
    <DriverLayout
      activeMenu="Orders"
      title="Orders Monitoring"
      subtitle="Driver sedang offline sehingga tidak dapat menerima order."
    >
      <Card>
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h2 style={{ margin: "0 0 10px" }}>Driver Sedang Offline</h2>
          <p style={{ color: "#68716c", lineHeight: "1.6" }}>
            Saat status offline, sistem tidak akan menarik order baru dari
            backend. Ubah status menjadi Online melalui tombol di kanan atas
            untuk mulai menerima order kembali.
          </p>
        </div>
      </Card>
    </DriverLayout>
  );
}

  return (
    <DriverLayout
      activeMenu="Orders"
      title="Orders Monitoring"
      subtitle="Pantau order masuk, risiko order fiktif, dan flow perjalanan driver."
    >
      <section style={styles.summaryGrid}>
        <button
          style={{
            ...styles.summaryButton,
            ...(activeFilter === "Semua" ? styles.summaryActive : {}),
          }}
          onClick={() => setActiveFilter("Semua")}
        >
          <StatCard
            label="Order Masuk"
            value={String(summary.total_orders)}
            note="Semua order"
          />
        </button>

        <button
          style={{
            ...styles.summaryButton,
            ...(activeFilter === "Rendah" ? styles.summaryActive : {}),
          }}
          onClick={() => setActiveFilter("Rendah")}
        >
          <StatCard
            label="Risiko Rendah"
            value={String(summary.low_risk)}
            note="Batalkan / Setuju"
            color="#087f23"
          />
        </button>

        <button
          style={{
            ...styles.summaryButton,
            ...(activeFilter === "Sedang" ? styles.summaryActive : {}),
          }}
          onClick={() => setActiveFilter("Sedang")}
        >
          <StatCard
            label="Risiko Sedang"
            value={String(summary.medium_risk)}
            note="OTP + QR saat serah terima"
            color="#d97706"
          />
        </button>

        <button
          style={{
            ...styles.summaryButton,
            ...(activeFilter === "Tinggi" ? styles.summaryActive : {}),
          }}
          onClick={() => setActiveFilter("Tinggi")}
        >
          <StatCard
            label="Risiko Tinggi"
            value={String(summary.high_risk)}
            note="Auto cancel"
            color="#b91c1c"
          />
        </button>
      </section>

      <section style={styles.contentGrid}>
        <Card>
          <div style={styles.sectionHead}>
            <div>
              <h2 style={styles.sectionTitle}>Daftar Order Masuk</h2>
              <p style={styles.sectionText}>
                Filter aktif:{" "}
                {activeFilter === "Semua" ? "Semua order" : activeFilter}
              </p>
            </div>
          </div>

          <div style={styles.orderList}>
            {filteredOrders.map((order) => (
              <button
                key={order.id}
                style={{
                  ...styles.orderCard,
                  ...(selectedOrder?.id === order.id
                    ? styles.orderCardActive
                    : {}),
                }}
                onClick={() => setSelectedOrder(order)}
              >
                <div style={styles.orderTop}>
                  <div>
                    <p style={styles.orderId}>{order.id}</p>
                    <h3 style={styles.orderTitle}>
                      {order.service} • {order.customer}
                    </h3>
                    <p style={styles.orderStatusText}>
                      {getDisplayedStatus(order)}
                    </p>
                  </div>

                  <Badge type={getBadgeType(order.riskLevel)}>
                    {order.riskLevel}
                  </Badge>
                </div>

                <div style={styles.routeBox}>
                  <p style={styles.routeText}>● {order.pickup}</p>
                  <p style={styles.routeText}>■ {order.destination}</p>
                </div>

                <div style={styles.orderMeta}>
                  <span>{order.fare}</span>
                  <span>{order.distance}</span>
                  <span>Skor {order.riskScore}/100</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <Card style={styles.detailPanel}>
          {selectedOrder ? (
            <>
              <div style={styles.detailHeader}>
                <div>
                  <p style={styles.orderId}>{selectedOrder.id}</p>
                  <h2 style={styles.detailTitle}>Detail Risiko Order</h2>
                </div>

                <Badge type={getBadgeType(selectedOrder.riskLevel)}>
                  Risiko {selectedOrder.riskLevel}
                </Badge>
              </div>

              <div style={styles.scoreArea}>
                <div
                  style={{
                    ...styles.scoreCircle,
                    background: `conic-gradient(${getRiskColor(
                      selectedOrder.riskLevel
                    )} 0 ${selectedOrder.riskScore}%, #e5e7eb ${
                      selectedOrder.riskScore
                    }% 100%)`,
                  }}
                >
                  <div style={styles.scoreInner}>{selectedOrder.riskScore}</div>
                </div>

                <div>
                  <h3 style={styles.statusTitle}>
                    {getDisplayedStatus(selectedOrder)}
                  </h3>
                  <p style={styles.statusText}>
                    {selectedOrder.recommendation}
                  </p>
                </div>
              </div>

              <div style={styles.infoGrid}>
                <InfoBox label="Usia Akun" value={selectedOrder.accountAge} />
                <InfoBox label="Pembatalan" value={selectedOrder.cancelRate} />
                <InfoBox
                  label="Pembayaran"
                  value={selectedOrder.paymentMethod}
                />
                <InfoBox label="Jarak" value={selectedOrder.distance} />
              </div>

              <MiniMap
                order={selectedOrder}
                step={activeTripForSelected?.step}
              />

              <div style={styles.locationBox}>
                <div>
                  <p style={styles.locationLabel}>Titik Awal</p>
                  <h3 style={styles.locationTitle}>{selectedOrder.pickup}</h3>
                  <p style={styles.locationText}>{selectedOrder.pickupNote}</p>
                </div>

                <div>
                  <p style={styles.locationLabel}>Titik Akhir</p>
                  <h3 style={styles.locationTitle}>
                    {selectedOrder.destination}
                  </h3>
                  <p style={styles.locationText}>
                    {selectedOrder.destinationNote}
                  </p>
                </div>
              </div>

              <div style={styles.indicatorBox}>
                <h3 style={styles.indicatorTitle}>Indikator Risiko</h3>

                {selectedOrder.indicators.map((item, index) => (
                  <div key={index} style={styles.indicatorItem}>
                    <span
                      style={{
                        ...styles.indicatorIcon,
                        background:
                          selectedOrder.riskLevel === "Tinggi"
                            ? "#fee2e2"
                            : selectedOrder.riskLevel === "Sedang"
                            ? "#fff7e6"
                            : "#e6f3e9",
                        color:
                          selectedOrder.riskLevel === "Tinggi"
                            ? "#b91c1c"
                            : selectedOrder.riskLevel === "Sedang"
                            ? "#d97706"
                            : "#087f23",
                      }}
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {savedNotes[selectedOrder.id] && (
                <div style={styles.notePreviewBox}>
                  <strong>Catatan Driver</strong>
                  <p>{savedNotes[selectedOrder.id]}</p>
                </div>
              )}

              {reportedOrders[selectedOrder.id] && (
                <div style={styles.reportedBox}>
                  <strong>Order sudah dilaporkan</strong>
                  <p>
                    Laporan order mencurigakan sudah masuk ke sistem simulasi
                    untuk ditinjau admin.
                  </p>
                </div>
              )}

              {completedOrders[selectedOrder.id] && (
                <div style={styles.completedBox}>
                  <h3>Order Selesai</h3>
                  <p>
                    Order sudah selesai. Pendapatan masuk ke halaman Earnings.
                  </p>
                </div>
              )}

              {cancelledOrders[selectedOrder.id] && (
                <div style={styles.cancelledBox}>
                  <h3>Order Dibatalkan</h3>
                  <p>Order ini telah dibatalkan oleh driver.</p>
                </div>
              )}

              {!completedOrders[selectedOrder.id] &&
                !cancelledOrders[selectedOrder.id] &&
                activeTripForSelected && (
                  <TripFlowPanel
                    trip={activeTripForSelected}
                    otpVerified={otpVerifiedOrders[selectedOrder.id]}
                    qrScanned={qrScannedOrders[selectedOrder.id]}
                    onArrivedPickup={() => updateTripStep("arrivedPickup")}
                    onStartRide={() => updateTripStep("onTrip")}
                    onArrivedMerchant={() => updateTripStep("atMerchant")}
                    onPickupFood={() => updateTripStep("toCustomer")}
                    onArrivedCustomer={() => updateTripStep("atCustomer")}
                    onScanQr={() => handleScanQr(selectedOrder)}
                    onComplete={() =>
                      openModal("completeConfirm", selectedOrder)
                    }
                    onCallCustomer={() =>
                      openModal("callCustomer", selectedOrder)
                    }
                    onOpenChat={() => openModal("chatCustomer", selectedOrder)}
                    onOpenNavigation={() => fetchNavigation(selectedOrder)}
                  />
                )}

              {!completedOrders[selectedOrder.id] &&
                !cancelledOrders[selectedOrder.id] &&
                !activeTripForSelected &&
                selectedOrder.riskLevel === "Rendah" && (
                  <div style={styles.actionGridTwo}>
                    <button
                      style={styles.cancelButton}
                      onClick={() => cancelOrder(selectedOrder)}
                    >
                      Batalkan
                    </button>

                    <button
                      style={styles.acceptButton}
                      onClick={() => openModal("acceptedLow", selectedOrder)}
                    >
                      Setuju
                    </button>
                  </div>
                )}

              {!completedOrders[selectedOrder.id] &&
                !cancelledOrders[selectedOrder.id] &&
                !activeTripForSelected &&
                selectedOrder.riskLevel === "Sedang" && (
                  <>
                    <div style={styles.warningBox}>
                      <strong>Flow Risiko Sedang</strong>
                      <p>
                        Customer harus verifikasi OTP terlebih dahulu. Setelah
                        itu driver mengambil makanan ke restoran, mengantar ke
                        customer, lalu scan QR saat makanan akan diserahkan.
                      </p>
                    </div>

                    <button
                      style={styles.reportButton}
                      onClick={() => reportSuspiciousOrder(selectedOrder)}
                    >
                      Laporkan Order Mencurigakan
                    </button>

                    {!otpVerifiedOrders[selectedOrder.id] && (
                      <div style={styles.actionGridTwo}>
                        <button
                          style={styles.cancelButton}
                          onClick={() => cancelOrder(selectedOrder)}
                        >
                          Batalkan
                        </button>

                        <button
                          style={styles.verifyButton}
                          onClick={() => handleSendOtp(selectedOrder)}
                        >
                          Kirim OTP ke Customer
                        </button>
                      </div>
                    )}

                    {otpVerifiedOrders[selectedOrder.id] && (
                      <>
                        <p style={styles.successText}>
                          OTP customer sudah terverifikasi. Driver dapat
                          mengambil pesanan ke restoran.
                        </p>

                        <button
                          style={styles.acceptButtonFull}
                          onClick={() => startMediumRiskTrip(selectedOrder)}
                        >
                          Mulai Ambil Pesanan
                        </button>
                      </>
                    )}
                  </>
                )}

              {selectedOrder.riskLevel === "Tinggi" && (
                <div style={styles.autoCancelBox}>
                  <h3>Order Dibatalkan Otomatis</h3>
                  <p>
                    Sistem mendeteksi risiko tinggi. Order tidak dapat diterima,
                    diverifikasi, atau dilanjutkan oleh driver.
                  </p>

                  <button
                    style={styles.reportButton}
                    onClick={() => reportSuspiciousOrder(selectedOrder)}
                  >
                    Tandai untuk Review Admin
                  </button>
                </div>
              )}

              <div style={styles.secondaryGrid}>
                <button
                  style={styles.secondaryButton}
                  onClick={() => openModal("route", selectedOrder)}
                >
                  Detail Rute
                </button>

                <button
                  style={styles.secondaryButton}
                  onClick={() => openModal("risk", selectedOrder)}
                >
                  Detail Risiko
                </button>

                <button
                  style={styles.secondaryButton}
                  onClick={() => openModal("chatCustomer", selectedOrder)}
                >
                  Chat Customer
                </button>

                <button
                  style={styles.secondaryButton}
                  onClick={() => openDriverNote(selectedOrder)}
                >
                  Catatan Driver
                </button>
              </div>
            </>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>▤</div>
              <h2 style={styles.emptyTitle}>Pilih salah satu order</h2>
              <p style={styles.emptyText}>
                Klik order di sebelah kiri untuk melihat skor risiko, indikator,
                peta, dan flow perjalanan.
              </p>
            </div>
          )}
        </Card>
      </section>

      {modal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={closeModal}>
              ×
            </button>

            {modal.type === "acceptedLow" && (
              <>
                <h2 style={styles.modalTitle}>Order Disetujui</h2>
                <p style={styles.modalText}>
                  Order {modal.order.id} berhasil disetujui. Driver dapat menuju
                  lokasi penjemputan customer.
                </p>

                <MiniMap order={modal.order} step="toPickup" />

                <button
                  style={styles.primaryButton}
                  onClick={() => startLowRiskTrip(modal.order)}
                >
                  Mulai Menuju Lokasi Jemput
                </button>
              </>
            )}

            {modal.type === "cancelled" && (
              <>
                <h2 style={styles.modalTitle}>Order Dibatalkan</h2>
                <p style={styles.modalText}>
                  Order {modal.order.id} telah dibatalkan oleh driver.
                </p>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Mengerti
                </button>
              </>
            )}

            {modal.type === "otpSent" && (
              <>
                <h2 style={styles.modalTitle}>OTP Dikirim ke Customer</h2>
                <p style={styles.modalText}>
                  Sistem mengirim kode OTP ke aplikasi customer. Driver tidak
                  memasukkan OTP. Customer harus menyelesaikan verifikasi dari
                  aplikasinya sebelum order dilanjutkan.
                </p>

                <div style={styles.customerPhoneBox}>
                  <p>Customer</p>
                  <h3>{modal.order.customer}</h3>
                  <span>{modal.order.phone}</span>
                </div>

                <button
                  style={styles.primaryButton}
                  onClick={() => handleCustomerOtpVerified(modal.order)}
                >
                  Simulasikan Customer Sudah Verifikasi
                </button>
              </>
            )}

            {modal.type === "otpVerified" && (
              <>
                <h2 style={styles.modalTitle}>Customer Terverifikasi</h2>
                <p style={styles.modalText}>
                  Customer berhasil melakukan verifikasi OTP. Driver dapat
                  mengambil pesanan ke restoran.
                </p>

                <MiniMap order={modal.order} step="toMerchant" />

                <button
                  style={styles.primaryButton}
                  onClick={() => startMediumRiskTrip(modal.order)}
                >
                  Mulai Ambil Pesanan
                </button>
              </>
            )}

            {modal.type === "otpRequired" && (
              <>
                <h2 style={styles.modalTitle}>OTP Belum Diverifikasi</h2>
                <p style={styles.modalText}>
                  Customer belum menyelesaikan OTP. Order belum dapat
                  dilanjutkan ke proses pengambilan makanan.
                </p>

                <button
                  style={styles.primaryButton}
                  onClick={() => handleSendOtp(modal.order)}
                >
                  Kirim OTP ke Customer
                </button>
              </>
            )}

            {modal.type === "scanQr" && (
              <>
                <h2 style={styles.modalTitle}>Scan QR Customer</h2>
                <p style={styles.modalText}>
                  Driver sudah sampai di lokasi customer dan akan menyerahkan
                  makanan. Customer menunjukkan QR dari aplikasinya. Driver
                  harus scan QR untuk memastikan order bukan fiktif.
                </p>

                <div style={styles.qrMock}>
                  <div style={styles.qrInner}>QR</div>
                </div>

                <button
                  style={styles.primaryButton}
                  onClick={() => handleQrSuccess(modal.order)}
                >
                  QR Berhasil Discan
                </button>
              </>
            )}

            {modal.type === "qrSuccess" && (
              <>
                <h2 style={styles.modalTitle}>QR Berhasil Discan</h2>
                <p style={styles.modalText}>
                  QR customer valid. Makanan dapat diserahkan kepada customer.
                  Setelah ini driver bisa menyelesaikan order dan pendapatan
                  akan masuk ke Earnings.
                </p>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Lanjutkan
                </button>
              </>
            )}

            {modal.type === "callCustomer" && (
              <>
                <h2 style={styles.modalTitle}>Hubungi Customer</h2>
                <p style={styles.modalText}>
                  Simulasi panggilan untuk mengonfirmasi titik jemput, alamat
                  customer, atau proses serah terima makanan.
                </p>

                <div style={styles.customerPhoneBox}>
                  <p>Customer</p>
                  <h3>{modal.order.customer}</h3>
                  <span>{modal.order.phone}</span>
                </div>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Panggilan Selesai
                </button>
              </>
            )}

            {modal.type === "chatCustomer" && (
              <>
                <h2 style={styles.modalTitle}>Chat Customer</h2>
                <p style={styles.modalText}>
                  Gunakan chat untuk konfirmasi titik jemput, lokasi restoran,
                  alamat customer, atau proses serah terima.
                </p>

                <div style={styles.customerPhoneBox}>
                  <p>Customer</p>
                  <h3>{modal.order.customer}</h3>
                  <span>{modal.order.phone}</span>
                </div>

                <div style={styles.chatBox}>
                  {getOrderMessages(modal.order).map((message, index) => (
                    <div
                      key={index}
                      style={
                        message.sender === "driver"
                          ? styles.chatBubbleDriver
                          : styles.chatBubbleCustomer
                      }
                    >
                      <p style={styles.chatText}>{message.text}</p>
                      <span style={styles.chatTime}>{message.time}</span>
                    </div>
                  ))}
                </div>

                <div style={styles.quickReplyGrid}>
                  <button
                    style={styles.quickReplyButton}
                    onClick={() =>
                      sendChatMessage(
                        modal.order,
                        "Saya sedang menuju lokasi ya."
                      )
                    }
                  >
                    Saya menuju lokasi
                  </button>

                  <button
                    style={styles.quickReplyButton}
                    onClick={() =>
                      sendChatMessage(
                        modal.order,
                        "Mohon tunggu sebentar ya kak."
                      )
                    }
                  >
                    Mohon tunggu
                  </button>

                  <button
                    style={styles.quickReplyButton}
                    onClick={() =>
                      sendChatMessage(
                        modal.order,
                        "Saya sudah sampai di titik."
                      )
                    }
                  >
                    Sudah sampai
                  </button>

                  <button
                    style={styles.quickReplyButton}
                    onClick={() =>
                      sendChatMessage(
                        modal.order,
                        "Bisa konfirmasi alamatnya kak?"
                      )
                    }
                  >
                    Konfirmasi alamat
                  </button>
                </div>

                <div style={styles.chatInputRow}>
                  <input
                    style={styles.chatInput}
                    type="text"
                    placeholder="Tulis pesan ke customer..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendChatMessage(modal.order);
                    }}
                  />

                  <button
                    style={styles.sendButton}
                    onClick={() => sendChatMessage(modal.order)}
                  >
                    Kirim
                  </button>
                </div>
              </>
            )}

            {modal.type === "driverNote" && (
              <>
                <h2 style={styles.modalTitle}>Catatan Driver</h2>
                <p style={styles.modalText}>
                  Catatan ini membantu driver mengingat detail penting order,
                  seperti patokan lokasi, permintaan customer, atau potensi
                  kendala.
                </p>

                <textarea
                  style={styles.noteInput}
                  placeholder="Contoh: Customer minta dijemput di depan lobby barat..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                />

                <button
                  style={styles.primaryButton}
                  onClick={() => saveDriverNote(modal.order)}
                >
                  Simpan Catatan
                </button>
              </>
            )}

            {modal.type === "noteSaved" && (
              <>
                <h2 style={styles.modalTitle}>Catatan Tersimpan</h2>
                <p style={styles.modalText}>
                  Catatan untuk order {modal.order.id} berhasil disimpan.
                </p>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Mengerti
                </button>
              </>
            )}

            {modal.type === "reportSuccess" && (
              <>
                <h2 style={styles.modalTitle}>Laporan Diterima</h2>
                <p style={styles.modalText}>
                  Order {modal.order.id} sudah ditandai sebagai order
                  mencurigakan. Pada sistem asli, laporan ini akan masuk ke
                  dashboard admin untuk ditinjau.
                </p>

                <div style={styles.modalAlert}>
                  <b>Alasan sistem:</b> Skor risiko, pola lokasi, usia akun, dan
                  metode pembayaran akan menjadi bahan review admin.
                </div>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Mengerti
                </button>
              </>
            )}

            {modal.type === "navigation" && (
              <>
                <h2 style={styles.modalTitle}>Navigasi Rute</h2>
                <p style={styles.modalText}>
                  Data rute ini diambil dari API navigasi backend. Map
                  menampilkan posisi driver, titik awal, titik akhir, dan jalur
                  perjalanan.
                </p>

                <MiniMap
                  order={modal.order}
                  step={activeTrip?.step}
                  navigation={modal.navigation || navigationData}
                />

                <div style={styles.modalRouteBox}>
                  <InfoBox
                    label="Titik Awal"
                    value={modal.navigation?.pickup?.name || modal.order.pickup}
                  />
                  <InfoBox
                    label="Titik Akhir"
                    value={
                      modal.navigation?.destination?.name ||
                      modal.order.destination
                    }
                  />
                  <InfoBox
                    label="ETA Awal"
                    value={
                      modal.navigation?.eta_pickup || modal.order.etaPickup
                    }
                  />
                  <InfoBox
                    label="ETA Tujuan"
                    value={
                      modal.navigation?.eta_destination ||
                      modal.order.etaDestination
                    }
                  />
                </div>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Tutup Navigasi
                </button>
              </>
            )}

            {modal.type === "apiError" && (
              <>
                <h2 style={styles.modalTitle}>Gagal Mengambil Data</h2>
                <p style={styles.modalText}>{modal.message}</p>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Mengerti
                </button>
              </>
            )}

            {modal.type === "completeConfirm" && (
              <>
                <h2 style={styles.modalTitle}>Selesaikan Order?</h2>
                <p style={styles.modalText}>
                  Pastikan customer sudah menerima layanan atau makanan. Untuk
                  risiko sedang, QR customer harus sudah berhasil discan sebelum
                  order bisa selesai.
                </p>

                <div style={styles.receiptBox}>
                  <InfoBox label="Order" value={modal.order.id} />
                  <InfoBox label="Layanan" value={modal.order.service} />
                  <InfoBox label="Tarif" value={modal.order.fare} />
                  <InfoBox label="Jarak" value={modal.order.distance} />
                </div>

                <button
                  style={styles.primaryButton}
                  onClick={() => completeOrder(modal.order)}
                >
                  Ya, Selesaikan Order
                </button>
              </>
            )}

            {modal.type === "receipt" && (
              <>
                <h2 style={styles.modalTitle}>Order Selesai</h2>
                <p style={styles.modalText}>
                  Order {modal.order.id} selesai. Pendapatan berhasil dicatat
                  pada halaman Earnings.
                </p>

                <div style={styles.receiptBox}>
                  <InfoBox label="Pendapatan" value={modal.order.fare} />
                  <InfoBox
                    label="Metode Bayar"
                    value={modal.order.paymentMethod}
                  />
                  <InfoBox label="Customer" value={modal.order.customer} />
                  <InfoBox label="Status" value="Selesai" />
                </div>

                <button style={styles.primaryButton} onClick={closeModal}>
                  Tutup
                </button>
              </>
            )}

            {modal.type === "route" && (
              <>
                <h2 style={styles.modalTitle}>Detail Rute Order</h2>
                <p style={styles.modalText}>
                  Rute berikut menunjukkan titik awal, titik akhir, estimasi
                  waktu, dan posisi driver.
                </p>

                <MiniMap order={modal.order} step={activeTrip?.step} />

                <div style={styles.modalRouteBox}>
                  <InfoBox label="Titik Awal" value={modal.order.pickup} />
                  <InfoBox label="Titik Akhir" value={modal.order.destination} />
                  <InfoBox label="ETA Awal" value={modal.order.etaPickup} />
                  <InfoBox
                    label="ETA Tujuan"
                    value={modal.order.etaDestination}
                  />
                </div>
              </>
            )}

            {modal.type === "risk" && (
              <>
                <h2 style={styles.modalTitle}>Detail Analisis Risiko</h2>
                <p style={styles.modalText}>
                  Sistem menghitung risiko berdasarkan usia akun, pembatalan,
                  lokasi, pembayaran, dan kebutuhan verifikasi.
                </p>

                <div style={styles.receiptBox}>
                  <InfoBox
                    label="Skor Risiko"
                    value={`${modal.order.riskScore}/100`}
                  />
                  <InfoBox label="Kategori" value={modal.order.riskLevel} />
                  <InfoBox label="Usia Akun" value={modal.order.accountAge} />
                  <InfoBox label="Pembatalan" value={modal.order.cancelRate} />
                </div>

                <div style={styles.modalAlert}>
                  <b>Rekomendasi:</b> {modal.order.recommendation}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </DriverLayout>
  );
}

function TripFlowPanel({
  trip,
  qrScanned,
  onArrivedPickup,
  onStartRide,
  onArrivedMerchant,
  onPickupFood,
  onArrivedCustomer,
  onScanQr,
  onComplete,
  onCallCustomer,
  onOpenChat,
  onOpenNavigation,
}) {
  const isFoodFlow = trip?.flow === "food" || trip?.order?.service === "GoFood";

  function normalizeStep(step) {
    const stepMap = {
      pickup: "toPickup",
      arrived: "arrivedPickup",
      toPickup: "toPickup",
      arrivedPickup: "arrivedPickup",
      onTrip: "onTrip",
      toMerchant: "toMerchant",
      atMerchant: "atMerchant",
      toCustomer: "toCustomer",
      atCustomer: "atCustomer",
      completed: "completed",
    };

    return stepMap[step] || (isFoodFlow ? "toMerchant" : "toPickup");
  }

  const currentStep = normalizeStep(trip?.step);

  const stepText = {
    toPickup: {
      title: "Menuju Lokasi Jemput",
      desc: "Driver sedang menuju titik jemput customer.",
    },
    arrivedPickup: {
      title: "Driver Sampai Lokasi Jemput",
      desc: "Customer sudah ditemukan. Driver dapat memulai perjalanan.",
    },
    onTrip: {
      title: "Perjalanan Berlangsung",
      desc: isFoodFlow
        ? "Driver sedang mengantar makanan menuju lokasi customer."
        : "Driver sedang menuju titik tujuan.",
    },
    toMerchant: {
      title: "Menuju Restoran",
      desc: "Customer sudah verifikasi OTP. Driver menuju restoran untuk mengambil makanan.",
    },
    atMerchant: {
      title: "Sampai Restoran",
      desc: "Driver mengambil makanan dari restoran sebelum mengantar ke customer.",
    },
    toCustomer: {
      title: "Menuju Customer",
      desc: "Makanan sudah diambil. Driver menuju lokasi customer.",
    },
    atCustomer: {
      title: "Sampai di Customer",
      desc: qrScanned
        ? "QR customer sudah valid. Driver dapat menyerahkan makanan dan menyelesaikan order."
        : "Driver sudah sampai. Scan QR customer diperlukan sebelum makanan diserahkan.",
    },
    completed: {
      title: "Order Selesai",
      desc: "Order selesai dan pendapatan sudah tercatat.",
    },
  };

  const currentText = stepText[currentStep];

  return (
    <div style={styles.tripPanel}>
      <div style={styles.tripHeader}>
        <div>
          <p style={styles.tripLabel}>Flow Perjalanan Aktif</p>
          <h3 style={styles.tripTitle}>{currentText.title}</h3>
          <p style={styles.tripDesc}>{currentText.desc}</p>
        </div>

        <Badge type={isFoodFlow ? "yellow" : "green"}>
          {isFoodFlow ? "GoFood Secure" : "GoRide"}
        </Badge>
      </div>

      <MiniMap order={trip.order} step={currentStep} />

      <div
        style={{
          ...styles.tripSteps,
          gridTemplateColumns: isFoodFlow ? "repeat(5, 1fr)" : "repeat(4, 1fr)",
        }}
      >
        {isFoodFlow ? (
          <>
            <span style={styles.tripStepActive}>1. OTP</span>
            <span
              style={
                currentStep !== "toMerchant"
                  ? styles.tripStepActive
                  : styles.tripStep
              }
            >
              2. Resto
            </span>
            <span
              style={
                currentStep === "toCustomer" ||
                currentStep === "atCustomer" ||
                currentStep === "completed"
                  ? styles.tripStepActive
                  : styles.tripStep
              }
            >
              3. Customer
            </span>
            <span
              style={
                qrScanned || currentStep === "completed"
                  ? styles.tripStepActive
                  : styles.tripStep
              }
            >
              4. QR
            </span>
            <span
              style={
                currentStep === "completed"
                  ? styles.tripStepActive
                  : styles.tripStep
              }
            >
              5. Selesai
            </span>
          </>
        ) : (
          <>
            <span style={styles.tripStepActive}>1. Terima</span>
            <span
              style={
                currentStep !== "toPickup"
                  ? styles.tripStepActive
                  : styles.tripStep
              }
            >
              2. Jemput
            </span>
            <span
              style={
                currentStep === "onTrip" || currentStep === "completed"
                  ? styles.tripStepActive
                  : styles.tripStep
              }
            >
              3. Jalan
            </span>
            <span
              style={
                currentStep === "completed"
                  ? styles.tripStepActive
                  : styles.tripStep
              }
            >
              4. Selesai
            </span>
          </>
        )}
      </div>

      <div style={styles.tripActionGrid}>
        <button style={styles.secondaryButton} onClick={onOpenNavigation}>
          Navigasi
        </button>

        <button style={styles.secondaryButton} onClick={onCallCustomer}>
          Telepon
        </button>

        <button style={styles.secondaryButton} onClick={onOpenChat}>
          Chat
        </button>
      </div>

      {!isFoodFlow && currentStep === "toPickup" && (
        <button style={styles.primaryButton} onClick={onArrivedPickup}>
          Saya Sudah Sampai Lokasi Jemput
        </button>
      )}

      {!isFoodFlow && currentStep === "arrivedPickup" && (
        <button style={styles.primaryButton} onClick={onStartRide}>
          Mulai Perjalanan
        </button>
      )}

      {!isFoodFlow && currentStep === "onTrip" && (
        <button style={styles.primaryButton} onClick={onComplete}>
          Selesaikan Order
        </button>
      )}

      {isFoodFlow && currentStep === "toMerchant" && (
        <button style={styles.primaryButton} onClick={onArrivedMerchant}>
          Saya Sudah Sampai Restoran
        </button>
      )}

      {isFoodFlow && currentStep === "atMerchant" && (
        <button style={styles.primaryButton} onClick={onPickupFood}>
          Pesanan Sudah Diambil
        </button>
      )}

      {isFoodFlow && currentStep === "toCustomer" && (
        <button style={styles.primaryButton} onClick={onArrivedCustomer}>
          Saya Sudah Sampai di Customer
        </button>
      )}

      {isFoodFlow && currentStep === "atCustomer" && !qrScanned && (
        <>
          <div style={styles.warningBox}>
            <strong>Scan QR Saat Serah Terima</strong>
            <p>
              QR hanya discan saat driver sudah sampai di customer dan makanan
              akan diserahkan. Ini memastikan customer benar-benar ada dan order
              bukan fiktif.
            </p>
          </div>

          <button style={styles.primaryButton} onClick={onScanQr}>
            Scan QR Customer
          </button>
        </>
      )}

      {isFoodFlow && currentStep === "atCustomer" && qrScanned && (
        <button style={styles.primaryButton} onClick={onComplete}>
          Serahkan Makanan & Selesaikan Order
        </button>
      )}

      {currentStep === "completed" && (
        <div style={styles.completedBox}>
          Order selesai. Pendapatan masuk ke halaman Earnings.
        </div>
      )}
    </div>
  );
}

function MiniMap({ order, step, navigation }) {
  const pickup = navigation?.pickup || {
    name: order.pickup,
    note: order.pickupNote,
    lat: order.pickupCoords?.lat,
    lng: order.pickupCoords?.lng,
  };

  const destination = navigation?.destination || {
    name: order.destination,
    note: order.destinationNote,
    lat: order.destinationCoords?.lat,
    lng: order.destinationCoords?.lng,
  };

  const driverPosition = navigation?.driver_position || {
    lat: order.driverCoords?.lat,
    lng: order.driverCoords?.lng,
  };

  const route = navigation?.route || order.routeCoords || [];

  const mapCenter =
    driverPosition?.lat && driverPosition?.lng
      ? [driverPosition.lat, driverPosition.lng]
      : [-7.9666, 112.6326];

  return (
    <div style={styles.mapCard}>
      <MapContainer
        key={`${order.id}-${step || "default"}-${route.length}`}
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={false}
        style={styles.leafletMap}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {route.length > 0 && (
          <Polyline positions={route} pathOptions={{ weight: 5 }} />
        )}

        {driverPosition?.lat && driverPosition?.lng && (
          <Marker position={[driverPosition.lat, driverPosition.lng]}>
            <Popup>
              <strong>Driver</strong>
              <br />
              Posisi driver saat ini
            </Popup>
          </Marker>
        )}

        {pickup?.lat && pickup?.lng && (
          <Marker position={[pickup.lat, pickup.lng]}>
            <Popup>
              <strong>Titik Awal</strong>
              <br />
              {pickup.name}
              <br />
              {pickup.note}
            </Popup>
          </Marker>
        )}

        {destination?.lat && destination?.lng && (
          <Marker position={[destination.lat, destination.lng]}>
            <Popup>
              <strong>Titik Akhir</strong>
              <br />
              {destination.name}
              <br />
              {destination.note}
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <div style={styles.mapInfo}>
        <strong>{order.service}</strong>
        <p>
          {pickup.name} → {destination.name}
        </p>
      </div>
    </div>
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
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "14px",
    marginBottom: "22px",
  },

  summaryButton: {
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
    textAlign: "left",
  },

  summaryActive: {
    outline: "2px solid #087f23",
    borderRadius: "16px",
  },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.08fr",
    gap: "22px",
    alignItems: "start",
  },

  sectionHead: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
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

  orderList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  orderCard: {
    background: "#f7f8f5",
    border: "1px solid #dfe5de",
    borderRadius: "16px",
    padding: "16px",
    cursor: "pointer",
    textAlign: "left",
  },

  orderCardActive: {
    border: "2px solid #087f23",
    background: "#f0f7f1",
  },

  orderTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "12px",
  },

  orderId: {
    margin: "0 0 5px",
    color: "#68716c",
    fontSize: "12px",
    fontWeight: 800,
  },

  orderTitle: {
    margin: 0,
    fontSize: "15px",
    color: "#101828",
  },

  orderStatusText: {
    margin: "5px 0 0",
    color: "#68716c",
    fontSize: "12px",
  },

  routeBox: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "11px",
    marginBottom: "12px",
  },

  routeText: {
    margin: "5px 0",
    color: "#4b5563",
    fontSize: "13px",
  },

  orderMeta: {
    display: "flex",
    justifyContent: "space-between",
    color: "#68716c",
    fontSize: "12px",
    fontWeight: 800,
  },

  detailPanel: {
    minHeight: "540px",
  },

  detailHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "20px",
  },

  detailTitle: {
    margin: 0,
    fontSize: "20px",
    color: "#101828",
  },

  scoreArea: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    background: "#f7f8f5",
    borderRadius: "15px",
    padding: "16px",
    marginBottom: "16px",
  },

  scoreCircle: {
    width: "82px",
    height: "82px",
    borderRadius: "50%",
    padding: "8px",
    flexShrink: 0,
  },

  scoreInner: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "21px",
    fontWeight: 900,
  },

  statusTitle: {
    margin: "0 0 7px",
    fontSize: "16px",
  },

  statusText: {
    margin: 0,
    color: "#68716c",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "18px",
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

  mapCard: {
    height: "260px",
    position: "relative",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #dfe5de",
    marginBottom: "16px",
  },

  leafletMap: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },

  mapInfo: {
    position: "absolute",
    left: "16px",
    bottom: "16px",
    right: "16px",
    background: "white",
    borderRadius: "14px",
    padding: "12px",
    boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
    fontSize: "13px",
    zIndex: 500,
  },

  locationBox: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "18px",
  },

  locationLabel: {
    margin: 0,
    color: "#68716c",
    fontSize: "12px",
  },

  locationTitle: {
    margin: "5px 0",
    fontSize: "14px",
  },

  locationText: {
    margin: 0,
    color: "#68716c",
    fontSize: "12px",
    lineHeight: "1.5",
  },

  indicatorBox: {
    marginBottom: "18px",
  },

  indicatorTitle: {
    margin: "0 0 12px",
    fontSize: "15px",
  },

  indicatorItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "9px",
    color: "#374151",
    fontSize: "13px",
  },

  indicatorIcon: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 900,
  },

  actionGridTwo: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "10px",
  },

  acceptButton: {
    border: "none",
    background: "#087f23",
    color: "white",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
  },

  acceptButtonFull: {
    width: "100%",
    border: "none",
    background: "#087f23",
    color: "white",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
    marginBottom: "10px",
  },

  cancelButton: {
    border: "1px solid #dfe5de",
    background: "white",
    color: "#374151",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
  },

  verifyButton: {
    border: "none",
    background: "#d97706",
    color: "white",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
  },

  warningBox: {
    background: "#fff7e6",
    border: "1px solid #fcd9a5",
    borderRadius: "14px",
    padding: "14px",
    marginBottom: "12px",
    color: "#7c4a03",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  autoCancelBox: {
    background: "#fee2e2",
    border: "1px solid #fecaca",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "12px",
    color: "#7f1d1d",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  successText: {
    margin: "8px 0",
    color: "#087f23",
    fontSize: "13px",
    fontWeight: 800,
  },

  secondaryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "10px",
  },

  secondaryButton: {
    border: "1px solid #dfe5de",
    background: "white",
    color: "#374151",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
  },

  tripPanel: {
    background: "#eef7ef",
    border: "1px solid #cfe3d2",
    borderRadius: "14px",
    padding: "14px",
    marginBottom: "14px",
  },

  tripHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "12px",
  },

  tripLabel: {
    margin: 0,
    color: "#087f23",
    fontSize: "12px",
    fontWeight: 900,
  },

  tripTitle: {
    margin: "6px 0",
    fontSize: "16px",
  },

  tripDesc: {
    margin: 0,
    color: "#68716c",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  tripSteps: {
    display: "grid",
    gap: "8px",
    marginBottom: "12px",
  },

  tripStep: {
    background: "white",
    borderRadius: "999px",
    padding: "8px",
    color: "#68716c",
    fontSize: "11px",
    fontWeight: 800,
    textAlign: "center",
  },

  tripStepActive: {
    background: "#087f23",
    color: "white",
    borderRadius: "999px",
    padding: "8px",
    fontSize: "11px",
    fontWeight: 800,
    textAlign: "center",
  },

  tripActionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginBottom: "10px",
  },

  completedBox: {
    background: "#e6f3e9",
    border: "1px solid #cfe3d2",
    borderRadius: "14px",
    padding: "14px",
    color: "#087f23",
    fontSize: "13px",
    lineHeight: "1.6",
    marginBottom: "12px",
  },

  cancelledBox: {
    background: "#fff7e6",
    border: "1px solid #fcd9a5",
    borderRadius: "14px",
    padding: "14px",
    color: "#7c4a03",
    fontSize: "13px",
    lineHeight: "1.6",
    marginBottom: "12px",
  },

  emptyState: {
    minHeight: "430px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  emptyIcon: {
    fontSize: "42px",
    marginBottom: "12px",
    color: "#68716c",
  },

  emptyTitle: {
    margin: "0 0 8px",
    fontSize: "20px",
  },

  emptyText: {
    margin: 0,
    maxWidth: "340px",
    color: "#68716c",
    lineHeight: "1.6",
    fontSize: "13px",
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
    width: "560px",
    maxWidth: "92vw",
    maxHeight: "92vh",
    overflowY: "auto",
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

  primaryButton: {
    width: "100%",
    border: "none",
    background: "#087f23",
    color: "white",
    padding: "13px",
    borderRadius: "999px",
    fontWeight: 800,
    cursor: "pointer",
    fontSize: "13px",
    marginTop: "10px",
  },

  customerPhoneBox: {
    background: "#f7f8f5",
    borderRadius: "14px",
    padding: "14px",
    marginBottom: "16px",
  },

  modalRouteBox: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "14px",
  },

  receiptBox: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "14px",
  },

  modalAlert: {
    background: "#f8fbff",
    border: "1px solid #d8e4f2",
    borderRadius: "14px",
    padding: "14px",
    color: "#374151",
    lineHeight: "1.6",
    fontSize: "13px",
    marginTop: "14px",
  },

  qrMock: {
    width: "180px",
    height: "180px",
    borderRadius: "18px",
    background:
      "repeating-linear-gradient(45deg, #111 0 8px, #fff 8px 16px)",
    border: "10px solid #f7f8f5",
    margin: "18px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  qrInner: {
    width: "64px",
    height: "64px",
    background: "white",
    color: "#111",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },

  notePreviewBox: {
    background: "#f8fbff",
    border: "1px solid #d8e4f2",
    borderRadius: "14px",
    padding: "14px",
    marginBottom: "12px",
    color: "#374151",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  reportedBox: {
    background: "#fff7e6",
    border: "1px solid #fcd9a5",
    borderRadius: "14px",
    padding: "14px",
    marginBottom: "12px",
    color: "#7c4a03",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  reportButton: {
    width: "100%",
    border: "1px solid #fcd9a5",
    background: "#fff7e6",
    color: "#7c4a03",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
    marginBottom: "10px",
  },

  chatBox: {
    background: "#f7f8f5",
    borderRadius: "14px",
    padding: "14px",
    maxHeight: "230px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "14px",
  },

  chatBubbleCustomer: {
    alignSelf: "flex-start",
    maxWidth: "80%",
    background: "white",
    border: "1px solid #dfe5de",
    borderRadius: "14px 14px 14px 4px",
    padding: "10px 12px",
    fontSize: "13px",
    color: "#374151",
  },

  chatBubbleDriver: {
    alignSelf: "flex-end",
    maxWidth: "80%",
    background: "#087f23",
    borderRadius: "14px 14px 4px 14px",
    padding: "10px 12px",
    fontSize: "13px",
    color: "white",
  },

  chatText: {
    margin: "0 0 4px",
    lineHeight: "1.45",
  },

  chatTime: {
    fontSize: "11px",
    opacity: 0.78,
  },

  quickReplyGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px",
    marginBottom: "12px",
  },

  quickReplyButton: {
    border: "1px solid #dfe5de",
    background: "white",
    color: "#374151",
    borderRadius: "999px",
    padding: "9px 10px",
    fontSize: "12px",
    fontWeight: 800,
    cursor: "pointer",
  },

  chatInputRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "10px",
  },

  chatInput: {
    border: "1px solid #dfe5de",
    borderRadius: "999px",
    padding: "12px 14px",
    fontSize: "13px",
    outline: "none",
  },

  sendButton: {
    border: "none",
    background: "#087f23",
    color: "white",
    borderRadius: "999px",
    padding: "0 18px",
    fontSize: "13px",
    fontWeight: 800,
    cursor: "pointer",
  },

  noteInput: {
    width: "100%",
    minHeight: "140px",
    border: "1px solid #dfe5de",
    borderRadius: "14px",
    padding: "14px",
    fontSize: "13px",
    lineHeight: "1.6",
    outline: "none",
    resize: "vertical",
    boxSizing: "border-box",
  },
};

export default DriverOrdersPage;