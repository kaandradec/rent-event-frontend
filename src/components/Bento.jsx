import React from "react";
import BentoItem from "./BentoItem";

export default function BentoComponent() {
  return (
    <section className="w-full max-w-7xl grid grid-cols-10 gap-4 mx-auto px-5 lg:px-0">
      <BentoItem
        className="col-span-10"
        title="Servicios de Alquiler de Sillas"
        description="¿Buscas comodidad y estilo para tu evento? Nuestra amplia gama de sillas, desde elegantes sillas de banquete hasta prácticas sillas plegables, asegura que tus invitados disfruten cada momento. ¡Reserva ahora y dale a tu evento el toque de distinción que se merece!"
      >
        <div className="absolute h-full w-full bg-[#0e141b] bg-cover -z-10 opacity-50"></div>
      </BentoItem>
      <BentoItem
        className="col-span-10 md:col-span-6"
        title="Iluminación Profesional"
        description="Transforma cualquier espacio con nuestra iluminación de primera clase. Desde luces ambientales suaves hasta espectaculares efectos de iluminación, tenemos todo lo necesario para crear la atmósfera perfecta. ¡Haz que tu evento brille con nosotros!"
      >
        <div className="absolute h-full w-full bg-[#1d2938] bg-cover -z-10 opacity-50"></div>
      </BentoItem>
      <BentoItem
        className="col-span-10 md:col-span-4"
        title="Animadores y Entretenimiento"
        description=" ¡Haz que tu evento sea inolvidable! Nuestros animadores profesionales garantizan diversión y entretenimiento para todas las edades. Ya sea una fiesta infantil, una boda o un evento corporativo, nuestros expertos harán que todos los invitados se diviertan al máximo."
      >
        <div className="absolute h-full w-full bg-[#1d2938] bg-cover -z-10 opacity-50"></div>
      </BentoItem>
      <BentoItem
        className="col-span-10 md:col-span-10"
        title="Equipos de Sonido"
        description="Lleva la música y el ambiente de tu evento al siguiente nivel con nuestro equipo de sonido de alta calidad. Ofrecemos sistemas que se adaptan a cualquier tamaño de evento, asegurando una experiencia auditiva excepcional. ¡Haz que tu evento se escuche como nunca antes!"
      >
        <div className="absolute h-full w-full bg-[#1d2938] bg-cover -z-10 opacity-50"></div>
      </BentoItem>
    </section>
  );
}
