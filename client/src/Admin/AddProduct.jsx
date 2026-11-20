
import { useState, useEffect } from "react";
import api from "../api/axious";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loading, setLoading] = useState(false);

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: ""
    });

    // Fetch Categories
    const fetchCategories = async () => {
        try {
            setLoadingCategories(true);

            const response = await api.get("/categories");

            const categoryList = Array.isArray(response.data)
                ? response.data
                : response.data.categories || [];

            setCategories(categoryList);

        } catch (error) {
            console.error("Category Fetch Error:", error);
        } finally {
            setLoadingCategories(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Submit Product
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await api.post(
                "/product/add",
                {
                    ...product,
                    price: Number(product.price),
                    stock: Number(product.stock)
                }
            );

            console.log("Product Added:", response.data);

            alert("Product Added Successfully!");

            setProduct({
                name: "",
                description: "",
                price: "",
                category: "",
                stock: "",
                image: ""
            });

            navigate("/admin/products");

        } catch (error) {
            console.log("FULL ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("SERVER RESPONSE:", error.response?.data);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to add product!"
            );
        } finally {
            setLoading(false);
        }
    };

    // Reusable Input Styling
    const inputStyle =
        "w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3.5 text-gray-800 placeholder-gray-400 outline-none transition-all duration-300 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100";

    const labelStyle =
        "block text-sm font-semibold text-gray-700 mb-2";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-50 to-green-50 px-4 py-8 sm:px-6 lg:px-8">

            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8">

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl">
                                📦
                            </div>

                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold">
                                    Add New Product
                                </h1>

                                <p className="text-green-50 text-sm mt-1">
                                    Add a new product to your online store.
                                </p>
                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="bg-white/15 border border-white/30 text-white px-5 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-700 transition-all duration-300"
                        >
                            ← Back to Products
                        </button>

                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                    {/* Form Heading */}
                    <div className="px-6 sm:px-8 py-6 border-b border-gray-100">

                        <h2 className="text-xl font-bold text-gray-800">
                            Product Information
                        </h2>

                        <p className="text-gray-400 text-sm mt-1">
                            Fill in the details below to add your product.
                        </p>

                    </div>

                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">

                        {/* Product Name */}
                        <div>
                            <label className={labelStyle}>
                                Product Name <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                className={inputStyle}
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className={labelStyle}>
                                Product Description <span className="text-red-500">*</span>
                            </label>

                            <textarea
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                placeholder="Write a detailed product description..."
                                rows="4"
                                className={`${inputStyle} resize-none`}
                                required
                            />
                        </div>

                        {/* Price and Stock */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div>
                                <label className={labelStyle}>
                                    Price (Rs.) <span className="text-red-500">*</span>
                                </label>

                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">
                                        Rs.
                                    </span>

                                    <input
                                        type="number"
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                        placeholder="Enter price"
                                        min="0"
                                        step="0.01"
                                        className={`${inputStyle} pl-14`}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelStyle}>
                                    Available Stock <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="number"
                                    name="stock"
                                    value={product.stock}
                                    onChange={handleChange}
                                    placeholder="Enter quantity"
                                    min="0"
                                    step="1"
                                    className={inputStyle}
                                    required
                                />
                            </div>

                        </div>

                        {/* Category */}
                        <div>
                            <label className={labelStyle}>
                                Product Category <span className="text-red-500">*</span>
                            </label>

                            <select
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                                className={inputStyle}
                                required
                                disabled={loadingCategories}
                            >
                                <option value="">
                                    {loadingCategories
                                        ? "Loading categories..."
                                        : "Select a category"}
                                </option>

                                {categories.map((item) => (
                                    <option
                                        key={item._id}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </select>

                            {!loadingCategories && categories.length === 0 && (
                                <p className="text-sm text-amber-600 mt-2">
                                    No categories found. Please add a category first.
                                </p>
                            )}
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className={labelStyle}>
                                Product Image URL
                            </label>

                            <input
                                type="url"
                                name="image"
                                value={product.image}
                                onChange={handleChange}
                                placeholder="https://example.com/product-image.jpg"
                                className={inputStyle}
                            />

                            <p className="text-xs text-gray-400 mt-2">
                                Enter a valid image URL to display your product image.
                            </p>
                        </div>

                        {/* Image Preview */}
                        {product.image && (
                            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">

                                <p className="text-sm font-semibold text-gray-700 mb-3">
                                    Image Preview
                                </p>

                                <img
                                    src={product.image}
                                    alt="Product Preview"
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                    }}
                                    onLoad={(e) => {
                                        e.currentTarget.style.display = "block";
                                    }}
                                    className="w-32 h-32 object-cover rounded-xl border border-gray-200 shadow-sm"
                                />

                            </div>
                        )}

                        {/* Divider */}
                        <div className="border-t border-gray-100 pt-6">

                            {/* Buttons */}
                            <div className="flex flex-col-reverse sm:flex-row gap-3">

                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/products")}
                                    className="flex-1 border border-gray-200 bg-white text-gray-600 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={loading || loadingCategories || categories.length === 0}
                                    className="flex-1 bg-green-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-green-100 hover:bg-green-700 hover:shadow-green-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Adding Product..." : "+ Add Product"}
                                </button>

                            </div>

                        </div>

                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-400 text-xs mt-7">
                    Store Administration Panel · Product Management
                </p>

            </div>
        </div>
    );
}
