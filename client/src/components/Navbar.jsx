
import { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar({ search = "", setSearch = () => { } }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 ${isActive
      ? "font-semibold text-green-600"
      : "text-gray-600 hover:text-green-600"
    }`;

  useEffect(() => {
    const loadCart = async () => {
      if (!userId) {
        return setCartCount(0);
      }

      try {
        const res = await api.get(`/cart/${userId}`);

        setCartCount(res.data.items.length);
      } catch (error) {
        console.error("Cart loading error:", error);
      }
    };

    loadCart();
  }, [userId]);


  const closeMenu = () => setMenuOpen(false);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    closeMenu();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl font-extrabold tracking-tight text-green-600"
        >
          My<span className="text-gray-900">Store.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={navLinkClass}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Search */}
        <div className="hidden xl:block">
          <div className="relative">
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700 sm:px-4"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
                d="M3 3h2l2.2 12.1a2 2 0 0 0 2 1.6h8.3a2 2 0 0 0 2-1.6L21 7H6M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
              />
            </svg>

            <span className="hidden sm:inline">Cart</span>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
              {cartCount}
            </span>
          </Link>

          {/* Authentication */}
          {userId ? (
            <button
              type="button"
              onClick={logOut}
              className="hidden rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 sm:block"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 sm:block"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-xl border border-gray-200 p-2 text-gray-700 transition hover:bg-gray-50 lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 6l12 12M18 6L6 18"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={navLinkClass}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile Search */}
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
            />

            {/* Mobile Authentication */}
            {userId ? (
              <button
                type="button"
                onClick={logOut}
                className="w-full rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="w-full rounded-xl bg-green-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
