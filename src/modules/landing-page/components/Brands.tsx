import { BRANDS } from "@/mock";
import { PageHeader } from "@/modules/commons/components/PageHeader";
import Image from "next/image";

export function Brands() {
  return (
    <section className="my-20 px-12">
      <PageHeader
        title="Trusted by 50,000+ businesses"
        subtitle="Thousands of organizations of all sizes trust Adora to grow their business."
      />

      <div className="grid mt-10 gap-5 grid-cols-6">
        {BRANDS.map(brand => (
          <Image
            key={brand}
            src={brand}
            width={147.27}
            className="object-contain"
            height={27.98}
            alt={brand}
          />
        ))}
      </div>
    </section>
  );
}
