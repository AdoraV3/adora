import { PageHeader } from "@/modules/commons/components/PageHeader";
import { RevolutionItem } from "./RevolutionItem";

export default function Revolution() {
  return (
    <section>
      <div className="px-12">
        <PageHeader
          title="Revolutionize Customer Service: Adora"
          subtitle="An AI intelligent assistant for exceptional customer experiences."
        />
      </div>

      <div className="flex-col mt-12  max-w-3xl mx-auto flex">
        {Array.from({ length: 3 })?.map((_, i) => (
          <RevolutionItem
            title="AI-Powered Assistance"
            description="Our AI customer service agents are equipped to handle inbound and outbound calls, process orders, schedule appointments, and even securely process payments, all with the finesse and empathy of a seasoned human agent."
            image="/images/retail.png"
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            variant={i === 1 ? "flip" : "default"}
          />
        ))}
      </div>
    </section>
  );
}
