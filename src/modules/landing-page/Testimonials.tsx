/* eslint-disable sonarjs/no-duplicate-string */

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Testimonials() {
  const testimony = [
    {
      id: 1,
      name: " Maria O.​",
      role: "Customer Experience Manager​",
      image: "/images/testimonials/1.jpg",
      text: "Adora Call has completely transformed our customer support. It's like having a 24/7 team that never misses a beat. Our response times have improved, and our customers are happier than ever!​",
    },
    {
      id: 2,
      name: "James L.​",
      role: "Operations Director​",
      image: "/images/testimonials/2.jpg",
      text: "We needed a solution that could handle inquiries across multiple branches, and Adora Call delivered beyond our expectations. Its ability to customize responses for each location is a game-changer.​",
    },
    {
      id: 3,
      name: "Sandra T.​",
      role: "Small Business Owner​",
      image: "/images/testimonials/3.jpg",
      text: "I was amazed at how quickly we got Adora Call set up and running. The onboarding process was smooth, and there were no hidden fees or surprises. Highly recommend it for any business looking to improve efficiency.​",
    },
    {
      id: 4,
      name: "David M.​",
      role: "Head of Support​",
      image: "/images/testimonials/4.jpg",
      text: "Adora Call fits perfectly into our workflow. The ability to customize it to our brand’s tone and needs has strengthened our customer relationships. It feels like an extension of our team!​",
    },
    {
      id: 5,
      name: "Lisa N.​",
      role: "Support Specialist​",
      image: "/images/testimonials/5.jpg",
      text: "Since implementing Adora Call, our support team has seen a 40% reduction in repetitive queries. It’s like having an extra pair of hands to handle the workload while allowing us to focus on more complex tasks.​",
    },
    {
      id: 6,
      name: "Michael K.​",
      role: "Startup Founder​",
      image: "/images/testimonials/1.jpg",
      text: "I love how flexible the subscription plans are! Adora Call grows with our business, and adjusting the plan to fit our changing needs has been effortless. Plus, the no-cancellation-fee policy gives us complete peace of mind.​",
    },
  ];
  const responsive = {
    superExtraLargeDesktop: {
      breakpoint: { max: 3000, min: 1100 },
      items: 3,
    },
    superLargeDesktop: {
      breakpoint: { max: 1200, min: 900 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 900, min: 600 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 600, min: 550 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 550, min: 0 },
      items: 1,
    },
  };
  function ButtonGroup({ next, previous, goToSlide, max, ...rest }: any) {
    const {
      carouselState: { currentSlide, slidesToShow },
    } = rest;
    return (
      <div className="absolute bottom-2 right-[33%] flex gap-x-3 sm:right-[45%]">
        <button
          type="button"
          className={`rounded-full p-5 ${
            currentSlide === 0 ? "bg-[#97522120]" : "bg-[#975221]"
          }`}
          onClick={() => previous()}
        >
          <ChevronLeft size={16} color="rgb(209 213 219)" />
        </button>
        <button
          type="button"
          className={`rounded-full p-5 ${
            currentSlide === slidesToShow ? "bg-[#97522120]" : "bg-[#975221]"
          }`}
          onClick={() => next()}
        >
          <ChevronRight size={16} color="rgb(209 213 219)" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white w-full overflow-hidden px-6 pb-[10rem] pt-20 md:px-14 lg:px-24">
      <h6 className="mb-2 font-coreC text-xl font-normal text-black-100 md:text-4xl">
        Testimonials
      </h6>

      <p className="mb-10 font-satoshi text-lg font-normal text-gray-2">
        What our clients are saying about Adora.
      </p>
      <Carousel
        responsive={responsive}
        arrows={false}
        customButtonGroup={<ButtonGroup />}
        className="py-20"
      >
        {testimony?.map((data, index) => {
          const { image, text, name, role } = data ?? {};
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className="xs:w-[90%] relative mr-4  w-[100%] rounded-[5rem] border bg-[#00000005] px-3 pb-5 pt-10 sm:w-[320px] md:mr-6 md:w-[100%] md:px-4 lg:w-[95%] xl:w-[350px]"
            >
              <Image
                src={image}
                height={200}
                width={200}
                className="absolute -top-[20%] right-[36%] h-20 w-20 rounded-full border-2 border-[#97522180] object-cover md:right-[42%]"
                alt={image}
              />
              <p className="text-md w-full text-center font-light text-[#050505]">
                {text}
              </p>
              <h4 className="mt-4 text-center text-lg font-semibold text-[#975221]">
                {name}
              </h4>
              <p className="text-xm mb-3 text-center text-[#828288]">{role}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default Testimonials;
