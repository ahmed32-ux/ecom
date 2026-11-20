
function OfferBanner() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-green-700 p-10 text-white md:flex-row md:px-16">
        <div>
          <p className="font-semibold text-green-200">
            SPECIAL OFFER
          </p>

          <h2 className="mt-3 text-4xl font-extrabold">
            Amazing Deals Are Waiting!
          </h2>

          <p className="mt-4 text-green-100">
            Discover your favorite products at great prices.
          </p>

          <a
            href="#products"
            className="mt-6 inline-block rounded-xl bg-white px-7 py-3 font-bold text-green-700 hover:bg-green-50"
          >
            Explore Products
          </a>
        </div>

        <div className="text-8xl">🛍️</div>
      </div>
    </section>
  );
}

export default OfferBanner;
