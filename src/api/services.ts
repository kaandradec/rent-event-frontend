import { authApi } from "@/lib/axios";

export const getServices = async () => await authApi.get("/servicios");