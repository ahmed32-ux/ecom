import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./home/Footer";

function About() {
    const [openIndex, setOpenIndex] = useState(null);

    const features = [
        {
            title: "Quality Products",
            description:
                "Explore carefully selected products across different categories.",
        },
        {
            title: "Affordable Prices",
            description:
                "Find great value and competitive prices on everyday products.",
        },
        {
            title: "Easy Shopping",
            description:
                "Browse products, explore categories and shop without hassle.",
        },
        {
            title: "Customer Satisfaction",
            description:
                "We want to make every shopping experience simple and convenient.",
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
            <Navbar />

            <main className="bg-white">

                {/* Hero Section */}
                <section className="px-5 py-16 sm:py-20 lg:py-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

                        {/* Image */}
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop"
                                alt="Online shopping experience"
                                className="h-72 w-full rounded-2xl object-cover sm:h-96 lg:h-[460px]"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-green-600">
                                About MyStore
                            </p>

                            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                                Shopping made simple,
                                <span className="text-green-600">
                                    {" "}everything in one place.
                                </span>
                            </h1>

                            <p className="mt-6 text-base leading-8 text-gray-600">
                                Welcome to MyStore! We believe shopping online should
                                be simple, convenient and enjoyable.
                            </p>

                            <p className="mt-4 text-base leading-8 text-gray-600">
                                From Electronics and Clothing to Shoes and Accessories,
                                you can explore a variety of products that fit your
                                everyday needs.
                            </p>

                            <p className="mt-4 text-base leading-8 text-gray-600">
                                Our goal is to bring everything together in one place
                                and make it easier for you to discover products you love.
                            </p>

                            {/* Highlights */}
                            <div className="mt-8 grid grid-cols-2 gap-6">

                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        More Choices
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Different categories in one place.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        Customer First
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Your shopping experience matters.
                                    </p>
                                </div>

                            </div>

                            {/* Buttons */}
                            <div className="mt-8 flex flex-wrap gap-3">

                                <Link
                                    to="/products"
                                    className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                                >
                                    Shop Now
                                </Link>

                                <Link
                                    to="/categories"
                                    className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-green-600 hover:text-green-600"
                                >
                                    Explore Categories
                                </Link>

                            </div>
                        </div>

                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="bg-gray-50 px-5 py-16 sm:py-20">
                    <div className="mx-auto max-w-7xl">

                        <div className="mb-12 text-center">
                            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
                                Why Choose MyStore
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                                A better way to shop
                            </h2>

                            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
                                Everything you need for a convenient shopping
                                experience, all in one place.
                            </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="rounded-xl border border-gray-200 bg-white p-6 transition hover:border-green-200 hover:shadow-md"
                                >
                                    <div className="mb-5 h-1 w-10 rounded-full bg-green-600" />

                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-gray-500">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="px-5 py-16 sm:py-20">
                    <div className="mx-auto max-w-7xl">

                        <div className="mb-10 text-center">
                            <h2 className="text-3xl font-bold text-gray-900">
                                MyStore at a glance
                            </h2>

                            <p className="mt-3 text-sm text-gray-500">
                                Making everyday shopping more convenient.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-2 rounded-2xl border-t  border-b border-gray-200 bg-gray-30 p-3 sm:p-8 md:grid-cols-4">
                            {stats.map((item) => (
                                <div
                                    key={item.label}
                                    className="group rounded-xl border border-transparent px-4 py-6 text-center transition-all duration-300 hover:border-gray-200 hover:bg-gray-80 hover:shadow-sm"
                                >
                                    <h3 className="text-xl font-bold text-green-600 transition-colors duration-300 sm:text-2xl">
                                        {item.number}
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-700">
                                        {item.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="bg-gray-50 px-5 py-16 sm:py-20">
                    <div className="mx-auto max-w-3xl">

                        {/* Heading */}
                        <div className="mb-10 text-center">
                            <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
                                FAQs
                            </p>

                            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                                Frequently Asked Questions
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-gray-500">
                                Have questions? Here are some answers to help you
                                get started.
                            </p>
                        </div>

                        {/* Accordion */}
                        <div className="space-y-3">

                            {faqs.map((faq, index) => {
                                const isOpen = openIndex === index;

                                return (
                                    <div
                                        key={faq.question}
                                        className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setOpenIndex(isOpen ? null : index)
                                            }
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-answer-${index}`}
                                            className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                                        >
                                            <span className="text-sm font-semibold text-gray-800 sm:text-base">
                                                {faq.question}
                                            </span>

                                            <span className="text-xl text-green-600">
                                                {isOpen ? "−" : "+"}
                                            </span>
                                        </button>

                                        {isOpen && (
                                            <div
                                                id={`faq-answer-${index}`}
                                                className="border-t border-gray-100 px-5 py-5"
                                            >
                                                <p className="text-sm leading-7 text-gray-500">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-12 rounded-xl bg-green-50 px-6 py-9 text-center">

                            <h3 className="text-xl font-bold text-gray-900">
                                Ready to start shopping?
                            </h3>

                            <p className="mt-3 text-sm text-gray-600">
                                Explore our products and find something you'll love.
                            </p>

                            <Link
                                to="/products"
                                className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                            >
                                Explore MyStore
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
