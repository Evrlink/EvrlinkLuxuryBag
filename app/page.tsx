import Navbar from "@/components/Navbar";
import HeroBannerClient from "@/components/HeroBannerClient";
import TheProblem from "@/components/TheProblem";
import TheSolution from "@/components/TheSolution";
import WhyNow from "@/components/WhyNow";
import ClosingSection from "@/components/ClosingSection";
import SectionScrollController from "@/components/SectionScrollController";

export default function Home() {
  return (
    <>
      <SectionScrollController />
      <Navbar />
      <HeroBannerClient />
      <TheProblem />
      <TheSolution />
      <WhyNow />
      <ClosingSection />
    </>
  );
}
