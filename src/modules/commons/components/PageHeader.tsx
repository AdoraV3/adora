import BlurIn from "@/components/animations/blur-in";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="pt-10 md:pt-20">
      <BlurIn
        className=" text-xl md:text-4xl text-black-100 font-normal pb-3 font-coreC "
        word={title}
      />

      <p className="text-sm md:text-lg font-normal font-satoshi text-gray-2">
        {subtitle}{" "}
      </p>
    </div>
  );
}
