type Service = {
  id: string | number
  code: string
  name: string,
  type: "CATERING" | "DECORACION" | "ENTRETENIMIENTO" | "FOTOGRAFIA" | "MUSICA" | "ILUMINACION" | "SEGURIDAD" | "TRANSPORTE" | "OTROS",
  cost: number | string,
  description?: string,
  image?: string,
  provider?: string
}

export const services: Service[] = [
  {
    id: 1,
    code: "CATERING-001",
    name: "Catering",
    type: "CATERING",
    cost: 1000,
    description: "Servicio de catering",
    image: "https://ui.shadcn.com/placeholder.svg",
    provider: "Catering SA"
  },
  {
    id: 2,
    code: "DECORACION-001",
    name: "Decoración",
    type: "DECORACION",
    cost: 2000,
    description: "Servicio de decoración",
    image: "https://ui.shadcn.com/placeholder.svg",
    provider: "Decoración SA"
  },
  {
    id: 3,
    code: "ENTRETENIMIENTO-001",
    name: "Entretenimiento",
    type: "ENTRETENIMIENTO",
    cost: 3000,
    description: "Servicio de entretenimiento",
    image: "https://ui.shadcn.com/placeholder.svg",
    provider: "Entretenimiento SA"
  },
  {
    id: 4,
    code: "FOTOGRAFIA-001",
    name: "Fotografía",
    type: "FOTOGRAFIA",
    cost: 4000,
    description: "Servicio de fotografía",
    image: "https://ui.shadcn.com/placeholder.svg",
    provider: "Fotografía SA"
  },
  {
    id: 5,
    code: "MUSICA-001",
    name: "Música",
    type: "MUSICA",
    cost: 5000,
    description: "Servicio de música",
    image: "https://ui.shadcn.com/placeholder.svg",
    provider: "Música SA"
  },
  {
    id: 6,
    code: "ILUMINACION-001",
    name: "Iluminación",
    type: "ILUMINACION",
    cost: 6000,
    description: "Servicio de iluminación",
    image: "https://ui.shadcn.com/placeholder.svg",
    provider: "Iluminación SA"
  }
]
