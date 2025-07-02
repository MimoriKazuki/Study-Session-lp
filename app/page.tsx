import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TargetSection from "@/components/TargetSection";
import LearnSection from "@/components/LearnSection";
import GameShowcase from "@/components/GameShowcase";
import ScheduleSection from "@/components/ScheduleSection";
import InstructorSection from "@/components/InstructorSection";
import OverviewSection from "@/components/OverviewSection";
import FAQ from "@/components/FAQ";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TargetSection />
        <LearnSection />
        <GameShowcase />
        <ScheduleSection />
        <OverviewSection />
        <InstructorSection />
        <FAQ />
        <ApplicationForm />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}