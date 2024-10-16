import ActivityItem from "./ActivityItem";

export function Activities() {
  return (
    <div>
      <h5 className="font-medium text-2xl text-[#575757] font-satoshi">
        Activity
      </h5>

      <div className="mt-6 ">
        {Array.from({ length: 5 })?.map((_, index) => (
          <ActivityItem
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            text="You added a new outbound call"
            link="/home"
          />
        ))}
      </div>
    </div>
  );
}
