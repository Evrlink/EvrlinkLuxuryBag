import NavbarNew from "@/components/NavbarNew";
import HeroNew from "@/components/HeroNew";
import ProblemNew from "@/components/ProblemNew";
import TheGap from "@/components/TheGap";
import BenefitsNew from "@/components/BenefitsNew";
import WhyNowNew from "@/components/WhyNowNew";
import FinalCTANew from "@/components/FinalCTANew";
import StatementNew from "@/components/StatementNew";
import SiteFooter from "@/components/SiteFooter";

// Previous components preserved (not deleted):
// import Navbar from "@/components/Navbar";
// import HeroBannerClient from "@/components/HeroBannerClient";
// import TheProblem from "@/components/TheProblem";
// import TheSolution from "@/components/TheSolution";
// import WhyNow from "@/components/WhyNow";
// import ClosingSection from "@/components/ClosingSection";
// import ContactSection from "@/components/ContactSection";
// import EndingStatementSection from "@/components/EndingStatementSection";
// import SectionScrollController from "@/components/SectionScrollController";

export default function Home() {
  return (
    <>
      <NavbarNew />
      <HeroNew />
      <ProblemNew />
      <TheGap />
      <BenefitsNew />
      <WhyNowNew />
      <FinalCTANew />
      <StatementNew />
      <SiteFooter />
    </>
  );
}
