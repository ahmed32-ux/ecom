import { useState, useEffect } from "react";
import api from "../api/axious";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [loadingCategories, setLoadingCategories] = useState(true);
    // Fetch Categories
    const fetchCategories = async () => {
        try {
            setLoadingCategories(true);

            const response = await api.get("/categories");

            console.log("Categories:", response.data);

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
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: ""
    });

    const [loading, setLoading] = useState(false);

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
            console.log("ERROR MESSAGE:", error.message);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Failed to add product!"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Add New Product
                </h1>

                <p className="text-gray-500 mb-8">
                    Add a new product to your online store.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-xl shadow-sm space-y-6"
                >

                    {/* Product Name */}
                    <div>
                        <label className="block font-medium mb-2">
                            Product Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            rows="4"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
                            required
                        />
                    </div>

                    {/* Price and Stock */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>
                            <label className="block font-medium mb-2">
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                min="0"
                                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-2">
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={product.stock}
                                onChange={handleChange}
                                placeholder="Available quantity"
                                min="0"
                                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
                                required
                            />
                        </div>

                    </div>

                    {/* Category */}
                    <div>
                        <label className="block font-medium mb-2">
                            Category
                        </label>

                        <select
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
                            required
                        >
                            <option value="">
                                {loadingCategories
                                    ? "Loading categories..."
                                    : "Select Category"}
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
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block font-medium mb-2">
                            Product Image URL
                        </label>

                        <input
                            type="url"
                            name="image"
                            value={product.image}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-green-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
                    >
                        {loading ? "Adding Product..." : "Add Product"}
                    </button>

                </form>
            </div>
        </div>
    );
}
