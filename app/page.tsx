import SiteNav from "./components/SiteNav";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import TripStyles from "./components/TripStyles";
import ProofOfStay from "./components/ProofOfStay";
import Countries from "./components/Countries";
import BottomCTA from "./components/BottomCTA";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteNav />
      <Hero />
      <HowItWorks />
      <TripStyles />
      <ProofOfStay />
      <Countries />
      <BottomCTA />
      <SiteFooter />
    </>
  );
}
