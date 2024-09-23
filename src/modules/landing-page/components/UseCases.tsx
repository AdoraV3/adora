import BlurIn from "@/components/animations/blur-in";
import { USE_CASES } from "@/mock";
import { UseCaseItem } from "./UseCaseItem";

export function UseCases() {
  return (
    <div className="mt-10 md:mt-20">
      <div className="px-4 md:px-12">
        <BlurIn
          className="text-[#575757] text-left font-coreC text-4xl pb-2"
          word="Uses Cases"
        />
        <p className="max-w-md font-satoshi text-gray-2 font-normal text-lg mb-5">
          A glimpse into how Adora streamlines various aspects of customer
          service across different industries.
        </p>
      </div>

      <div className="mt-5 grid md:grid-cols-2 md:px-12 gap-6">
        {USE_CASES.map(el => (
          <UseCaseItem
            key={el.title}
            image={el.image}
            title={el.title}
            description={el.description}
          />
        ))}
      </div>
    </div>
  );
}
