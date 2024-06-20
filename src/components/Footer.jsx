import React from "react";
import FooterLink from "./FooterLink";
import { RentEventLogo } from "./icons/RentEventLogo";

export default function Footer() {
  return (
    <footer className="w-full">
      <section className="min-h-48 bg-[#1e2329]">
        <div className="flex flex-col md:flex-row max-w-7xl justify-between mx-auto">
          <aside className="mx-auto">
            <div className="flex flex-col justify-start items-center max-w-60 bottom-12 relative">
              <FooterLink href="/" className="relative z-10">
                <RentEventLogo className="absolute w-36 blur-sm opacity-0 transition-opacity duration-300 hover:opacity-100" />
                <RentEventLogo className="w-36" />
              </FooterLink>
              <FooterLink
                className="text__glowing__medium text-2xl text-pretty text-center"
                href="/"
              >
                Lorem Ipsum
              </FooterLink>
            </div>
          </aside>

          <aside className="flex flex-col md:flex-row items-center md:justify-evenly w-full py-0 md:py-10 gap-10 text-center mb-10 md:mb-0">
            <div>
              <h3 className="uppercase text-xl mb-2">Lorem Ipsum</h3>
              <ul>
                <li>
                  <FooterLink className="text__glowing__min hover:text-[#66c0f4]">
                    Lorem Ipsum
                  </FooterLink>
                </li>
                <li>
                  <FooterLink className="text__glowing__min hover:text-[#66c0f4]">
                    Lorem Ipsum
                  </FooterLink>
                </li>
                <li>
                  <FooterLink className="text__glowing__min hover:text-[#66c0f4]">
                    Lorem Ipsum
                  </FooterLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="uppercase text-xl mb-2">Lorem Ipsum</h3>
              <ul>
                <li>
                  <FooterLink className="text__glowing__min hover:text-[#66c0f4]">
                    Lorem Ipsum
                  </FooterLink>
                </li>
                <li>
                  <FooterLink className="text__glowing__min hover:text-[#66c0f4]">
                    Lorem Ipsum
                  </FooterLink>
                </li>
                <li>
                  <FooterLink className="text__glowing__min hover:text-[#66c0f4]">
                    Lorem Ipsum
                  </FooterLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="uppercase text-xl mb-2">Lorem Ipsum</h3>
              <ul>
                <li>
                  <FooterLink className="text__glowing__min hover:text-[#66c0f4]">
                    Lorem Ipsum
                  </FooterLink>
                </li>
                <li>
                  <FooterLink className="text__glowing__min hover:text-[#66c0f4]">
                    Lorem Ipsum
                  </FooterLink>
                </li>
                <li>
                  <FooterLink className="text__glowing__min hover:text-[#66c0f4]">
                    Lorem Ipsum
                  </FooterLink>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </footer>
  );
}
