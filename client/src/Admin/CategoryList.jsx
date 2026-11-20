
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

    // Fetch Categories
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
            console.error("Fetch Error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load categories."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Start Editing
    const handleEdit = (category) => {
        setEditingId(category._id);
        setEditName(category.name);
    };

    // Update Category
    const handleUpdate = async (id) => {
        if (!editName.trim()) {
            alert("Please enter category name.");
            return;
        }

        try {
            setSaving(true);

            const response = await api.put(
                `/categories/${id}`,
                { name: editName.trim() }
            );

            setCategories((prev) =>
                prev.map((item) =>
                    item._id === id
                        ? response.data.category
                        : item
                )
            );

            setEditingId(null);
            setEditName("");

            alert("Category updated successfully!");

        } catch (error) {
            console.error("Update Error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to update category."
            );
        } finally {
            setSaving(false);
        }
    };

    // Delete Category
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/categories/${id}`);

            setCategories((prev) =>
                prev.filter((item) => item._id !== id)
            );

            alert("Category deleted successfully!");

        } catch (error) {
            console.error("Delete Error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to delete category."
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Category Management
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Manage all your store categories.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/admin/categories/add")}
                        className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                    >
                        + Add New Category
                    </button>

                </div>

                {/* Category Count */}
                <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Total Categories
                    </p>

                    <h2 className="mt-1 text-2xl font-bold text-gray-800">
                        {categories.length}
                    </h2>
                </div>

                {/* Category Table */}
                <div className="overflow-x-auto rounded-xl bg-white shadow-sm">

                    {loading ? (
                        <p className="py-10 text-center text-gray-500">
                            Loading categories...
                        </p>
                    ) : error ? (
                        <div className="py-10 text-center">
                            <p className="text-red-500">{error}</p>

                            <button
                                onClick={fetchCategories}
                                className="mt-3 rounded-lg bg-green-600 px-5 py-2 text-white"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : categories.length === 0 ? (
                        <p className="py-10 text-center text-gray-500">
                            No categories found.
                        </p>
                    ) : (

                        <table className="w-full min-w-[600px] text-left">

                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="p-4 text-gray-600">
                                        #
                                    </th>

                                    <th className="p-4 text-gray-600">
                                        Category Name
                                    </th>

                                    <th className="p-4 text-gray-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {categories.map((category, index) => (

                                    <tr
                                        key={category._id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="p-4 text-gray-500">
                                            {index + 1}
                                        </td>

                                        <td className="p-4">

                                            {editingId === category._id ? (

                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) =>
                                                        setEditName(e.target.value)
                                                    }
                                                    className="w-full rounded-lg border p-2 outline-none focus:border-green-500"
                                                />

                                            ) : (

                                                <span className="font-medium text-gray-800">
                                                    {category.name}
                                                </span>

                                            )}

                                        </td>

                                        <td className="p-4">

                                            <div className="flex items-center gap-4">

                                                {editingId === category._id ? (

                                                    <>
                                                        <button
                                                            onClick={() => handleUpdate(category._id)}
                                                            disabled={saving}
                                                            className="font-medium text-green-600 disabled:opacity-50"
                                                        >
                                                            {saving ? "Saving..." : "Save"}
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                setEditingId(null);
                                                                setEditName("");
                                                            }}
                                                            className="font-medium text-gray-500"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>

                                                ) : (

                                                    <>
                                                        <button
                                                            onClick={() => handleEdit(category)}
                                                            className="font-medium text-blue-600 hover:text-blue-800"
                                                        >
                                                            Edit
                                                        </button>

                                                        <button
                                                            onClick={() => handleDelete(category._id)}
                                                            className="font-medium text-red-600 hover:text-red-800"
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

                    )}

                </div>

            </div>
        </div>
    );
}
