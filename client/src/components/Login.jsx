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

            // Redirect to Home
            navigate("/");

        } catch (error) {
    console.log("Full Error:", error);
    console.log("Response:", error.response);
    console.log("Status:", error.response?.status);
    console.log("Message:", error.response?.data);

    setError(
        error.response?.data?.message ||
        error.message ||
        "Login Failed!"
    );
}
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
            >

                <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
                    Welcome Back
                </h2>

                {/* Success Message */}
                {msg && (
                    <p className="text-green-600 text-center mb-3">
                        {msg}
                    </p>
                )}

                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-center mb-3">
                        {error}
                    </p>
                )}

                {/* Email */}
                <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">

                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full outline-none bg-transparent py-2.5 px-2"
                        type="email"
                        placeholder="Email"
                        required
                    />

                </div>

                {/* Password */}
                <div className="flex items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">

                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full outline-none bg-transparent py-2.5 px-2"
                        type="password"
                        placeholder="Password"
                        required
                    />

                </div>

                <div className="flex items-center justify-between mb-6">

                    <div className="flex items-center gap-1">
                        <input id="checkbox" type="checkbox" />

                        <label htmlFor="checkbox">
                            Remember me
                        </label>
                    </div>

                    <Link
                        to="/forgot-password"
                        className="text-blue-600 underline"
                    >
                        Forgot Password
                    </Link>

                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Log In"}
                </button>

                <p className="text-center mt-4">
                    Don't have an account?

                    <Link
                        to="/signup"
                        className="text-blue-500 underline ml-1"
                    >
                        Signup
                    </Link>
                </p>

            </form>
        </div>
    );
}

export default Login;
