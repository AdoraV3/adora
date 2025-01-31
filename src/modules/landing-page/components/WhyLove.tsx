import { WHY_LOVE } from "@/mock";
import { PageHeader } from "@/modules/commons/components/PageHeader";
import Image from "next/image";

export function WhyLove() {
  return (
    <section className="my-20 px-4 md:px-12">
      <PageHeader
        title="Why you'll love Adora"
        subtitle="An AI intelligent assistant for exceptional customer experiences."
      />

      <div className="mt-14 flex flex-col md:flex-wrap md:flex-row gap-x-6 gap-y-8">
        {WHY_LOVE.map(({ image, title, text }) => (
          <div
            className="flex flex-row items-center rounded-lg px-5 py-5 border border-[#d9d9d9] md:w-[48%]"
            key={text}
          >
            <Image
              width={200}
              height={200}
              key={image}
              src={image}
              alt={image}
              className="h-10 mr-3 w-10 rounded-full"
            />
            <div>
              <p className="font-light text-2xl ">{title}</p>
              <p className="font-extralight text-black-100">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
