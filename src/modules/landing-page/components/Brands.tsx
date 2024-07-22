import { BRANDS } from "@/mock";
import { PageHeader } from "@/modules/commons/components/PageHeader";

export function Brands() {
  return (
    <section className="my-20 px-4 md:px-12">
      <PageHeader
        title="Trusted by 50,000+ businesses"
        subtitle="Thousands of organizations of all sizes trust Adora to grow their business."
      />

      <div className="grid mt-10 gap-5 grid-cols-6">
        {BRANDS.map(brand => (
          <div className="">
            <img key={brand} src={brand} alt={brand} />
          </div>
        ))}
      </div>
    </section>
  );
}
