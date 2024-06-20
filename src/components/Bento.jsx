import React from "react";
import BentoItem from "./BentoItem";

export default function BentoComponent() {
  return (
    <section className="w-full max-w-7xl grid grid-cols-10 gap-4 mx-auto px-5 lg:px-0">
      <BentoItem
        className="col-span-10"
        title="Lorem ipsum dolor sit amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet."
      >
        <div className="absolute h-full w-full bg-[#0e141b] bg-cover -z-10 opacity-50"></div>
      </BentoItem>
      <BentoItem
        className="col-span-10 md:col-span-6"
        title="Consectetur adipiscing elit"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet."
      >
        <div className="absolute h-full w-full bg-[#1d2938] bg-cover -z-10 opacity-50"></div>
      </BentoItem>
      <BentoItem
        className="col-span-10 md:col-span-4"
        title="Integer nec odio"
        description="lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet."
      >
        <div className="absolute h-full w-full bg-[#1d2938] bg-cover -z-10 opacity-50"></div>
      </BentoItem>
      <BentoItem
        className="col-span-10 md:col-span-10"
        title="Praesent libero"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet."
      >
        <div className="absolute h-full w-full bg-[#1d2938] bg-cover -z-10 opacity-50"></div>
      </BentoItem>
    </section>
  );
}
