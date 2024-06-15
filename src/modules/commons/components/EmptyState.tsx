import { cn } from "@/lib/utils";
import Image from "next/image";

interface EmptyStateProps {
  text?: string;
  image?: string;
  className?: string;
  size?: number;
}
export function EmptyState({ text, image, className, size }: EmptyStateProps) {
  return (
    <section
      className={cn(
        "flex w-full flex-col items-center justify-center gap-3",
        className,
      )}
    >
      {image && (
        <div>
          <Image
            width={size ?? 208}
            height={size ?? 208}
            alt="empty state"
            src={image}
          />
        </div>
      )}
      <p className="font-satoshi text-base font-medium text-primary">
        {text ?? "No data found"}{" "}
      </p>{" "}
    </section>
  );
}
