import SiteNav from "./components/SiteNav";
import Hero from "./components/Hero";
import TripStyles from "./components/TripStyles";
import ProofOfStay from "./components/ProofOfStay";
import FeaturedBocas from "./components/FeaturedBocas";
import BottomCTA from "./components/BottomCTA";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteNav />
      <Hero />
      <TripStyles />
      <ProofOfStay />
      <FeaturedBocas />
      <BottomCTA />
      <SiteFooter />
    </>
  );
}
