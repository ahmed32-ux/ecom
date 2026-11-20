
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axious";

export default function AddCategory() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Add Category
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
            console.log("STATUS:", err.response?.status);
            console.log("RESPONSE:", err.response?.data);
            console.log("URL:", err.config?.baseURL + err.config?.url);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to add category."
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">

                {/* Heading */}
                <h1 className="text-3xl font-bold text-gray-800">
                    Add New Category
                </h1>

                <p className="text-gray-500 mt-2 mb-8">
                    Create a new category for your store.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit}>

                    <label className="block text-gray-700 font-semibold mb-2">
                        Category Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter category name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />

                    {/* Error */}
                    {error && (
                        <p className="text-red-500 text-sm mt-3">
                            {error}
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 mt-7">

                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="w-1/2 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-1/2 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition"
                        >
                            {loading ? "Adding..." : "Add Category"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}
