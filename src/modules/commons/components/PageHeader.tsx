interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div>
      <h6 className="text-4xl text-black-100 font-normal pb-3 font-coreC ">
        {title}
      </h6>
      <p className="text-lg font-normal font-satoshi text-gray-2">
        {subtitle}{" "}
      </p>
    </div>
  );
}
