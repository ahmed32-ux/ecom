import react from 'react';

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <div className="flex min-h-[400px] items-center overflow-hidden rounded-3xl bg-green-50 px-8 py-12 md:px-16">
        <div className="max-w-xl">
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-600">
            Welcome to Our Store
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 md:text-6xl">
            Discover Your
            <span className="block text-green-600">
              Favorite Products
            </span>
          </h1>

          <p className="mt-5 leading-7 text-gray-600">
            Explore the latest products, find amazing deals
            and enjoy a smooth shopping experience.
          </p>

          <a
            href="#categories"
            className="mt-8 inline-block rounded-xl bg-green-600 px-8 py-4 font-semibold text-white transition hover:bg-green-700"
          >
            Shop Now →
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
