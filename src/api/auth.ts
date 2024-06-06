import axios from "axios";

export const loginRequest = async (email: string, password: string) =>
  await axios.post(
    "http://localhost:8080/auth/user/login",
    JSON.stringify({
      username: email,
      password: password,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    }
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
  await axios.post(
    "http://localhost:8080/auth/login",
    JSON.stringify({
      username: email,
      password: password,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    }
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

