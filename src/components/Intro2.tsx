import React from "react";

export interface Intro2Props {
  title: string;
  description1: string;
  description2?: string;
  description3?: string;
}

export function Intro2({ title, description1, description2, description3 }: Intro2Props) {
  return (
    <section className="text-lg md:text-xl text-left px-10 md:px-20 max-w-[80ch] text-pretty mx-auto md:my-24">
      <div className="flex justify-start items-center mb-10 gap-2">
        <h1 className="text-2xl md:text-5xl font-semibold text-wrap tracking-wide">
          {title}
        </h1>
      </div>

      <p>{description1}</p>
      <p>{description2}</p>
      <p>{description3}</p>
    </section>
  );
}
