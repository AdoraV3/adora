import { Icons } from "@/components/icons";

interface FeatureItemProps {
  text: string;
}
export function FeatureItem({ text }: FeatureItemProps) {
  return (
    <div className="flex gap-2 items-center">
      <div className="size-5 bg-[hsla(25,64%,36%,0.15)] rounded-full p-1">
        <Icons.Check className="text-primary w-4 h-4" />
      </div>
      <p className="font-normal text-sm  font-satoshi">{text}</p>
    </div>
  );
}
