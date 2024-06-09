import { Button } from "@/components/ui/button";

export function NeedHelp() {
  return (
    <section className="bg-primary p-10 flex justify-center items-center">
      <div>
        <h6 className="text-white-100 font-bold font-satoshi text-3xl">
          Need Help?
        </h6>
        <p className="font-normal font-satoshi text-sm text-white-200">
          We Offer 24 Hours Service from Mon-Sat
        </p>
      </div>

      <Button className="bg-white-100 mt-5 text-primary rounded-2xl">
        Contact Us{" "}
      </Button>
    </section>
  );
}
