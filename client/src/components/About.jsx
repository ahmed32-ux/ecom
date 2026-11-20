import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./home/Footer";
import Navbar from "./Navbar"


function About() {
    const [openIndex, setOpenIndex] = useState(null);

    const features = [
        {
            title: "Quality Products",
            description:
                "Explore carefully selected products across different categories.",
            icon: "⭐",
        },
        {
            title: "Affordable Prices",
            description:
                "Enjoy great value and competitive prices on your favorite products.",
            icon: "💰",
        },
        {
            title: "Easy Shopping",
            description:
                "Browse categories, discover products and shop with ease.",
            icon: "🛍️",
        },
        {
            title: "Customer Satisfaction",
            description:
                "We focus on making every shopping experience simple and convenient.",
            icon: "❤️",
        },
    ];

    const stats = [
        { number: "All-in-One", label: "Shopping Destination" },
        { number: "Multiple", label: "Product Categories" },
        { number: "Easy", label: "Online Shopping" },
        { number: "Customer", label: "Focused Service" },
    ];

    const faqs = [
        {
            question: "What types of products do you offer?",
            answer:
                "MyStore offers products across multiple categories, including Electronics, Clothing, Shoes, Accessories and other everyday shopping essentials.",
        },
        {
            question: "How can I find products?",
            answer:
                "You can explore different product categories or use the search option in the navigation bar to quickly find products by name, description or category.",
        },
        {
            question: "How can I place an order?",
            answer:
                "Browse our products, select your favorite items, add them to your shopping cart and proceed to checkout when you're ready.",
        },
        {
            question: "Can I add multiple products to my cart?",
            answer:
                "Yes! You can add different products to your shopping cart and review your selected items before proceeding to checkout.",
        },
        {
            question: "What payment methods do you accept?",
            answer:
                "Available payment methods depend on our checkout configuration. Please check the checkout page for currently supported payment options.",
        },
        {
            question: "How can I contact customer support?",
            answer:
                "You can contact our team through the Contact Us page for assistance with products, orders and general inquiries.",
        },
    ];

    return (
        <>
         <Navbar/>

            <main className="relative overflow-hidden bg-white">

                {/* ABOUT HERO SECTION */}

                <section className="relative px-4 py-10 sm:px-6 lg:px-10 lg:py-5">

                    <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-green-100/70 blur-3xl" />
                    <div className="absolute -bottom-20 -left-24 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />

                    <div className="relative mx-auto max-w-7xl">

                        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

                            {/* Image */}
                            <div className="relative mx-auto w-full max-w-xl">

                                <div className="overflow-hidden rounded-3xl shadow-2xl shadow-green-200/50">

                                    <img
                                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop"
                                        alt="Online shopping experience"
                                        className="h-[350px] w-full object-cover sm:h-[480px]"
                                    />

                                </div>

                                {/* Floating Card */}
                                <div className="absolute -bottom-7 left-4 right-4 rounded-2xl border border-white bg-white/95 p-4 shadow-xl backdrop-blur-md sm:left-8 sm:right-auto sm:max-w-sm sm:p-5">

                                    <div className="flex items-center gap-4">

                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-2xl">
                                            🛍️
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-slate-800">
                                                Everything You Need
                                            </h3>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Explore products in one place.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                <div className="absolute -right-4 -top-4 -z-10 h-28 w-28 rounded-3xl border-2 border-dashed border-green-200 sm:-right-6 sm:-top-6" />

                            </div>

                            {/* About Content */}
                            <div className="pt-6 lg:pt-0">

                                <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-green-700">

                                    <span className="h-2 w-2 rounded-full bg-green-600" />

                                    About MyStore

                                </div>

                                <h1 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">

                                    Your Shopping Destination,

                                    <span className="mt-2 block text-green-600">
                                        Everything in One Place.
                                    </span>

                                </h1>

                                <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-green-600 to-emerald-300" />

                                <p className="mt-7 text-base leading-8 text-slate-600">
                                    Welcome to MyStore! We believe online shopping should be
                                    simple, convenient and enjoyable. Our platform brings
                                    together products from different categories to make
                                    finding your favorite items easier.
                                </p>

                                <p className="mt-4 text-base leading-8 text-slate-600">
                                    From Electronics and Clothing to Shoes and Accessories,
                                    explore a variety of products designed to meet your
                                    everyday shopping needs.
                                </p>

                                <p className="mt-4 text-base leading-8 text-slate-600">
                                    Our goal is to provide a smooth shopping experience,
                                    affordable choices and a convenient way to discover
                                    products you love.
                                </p>

                                {/* Highlights */}
                                <div className="mt-8 grid grid-cols-2 gap-5">

                                    <div className="flex items-start gap-3">

                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xl">
                                            ✨
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-slate-800">
                                                Multiple Categories
                                            </h3>

                                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                                More choices in one place.
                                            </p>
                                        </div>

                                    </div>

                                    <div className="flex items-start gap-3">

                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-xl">
                                            ❤️
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-slate-800">
                                                Customer First
                                            </h3>

                                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                                Your satisfaction matters.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                                {/* Buttons */}
                                <div className="mt-9 flex flex-wrap items-center gap-4">

                                    <Link
                                        to="/#products"
                                        className="group inline-flex items-center gap-3 rounded-full bg-green-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-200 transition-all duration-300 hover:-translate-y-1 hover:bg-green-700"
                                    >
                                        Shop Now

                                        <span className="transition-transform group-hover:translate-x-1">
                                            →
                                        </span>

                                    </Link>

                                    <Link
                                        to="/#categories"
                                        className="rounded-full border border-green-200 px-7 py-3.5 text-sm font-semibold text-green-700 transition hover:bg-green-50"
                                    >
                                        Explore Categories
                                    </Link>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* WHY CHOOSE US */}

                <section className="bg-green-50/70 px-4 py-16 sm:px-6 lg:px-10 lg:py-20">

                    <div className="mx-auto max-w-7xl">

                        <div className="mx-auto mb-12 max-w-2xl text-center">

                            <span className="text-sm font-semibold uppercase tracking-widest text-green-600">
                                Why Choose MyStore
                            </span>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">

                                A Better Way To Shop,

                                <span className="text-green-600">
                                    {" "}Every Day.
                                </span>

                            </h2>

                            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                                Discover a convenient online shopping experience with
                                different product categories and easy navigation.
                            </p>

                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                            {features.map((feature, index) => (

                                <div
                                    key={index}
                                    className="group rounded-2xl border border-green-100 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-green-300 hover:shadow-xl hover:shadow-green-100"
                                >

                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl transition group-hover:bg-green-100">
                                        {feature.icon}
                                    </div>

                                    <h3 className="mt-6 text-lg font-bold text-slate-800">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-500">
                                        {feature.description}
                                    </p>

                                </div>

                            ))}

                        </div>
                    </div>
                </section>

                {/* STATS SECTION */}

                <section className="px-4 py-16 sm:px-6 lg:px-10 lg:py-20">

                    <div className="mx-auto max-w-7xl">

                        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 px-6 py-12 shadow-xl shadow-green-200 sm:px-10 lg:py-16">

                            <div className="mx-auto mb-10 max-w-2xl text-center">

                                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                                    MyStore - Shopping Made Simple
                                </h2>

                                <p className="mt-3 text-sm leading-7 text-green-50">
                                    Your favorite products and categories, all together
                                    in one convenient shopping destination.
                                </p>

                            </div>

                            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">

                                {stats.map((item, index) => (

                                    <div key={index} className="text-center">

                                        <h3 className="text-2xl font-bold text-white sm:text-3xl">
                                            {item.number}
                                        </h3>

                                        <p className="mt-3 text-xs font-medium text-green-100 sm:text-sm">
                                            {item.label}
                                        </p>

                                    </div>

                                ))}

                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ SECTION */}

                <section className="bg-white px-4 py-16 sm:px-6 lg:px-10 lg:py-20">

                    <div className="mx-auto max-w-3xl">

                        <div className="mb-12 text-center">

                            <span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-green-700">
                                Frequently Asked Questions
                            </span>

                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">

                                Got Questions?

                                <span className="block text-green-600">
                                    We've Got Answers.
                                </span>

                            </h2>

                            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                                Find answers to common questions about shopping,
                                categories, products and orders.
                            </p>

                        </div>

                        {/* Accordion */}
                        <div className="space-y-3">

                            {faqs.map((faq, index) => {

                                const isOpen = openIndex === index;

                                return (

                                    <div
                                        key={index}
                                        className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen
                                                ? "border-green-300 bg-green-50/50 shadow-sm"
                                                : "border-slate-200 bg-white hover:border-green-200"
                                            }`}
                                    >

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenIndex(isOpen ? null : index)
                                            }
                                            aria-expanded={isOpen}
                                            className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                                        >

                                            <span className={`text-sm font-semibold sm:text-base ${isOpen
                                                    ? "text-green-700"
                                                    : "text-slate-800"
                                                }`}>
                                                {faq.question}
                                            </span>

                                            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen
                                                    ? "rotate-180 bg-green-600 text-white"
                                                    : "bg-green-50 text-green-600"
                                                }`}>

                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="m6 9 6 6 6-6"
                                                    />
                                                </svg>

                                            </span>

                                        </button>

                                        <div className={`grid transition-all duration-300 ease-in-out ${isOpen
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                            }`}>

                                            <div className="overflow-hidden">

                                                <p className="px-5 pb-5 text-sm leading-7 text-slate-600 sm:px-6">
                                                    {faq.answer}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                );
                            })}

                        </div>

                        {/* Contact CTA */}
                        <div className="mt-10 rounded-2xl bg-green-50 p-6 text-center sm:p-8">

                            <h3 className="text-lg font-bold text-slate-800">
                                Need More Information?
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                We're here to help make your shopping experience better.
                            </p>

                            <Link
                                to="/"
                                className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                            >
                                Explore MyStore

                                <span>→</span>

                            </Link>

                        </div>

                    </div>
                </section>

            </main>
            <Footer />
        </>

    );
}

export default About;
