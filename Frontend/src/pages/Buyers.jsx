import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BuyerModal from "../components/BuyerModal";
import { addBuyerData, deleteBuyerById, getBuyers, updateBuyer } from "../services";
import toast from "react-hot-toast";

export default function BuyerPage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [editingBuyer, setEditingBuyer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [buyerId, setBuyerId] = useState(null);

  const [buyers, setBuyers] = useState([]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this buyer?")) {
      try {
        const response = await deleteBuyerById(id);
        if (response.message === "Buyer deleted successfully") {
          toast.success(response.message);
          await getBuyersData();
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleAddBuyer = async (data) => {
    if (editingBuyer) {
      setIsLoading(true);
      try {
        const response = await updateBuyer(data, buyerId);
        if (response.message === "Buyer updated successfully") {
          toast.success(response.message);
          setIsOpen(false);
          setEditingBuyer(null);
          await getBuyersData();
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      try {
        const response = await addBuyerData(data);
        if (response.message === "Buyer created successfully.") {
          toast.success(response.message);
          setIsOpen(false);
          await getBuyersData();
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  async function getBuyersData() {
    try {
      const response = await getBuyers();
      setBuyers(response.buyers);
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {
    getBuyersData();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Buyers</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="flex cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          <FaPlus /> Add Buyer
        </button>
      </div>

      {buyers.length === 0 ? (
        <p className="text-center text-gray-500">No buyers available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {buyers.map((buyer) => (
            <div
              key={buyer.id}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{buyer.name}</h3>
                <p>Phone: {buyer.mobileNumber}</p>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setBuyerId(buyer.id);
                      setEditingBuyer(buyer);
                    }}
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(buyer.id)}
                    className="cursor-pointer text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <BuyerModal
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingBuyer(null);
        }}
        onSubmit={handleAddBuyer}
        buyer={editingBuyer}
      />
    </div>
  );
}
