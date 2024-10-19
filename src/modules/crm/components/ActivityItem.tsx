import Link from "next/link";

interface ActivityItemProps {
  text: string;
  link: string;
}
export default function ActivityItem({ text, link }: ActivityItemProps) {
  return (
    <div className="flex gap-4 mb-3 items-center">
      <p className="font-medium text-sm text-gray-2 font-satoshi">{text} </p>
      <Link
        className="text-primary font-medium text-xs font-satoshi"
        href={link}
      >
        See Details
      </Link>
    </div>
  );
}
