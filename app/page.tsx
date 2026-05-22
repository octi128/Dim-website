import Hero from "@/components/home/Hero";
import DiseaseSearch from "@/components/home/DiseaseSearch";
import Specialties from "@/components/home/Specialties";
import FeaturedBanners from "@/components/home/FeaturedBanners";
import WhyDIM from "@/components/home/WhyDIM";
import AppPromo from "@/components/home/AppPromo";
import Coverages from "@/components/home/Coverages";
import News from "@/components/home/News";
import Centers from "@/components/home/Centers";

export default function Home() {
  return (
    <>
      <Hero />
      <DiseaseSearch />
      <Specialties />
      <FeaturedBanners />
      <WhyDIM />
      <AppPromo />
      <Coverages />
      <News />
      <Centers />
    </>
  );
}
