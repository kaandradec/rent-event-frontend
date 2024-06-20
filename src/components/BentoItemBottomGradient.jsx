import React from "react";

export default function BentoItemBottomGradient({
  className,
  title,
  children,
  image,
}) {
  return (
    <article
      className={`${className} relative rounded-xl backdrop-blur-md border border-black/10 shadow-inner shadow-white/10 overflow-hidden group`}
    >
      <div className="absolute z-10 top-0 bottom-0 w-full h-full bg-gradient-to-b from-transparent from-40% via-black/65 to-black/80"></div>
      <div
        slot="image"
        class="absolute w-full h-full bg-no-repeat bg-cover group-hover:scale-105 transition-all duration-500 ease-in-out opacity-90 bg-[#23374B] bg-blend-luminosity -z-10"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className="relative h-full flex flex-col justify-end gap-1 p-4 md:p-6 text-lg z-20">
        <h2 className="text-3xl font-semibold text-balance text-white mb-4">
          {title}
        </h2>
        {children}
      </div>
    </article>
  );
}
