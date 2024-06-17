import { tokenApi } from "@/lib/axios";

export const getServices = async () => await tokenApi.get("/servicios");