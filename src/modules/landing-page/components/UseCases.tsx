import BlurIn from "@/components/animations/blur-in";
import { USE_CASES } from "@/mock";
import { UseCaseItem } from "./UseCaseItem";

export function UseCases() {
  return (
    <div className="mt-10 md:mt-20 px-4 md:ps-12 md:pe-4">
      <BlurIn
        className="text-black-100 text-left font-coreC text-4xl pb-2"
        word="Use Cases"
      />
      <p className="max-w-md font-satoshi text-gray-2 font-normal text-lg mb-5">
        A glimpse into how Adora streamlines various aspects of customer service
        across different industries.
      </p>

      <div className="mt-5 w-full overflow-x-scroll scrollbar-none gap-6 flex  ">
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
