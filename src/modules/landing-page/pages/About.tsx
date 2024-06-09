import { RevolutionItem } from "../components/RevolutionItem";

export function About() {
  return (
    <main>
      <div className="max-w-md mx-auto">
        <h3 className="font-normal font-coreC text-black-100 text-5xl ">
          Empowering businesses to thrive
        </h3>
        <p className="font-normal font-satoshi text-lg text-gray-2 mt-2">
          Adora is a state-of-the-art AI technology that solve customer base
          problems for ambitious businesses. Our mission is to shape businesses
          and be partners in success.
        </p>
      </div>

      <div className="mt-10 space-y-3">
        <RevolutionItem
          image="/images/retail.png"
          title="Who We Are"
          description="We are Adora—an innovative force driving the future of customer service. Join us on our journey as we redefine what’s possible and create a world where every customer interaction leaves a lasting impression."
        />
        <RevolutionItem
          image="/images/retail.png"
          title="What We Do"
          description="At Adora, we specialize in leveraging cutting-edge AI technology to transform customer service. We provide businesses with innovative solutions that combine the empathy of human agents with the efficiency and scalability of AI. From setting up AI-powered call centers to delivering personalized customer interactions, we’re dedicated to redefining the customer service experience for businesses worldwide."
        />
      </div>
    </main>
  );
}
