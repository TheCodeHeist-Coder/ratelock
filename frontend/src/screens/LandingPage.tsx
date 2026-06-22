import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/featureSecton";
import RateLimiterHero from "../components/Animations";
import {
  CompaniesRow,
  IntegrationSection,
  StatsSection,
  PricingSection,
  CTASection,
  Footer,
} from "../components/landingComponents";
import "../components/HeroSection.css";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <CompaniesRow />
      <FeaturesSection />
      <IntegrationSection />
      <RateLimiterHero />
      <StatsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
