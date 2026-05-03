import NavBar from "@/components/biohumus/NavBar";
import HeroSection from "@/components/biohumus/HeroSection";
import AboutServices from "@/components/biohumus/AboutServices";
import PricingCalculator from "@/components/biohumus/PricingCalculator";
import Reviews from "@/components/biohumus/Reviews";
import ContactsFooter from "@/components/biohumus/ContactsFooter";
import IOSInstallBanner from "@/components/biohumus/IOSInstallBanner";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <HeroSection />
      <AboutServices />
      <PricingCalculator />
      <Reviews />
      <ContactsFooter />
      <IOSInstallBanner />
    </div>
  );
}