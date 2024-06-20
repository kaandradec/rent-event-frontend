import React from "react";

export default function BentoItem({ className, title, children, description }) {
  return (
    <article
      className={`${className} rounded-xl backdrop-blur-md border   border-black/10 shadow-inner shadow-white/10 overflow-hidden group`}
    >
      {children}
      <div class="relative h-full gap-1 p-4 md:p-6 text-lg z-20">
        <h2 class="text-3xl font-semibold text-balance text-white mb-4">
          {title}
        </h2>
        <p>{description}</p>
      </div>
    </article>
  );
}
