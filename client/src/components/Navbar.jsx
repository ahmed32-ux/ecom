
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar({ search, setSearch }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinkClass = ({ isActive }) =>
        `transition-colors duration-200 ${isActive
            ? "font-semibold text-green-600"
            : "text-gray-700 hover:text-green-600"
        }`;

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

                {/* Logo */}
                <Link to="/" className="text-2xl font-extrabold text-green-600">
                    My<span className="text-gray-900">Store.</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <NavLink to="/" className={navLinkClass}>
                        Home
                    </NavLink>

                    <a href="/#categories" className="text-gray-700 hover:text-green-600">
                        Categories
                    </a>

                    <a href="/#products" className="text-gray-700 hover:text-green-600">
                        Products
                    </a>

                    <Link
                        to="/about"
                        className="text-gray-700 hover:text-green-600"
                    >
                        About
                    </Link>

                    {/* Search */}
                    <input
                        type="search"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-52 rounded-xl border border-gray-200 bg-white px-4 py-2 outline-none focus:border-green-500"
                    />
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    <Link
                        to="/login"
                        className="hidden rounded-full bg-green-600 px-6 py-2.5 font-semibold text-white transition hover:bg-green-700 sm:block"
                    >
                        Login
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-2xl text-gray-800 md:hidden"
                        aria-label="Toggle navigation menu"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="flex flex-col gap-5 border-t border-gray-100 bg-white px-6 py-5 md:hidden">

                    <NavLink
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className={navLinkClass}
                    >
                        Home
                    </NavLink>

                    <a href="/#categories" onClick={() => setMenuOpen(false)}>
                        Categories
                    </a>

                    <a href="/#products" onClick={() => setMenuOpen(false)}>
                        Products
                    </a>

                    <Link
                        to="/about"
                        onClick={() => setMenuOpen(false)}                    >
                        About
                    </Link>

                    {/* Mobile Search */}
                    <input
                        type="search"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
                    />

                    <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="font-semibold text-green-600"
                    >
                        Login
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
