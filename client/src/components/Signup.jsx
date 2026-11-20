
import { useState } from "react";
import api from "../api/axious";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
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
            [name]: value
        }));
    };

    // Handle Signup
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post("auth/signup", form);

            console.log("Signup Successful:", response.data);

            setForm({
                name: "",
                email: "",
                password: ""
            });

            setShowPopup(true);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Signup Failed! Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-green-950 to-emerald-950 px-4 py-10 relative overflow-hidden">

            {/* Background Decorations */}
            <div className="absolute w-72 h-72 bg-green-500/20 rounded-full blur-3xl -top-20 -left-20"></div>
            <div className="absolute w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -bottom-32 -right-20"></div>

            {/* Signup Card */}
            <div className="relative w-full max-w-md">

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-9 text-center text-white">

                        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-4xl shadow-lg">
                            🛍️
                        </div>

                        <h1 className="text-3xl font-bold">
                            Create Account
                        </h1>

                        <p className="text-green-50 text-sm mt-2">
                            Join us and start your journey today!
                        </p>

                    </div>

                    {/* Form Section */}
                    <div className="p-7 sm:p-9">

                        <div className="mb-7">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Sign Up
                            </h2>

                            <p className="text-gray-400 text-sm mt-1">
                                Fill in your details to create an account.
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-5">
                                ⚠ {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Name */}
                            <div>
                                <label className="block text-gray-700 font-semibold text-sm mb-2">
                                    Full Name
                                </label>

                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                        👤
                                    </span>

                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Enter your full name"
                                        autoComplete="name"
                                        required
                                        className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-12 pr-4 py-3.5 outline-none text-gray-700 placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 font-semibold text-sm mb-2">
                                    Email Address
                                </label>

                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                        ✉
                                    </span>

                                    <input
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        type="email"
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        required
                                        className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-12 pr-4 py-3.5 outline-none text-gray-700 placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-gray-700 font-semibold text-sm mb-2">
                                    Password
                                </label>

                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                        🔒
                                    </span>

                                    <input
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a password"
                                        autoComplete="new-password"
                                        required
                                        className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-12 pr-14 py-3.5 outline-none text-gray-700 placeholder-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 text-sm font-medium"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            {/* Signup Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-200 hover:shadow-xl hover:from-green-700 hover:to-emerald-600 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? "Creating Account..." : "Create Account →"}
                            </button>

                        </form>

                        {/* Login Link */}
                        <div className="mt-7 text-center">
                            <p className="text-gray-500 text-sm">
                                Already have an account?

                                <Link
                                    to="/login"
                                    className="text-green-600 font-bold ml-1 hover:text-emerald-700 transition"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 pt-5 border-t border-gray-100 text-center">
                            <p className="text-xs text-gray-400">
                                © 2026 Store Admin Panel. All rights reserved.
                            </p>
                        </div>

                    </div>
                </div>

                <p className="text-center text-green-100/60 text-xs mt-6">
                    Create Your Account · Store Administration
                </p>

            </div>

            {/* Success Popup */}
            {showPopup && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">

                    <div className="bg-white rounded-3xl p-8 w-full max-w-sm text-center shadow-2xl">

                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                            ✓
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Congratulations!
                        </h2>

                        <p className="text-sm text-gray-500 mb-6">
                            Your account has been created successfully.
                            Redirecting to Login...
                        </p>

                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full rounded-full w-full"></div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

export default Signup;
