import { CreateAccount } from "../CreateAccount";
import Testimonials from "../Testimonials";
import { Brands } from "../components/Brands";
import Faq from "../components/Faq";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { Navbar } from "../components/Navbar";
import { UseCases } from "../components/UseCases";
import { WhyLove } from "../components/WhyLove";

export function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <Revolution /> */}

      <WhyLove />
      <HowItWorks />
      <UseCases />

      <Brands />
      <CreateAccount />
      <Testimonials />
      <Faq />
      <Footer />
    </>
  );
}
