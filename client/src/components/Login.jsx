
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axious";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle Login
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMsg("");
        setError("");
        setLoading(true);

        try {
            const res = await api.post("/auth/login", form);

            // Save JWT Token
            localStorage.setItem("token", res.data.token);

            setMsg("Login Successfully!");

            // navigate("/admin/products");
            navigate("/");

        } catch (error) {
            console.log("Login Error:", error);

            setError(
                error.response?.data?.message ||
                error.message ||
                "Login Failed!"
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

            {/* Login Card */}
            <div className="relative w-full max-w-md">

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-10 text-center text-white">

                        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-4xl shadow-lg">
                            🛍️
                        </div>

                        <h1 className="text-3xl font-bold">
                            Welcome Back!
                        </h1>

                        <p className="text-green-50 text-sm mt-2">
                            Login to access your admin dashboard
                        </p>

                    </div>

                    {/* Form */}
                    <div className="p-7 sm:p-9">

                        <div className="mb-7">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Sign In
                            </h2>

                            <p className="text-gray-400 text-sm mt-1">
                                Enter your account details below.
                            </p>
                        </div>

                        {/* Success Message */}
                        {msg && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm mb-5">
                                ✓ {msg}
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-5">
                                ⚠ {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">

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
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
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

                            {/* Remember & Forgot */}
                            <div className="flex items-center justify-between gap-2 text-sm">

                                <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 accent-green-600 rounded"
                                    />
                                    Remember me
                                </label>

                                <Link
                                    to="/forgot-password"
                                    className="text-green-600 font-semibold hover:text-emerald-700 transition"
                                >
                                    Forgot Password?
                                </Link>

                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-green-200 hover:shadow-xl hover:from-green-700 hover:to-emerald-600 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? "Signing In..." : "Login to Dashboard →"}
                            </button>

                        </form>

                        {/* Signup */}
                        <div className="mt-7 text-center">
                            <p className="text-gray-500 text-sm">
                                Don't have an account?

                                <Link
                                    to="/signup"
                                    className="text-green-600 font-bold ml-1 hover:text-emerald-700 transition"
                                >
                                    Create Account
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

                {/* Bottom Text */}
                <p className="text-center text-green-100/60 text-xs mt-6">
                    Secure Login · Admin Dashboard
                </p>

            </div>
        </div>
    );
}

export default Login;
