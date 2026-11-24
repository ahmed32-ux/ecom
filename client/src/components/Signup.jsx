
import { useState } from "react";
import api from "../api/axious";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await api.post("/auth/signup", form);

      setForm({
        name: "",
        email: "",
        password: "",
      });

      setShowPopup(true);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">

      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your details to get started
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                autoComplete="new-password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-16 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-green-600 hover:text-green-700"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        {/* Login Link */}
        <div className="mt-7 border-t border-gray-100 pt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?

            <Link
              to="/login"
              className="ml-1 font-semibold text-green-600 hover:text-green-700"
            >
              Login
            </Link>
          </p>
        </div>

      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

          <div className="w-full max-w-sm rounded-xl bg-white p-8 text-center shadow-xl">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
              ✓
            </div>

            <h2 className="mb-2 text-xl font-bold text-gray-800">
              Account Created!
            </h2>

            <p className="text-sm text-gray-500">
              Your account has been created successfully.
              Redirecting to login...
            </p>

          </div>
        </div>
      )}

    </div>
  );
}

export default Signup;
