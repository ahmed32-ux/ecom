
import { useEffect, useMemo, useState } from "react";
import api from "../../api/axious";

function ProductGrid({ activeCategory = "All", search = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Products From Backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/product");

      console.log("Products API Response:", response.data);

      const productList = Array.isArray(response.data)
        ? response.data
        : response.data.products || response.data.data || [];

      setProducts(productList);

    } catch (error) {
      console.error("Fetch Products Error:", error.response?.data || error.message);

      setError(
        error.response?.data?.message ||
        "Unable to load products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch Products When Component Loads
  useEffect(() => {
    fetchProducts();
  }, []);

  // Search & Category Filtering
  const filteredProducts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return products.filter((product) => {

      // Category Filter
      const matchesCategory =
        activeCategory === "All" ||
        product.category?.toLowerCase() === activeCategory.toLowerCase();

      // Search Filter
      const matchesSearch =
        !searchText ||
        product.name?.toLowerCase().includes(searchText) ||
        product.description?.toLowerCase().includes(searchText) ||
        product.category?.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });

  }, [products, activeCategory, search]);

  return (
    <section
      className="mx-auto max-w-7xl px-5 py-10"
      id="products"
    >

      {/* Heading */}
      <div className="mb-8">
        <p className="font-semibold text-green-600">
          OUR COLLECTION
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Featured Products
        </h2>
      </div>

      {/* Loading */}
      {loading && (
        <p className="py-12 text-center text-gray-500">
          Loading products...
        </p>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="py-12 text-center">
          <p className="text-red-500">{error}</p>

          <button
            onClick={fetchProducts}
            className="mt-4 rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Products */}
      {!loading && !error && (
        <>
          <p className="mb-5 text-sm text-gray-500">
            Showing {filteredProducts.length} products
          </p>

          {filteredProducts.length > 0 ? (

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {filteredProducts.map((product) => (

                <div
                  key={product._id}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Product Image */}
                  <div className="h-56 overflow-hidden bg-gray-50">
                    <img
                      src={product.image || "https://placehold.co/400x400"}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-5">

                    <p className="text-sm text-green-600">
                      {product.category}
                    </p>

                    <h3 className="mt-2 text-lg font-bold">
                      {product.name}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                      {product.description}
                    </p>

                    <div className="mt-4">
                      <span className="text-xl font-bold text-green-600">
                        Rs. {product.price}
                      </span>
                    </div>

                    <button
                      className="mt-5 w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                      Add To Cart
                    </button>

                  </div>
                </div>

              ))}

            </div>

          ) : (

            <div className="py-12 text-center">
              <p className="text-lg font-semibold text-gray-700">
                No products found.
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Try another product name or select a different category.
              </p>
            </div>

          )}
        </>
      )}

    </section>
  );
}

export default ProductGrid;
