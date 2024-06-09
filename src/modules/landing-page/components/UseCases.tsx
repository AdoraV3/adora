import { UseCaseItem } from "./UseCaseItem";

export function UseCases() {
  return (
    <div className="mt-20">
      <div className="px-12">
        <h2 className="text-black-100 font-coreC text-4xl pb-2">Uses Cases</h2>
        <p className="max-w-sm font-satoshi text-gray-2 font-normal text-lg">
          A glimpse into how Adora streamlines various aspects of customer
          service across different industries.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 px-20 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <UseCaseItem
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            image="/images/retail.png"
            title="Retail & e-commerce"
            description="Adora provides instant troubleshooting and answers to frequently asked questions, freeing up human agents for more complex issues."
          />
        ))}
      </div>
    </div>
  );
}
