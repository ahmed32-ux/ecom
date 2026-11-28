
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/home/Footer";

function Cart() {
    const navigate = useNavigate();

    // Temporary UI state. Connect with cart API later.
    const [cartItems, setCartItems] = useState([]);

    const formatPrice = (price) =>
        new Intl.NumberFormat("en-PK").format(price);

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.price) * Number(item.quantity),
        0
    );

    const updateQuantity = (id, change) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item._id === id
                        ? {
                            ...item,
                            quantity: Math.max(
                                1,
                                item.quantity + change
                            ),
                        }
                        : item
                )
        );
    };

    const removeItem = (id) => {
        setCartItems((prev) =>
            prev.filter((item) => item._id !== id)
        );
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gray-50">
                <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">

                    {/* Header */}

                    <div className="mb-10">
                        <p className="text-sm font-semibold text-green-600">
                            Shopping Cart
                        </p>

                        <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                            Shopping Cart
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Review your items before proceeding to checkout.
                        </p>
                    </div>

                    {cartItems.length === 0 ? (
                        /* Empty Cart */
                        <div className="rounded-3xl border border-gray-100 bg-white px-6 py-20 text-center shadow-sm">

                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-50">
                                <svg
                                    className="h-12 w-12 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M3 3h2l2.5 12h11l2-8H6"
                                    />
                                    <circle cx="9" cy="20" r="1" />
                                    <circle cx="18" cy="20" r="1" />
                                </svg>
                            </div>

                            <h2 className="mt-6 text-2xl font-bold text-gray-900">
                                Your cart is empty
                            </h2>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                                Looks like you haven't added anything to
                                your cart yet. Explore our products and
                                find something you love.
                            </p>

                            <button
                                onClick={() => navigate("/products")}
                                className="mt-8 rounded-xl bg-green-600 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-green-700"
                            >
                                Explore Products
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">

                            {/* Cart Items */}
                            <div className="space-y-5 lg:col-span-2">

                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Cart Items
                                    </h2>

                                    {cartCount > 0 && (
                                        <span className="text-sm text-gray-500">
                                            {cartCount}
                                        </span>
                                    )};
                                </div>

                                {cartItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row"
                                    >
                                        {/* Image */}
                                        <div className="h-32 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:w-32">
                                            <img
                                                src={
                                                    item.image ||
                                                    "https://placehold.co/300x300?text=Product"
                                                }
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex flex-1 flex-col justify-between gap-4">

                                            <div className="flex justify-between gap-3">
                                                <div>
                                                    <p className="text-xs font-medium text-green-600">
                                                        {item.category}
                                                    </p>

                                                    <h3 className="mt-2 text-lg font-semibold text-gray-900">
                                                        {item.name}
                                                    </h3>

                                                    <p className="mt-2 text-sm text-gray-500">
                                                        Rs. {formatPrice(item.price)}
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item._id)}
                                                    className="h-fit text-sm font-medium text-red-500 transition hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                {/* Quantity */}
                                                <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(item._id, -1)
                                                        }
                                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                                                    >
                                                        -
                                                    </button>

                                                    <span className="min-w-10 text-center text-sm font-semibold">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(item._id, 1)
                                                        }
                                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Item Total */}
                                                <p className="font-bold text-gray-900">
                                                    Rs. {formatPrice(
                                                        item.price * item.quantity
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    onClick={() => navigate("/products")}
                                    className="text-sm font-semibold text-green-600 transition hover:text-green-700"
                                >
                                    ← Continue Shopping
                                </button>
                            </div>

                            {/* Order Summary */}
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">

                                <h2 className="text-xl font-bold text-gray-900">
                                    Order Summary
                                </h2>

                                <div className="mt-6 space-y-4">
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Subtotal</span>
                                        <span>
                                            Rs. {formatPrice(subtotal)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>Shipping</span>
                                        <span className="font-medium text-green-600">
                                            Calculated at checkout
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-100 pt-4">
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-900">
                                                Total Amount
                                            </span>

                                            <span className="text-xl font-bold text-green-600">
                                                Rs. {formatPrice(subtotal)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate("/checkout")}
                                    className="mt-7 w-full rounded-xl bg-green-600 py-4 text-sm font-semibold text-white transition hover:bg-green-700"
                                >
                                    Proceed to Checkout
                                </button>

                                <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                                    Secure checkout. Your order details
                                    will be confirmed before payment.
                                </p>
                            </div>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Cart;
