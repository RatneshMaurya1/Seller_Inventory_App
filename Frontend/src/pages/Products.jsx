import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddProductModal from "../components/ProductModal";
import { addProduct, deleteProductById, getProducts, updateProduct } from "../services";
import toast from "react-hot-toast";

export default function ProductPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [productId, setProductId] = useState(false);
  const [isDeleting,setIsDeleting] = useState(false)

  const [products, setProducts] = useState([]);

  const handleDelete = async(id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
        setIsDeleting(true)
      try {
        const response = await deleteProductById(id)
        if(response.message === "Product deleted successfully"){
            toast.success(response.message)
            await getProductData()
        }
      } catch (error) {
        toast.error(error.message)
      }finally{
        setIsDeleting(false)
      }
    }
  };
  const handleAddProduct = async (product) => {
    if (edit) {
        setLoading(true)
      try {
        const response = await updateProduct(product, productId);
        if (response.message === "Product updated successfully") {
          toast.success(response.message);
          setShowModal(false)
          setEdit(false)
          await getProductData();
        }
      } catch (error) {
        toast.error(error.message);
      }finally{
        setLoading(false)
      }
    } else {
        setEdit(false)
      setLoading(true);
      try {
        const response = await addProduct(product);
        if (response.message === "Product added successfully") {
          toast.success("Product added successfully");
          setShowModal(false)
          await getProductData();
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  };
  async function getProductData() {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getProductData();
  }, []);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex cursor-pointer items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p>Price: ₹{product.price}</p>
                <p>MRP: ₹{product.MRP}</p>
                <p>Quantity: {product.quantity}</p>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setEdit(true);
                      setProductId(product.id);
                    }}
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                  disabled={isDeleting}
                    onClick={() => handleDelete(product.id)}
                    className=" cursor-pointer text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <AddProductModal
      productId={productId}
        edit={edit}
        loading={loading}
        isOpen={showModal}
        onClose={() => {setShowModal(false);setEdit(false)}}
        onAdd={handleAddProduct}
      />
    </div>
  );
}
