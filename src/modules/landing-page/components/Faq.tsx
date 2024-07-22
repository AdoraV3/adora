import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQs } from "@/mock";

export default function Faq() {
  return (
    <section>
      <div className="mb-10 px-4 md:px-12">
        <h6 className="text-black-100 text-xl md:text-4xl font-normal font-coreC mb-2">
          Frequently Asked Questions
        </h6>
        <p className="font-satoshi text-lg text-gray-2 font-normal">
          You&apos;ll find answers to some of the most commonly asked questions
          about our AI customer support solution.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        {FAQs?.map(el => (
          <Accordion key={el.id} type="single" collapsible>
            <AccordionItem className=" px-6 mb-5" value={el.title}>
              <AccordionTrigger className="font-satoshi font-medium text-xl text-black-100 ">
                {el.title}{" "}
              </AccordionTrigger>
              <AccordionContent className="font-satoshi font-normal text-lg text-gray-2">
                {el.content}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </section>
  );
}
