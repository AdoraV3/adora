import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function ViewKnowledgeBase() {
  return (
    <div className="pt-10">
      <div className="flex items-center gap-4">
        <Button
          icon={<Icons.Delete />}
          className="px-6 text-red-200  !border-[hsla(218,39%,90%,1)] "
          size="sm"
          variant="outline"
        >
          Delete
        </Button>
        <Button className="px-6" size="sm" icon={<Icons.Edit />}>
          Edit{" "}
        </Button>
      </div>

      <section className="mt-10">
        <h4 className="font-satoshi underline underline-offset-2 font-medium text-base text-black-100">
          Client Information
        </h4>

        <h6 className="font-satoshi font-bold text-base text-black-100 my-4">
          Company A
        </h6>

        <div className="space-y-2 my-3">
          <p className="font-satoshi font-normal text-base text-[hsla(0,0%,11%,0.5)] ">
            Contact Person: <span className="text-black-100">Person A</span>
          </p>
          <p className="font-satoshi font-normal text-base text-[hsla(0,0%,11%,0.5)] ">
            Email: <span className="text-black-100">company@gmail.com</span>
          </p>
          <p className="font-satoshi font-normal text-base text-[hsla(0,0%,11%,0.5)] ">
            Phone Number:
            <span className="text-black-100"> 08122233344</span>
          </p>
          <p className="font-satoshi font-normal text-base text-[hsla(0,0%,11%,0.5)] ">
            Website:
            <span className="text-black-100">www.comanya.com</span>
          </p>
        </div>
      </section>

      <section>
        <h4 className="font-satoshi underline-offset-2 underline font-medium text-base text-black-100">
          Customer Support Knowledge Base
        </h4>
      </section>
    </div>
  );
}
