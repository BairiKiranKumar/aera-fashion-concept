import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { CollectionIntro } from "@/components/home/CollectionIntro";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { EditorialCampaign } from "@/components/home/EditorialCampaign";
import { CategoryBlocks } from "@/components/home/CategoryBlocks";
import { HorizontalStory } from "@/components/home/HorizontalStory";
import { NewArrivals } from "@/components/home/NewArrivals";
import { BrandStatement } from "@/components/home/BrandStatement";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F2EC]">
      <Navbar variant="floating" />
      <main className="flex-1">
        <HeroSection />
        <CollectionIntro />
        <FeaturedProducts />
        <EditorialCampaign />
        <CategoryBlocks />
        <HorizontalStory />
        <NewArrivals />
        <BrandStatement />
      </main>
      <Footer />
    </div>
  );
}
