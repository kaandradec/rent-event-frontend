interface IntroContentProps {
  title: string;
  description: string;
  description2?: string;
  description3?: string;
}

export default function IntroContent({
  title,
  description,
  description2,
  description3,
}: IntroContentProps) {
  return (
    <section className="text-lg md:text-xl text-left px-10 my-8 md:px-20 max-w-[80ch] text-pretty mx-auto">
      <h1 className="text-2xl md:text-5xl font-semibold text-center text-wrap mx-auto mb-10 tracking-wide">
        {title}
      </h1>
      <p>{description}</p>
      <p>{description2}</p>
      <p>{description3}</p>
    </section>
  );
}
