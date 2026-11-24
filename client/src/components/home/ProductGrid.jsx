
import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../../api/axious";

function ProductGrid({ activeCategory = "All", search = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products
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
      console.error("Fetch Products Error:", err.response?.data || err.message);

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

  // Search and category filter
  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase();
    const categoryText = activeCategory.trim().toLowerCase();

    return products.filter((product) => {
      const productCategory = product.category?.toLowerCase() || "";
      const productName = product.name?.toLowerCase() || "";
      const productDescription = product.description?.toLowerCase() || "";

      const matchesCategory =
        categoryText === "all" || productCategory === categoryText;

      const matchesSearch =
        !searchText ||
        productName.includes(searchText) ||
        productDescription.includes(searchText) ||
        productCategory.includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, search]);

  return (
    <section
      className="mx-auto max-w-7xl px-5 py-14 sm:py-16"
      id="products"
    >
      {/* Section Heading */}
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
          Our collection
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Find something you love
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          Explore our collection and discover products that make everyday
          shopping a little more enjoyable.
        </p>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
            >
              <div className="h-56 animate-pulse bg-gray-100" />

              <div className="space-y-4 p-5">
                <div className="h-5 w-24 animate-pulse rounded-full bg-gray-100" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-gray-100" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                <div className="h-10 w-full animate-pulse rounded-xl bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Something went wrong
          </h3>

          <p className="mt-2 text-sm text-gray-500">{error}</p>

          <button
            type="button"
            onClick={fetchProducts}
            className="mt-6 rounded-xl bg-green-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Product Content */}
      {!loading && !error && (
        <>
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">
                {filteredProducts.length}
              </span>{" "}
              products found
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-md"
                >
                  {/* Product Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-50">
                    <img
                      src={product.image || "https://placehold.co/400x400"}
                      alt={product.name || "Product"}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-5">
                    <span className="inline-block rounded-lg bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      {product.category || "Uncategorized"}
                    </span>

                    <h3 className="mt-3 line-clamp-1 text-lg font-semibold text-gray-900">
                      {product.name || "Unnamed Product"}
                    </h3>

                    <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-500">
                      {product.description || "No description available."}
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
                      className="mt-4 w-full rounded-xl bg-green-600 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-green-700"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-16 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                No products found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                We couldn't find anything matching your search. Try a different
                keyword or browse another category.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default ProductGrid;
