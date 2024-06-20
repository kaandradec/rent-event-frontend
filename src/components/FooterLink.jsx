import React from "react";

export default function FooterLink({
  href,
  className,
  children,
  ...restOfProps
}) {
  return (
    <a
      href={href}
      className={`${className} border-transparent hover:border-white cursor-pointer`}
      {...restOfProps}
    >
      {children}
    </a>
  );
}
