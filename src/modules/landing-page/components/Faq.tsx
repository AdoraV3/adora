"use client";

import { FAQs } from "@/mock";
import { ChevronDownIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Faq() {
  const [selected, setselected] = useState<number>(0);
  return (
    <section className="bg-[#190E05] py-10">
      <div className="mx-auto mb-16 px-4 text-center md:max-w-[70%] md:px-12">
        <h6 className="mb-2 font-coreC text-xl font-normal text-[#fff] md:text-4xl">
          Frequently Asked Questions
        </h6>
        <p className="font-satoshi text-lg font-normal text-[#ffffff50]">
          You&apos;ll find answers to some of the most commonly asked questions
          about our AI customer support solution.
        </p>
      </div>

      <div className="mx-auto mb-20 px-4 md:max-w-3xl">
        {FAQs?.map((el, index) => {
          return (
            <div
              key={el.id}
              className={`bg-[#EDE2DA26] mb-4 flex flex-row rounded-2xl px-4 py-6 md:px-6 md:py-6 ${
                selected === index ? "shadow-2xl" : "shadow-sm"
              }`}
            >
              <div>
                <h3 className="mb-4 w-[100%] text-xl text-[#fff] md:text-2xl">
                  {el.title}
                </h3>
                {selected === index && (
                  <p
                    className={`leading-6 text-[#ffffff50] md:w-[80%] md:leading-8
                  `}
                  >
                    {el.content}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (selected === index) {
                    setselected(-1);
                  } else {
                    setselected(index);
                  }
                }}
                className={`${
                  selected === index ? "" : "bg-white"
                } mb-auto ml-auto rounded-full p-2 shadow-xl`}
              >
                {selected === index ? (
                  <ChevronDownIcon color="#fff" size={24} />
                ) : (
                  <ChevronRight color="#fff" size={24} />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
