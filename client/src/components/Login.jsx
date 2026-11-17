
import React from 'react';
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login form submitted");

    navigate("/");
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

                <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                    <input
                        name="email"
                        className="w-full outline-none bg-transparent py-2.5 px-2"
                        type="email"
                        placeholder="Email"
                        required
                    />
                </div>

                <div className="flex items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                    <input
                        name="password"
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

                    <Link to="/forgot-password" className="text-blue-600 underline">
                        Forgot Password
                    </Link>
                </div>

                <button
                    type="submit"
                    className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 transition py-2.5 rounded text-white font-medium"
                >
                    Log In
                </button>

                <p className="text-center mt-4">
                    Don't have an account?
                    <Link to="/signup" className="text-blue-500 underline ml-1">
                        Signup
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
