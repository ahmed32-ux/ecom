
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axious";

export default function AddCategory() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Please enter category name.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await api.post("/categories/add", {
                name: name.trim(),
            });

            alert(
                response.data.message ||
                "Category added successfully!"
            );

            navigate("/admin/products");
        } catch (err) {
            console.log("ADD CATEGORY ERROR:", err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to add category."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-green-50 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-xl">

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                    {/* Top Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-8 text-white">

                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
                                +
                            </div>

                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold">
                                    Add New Category
                                </h1>

                                <p className="text-green-50 text-sm mt-1">
                                    Organize your store products
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-6 sm:p-9">

                        <p className="text-gray-500 text-sm mb-8">
                            Create a new category to keep your products
                            organized and easy to discover.
                        </p>

                        <form onSubmit={handleSubmit}>

                            {/* Category Name */}
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category Name
                            </label>

                            <input
                                type="text"
                                placeholder="e.g. Electronics, Clothing..."
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setError("");
                                }}
                                className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-4 text-gray-800 placeholder-gray-400 outline-none transition-all duration-300 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100"
                            />

                            {/* Error Message */}
                            {error && (
                                <div className="mt-3 flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                                    <span className="text-red-500">!</span>
                                    <p className="text-red-600 text-sm">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-8">

                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/products")}
                                    className="flex-1 border border-gray-200 bg-white text-gray-600 py-3.5 rounded-xl font-semibold hover:bg-gray-100 hover:text-gray-800 transition-all duration-300"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-green-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-green-100 hover:bg-green-700 hover:shadow-green-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Adding..." : "+ Add Category"}
                                </button>

                            </div>

                        </form>

                        {/* Divider */}
                        <div className="border-t border-gray-100 my-7"></div>

                        {/* View Categories */}
                        <button
                            type="button"
                            onClick={() => navigate("/admin/categories")}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 border border-indigo-100 py-3.5 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300"
                        >
                            <span>☷</span>
                            View All Categories
                            <span>→</span>
                        </button>

                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-400 text-xs mt-6">
                    Store Administration Panel
                </p>

            </div>
        </div>
    );
}
