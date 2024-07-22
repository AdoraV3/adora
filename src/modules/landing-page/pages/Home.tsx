import { CreateAccount } from "../CreateAccount";
import { Brands } from "../components/Brands";
import Faq from "../components/Faq";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { Navbar } from "../components/Navbar";
import Revolution from "../components/Revolution";
import { UseCases } from "../components/UseCases";

export function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Revolution />
      <HowItWorks />
      <UseCases />

      <Brands />
      <CreateAccount />
      <Faq />
      <Footer />
    </>
  );
}
