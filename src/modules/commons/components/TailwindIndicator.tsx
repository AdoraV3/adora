import { useEffect, useState } from "react";

export function TailwindIndicator() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateDimensions() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const { width, height } = dimensions;
  if (process.env.NODE_ENV === "production") return null;

  return (
    <>
      <span>
        {width.toLocaleString()} x {height.toLocaleString()}
      </span>

      <div className="fixed bottom-1 gap-5 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-primary p-3 font-satoshi text-xs text-white-100">
        <div className="block sm:hidden">xs</div>
        <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
          sm
        </div>
        <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">md</div>
        <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
        <div className="hidden xl:block 2xl:hidden">xl</div>
        <div className="hidden 2xl:block">2xl</div>
      </div>
    </>
  );
}
