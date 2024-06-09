import { Button } from "@/components/ui/button";

export function NeedHelp() {
  return (
    <section className="bg-primary p-10 flex justify-between items-center">
      <div>
        <h6 className="text-white-200 font-normal text-3xl font-satoshi">
          {" "}
          Try Adora Now
        </h6>
        <p className="font-medium font-coreC text-4xl text-white-100">
          Start transforming your business
        </p>
      </div>

      <Button className="bg-white-100 mt-5 text-primary rounded-2xl">
        Get Started for Free
      </Button>
    </section>
  );
}
