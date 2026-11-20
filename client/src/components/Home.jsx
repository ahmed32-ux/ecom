
import { useState } from "react";

import Navbar from "./Navbar";
import Hero from "./home/Hero";
import Categories from "./home/Categories";
import ProductGrid from "./home/ProductGrid";
import OfferBanner from "./home/OfferBanner";
import WhyChooseUs from "./home/WhyChooseUs";
import Footer from "./home/Footer";

function Home() {
  // Search State
  const [search, setSearch] = useState("");

  // Category State
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <main>
        <Hero />

        {/* Categories */}
        <Categories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Products */}
        <ProductGrid
          activeCategory={activeCategory}
          search={search}
        />

        <OfferBanner />

        <WhyChooseUs />
      </main>

      <Footer />

    </div>
  );
}

export default Home;
