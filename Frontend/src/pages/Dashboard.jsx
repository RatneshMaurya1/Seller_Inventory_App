import React, { useEffect, useState } from "react";
import { getBuyers, getOrder, getProducts } from "../services";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const buyersRes = await getBuyers();
        setBuyers(buyersRes.buyers);
        const productsRes = await getProducts();
        setProducts(productsRes);
        const ordersRes = await getOrder();
        setOrders(ordersRes);
      } catch (error) {
        toast.error("Error loading data");
      }
    })();

    // getOrderData();
  }, []);
  return (
    <div className="p-6 bg-gray-100 min-h-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-200 shadow p-5">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Recent Orders
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              orders.map((order, i) => (
                <li key={order._id}>
                  🧾 Order #{i + 1} placed by{" "}
                  {order.buyerId?.name ? order.buyerId.name : "Anonymous Buyer"}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Recently Added Products */}
        <div className="bg-white rounded-xl border border-gray-200 shadow p-5">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Products Added
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            {products?.length === 0 ? (
              <p>No products yet</p>
            ) : (
              products.map((product) => (
                <li key={product._id}>📦 {product.name}</li>
              ))
            )}
          </ul>
        </div>

        {/* Recent Buyers */}
        <div className="bg-white rounded-xl border border-gray-200 shadow p-5">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Recent Buyers
          </h2>
          <ul className="space-y-2 text-sm text-gray-600">
            {buyers?.length === 0 ? (
              <p>No buyers yet</p>
            ) : (
              buyers.map((buyer) => <li key={buyer._id}>👤 {buyer.name}</li>)
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
