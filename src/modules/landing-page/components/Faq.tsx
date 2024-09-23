"use client";

import { FAQs } from "@/mock";
import { useState } from "react";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";

export default function Faq() {
  const [selected, setselected] = useState<number>(0);
  return (
    <section>
      <div className="mx-auto mb-16 px-4 text-center md:max-w-[70%] md:px-12">
        <h6 className="mb-2 font-coreC text-xl font-normal text-[#575757] md:text-4xl">
          Frequently Asked Questions
        </h6>
        <p className="font-satoshi text-lg font-normal text-gray-2">
          You&apos;ll find answers to some of the most commonly asked questions
          about our AI customer support solution.
        </p>
      </div>

      <div className="mx-auto mb-20 px-4 md:max-w-3xl">
        {FAQs?.map((el, index) => {
          return (
            <div
              key={Number(index)}
              className={`mb-4 flex flex-row rounded-2xl px-4 py-6 md:px-6 md:py-6 ${
                selected === index
                  ? "border border-[#653716] shadow-2xl"
                  : "bg-white border border-[#57575710] shadow-sm"
              }`}
            >
              <div>
                <h3 className="mb-4 w-[100%] text-xl text-[#321B0B] md:text-2xl">
                  {el.title}
                </h3>
                {selected === index && (
                  <p
                    className={`leading-6 text-[#0D0D0D90] md:w-[80%] md:leading-8 
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
                  selected === index ? "bg-[#653716]" : "bg-white"
                } mb-auto ml-auto rounded-full p-2 shadow-xl`}
              >
                {selected === index ? (
                  <FaAngleRight color="#fff" size={24} />
                ) : (
                  <FaAngleDown color="#000" size={24} />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
