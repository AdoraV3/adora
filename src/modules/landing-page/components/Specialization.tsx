import BlurIn from "@/components/animations/blur-in";

export function Specialization() {
  const container = [
    {
      title: "Inquiries and FAQs",
      text: "Responds to product, service, or policy-related questions like warranties, return policies, or how to use a product.",
    },
    {
      title: "Customer Account Management",
      text: "Manages customer accounts, including updating customer profile subscriptions, and service upgrades or downgrades.",
    },
    {
      title: "Appointment Scheduling",
      text: "Books appointments during calls in real time, ensuring no opportunity is missed.",
    },
    {
      title: "Technical Support",
      text: "Assists customers with troubleshooting products or service-related technical issues like resolving software malfunctions or configuration issues.",
    },
    {
      title: "Returns, Refunds, and Complaints",
      text: "Processes product returns, handles refund requests, and manages customer dissatisfaction like addressing complaints about defective products or delayed deliveries.",
    },
    {
      title: "Automated Ticket Handling",
      text: "Automatically create or update tickets in your CRM, route the case to the appropriate team (collections, service team, billing, or finance), Triggers automatic follow-up emails or texts after an interaction, Sends reminders to agents for unresolved tickets or pending customer inquiries.",
    },
    {
      title: "Customer Retention and Loyalty",
      text: "Handles subscription cancellation calls and offering incentives or loyalty rewards and discounts to retain customers considering cancelling a service",
    },
  ];
  return (
    <section className=" px-4 py-20 md:px-12">
      <div>
        <BlurIn
          word=" We specialize in these customer support areas"
          className="pb-2 font-coreC text-4xl text-black-100"
        />

        <p className="max-w-sm font-satoshi text-gray-2 text-lg font-normal">
          Adora Specializes in some areas
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between">
        {container.slice(0, 2).map((data) => {
          return <div key={data?.title} className="md:w-[49%] mt-4 px-4 pt-4 min-h-[260px] md:min-h-[190px] bg-white hover:bg-[#321B0B] border border-[#D9D9D9] hover:border-[#975221] rounded-lg hover:text-[#F2F2F7]">
       <h2 className="font-semibold text-xl mb-2 font-coreC text-black hover:text-white">{data?.title}</h2>
       <p className="font-satoshi text-gray-2">{data?.text}</p>
          </div>;
        })}
      </div>
      <div className="flex flex-col md:flex-row md:justify-between">
        {container.slice(2, 5).map((data) => {
          return <div key={data?.title} className="md:w-[32%] mt-4 px-4 pt-4 min-h-[220px] md:min-h-[190px] bg-white hover:bg-[#321B0B] border border-[#D9D9D9] hover:border-[#975221] rounded-lg hover:text-[#F2F2F7]">
            <h2 className="font-semibold text-xl mb-2 font-coreC text-black hover:text-white">{data?.title}</h2>
            <p className="font-satoshi text-gray-2">{data?.text}</p>
          </div>;
        })}
      </div>
      <div className="flex flex-col md:flex-row md:justify-between">
        {container.slice(5, 7).map((data) => {
          return <div key={data?.title} className="md:w-[49%] mt-4 px-4 pt-4 min-h-[220px] md:min-h-[190px] bg-white hover:bg-[#321B0B] border border-[#D9D9D9] hover:border-[#975221] rounded-lg hover:text-[#F2F2F7]">
            <h2 className="font-semibold text-xl mb-2 font-coreC text-black hover:text-white">{data?.title}</h2>
            <p className="font-satoshi text-gray-2">{data?.text}</p>
          </div>;
        })}
      </div>
    </section>
  );
}
