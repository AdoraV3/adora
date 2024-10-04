import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Details() {
  return (
    <div className="pt-10">
      <div className="flex  justify-between items-start">
        <div>
          <h2 className="font-bold capitalize text-lg font-satoshi text-[hsla(214,24%,20%,1)] ">
            agent X
          </h2>
          <div className="divide-x my-5 font-normal text-[hsla(0,0%,11%,0.6)] text-sm font-satoshi flex divide-gray-700">
            <p className="px-4">8:00 am</p>
            <p className="px-4">Jan-12-24</p>
          </div>

          <Badge className="flex gap-2 text-primary bg-[hsla(25,100%,99%,1)] items-center">
            <Icons.Mic />
            <p>Audio</p>{" "}
          </Badge>
        </div>
        <div className="flex gap-3 items-center">
          <Button
            variant="ghost"
            className="!border px-6 text-primary bg-[hsla(30,100%,99%,1)] border-[hsla(218,39%,90%,1)] "
            icon={<Icons.Share />}
            size="sm"
          >
            Export{" "}
          </Button>
          <Button
            className="text-white-100 px-6"
            size="sm"
            icon={<Icons.Printer />}
          >
            Printer
          </Button>
        </div>
      </div>

      <ul className="mt-10 list-disc px-4 prose prose-bullet:text-black-100  max-w-none prose-full prose-li:text-black-100 font-satoshi font-normal text-sm">
        <li>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
          odit commodi quibusdam natus voluptatem quasi quo laboriosam! Ipsum
          iusto quia sequi illo nam ipsa repellat accusantium, libero aliquid
          veritatis. Nemo.{" "}
        </li>
        <li>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
          odit commodi quibusdam natus voluptatem quasi quo laboriosam! Ipsum
          iusto quia sequi illo nam ipsa repellat accusantium, libero aliquid
          veritatis. Nemo.{" "}
        </li>
        <li>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
          odit commodi quibusdam natus voluptatem quasi quo laboriosam! Ipsum
          iusto quia sequi illo nam ipsa repellat accusantium, libero aliquid
          veritatis. Nemo.{" "}
        </li>
        <li>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
          odit commodi quibusdam natus voluptatem quasi quo laboriosam! Ipsum
          iusto quia sequi illo nam ipsa repellat accusantium, libero aliquid
          veritatis. Nemo.{" "}
        </li>
        <li>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit
          odit commodi quibusdam natus voluptatem quasi quo laboriosam! Ipsum
          iusto quia sequi illo nam ipsa repellat accusantium, libero aliquid
          veritatis. Nemo.{" "}
        </li>
      </ul>
    </div>
  );
}
