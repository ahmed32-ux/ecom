import { Link } from "react-router-dom";

function OfferBanner() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-green-700 px-6 py-10 text-white sm:px-12 sm:py-14 md:px-16">
        {/* Decorative shapes */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-600/40" />
        <div className="absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-green-800/30" />

        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-wider text-green-200">
              A little something for you
            </p>

            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Great finds, <br className="hidden sm:block" />
              even better prices.
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-6 text-green-100 sm:text-base">
              Take a look at what’s on offer and find something you’ll love,
              all without stretching your budget.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-green-700 transition-all duration-300 hover:bg-green-50 hover:shadow-md"
            >
              Explore Products
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* Decorative visual */}
          <div className="relative hidden h-40 w-40 items-center justify-center md:flex lg:h-52 lg:w-52">
            <div className="absolute inset-0 rounded-full border border-white/20" />
            <div className="absolute inset-5 rounded-full border border-white/20" />
            <div className="absolute inset-10 rounded-full bg-white/10 backdrop-blur-sm" />
            <div className="relative h-16 w-16 rounded-2xl bg-white/15 shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-110 lg:h-20 lg:w-20" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default OfferBanner;
