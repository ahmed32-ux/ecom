import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-1 -mt-[4vh] py-8 sm:py-12">
      <div className="relative overflow-hidden rounded-3xl bg-gray-50 px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        {/* Decorative Background */}
        <div className="absolute -right-20 -top-24 h-70 w-72 rounded-full bg-green-100/90 blur-3xl" />
        <div className="absolute -bottom-24 right-1/3 h-64 w-64 rounded-full bg-green-100/50 blur-3xl" />

        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          {/* Hero Content */}
          <div className="max-w-xl">
            <span className="inline-flex rounded-full border border-green-100 bg-white px-4 py-2 text-sm font-medium text-green-700">
              Welcome to MyStore
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Everyday essentials,
              <span className="mt-2 block text-green-600">
                made easier.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-gray-500 sm:text-lg">
              Find the things you need, discover something new and enjoy
              shopping without the hassle. Everything you love, all in one place.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-3 rounded-xl bg-green-600 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-green-700 hover:shadow-md"
              >
                Start Shopping
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                to="/categories"
                className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
              >
                Browse Categories
              </Link>
            </div>

            {/* Small Highlights */}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-gray-200 pt-6">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Easy Shopping
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Simple & convenient
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Quality Products
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Carefully selected
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Secure Checkout
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Shop with confidence
                </p>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative overflow-hidden rounded-3xl bg-green-100 p-4 sm:p-6">
              <img
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1000&q=80"
                alt="Shopping and everyday products"
                className="h-72 w-full rounded-2xl object-cover sm:h-96"
              />

              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 max-w-xs rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur-sm sm:bottom-10 sm:left-10">
                <p className="text-sm font-semibold text-gray-900">
                  Everything in one place
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Explore a range of products for everyday needs.
                </p>
              </div>
            </div>

            {/* Decorative Circle */}
            <div className="absolute -right-5 -top-5 -z-10 h-24 w-24 rounded-full border-[12px] border-green-100 sm:-right-8 sm:-top-8 sm:h-32 sm:w-32 sm:border-[16px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
