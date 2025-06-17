import { useEffect, useState } from "react";
import { addOrder, getBuyers, getOrder, getProducts } from "../services";
import toast from "react-hot-toast";

export default function OrderPage() {
  const [buyers, setBuyers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [form, setForm] = useState({
    buyerId: "",
    items: [{ productId: "", quantity: 1 }],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updatedItems = [...prev.items];
      updatedItems[index][name] = value;
      return { ...prev, items: updatedItems };
    });
  };

  const handleAddProduct = () => {
    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { productId: "", quantity: 1 }],
    }));
  };

  const handleRemoveProduct = (index) => {
    setForm((prev) => {
      const updatedItems = [...prev.items];
      updatedItems.splice(index, 1);
      return { ...prev, items: updatedItems };
    });
  };

  const handleBuyerChange = (e) => {
    setForm((prev) => ({ ...prev, buyerId: e.target.value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await addOrder(form);
      if (response.message === "Order placed successfully") {
        toast.success(response.message);
        await getOrderData();
      }
    } catch (error) {
      toast.error(error.message);
    }

    setForm({ buyerId: "", items: [{ productId: "", quantity: 1 }] });
  };

  const getOrderData = async () => {
    try {
      const response = await getOrder();
      setOrders(response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const buyersRes = await getBuyers();
        setBuyers(buyersRes.buyers);
        const productsRes = await getProducts();
        setProducts(productsRes);
      } catch (error) {
        toast.error("Error loading data");
      }
    })();

    getOrderData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Place New Order
      </h2>

      <form
        onSubmit={handlePlaceOrder}
        className="bg-white border p-6 rounded-2xl shadow space-y-6"
      >
        {/* Buyer select */}
        <div>
          <label className="block mb-1 font-semibold">Select Buyer</label>
          <select
            name="buyerId"
            value={form.buyerId}
            onChange={handleBuyerChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="">-- Select Buyer --</option>
            {buyers.map((buyer) => (
              <option key={buyer.id} value={buyer._id}>
                {buyer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product fields */}
        {form.items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-3 items-end bg-gray-50 p-3 rounded-lg"
          >
            <div className="col-span-6">
              <label className="block mb-1 font-semibold">Product</label>
              <select
                name="productId"
                value={item.productId}
                onChange={(e) => handleChange(e, index)}
                required
                className="w-full border px-3 py-2 rounded-md"
              >
                <option value="">-- Select Product --</option>
                {products.map((product) => (
                  <option key={product.id} value={product._id}>
                    {product.name} (₹{product.price})
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-4">
              <label className="block mb-1 font-semibold">Quantity</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={item.quantity}
                onChange={(e) => handleChange(e, index)}
                required
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div className="col-span-2 text-right">
              {form.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveProduct(index)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleAddProduct}
            className="text-blue-600 hover:underline text-sm"
          >
            + Add Another Product
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Place Order
          </button>
        </div>
      </form>

      {/* Orders */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          Placed Orders
        </h3>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders placed yet.</p>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => {
              const totalAmount = order.items.reduce(
                (acc, item) => acc + item.quantity * item.productId?.price,
                0
              );

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-xl p-5 shadow border"
                >
                  <div className="mb-2 text-lg font-medium text-blue-700">
                    Buyer: {order.buyerId?.name || "Anonymous Buyer"}
                  </div>
                  <ul className="space-y-1 text-gray-700">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="text-sm">
                        <span className="font-semibold">
                          {item.productId?.name}
                        </span>{" "}
                        - ₹{item.productId?.price} × {item.quantity} ={" "}
                        <strong>
                          ₹{item.productId?.price * item.quantity}
                        </strong>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 font-bold text-right text-green-600">
                    Grand Total: ₹{totalAmount}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
