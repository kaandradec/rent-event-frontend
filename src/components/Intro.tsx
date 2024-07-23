import { RentEventLogo } from "./icons/RentEventLogo";

interface IntroProps {
  title: string;
  description1: string;
  description2?: string;
  description3?: string;
}

export default function Intro({ title, description1, description2, description3 }: IntroProps) {
  return (
    <section className="text-lg md:text-xl text-left px-10 md:px-20 max-w-[80ch] text-pretty mx-auto md:my-24">
      <RentEventLogo width={64} className="w-16 mb-10 m-auto text-secondary dark:text-primary" />
      <h1 className="text-2xl md:text-5xl font-semibold text-center text-wrap mx-auto mb-10 tracking-wide">
        {title}
      </h1>

      <p>{description1}</p>
      <p>{description2}</p>
      <p>{description3}</p>
    </section>
  );
}
