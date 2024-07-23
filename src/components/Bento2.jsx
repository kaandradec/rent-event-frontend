import React from "react";
import BentoItemBottomGradient from "./BentoItemBottomGradient";

export default function Bento2() {
  return (
    <section className="w-full max-w-7xl grid grid-cols-10 auto-rows-[25rem] gap-4 mx-auto px-5 lg:px-0">
      <BentoItemBottomGradient
        className="col-span-10 md:col-span-5"
        title="Transformación Digital"
        image={"/positive_rating_img.jpg"}
      >
        <p className={"text-secondary dark:text-primary"} slot="content">Explora cómo nuestros servicios pueden convertir tu evento en una experiencia extraordinaria. Desde la planificación hasta la ejecución, nos encargamos de cada detalle para que tú solo te preocupes de disfrutar. ¡Mira nuestras fotos y comienza a imaginar tu evento perfecto con nosotros!</p>
      </BentoItemBottomGradient>

      <BentoItemBottomGradient
        className="col-span-10 md:col-span-5"
        title="Consectetur adipiscing elit"
        image={"/negative_rating_img.jpg"}
      >
        <p className={"text-secondary dark:text-primary"} slot="content">Nulla quis sem at nibh elementum imperdiet.</p>
      </BentoItemBottomGradient>
      <BentoItemBottomGradient
        className="col-span-10 md:col-span-5"
        title="Integer nec odio"
        image={"/average_playtime_img.jpg"}
      >
        <p className={"text-secondary dark:text-primary"} slot="content">
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
        <p className={"text-secondary dark:text-primary"} slot="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, quia
          laboriosam odio perspiciatis mollitia esse sunt a dolore provident eum
          nulla doloribus eaque commodi. Molestias deserunt eius sunt ipsum
          aspernatur.
        </p>
      </BentoItemBottomGradient>
    </section>
  );
}
