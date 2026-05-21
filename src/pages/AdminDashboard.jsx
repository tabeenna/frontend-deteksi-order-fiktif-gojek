import { dummyOrders } from "../data/dummyOrders";

function AdminDashboard() {
  return (
    <div className="dashboard-page">
      <h1>Admin Dashboard</h1>
      <p>Monitoring order mencurigakan</p>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID Order</th>
              <th>Customer</th>
              <th>Restoran</th>
              <th>Skor Risiko</th>
              <th>Kategori</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {dummyOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.restaurant}</td>
                <td>{order.riskScore}</td>
                <td>{order.riskLevel}</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;