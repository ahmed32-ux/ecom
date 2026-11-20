
import { useEffect, useState } from "react";
import api from "../../api/axious";

function Categories({ activeCategory, setActiveCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Categories From MongoDB
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/categories");

      console.log("Categories API Response:", response.data);

      // Get category array
      const categoryList = Array.isArray(response.data)
        ? response.data
        : response.data.categories || [];

      setCategories(categoryList);

    } catch (err) {
      console.error("Fetch Categories Error:", err.response?.data || err.message);

      setError(
        err.response?.data?.message ||
        "Unable to load categories. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Load Categories When Page Opens
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section
      className="mx-auto max-w-7xl px-5 py-12"
      id="categories"
    >
      {/* Heading */}
      <div className="mb-8">
        <p className="font-semibold text-green-600">
          EXPLORE COLLECTION
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          Select Category
        </h2>
      </div>

      {/* Loading */}
      {loading && (
        <p className="py-5 text-gray-500">
          Loading categories...
        </p>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="py-5">
          <p className="text-red-500">{error}</p>

          <button
            onClick={fetchCategories}
            className="mt-4 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Categories */}
      {!loading && !error && (
        <div className="flex flex-wrap gap-4">

          {/* All Categories */}
          <button
            onClick={() => setActiveCategory("All")}
            className={`rounded-xl border px-7 py-4 font-semibold transition ${
              activeCategory === "All"
                ? "border-green-600 bg-green-600 text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-green-500"
            }`}
          >
            All
          </button>

          {/* MongoDB Categories */}
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setActiveCategory(category.name)}
              className={`rounded-xl border px-7 py-4 font-semibold transition ${
                activeCategory === category.name
                  ? "border-green-600 bg-green-600 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-green-500"
              }`}
            >
              {category.name}
            </button>
          ))}

          {/* No Categories */}
          {categories.length === 0 && (
            <p className="text-gray-500">
              No categories available yet.
            </p>
          )}

        </div>
      )}
    </section>
  );
}

export default Categories;
