import { Button } from "@/components/ui/button"

export default function Inicio() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-5xl text-blue-600 text-center font-bold mb-8">Rent_Event</h1>
      <section className="flex flex-col items-start gap-4">
        <TextButton text="Vistas Cliente" btnText="Ver" />
        <TextButton text="Vistas Administrativos" btnText="Ver" />
      </section>
    </div>
  )
}

type TextButton = {
  text: string,
  btnText: string
}

const TextButton = ({ text, btnText }: TextButton) => {
  return (<div className="w-full flex justify-between items-center px-4">
    <h1 className="font-bold">{text}</h1>
    <Button size='lg' >{btnText}</Button>
  </div>)
}
