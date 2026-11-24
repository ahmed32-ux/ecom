import { Link } from "react-router-dom";
function WhyChooseUs() {
  const features = [
    {
      title: "Fast Delivery",
      description: "We deliver your orders right to your doorstep, without the hassle.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            d="M3 7h11v10H3zM14 10h4l3 3v4h-7zM7.5 17a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
          />
        </svg>
      ),
    },
    {
      title: "Secure Payments",
      description: "Shop with confidence knowing your payment details stay protected.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            d="m9 12 2 2 4-4"
          />
        </svg>
      ),
    },
    {
      title: "Quality Products",
      description: "We bring together products worth buying at prices you'll love.",
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20" id="about">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
          Why shop with us
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping made simple
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          From finding the right product to getting it delivered, we make
          your shopping experience easier, safer and more enjoyable.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-2xl border border-gray-100 bg-white p-7 transition-all duration-300 hover:border-gray-200 hover:bg-gray-50 hover:shadow-sm sm:p-8"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-colors duration-300 group-hover:bg-green-100">
              {feature.icon}
            </div>

            <h3 className="mt-6 text-lg font-semibold text-gray-900">
              {feature.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
