/* eslint-disable sonarjs/no-duplicate-string */

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Testimonials() {
  const testimony = [
    {
      name: "Dr. Nathan A.​",
      role: "Clinic Director, Healthy Minds Clinic​",
      image: "/images/user.png",
      text: "Adora has transformed our patient care experience. The AI agents handle appointments and inquiries with such empathy and efficiency, our patients feel truly valued.​",
    },
    {
      name: "Dr. Nathan k.​",
      role: "Clinic Director, Healthy Minds Clinic.​",
      image: "/images/user.png",
      text: "Adora has transformed our patient care experience. The AI agents handle appointments and inquiries with such empathy and efficiency, our patients feel truly valued.​",
    },
    {
      name: "Dr. Nathan k.​",
      role: "Clinic Director, Healthy Minds Clinic.​",
      image: "/images/user.png",
      text: "Adora has transformed our patient care experience. The AI agents handle appointments and inquiries with such empathy and efficiency, our patients feel truly valued.​",
    },
    {
      name: "Dr. Nathan k.​",
      role: "Clinic Director, Healthy Minds Clinic.​",
      image: "/images/user.png",
      text: "Adora has transformed our patient care experience. The AI agents handle appointments and inquiries with such empathy and efficiency, our patients feel truly valued.​",
    },
    {
      name: "Dr. Nathan k.​",
      role: "Clinic Director, Healthy Minds Clinic.​",
      image: "/images/user.png",
      text: "Adora has transformed our patient care experience. The AI agents handle appointments and inquiries with such empathy and efficiency, our patients feel truly valued.​",
    },
    {
      name: "Dr. Nathan k.​",
      role: "Clinic Director, Healthy Minds Clinic.​",
      image: "/images/user.png",
      text: "Adora has transformed our patient care experience. The AI agents handle appointments and inquiries with such empathy and efficiency, our patients feel truly valued.​",
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
      breakpoint: { max: 600, min: 400 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 400, min: 0 },
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
    <div className="bg-white w-full px-6 pb-[10rem] pt-20 md:px-14 lg:px-24 ">
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
              className="xs:w-[250px] relative  mr-4 rounded-[5rem] border bg-[#00000005] px-3 pb-5 pt-10 sm:w-[300px] md:mr-6 md:w-[400px] md:px-4 lg:w-[450px] xl:w-[400px]"
            >
              <Image
                src={image}
                height={200}
                width={200}
                className="absolute -top-[20%] right-[42%] h-20 w-20 rounded-xl object-cover"
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
