import { useState, useEffect } from "react";

export default function AddProductModal({loading, productId, edit, isOpen, onClose, onAdd }) {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    quantity: "",
    MRP: "",
  });

  useEffect(() => {
    if (edit) {
      setProduct(edit);
    } else {
      setProduct({
        id: Date.now(),
        name: "",
        price: "",
        quantity: "",
        MRP: "",
      });
    }
  }, [edit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(product);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000aa] flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h2 className="text-lg font-semibold">{edit ? "Edit Product" : "Add Product"}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              required={!edit}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required={!edit}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required={!edit}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">MRP</label>
            <input
              type="number"
              name="MRP"
              value={product.MRP}
              onChange={handleChange}
              required={!edit}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Loading..." : edit ? "Update" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
