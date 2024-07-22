import {tokenApi} from "@/lib/axios.ts";

export const hacerPagoCliente = async (
    evento: string ,
    nombreTargeta: string ,
    numeroTarjeta: string,
    direccionFactura: string,
    nombreFactura: string,
    numeroCedula:string,
    pago:number
) =>
    await tokenApi.post(
        `/pagos/nuevo`,
        JSON.stringify({
            evento:evento,
            nombreTargeta: nombreTargeta,
            numeroTarjeta: numeroTarjeta,
            direccionFactura: direccionFactura,
            nombreFactura: nombreFactura,
            numeroCedula:numeroCedula,
            pago:pago

        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
            // withCredentials: true,
        }
    );