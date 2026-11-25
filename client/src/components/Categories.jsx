
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/home/Footer";
import api from "../api/axious"

// Category display information (images and descriptions only)
const categoryInfo = {
    Electronics: {
        description: "Devices and gadgets for everyday use.",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80",
    },
    Fashion: {
        description: "Find styles that fit your everyday life.", 
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
    },
    "Home & Living": {
        description: "Make your home comfortable and beautiful.",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    },
    Accessories: {
        description: "Small details that make a difference.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    },
    Sports: {
        description: "Gear for an active lifestyle.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    },
    Beauty: {
        description: "Everyday care and beauty essentials.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    },
};

const defaultCategoryInfo = {
    description: "Explore products from this collection.",
    image: "https://placehold.co/800x500?text=Category",
};

function Categories() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Fetch products from database
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/product");

            const productList = Array.isArray(response.data)
                ? response.data
                : response.data?.products || response.data?.data || [];

            if (!Array.isArray(productList)) {
                throw new Error("Invalid products data received.");
            }

            setProducts(productList);
        } catch (err) {
            console.error(
                "Fetch Categories Error:",
                err.response?.data || err.message
            );

            setError(
                err.response?.data?.message ||
                    err.message ||
                    "Unable to load categories. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    // Load products on mount
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Generate unique categories from database products
    const categories = useMemo(() => {
        const uniqueCategories = [
            ...new Set(
                products
                    .map((product) => product.category?.trim())
                    .filter(Boolean)
            ),
        ];

        return uniqueCategories.map((name) => ({
            name,
            ...(categoryInfo[name] || defaultCategoryInfo),
        }));
    }, [products]);

    // Search categories
    const filteredCategories = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        return categories.filter((category) =>
            category.name.toLowerCase().includes(searchText)
        );
    }, [categories, search]);

    // Navigate to products by category
    const handleCategoryClick = (categoryName) => {
        navigate(`/products?category=${encodeURIComponent(categoryName)}`);
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gray-50">

                {/* Hero Section */}
                <section className="mt-7 border-b border-gray-100 bg-white">
                    <div className="mx-auto max-w-7xl rounded-2xl bg-green-50 px-5 py-14 sm:px-6 md:py-16 lg:px-8">

                        <div className="max-w-2xl rounded-xl border border-white px-5 py-4">
                            <p className="mb-3 text-sm font-medium text-green-600">
                                Explore MyStore
                            </p>

                            <h1 className="text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
                                Find what you're looking for.
                            </h1>

                            <p className="mt-5 max-w-xl leading-7 text-gray-500">
                                Explore our collections and discover products
                                across a variety of categories, all in one place.
                            </p>
                        </div>

                        {/* Search */}
                        <div className="relative mt-8 max-w-xl">
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search categories..."
                                className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            />
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="mx-auto mt-4 max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                    {/* Section Header */}
                    <div className="mb-8 flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                All Categories
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Browse our collection by category.
                            </p>
                        </div>

                        {!loading && !error && (
                            <span className="text-sm text-gray-500">
                                {filteredCategories.length} categories
                            </span>
                        )}
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div
                                    key={item}
                                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
                                >
                                    <div className="h-56 animate-pulse bg-gray-100" />

                                    <div className="space-y-4 p-5">
                                        <div className="h-6 w-1/2 animate-pulse rounded bg-gray-100" />
                                        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                                        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                                        <div className="h-5 w-1/3 animate-pulse rounded bg-gray-100" />
                                    </div>
                                </div>
                            ))};
                        </div>
                    )};

                    {/* Error */}
                    {!loading && error && (
                        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Something went wrong
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                {error}
                            </p>

                            <button
                                type="button"
                                onClick={fetchProducts}
                                className="mt-6 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                            >
                                Try Again
                            </button>
                        </div>
                    )};

                    {/* Categories Grid */}
                    {!loading && !error && filteredCategories.length > 0 && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            {filteredCategories.map((category) => (
                                <div
                                    key={category.name}
                                    className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
                                >
                                    {/* Image */}
                                    <div className="h-56 overflow-hidden bg-gray-100">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {category.name}
                                        </h3>

                                        <p className="mt-2 text-sm leading-6 text-gray-500">
                                            {category.description}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleCategoryClick(category.name)
                                            }
                                            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-green-600 transition hover:text-green-700"
                                        >
                                            Explore category

                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M5 12h14" />
                                                <path d="m12 5 7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && filteredCategories.length === 0 && (
                        <div className="rounded-2xl border border-gray-100 bg-white py-20 text-center">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {categories.length === 0
                                    ? "No categories available"
                                    : "No categories found"}
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                {categories.length === 0
                                    ? "Categories will appear here when products are available."
                                    : "Try searching with a different category name."}
                            </p>

                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch("")}
                                    className="mt-5 font-medium text-green-600 transition hover:text-green-700"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Categories;
