
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axious";

export default function EditProduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: ""
    });

    // Fetch Single Product
    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const response = await api.get(`/product/${id}`);

                setProduct(response.data.product);

            } catch (error) {
                console.log("Fetch Error:", error);
                alert("Unable to fetch product.");

            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

    }, [id]);

    // Handle Input Change
    const handleChange = (e) => {

        const { name, value } = e.target;

        setProduct((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Update Product
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            setSaving(true);

            await api.put(`/product/${id}`, {
                ...product,
                price: String(product.price),
                stock: Number(product.stock)
            });

            alert("Product updated successfully!");

            navigate("/admin/products");

        } catch (error) {
            console.log("Update Error:", error);
            console.log("Status:", error.response?.status);
            console.log("Response:", error.response?.data);
            console.log("Request URL:", error.config?.url);
            console.log("Request Method:", error.config?.method);

            alert(
                error.response?.data?.message ||
                "Failed to update product."
            );
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading product...</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold mb-6">
                    Edit Product
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block mb-2 font-medium">
                            Product Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={product.name || ""}
                            onChange={handleChange}
                            required
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={product.description || ""}
                            onChange={handleChange}
                            required
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            value={product.price || ""}
                            onChange={handleChange}
                            required
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            value={product.category || ""}
                            onChange={handleChange}
                            required
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Stock
                        </label>

                        <input
                            type="number"
                            name="stock"
                            value={product.stock ?? ""}
                            onChange={handleChange}
                            required
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Image URL
                        </label>

                        <input
                            type="text"
                            name="image"
                            value={product.image || ""}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />
                    </div>

                    {product.image && (
                        <img
                            src={product.image}
                            alt="Product preview"
                            className="w-24 h-24 object-cover rounded-lg"
                        />
                    )}

                    <div className="flex gap-3">

                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg disabled:opacity-50"
                        >
                            {saving ? "Updating..." : "Update Product"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}
