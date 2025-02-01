import { BRANDS } from "@/mock";
import { PageHeader } from "@/modules/commons/components/PageHeader";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export function Brands() {
  return (
    <section className="my-20 px-4 md:px-12">
      <PageHeader
        title="Our Trusted Partners"
        subtitle="We collaborate with industry-leading organizations to deliver cutting-edge solutions for your business."
      />

      <Marquee>
        {BRANDS.map(brand => (
          <div
            className="flex h-30 flex-row items-center mx-auto w-3/5 sm:w-3/5 md:w-3/5"
            key={brand}
          >
            <Image
              className="w-full h-20 sm:h-20 "
              width={200}
              height={200}
              src={brand}
              alt={brand}
            />
          </div>
        ))}
      </Marquee>
      {/* <PageHeader
        title="Trusted by 50,000+ businesses"
        subtitle="Thousands of organizations of all sizes trust Adora to grow their business."
      />

      <div className="mt-14 grid grid-cols-3 gap-x-6 gap-y-8 md:grid-cols-5 lg:grid-cols-6 ">
        {BRANDS.map(brand => (
          <div className="h-20 flex flex-row items-center">
            <Image
              className="w-4/5"
              width={200}
              height={200}
              key={brand}
              src={brand}
              alt={brand}
            />
          </div>
        ))} */}
    </section>
  );
}
