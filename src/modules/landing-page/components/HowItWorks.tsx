import BlurIn from "@/components/animations/blur-in";
import { HowItWorksItem } from "./HowItWorksItem";

export function HowItWorks() {
  return (
    <section className="grid py-20 items-center md:grid-cols-2 px-4 md:px-12 gap-5">
      <div>
        <BlurIn
          word=" How it Works"
          className="text-black-100 font-coreC text-4xl pb-2"
        />

        <p className="max-w-sm font-satoshi text-gray-2 font-normal text-lg">
          Thousands of organizations of all sizes trust Adora to grow their
          business.
        </p>
      </div>

      <div>
        <HowItWorksItem
          subTitle="Our team will work closely with you to understand your business needs and tailor a customized solution that fits your requirements."
          title="Consultation"
          isActive
        />
        <HowItWorksItem
          subTitle="We’ll seamlessly integrate Adora into your existing systems, ensuring minimal disruption to your operations."
          title="Implementation"
        />
        <HowItWorksItem
          subTitle="Our AI agents undergo rigorous training to ensure they’re equipped to handle a wide range of customer inquiries and interactions."
          title="Training"
        />
        <HowItWorksItem
          subTitle="Once implemented, our team will provide ongoing support to ensure everything runs smoothly, allowing you to focus on what you do best – growing your business."
          title="Launch & Support"
        />
      </div>
    </section>
  );
}
