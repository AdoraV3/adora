import BlurIn from "@/components/animations/blur-in";
import { HowItWorksItem } from "./HowItWorksItem";

export function HowItWorks() {
  return (
    <section className="grid items-center gap-5 px-4 py-20 md:grid-cols-2 md:px-12">
      <div>
        <BlurIn
          word=" How it Works"
          className="pb-2 font-coreC text-4xl text-black-100"
        />

        <p className="max-w-sm font-satoshi text-lg font-normal text-gray-2">
          Thousands of organizations of all sizes trust Adora to grow their
          business.
        </p>
      </div>

      <div>
        <HowItWorksItem
          subTitle="Choose a phone number, voice, language, give it a name to create a custom AI agent that reflects your brand."
          title="Set Up Your AI Agent"
          isActive
        />
        <HowItWorksItem
          subTitle="Add company information and scripts to empower your AI agent with the tools to handle customer inquiries like a pro."
          title="Upload to Knowledge Base"
        />
        <HowItWorksItem
          subTitle="Make your assigned phone number available to your customers and watch as incoming calls are resolved instantly with speed and efficiency."
          title="Go Live"
        />
        <HowItWorksItem
          subTitle="Handle over 1 million concurrent calls with our Kubernetes-based infrastructure designed for scalability and high availability."
          title="Scale with Ease"
        />
      </div>
    </section>
  );
}
