import HeroSection from "../components/HeroSection";
import RateLimiterHero from "../components/Animations";
import {
  CompaniesRow,
  IntegrationSection,
  StatsSection,
  CTASection,
  Footer,
} from "../components/landingComponents";
import "../components/HeroSection.css";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <CompaniesRow />
      <IntegrationSection />
      <RateLimiterHero />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
