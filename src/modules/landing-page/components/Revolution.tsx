import { REVOLUTION_ITEMS } from "@/mock";
import { PageHeader } from "@/modules/commons/components/PageHeader";
import { RevolutionItem } from "./RevolutionItem";

export default function Revolution() {
  return (
    <section className="px-4 md:px-12">
      <PageHeader
        title="Revolutionize Customer Service: Adora"
        subtitle="An AI intelligent assistant for exceptional customer experiences."
      />

      <div className="mx-auto mt-16  flex max-w-4xl flex-col gap-5">
        {REVOLUTION_ITEMS?.map((el, i) => (
          <RevolutionItem
            title={el.title}
            description={el.description}
            image={el.image}
            key={el.title}
            variant={i % 2 === 0 ? "default" : "reverse"}
          />
        ))}
      </div>
    </section>
  );
}
