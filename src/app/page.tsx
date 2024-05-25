import { Button } from "@/components/ui/button";
import { FloatingInput, FloatingLabel } from "@/modules/commons/components";

export default function Home() {
  return (
    <main className="relative m-20 items-center font-coreC  ">
      <FloatingInput id="floating-customize" />
      <FloatingLabel htmlFor="floating-customize">Hello</FloatingLabel>

      <Button className="mt-4">Hello world </Button>
    </main>
  );
}
