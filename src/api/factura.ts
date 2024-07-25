import { tokenApi } from "@/lib/axios";

export const obtenerFacturaPorCodigoEvento = async (codigoEvento: string | undefined) =>
  await tokenApi.get(`/facturas/obtener/${codigoEvento}`)