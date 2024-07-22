import NumberTicker from "@/components/animations/number-ticker";

interface NumberCounterProps {
  value: number;
  label: string;
}

export default function NumberCounter({ value, label }: NumberCounterProps) {
  return (
    <div>
      <h6 className="text-brown-200 mb-2 font-coreC font-semibold text-6xl">
        <NumberTicker value={value} />
      </h6>
      <p className="font-satoshi font-normal text-black-100 text-lg">
        {label}{" "}
      </p>
    </div>
  );
}
