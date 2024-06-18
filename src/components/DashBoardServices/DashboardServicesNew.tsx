import React, { useEffect, useState } from 'react'
import {
  ChevronLeft,
  Upload,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Image } from '@nextui-org/react'
import { Textarea } from '../ui/textarea'
import { dataFormApi } from '@/lib/axios'
import { useNavigate } from 'react-router-dom'

interface DashboardServicesNewProps {
  code?: string | undefined,
  setSubpage?: React.Dispatch<React.SetStateAction<number>>
}

export default function DashboardServicesNew({ code, setSubpage }: DashboardServicesNewProps) {
  const [image, setImage] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [state, setState] = useState("");
  const [provider, setProvider] = useState("");
  const [cost, setCost] = useState(0);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const handleExit = () => {
    setSubpage && setSubpage(0);
    navigate('/user/dashboard/');
  }

  const fetchService = async () => {
    try {
      const response = await dataFormApi.get(`/servicios/${code}`);
      console.log(response.data);
      setName(response.data.nombre);
      setDescription(response.data.descripcion);
      setType(response.data.tipo);
      setState(response.data.estado);
      setProvider(response.data.proveedor.nombre);
      setCost(response.data.costo);
      setImage(response.data.imagenes[0].url);
    } catch (err) {
      console.error('Error:', err
      );
    }
  }

  useEffect(() => {
    if (code) {
      fetchService();
    }
  }, [])

  const validateInputs = () => {
    if (name === "" || description === "" || type === "" || state === "" || provider === "" || cost === 0) {
      setError("Campos vacíos");
      return false;
    }
    return true;
  }

  const displayInfo = () => {
    if (success) return <span className="text-green-500">Guardado con éxito</span>
    if (loading) return <span className="text-muted-foreground">Guardando...</span>
    if (error) return <span className="text-red-500">{error}</span>
    return null;
  }

  const resetInfo = () => {
    setError("");
    setLoading(false);
  }

  const handleSubmmit = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file || new Blob());
    formData.append('nombre', name);
    formData.append('descripcion', description);
    formData.append('tipo', type);
    formData.append('proveedor', provider);
    formData.append('estado', state);
    formData.append('costo', cost.toString());

    try {
      const response = await dataFormApi.post(`/servicios/guardar`,
        formData,
      );
      console.log(response.data);
      setSuccess(true);
    } catch (err) {
      console.error('Error:', err);
    }
    resetInfo();
    setTimeout(() => {
      setSuccess(false);
    }, 1500);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (!file) return;
    console.log("Archivo existe", file);
    // read image url
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    setFile(file);
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-6 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <section className="flex items-center gap-4">
          <Button
            onClick={handleExit}
            variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Lista de servicios
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            {
              displayInfo()
            }
            <Button
              onClick={handleExit}
              variant="outline" size="sm">
              Descartar
            </Button>
            <Button
              onClick={handleSubmmit}
              size="sm">Guardar</Button>
          </div>
        </section>
        <section className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <DetallesServicio
              name={name}
              type={type}
              description={description}
              cost={cost}
              setName={setName}
              setDescription={setDescription}
              setType={setType}
              setCost={setCost}
            />
            <ServiceProvider provider={provider} setProvider={setProvider} />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <StatusCard state={state} setState={setState} />
            <ImageCard image={image} handleFileChange={handleFileChange} />
          </div>
        </section>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button
            onClick={handleSubmmit}
            variant="outline" size="sm">
            Descargar
          </Button>
          <Button size="sm">Guardar</Button>
        </div>
      </div>
    </main>
  )
}

type DetallesServicioProps = {
  name: string,
  type: string,
  description: string,
  cost: number,
  setName: (name: string) => void,
  setType: (type: string) => void,
  setDescription: (description: string) => void
  setCost: (cost: number) => void
}

const DetallesServicio = ({ name, setName, type, setType, description, setDescription, cost, setCost }: DetallesServicioProps) => {
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Detalles del Servicio</CardTitle>
        <CardDescription>
          Crear o editar un servicio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="category">Tipo {`: ${type && type}`}</Label>
            <Select
              onValueChange={(value) => setType(value)}
              defaultValue={type}
            >
              <SelectTrigger
                id="category"
                aria-label="Select category"
              >
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CATERING">Catering</SelectItem>
                <SelectItem value="DECORACION">Decoración</SelectItem>
                <SelectItem value="ENTRETENIMIENTO">Entretenimiento</SelectItem>
                <SelectItem value="FOTOGRAFIA">Fotografía</SelectItem>
                <SelectItem value="MUSICA">Música</SelectItem>
                <SelectItem value="ILUMINACION">Iluminación</SelectItem>
                <SelectItem value="SEGURIDAD">Seguridad</SelectItem>
                <SelectItem value="TRANSPORTE">Transporte</SelectItem>
                <SelectItem value="OTROS">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              defaultValue={description}
              className="min-h-32"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="cost">Costo {`: ${cost && cost}`}</Label>
            <Input
              id="cost"
              type="number"
              min={2}
              defaultValue={cost}
              onChange={(e) => setCost(parseFloat(e.target.value))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type ServiceProviderProps = {
  provider: string,
  setProvider: (description: string) => void
}


const ServiceProvider = ({ provider, setProvider }: ServiceProviderProps) => {
  return (
    <Card x-chunk="dashboard-07-chunk-2">
      <CardHeader>
        <CardTitle>Proveedor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-1">
          <div className="grid gap-3">
            <Label htmlFor="category">Proveedor {` : ${provider && provider}`}</Label>
            <Select
              onValueChange={(value) => setProvider(value)}
              defaultValue={provider}
            >
              <SelectTrigger
                id="category"
                aria-label="Selecciona el proveedor"
              >
                <SelectValue placeholder="Selecciona el proveedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Proveedor1">Proveedor1</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

type StatusCardProps = {
  state: string,
  setState: (state: string) => void
}

const StatusCard = ({ state, setState }: StatusCardProps) => {
  return (
    <Card x-chunk="dashboard-07-chunk-3">
      <CardHeader>
        <CardTitle>Estado del servicio</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="status">Estado {` : ${state && state}`}</Label>
            <Select
              onValueChange={(value) => setState(value)}
              defaultValue={state}
            >
              <SelectTrigger id="status" aria-label="Select status">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVO">Activo</SelectItem>
                <SelectItem value="INACTIVO">Inactivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>)
}

const ImageCard = ({ image, handleFileChange }: { image: string, handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <Card
      className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
    >
      <CardHeader>
        <CardTitle>Imagenes del servicio</CardTitle>
        <CardDescription>
          Añadir imagen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Image
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src={image || ""}
            width="300"
          />
          <div className="grid grid-cols-3 gap-2">
            <button>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src="https://ui.shadcn.com/placeholder.svg"
                width="84"
              />
            </button>
            <button>
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="84"
                src="https://ui.shadcn.com/placeholder.svg"
                width="84"
              />
            </button>
            <div>
              <label htmlFor="dropzone-file" className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Upload</span>
              </label>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}



