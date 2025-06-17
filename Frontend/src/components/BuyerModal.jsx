import { useEffect, useState } from "react";

export default function BuyerModal({ isLoading,isOpen, onClose, onSubmit, buyer }) {
  const isEdit = !!buyer;

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    mobileNumber: "",
  });

  useEffect(() => {
    if (buyer) {
      setFormData(buyer);
    } else {
      setFormData({
        id: Date.now(),
        name: "",
        mobileNumber: "",
      });
    }
  }, [buyer,isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#000000aa] flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">{isEdit ? "Update" : "Add"} Buyer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required={!buyer}
              className="w-full border px-3 py-2 rounded"
            />
          </div>



          <div>
            <label className="block font-medium mb-1">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required={!buyer}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {isLoading ? "Loading..." : isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
