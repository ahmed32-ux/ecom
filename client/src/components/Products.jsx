import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/home/Footer";
import api from "../api/axious";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("default");

    const navigate = useNavigate();
    const location = useLocation();

    const selectedCategory =
        new URLSearchParams(location.search).get("category") || "All";

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
                "Fetch Products Error:",
                err.response?.data || err.message
            );

            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to load products. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    // Load products on mount
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Get categories from database products
    const categories = useMemo(() => {
        const uniqueCategories = [
            ...new Set(
                products
                    .map((product) => product.category)
                    .filter(Boolean)
            ),
        ];

        return ["All", ...uniqueCategories];
    }, [products]);

    // Search, category filter and sorting
    const filteredProducts = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        const filtered = products.filter((product) => {
            const productName = product.name?.toLowerCase() || "";
            const productDescription =
                product.description?.toLowerCase() || "";
            const productCategory =
                product.category?.toLowerCase() || "";

            const matchesSearch =
                !searchText ||
                productName.includes(searchText) ||
                productDescription.includes(searchText) ||
                productCategory.includes(searchText);

            const matchesCategory =
                selectedCategory.toLowerCase() === "all" ||
                productCategory === selectedCategory.toLowerCase();

            return matchesSearch && matchesCategory;
        });

        if (sort === "low") {
            filtered.sort(
                (a, b) => Number(a.price) - Number(b.price)
            );
        } else if (sort === "high") {
            filtered.sort(
                (a, b) => Number(b.price) - Number(a.price)
            );
        }

        return filtered;
    }, [products, search, selectedCategory, sort]);

    // Change category and URL
    const handleCategoryChange = (value) => {
        if (value === "All") {
            navigate("/products");
        } else {
            navigate(`/products?category=${encodeURIComponent(value)}`);
        }
    };

    // Clear filters
    const clearFilters = () => {
        setSearch("");
        setSort("default");
        navigate("/products");
    };

    // Format prices
    const formatPrice = (price) =>
        new Intl.NumberFormat("en-PK").format(price);

    return (
        <>
            <Navbar />

            <main className="min-h-screen ">

                {/* Hero Section */}
                <section className="border-b border-gray-100 mt-5 gap-4">
                    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 md:py-16 lg:px-8 bg-green-50 rounded-xl">

                        <div className="max-w-2xl px-5 border border-white rounded-lg py-5">
                            <p className="text-sm font-semibold tracking-wide text-green-600">
                                Explore MyStore
                            </p>

                            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
                                Find something you love.
                            </h1>

                            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                                Explore our collection and discover products
                                that make everyday shopping a little more
                                enjoyable.
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
                                placeholder="Search products..."
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                            />
                        </div>
                    </div>
                </section>

                {/* Products Section */}
                <section className="mx-auto max-w-7xl px-5 py-12 mt-4 sm:px-6 lg:px-8">

                    {/* Section Header */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Our Products
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Browse our collection of products.
                            </p>
                        </div>

                        {!loading && !error && (
                            <p className="text-sm text-gray-500">
                                <span className="font-semibold text-gray-900">
                                    {filteredProducts.length}
                                </span>{" "}
                                products found
                            </p>
                        )}
                    </div>

                    {/* Filters */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row">

                        {/* Category Filter */}
                        <div className="w-full sm:w-64">
                            <select
                                value={selectedCategory}
                                onChange={(e) =>
                                    handleCategoryChange(e.target.value)
                                }
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-green-500"
                            >
                                {categories.map((item) => (
                                    <option key={item} value={item}>
                                        {item === "All"
                                            ? "All Categories"
                                            : item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sorting */}
                        <div className="w-full sm:w-64">
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-green-500"
                            >
                                <option value="default">
                                    Sort by default
                                </option>
                                <option value="low">
                                    Price: Low to High
                                </option>
                                <option value="high">
                                    Price: High to Low
                                </option>
                            </select>
                        </div>

                        {/* Reset */}
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="px-4 py-3 text-sm font-medium text-gray-500 transition hover:text-green-600"
                        >
                            Clear filters
                        </button>
                    </div>

                    {/* Loading Skeleton */}
                    {loading && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <div
                                    key={item}
                                    className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
                                >
                                    <div className="h-56 animate-pulse bg-gray-100" />

                                    <div className="space-y-4 p-5">
                                        <div className="h-5 w-24 animate-pulse rounded bg-gray-100" />
                                        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-100" />
                                        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                                        <div className="h-6 w-1/2 animate-pulse rounded bg-gray-100" />
                                        <div className="h-11 w-full animate-pulse rounded-xl bg-gray-100" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Error State */}
                    {!loading && error && (
                        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Unable to load products
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
                    )}

                    {/* Product Content */}
                    {!loading && !error && (
                        <>
                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                                    {filteredProducts.map((product) => (
                                        <div
                                            key={product._id}
                                            className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
                                        >
                                            {/* Product Image */}
                                            <div className="h-56 overflow-hidden bg-gray-50">
                                                <img
                                                    src={
                                                        product.image ||
                                                        "https://placehold.co/400x400?text=Product"
                                                    }
                                                    alt={
                                                        product.name ||
                                                        "Product"
                                                    }
                                                    loading="lazy"
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="p-5">
                                                <span className="inline-block rounded-lg bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                                                    {product.category ||
                                                        "Uncategorized"}
                                                </span>

                                                <h3 className="mt-3 line-clamp-1 text-lg font-semibold text-gray-900">
                                                    {product.name ||
                                                        "Unnamed Product"}
                                                </h3>

                                                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                                                    {product.description ||
                                                        "No description available."}
                                                </p>

                                                {/* Price */}
                                                <div className="mt-5 flex items-center justify-between gap-3">
                                                    <span className="text-xl font-bold text-green-600">
                                                        Rs. {product.price ?? "N/A"}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-green-600 hover:bg-green-600 hover:text-white"
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </div>

                                                {/* View Product */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        navigate(
                                                            `/product/${product._id}`
                                                        )
                                                    }
                                                    className="mt-5 w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                                                >
                                                    View Product
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* Empty State */
                                <div className="rounded-2xl border border-gray-100 bg-white px-6 py-16 text-center">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        No products found
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                                        We couldn't find products matching
                                        your search or selected category.
                                        Try changing your filters.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="mt-6 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                                    >
                                        Reset filters
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Products;
