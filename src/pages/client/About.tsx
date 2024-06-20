import { Intro2 } from "@/components/Intro2";

export function About() {
  return (
    <main>
      <Intro2
        title="Misión"
        description1="Nuestra misión es facilitar la organización y creación de eventos en línea."
        description2="Queremos que cualquier persona pueda crear un evento en línea de forma sencilla y rápida."
        description3="Además, queremos que los asistentes puedan disfrutar de una experiencia única y personalizada."
      />
      <Intro2
        title="Visión"
        description1="Nuestra visión es ser la plataforma líder en la organización de eventos en línea."
        description2="Queremos que cualquier persona pueda organizar eventos en línea de forma profesional."
        description3="Además, queremos que los asistentes puedan disfrutar de una experiencia única y personalizada."
      />
      <Intro2
        title="Valores"
        description1="Nuestros valores son la transparencia, la innovación y la calidad."
        description2="Queremos que nuestros usuarios confíen en nosotros y en nuestra plataforma."
        description3="Además, queremos que nuestros usuarios disfruten de una experiencia única y personalizada."
      />
    </main>
  );
}