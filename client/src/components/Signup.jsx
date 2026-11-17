
import { useState } from "react";
import api from "../api/axious";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/signup", form);

            console.log("Signup Successful:", response.data);

            setForm({
                name: "",
                email: "",
                password: ""
            });

            setShowPopup(true);
            setTimeout(() => {
                navigate("/login")
            }, 1500);

        } catch (error) {
            alert(error.response?.data?.message || "Signup Failed!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white text-gray-500 w-full max-w-[340px] mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Sign Up
                </h2>

                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
                    type="text"
                    placeholder="Username"
                    required
                />

                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border mt-1 bg-indigo-500/5 mb-2 border-gray-500/10 outline-none rounded py-2.5 px-3"
                    type="email"
                    placeholder="Email"
                    required
                />

                <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border mt-1 bg-indigo-500/5 mb-7 border-gray-500/10 outline-none rounded py-2.5 px-3"
                    type="password"
                    placeholder="Password"
                    required
                />

                <button
                    type="submit"
                    className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium"
                >
                    Create Account
                </button>

                <p className="text-center mt-4">
                    Already have an account?
                    <Link to="/login" className="text-blue-500 underline ml-1">
                        Log In
                    </Link>
                </p>
            </form>

            {/* Success Popup */}
            {showPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4">

                    <div className="bg-white rounded-xl p-5 w-full max-w-xs text-center shadow-xl">

                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                            ✓
                        </div>

                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                            Congratulations!
                        </h2>

                        <p className="text-sm text-gray-500 mb-5">
                            Your account is created successfully.
                        </p>

                        <p className="text-sm text-gray-500 mb-5">
                            Your account is created successfully.
                            Redirecting to Login...
                        </p>

                        {/* <button
                            onClick={() => setShowPopup(false)}
                            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition"
                        >
                            Continue
                        </button> */}

                    </div>
                </div>
            )}

        </div>
    );
}

export default Signup;
