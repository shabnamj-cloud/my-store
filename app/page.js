import Hero from "./components/hero";
import FeaturesSection from "./components/features";
import BestSellerSlider from "./components/bestseller";
import DiscountProductsSection from "./components/discount";
import CategoriesSection from "./components/laptopcategory";
import PhoneCategoriesSection from "./components/phonecategory";

// app/page.js
export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturesSection/>
      <BestSellerSlider />
      <DiscountProductsSection />
      <CategoriesSection />
      <PhoneCategoriesSection />

    </div>
  );
}