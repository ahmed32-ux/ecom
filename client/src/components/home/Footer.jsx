import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 px-5 py-12 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 md:grid-cols-4">

        <div>
          <h2 className="text-2xl font-extrabold text-green-400">
            MyStore.
          </h2>
          <p className="mt-4 leading-7 text-gray-400">
            Your favorite online shopping destination.
          </p>
        </div>

        <div>
          <h3 className="font-bold">Quick Links</h3>
          <div className="mt-4 flex flex-col gap-3 text-gray-400">
            <Link  to="/">Home </Link>
            <Link  to="/products">Products </Link>
            <Link  to="/categories">Categories</Link>
            <Link  to="/about">About Us </Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Account</h3>
          <div className="mt-4 flex flex-col gap-3 text-gray-400">
            <Link to="/login">Login</Link>
            <Link to="/signup">Create Account</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Contact</h3>
          <div className="mt-4 flex flex-col gap-3 text-gray-400">
            <p>support@mystore.com</p>
            <p>Customer Support</p>
          </div>
        </div>

      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © 2026 MyStore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
