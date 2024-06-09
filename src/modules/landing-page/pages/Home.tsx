import { Brands } from "../components/Brands";
import Faq from "../components/Faq";
import Revolution from "../components/Revolution";
import { UseCases } from "../components/UseCases";

export function Home() {
  return (
    <main>
      <Revolution />
      <UseCases />

      <Brands />

      <Faq />
    </main>
  );
}
