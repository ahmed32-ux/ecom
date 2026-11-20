
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
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-green-50 px-4 py-8 sm:px-6 lg:px-8">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8">

                    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                                    📦
                                </div>

                                <h1 className="text-2xl sm:text-3xl font-bold">
                                    Product Management
                                </h1>
                            </div>

                            <p className="text-green-50 text-sm sm:text-base">
                                Manage, organize and monitor all your store products.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row flex-wrap gap-3">

                            <button
                                onClick={() => navigate("/admin/categories/add")}
                                className="bg-white/15 border border-white/30 text-white px-5 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-700 transition-all duration-300"
                            >
                                + Add Category
                            </button>

                            <button
                                onClick={() => navigate("/admin/categories")}
                                className="bg-white/15 border border-white/30 text-white px-5 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-700 transition-all duration-300"
                            >
                                ☷ View Categories
                            </button>

                            <button
                                onClick={() => navigate("/admin/products/add")}
                                className="bg-white text-green-700 px-5 py-3 rounded-xl font-semibold shadow-md hover:bg-green-50 hover:shadow-lg transition-all duration-300"
                            >
                                + Add New Product
                            </button>

                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">
                                    Total Products
                                </p>
                                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                    {products.length}
                                </h2>
                            </div>
                            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-2xl">
                                📦
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">
                                    Available Products
                                </p>
                                <h2 className="text-3xl font-bold text-green-600 mt-2">
                                    {products.filter(p => Number(p.stock) > 0).length}
                                </h2>
                            </div>
                            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">
                                ✓
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">
                                    Out of Stock
                                </p>
                                <h2 className="text-3xl font-bold text-red-500 mt-2">
                                    {products.filter(p => Number(p.stock) <= 0).length}
                                </h2>
                            </div>
                            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center text-2xl">
                                ⚠
                            </div>
                        </div>
                    </div>

                </div>

                {/* Product Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                    <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                All Products
                            </h2>
                            <p className="text-sm text-gray-400 mt-1">
                                View and manage your product inventory.
                            </p>
                        </div>

                        <span className="text-sm font-semibold text-green-700 bg-green-50 px-4 py-2 rounded-full w-fit">
                            {products.length} Products
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                            <p className="text-gray-500 mt-4 text-sm">
                                Loading products...
                            </p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 px-5">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-4">
                                📦
                            </div>

                            <h3 className="text-xl font-bold text-gray-700">
                                No Products Found
                            </h3>

                            <p className="text-gray-400 text-sm mt-2 text-center">
                                You haven't added any products yet.
                            </p>

                            <button
                                onClick={() => navigate("/admin/products/add")}
                                className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                            >
                                + Add Your First Product
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[800px] text-left">

                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Product
                                        </th>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Stock
                                        </th>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {products.map((product) => (
                                        <tr
                                            key={product._id}
                                            className="hover:bg-green-50/40 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={product.image || "https://placehold.co/60x60"}
                                                        alt={product.name}
                                                        className="w-14 h-14 object-cover rounded-xl border border-gray-100 shadow-sm"
                                                    />

                                                    <div>
                                                        <p className="font-semibold text-gray-800">
                                                            {product.name}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            ID: {product._id?.slice(-6)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5">
                                                <span className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-sm font-medium">
                                                    {product.category}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5">
                                                <span className="font-bold text-gray-800">
                                                    Rs. {product.price}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                                                    Number(product.stock) > 0
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}>
                                                    <span className={`w-2 h-2 rounded-full ${
                                                        Number(product.stock) > 0
                                                            ? "bg-green-500"
                                                            : "bg-red-500"
                                                    }`}></span>

                                                    {Number(product.stock) > 0
                                                        ? `${product.stock} Available`
                                                        : "Out of Stock"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">

                                                    <button
                                                        onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                                                        className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 hover:text-white transition-all duration-200"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <p className="text-center text-gray-400 text-xs mt-7">
                    Store Administration Panel · Product Management
                </p>

            </div>
        </div>
    );
}
