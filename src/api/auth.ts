import { authApi } from "@/lib/axios";
import axios from "axios";

export const loginRequest = async (email: string, password: string) =>
  await authApi.post(
    "/auth/user/login",
    JSON.stringify({
      username: email,
      password: password,
    })

  );

export const registerRequest = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
) =>
  await axios.post(
    "http://localhost:8080/auth/user/register",
    JSON.stringify({
      firstname,
      lastname,
      username: email,
      password,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    }
  );


export const loginRequestClient = async (email: string, password: string) =>
  await authApi.post(
    "/auth/login",
    JSON.stringify({
      username: email,
      password: password,
    })
  );

export const registerRequestClient = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string
) =>
  await axios.post(
    "http://localhost:8080/auth/register",
    JSON.stringify({
      firstname,
      lastname,
      username: email,
      password,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    }
  );

