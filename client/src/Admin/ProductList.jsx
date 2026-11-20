
import { useState, useEffect } from "react";
import api from "../api/axious";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    // Fetch Products
    const fetchProducts = async () => {
        try {
            const response = await api.get("/product/");

            setProducts(
                Array.isArray(response.data)
                    ? response.data
                    : response.data.products || []
            );
        } catch (error) {
            console.log("GET API Error:", error);
        } finally {
            setLoading(false);
        }
    };

    // Delete Product
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/product/${id}`);

            setProducts((prev) =>
                prev.filter((product) => product._id !== id)
            );

            alert("Product deleted successfully!");
        } catch (error) {
            console.log("Delete Error:", error);
            alert("Failed to delete product.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Product List
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage all your store products here.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">

                        <button
                            onClick={() => navigate("/admin/categories/add")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition"
                        >
                            + Add Category
                        </button>

                        <button
                            onClick={() => navigate("/admin/products/add")}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-medium transition"
                        >
                            + Add New Product
                        </button>

                    </div>
                </div>

                {/* Product Count */}
                <div className="bg-white p-5 rounded-xl shadow-sm mb-6">
                    <p className="text-gray-500 text-sm">
                        Total Products
                    </p>

                    <h2 className="text-2xl font-bold text-gray-800 mt-1">
                        {products.length}
                    </h2>
                </div>

                {/* Product Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

                    {loading ? (
                        <p className="text-center py-10 text-gray-500">
                            Loading products...
                        </p>
                    ) : products.length === 0 ? (
                        <p className="text-center py-10 text-gray-500">
                            No products found.
                        </p>
                    ) : (
                        <table className="w-full min-w-[750px] text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="p-4 text-gray-600">Product</th>
                                    <th className="p-4 text-gray-600">Category</th>
                                    <th className="p-4 text-gray-600">Price</th>
                                    <th className="p-4 text-gray-600">Stock</th>
                                    <th className="p-4 text-gray-600">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((product) => (
                                    <tr
                                        key={product._id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={product.image || "https://placehold.co/60x60"}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover rounded-lg"
                                                />

                                                <span className="font-medium text-gray-800">
                                                    {product.name}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="p-4 text-gray-600">
                                            {product.category}
                                        </td>

                                        <td className="p-4 font-medium text-gray-800">
                                            Rs. {product.price}
                                        </td>

                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-sm ${
                                                product.stock > 0
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}>
                                                {product.stock > 0
                                                    ? `${product.stock} Available`
                                                    : "Out of Stock"}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="text-red-600 hover:text-red-800 font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
