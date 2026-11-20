
function WhyChooseUs() {
  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Get your orders delivered to your doorstep.",
    },
    {
      icon: "🔒",
      title: "Secure Payments",
      description: "Enjoy safe and secure shopping.",
    },
    {
      icon: "⭐",
      title: "Quality Products",
      description: "Shop quality products at great prices.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-16" id="about">
      <div className="text-center">
        <p className="font-semibold text-green-600">
          WHY CHOOSE US
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          Shopping Made Easy
        </h2>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl bg-white p-8 text-center shadow-sm"
          >
            <div className="text-5xl">{feature.icon}</div>

            <h3 className="mt-5 text-xl font-bold">
              {feature.title}
            </h3>

            <p className="mt-3 text-gray-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
