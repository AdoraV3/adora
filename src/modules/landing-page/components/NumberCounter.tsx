import NumberTicker from "@/components/animations/number-ticker";

interface NumberCounterProps {
  value: number;
  label: string;
}

export default function NumberCounter({ value, label }: NumberCounterProps) {
  return (
    <div className="text-center md:text-left">
      <h6 className="text-brown-200  mb-0 md:mb-2 font-coreC font-semibold text-6xl">
        <NumberTicker value={value} />
      </h6>
      <p className="font-satoshi font-normal text-[#575757] text-lg mb-4 md:mb-0">
        {label}{" "}
      </p>
    </div>
  );
}
