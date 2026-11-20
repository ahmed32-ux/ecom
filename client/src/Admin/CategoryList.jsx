import { useEffect, useState } from "react";
import api from "../api/axious";
import { useNavigate } from "react-router-dom";

export default function CategoryList() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState("");
    const [saving, setSaving] = useState(false);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/categories");

            const data = Array.isArray(response.data)
                ? response.data
                : response.data.categories || [];

            setCategories(data);
        } catch (error) {
            setError(error.response?.data?.message || "Unable to load categories.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleEdit = (category) => {
        setEditingId(category._id);
        setEditName(category.name);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditName("");
    };

    const handleUpdate = async (id) => {
        if (!editName.trim()) {
            alert("Please enter category name.");
            return;
        }

        try {
            setSaving(true);

            const response = await api.put(`/categories/${id}`, {
                name: editName.trim()
            });

            setCategories((prev) =>
                prev.map((item) =>
                    item._id === id ? response.data.category : item
                )
            );

            handleCancel();
            alert("Category updated successfully!");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to update category.");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            await api.delete(`/categories/${id}`);

            setCategories((prev) =>
                prev.filter((item) => item._id !== id)
            );

            alert("Category deleted successfully!");
        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete category.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-green-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8">
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
                                ☷
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold">
                                    Category Management
                                </h1>
                                <p className="text-green-50 text-sm mt-1">
                                    Manage and organize all your store categories.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => navigate("/admin/products")}
                                className="bg-white/15 border border-white/30 px-5 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-700 transition"
                            >
                                ← Back to Products
                            </button>

                            <button
                                onClick={() => navigate("/admin/categories/add")}
                                className="bg-white text-green-700 px-5 py-3 rounded-xl font-semibold shadow-md hover:bg-green-50 transition"
                            >
                                + Add New Category
                            </button>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm font-medium">
                            Total Categories
                        </p>
                        <h2 className="text-3xl font-bold text-gray-800 mt-2">
                            {categories.length}
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                            Categories in your store
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm font-medium">
                            Management Status
                        </p>
                        <h2 className="text-xl font-bold text-green-600 mt-2">
                            Active
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                            Manage your store organization
                        </p>
                    </div>
                </div>

                {/* Category Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

                    <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                All Categories
                            </h2>
                            <p className="text-sm text-gray-400 mt-1">
                                View, edit and manage your store categories.
                            </p>
                        </div>

                        <span className="text-sm font-semibold text-green-700 bg-green-50 px-4 py-2 rounded-full w-fit">
                            {categories.length} Categories
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
                            <p className="text-gray-500 mt-4 text-sm">
                                Loading categories...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 px-5">
                            <p className="text-red-500">{error}</p>
                            <button
                                onClick={fetchCategories}
                                className="mt-5 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : categories.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 px-5">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-4">
                                ☷
                            </div>
                            <h3 className="text-xl font-bold text-gray-700">
                                No Categories Found
                            </h3>
                            <p className="text-gray-400 text-sm mt-2">
                                You haven't created any categories yet.
                            </p>
                            <button
                                onClick={() => navigate("/admin/categories/add")}
                                className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
                            >
                                + Create First Category
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[650px] text-left">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase">#</th>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase">Category Name</th>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase">Category ID</th>
                                        <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {categories.map((category, index) => (
                                        <tr key={category._id} className="hover:bg-green-50/40 transition">
                                            <td className="px-6 py-5">
                                                <div className="w-9 h-9 bg-green-50 text-green-700 rounded-xl flex items-center justify-center font-bold text-sm">
                                                    {index + 1}
                                                </div>
                                            </td>

                                            <td className="px-6 py-5">
                                                {editingId === category._id ? (
                                                    <input
                                                        type="text"
                                                        value={editName}
                                                        onChange={(e) => setEditName(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") handleUpdate(category._id);
                                                            if (e.key === "Escape") handleCancel();
                                                        }}
                                                        autoFocus
                                                        className="w-full max-w-sm border border-green-300 rounded-xl px-4 py-3 outline-none focus:ring-4 focus:ring-green-100"
                                                    />
                                                ) : (
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                                            ☷
                                                        </div>
                                                        <span className="font-semibold text-gray-800">
                                                            {category.name}
                                                        </span>
                                                    </div>
                                                )}
                                            </td>

                                            <td className="px-6 py-5">
                                                <span className="text-xs font-medium text-gray-400 bg-gray-50 px-3 py-2 rounded-lg">
                                                    {category._id?.slice(-8)}
                                                </span>
                                            </td>

                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    {editingId === category._id ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleUpdate(category._id)}
                                                                disabled={saving}
                                                                className="bg-green-50 text-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 hover:text-white transition disabled:opacity-50"
                                                            >
                                                                {saving ? "Saving..." : "Save"}
                                                            </button>

                                                            <button
                                                                onClick={handleCancel}
                                                                disabled={saving}
                                                                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleEdit(category)}
                                                                className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 hover:text-white transition"
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                onClick={() => handleDelete(category._id)}
                                                                className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 hover:text-white transition"
                                                            >
                                                                Delete
                                                            </button>
                                                        </>
                                                    )}
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
                    Store Administration Panel · Category Management
                </p>
            </div>
        </div>
    );
}