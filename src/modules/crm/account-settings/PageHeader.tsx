interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div>
      <h6 className="text-lg text-black-100 font-medium pb-3 font-satoshi ">
        {title}
      </h6>
      <p className="text-lg font-normal font-satoshi text-gray-2">
        {subtitle}{" "}
      </p>
    </div>
  );
}
