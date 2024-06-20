import React from "react";
import BentoItemBottomGradient from "./BentoItemBottomGradient";

export default function Bento2() {
  return (
    <section className="w-full max-w-7xl grid grid-cols-10 auto-rows-[25rem] gap-4 mx-auto px-5 lg:px-0">
      <BentoItemBottomGradient
        className="col-span-10 md:col-span-5"
        title="Lorem ipsum dolor sit amet"
        image={"/positive_rating_img.jpg"}
      >
        <p slot="content">Sed cursus ante dapibus diam. Sed nisi.</p>
      </BentoItemBottomGradient>

      <BentoItemBottomGradient
        className="col-span-10 md:col-span-5"
        title="Consectetur adipiscing elit"
        image={"/negative_rating_img.jpg"}
      >
        <p slot="content">Nulla quis sem at nibh elementum imperdiet.</p>
      </BentoItemBottomGradient>
      <BentoItemBottomGradient
        className="col-span-10 md:col-span-5"
        title="Integer nec odio"
        image={"/average_playtime_img.jpg"}
      >
        <p slot="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, quia
          laboriosam odio perspiciatis mollitia esse sunt a dolore provident eum
          nulla doloribus eaque commodi. Molestias deserunt eius sunt ipsum
          aspernatur.
        </p>
      </BentoItemBottomGradient>
      <BentoItemBottomGradient
        className="col-span-10 md:col-span-5"
        title="Integer nec odio"
        image={"/average_playtime_img.jpg"}
      >
        <p slot="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, quia
          laboriosam odio perspiciatis mollitia esse sunt a dolore provident eum
          nulla doloribus eaque commodi. Molestias deserunt eius sunt ipsum
          aspernatur.
        </p>
      </BentoItemBottomGradient>
    </section>
  );
}
