"use server";

import errorApi from "@/functions/error-api";
import { cookies } from "next/headers";
import { USER_GET } from "@/functions/api";

export type User = {
  id: number;
  username: string;
  email: string;
  nome: string;
};

export default async function UserGet() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("Token não encontrado");

    const { url } = USER_GET();
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
      },
    });
    if (!response.ok) throw new Error("Token inválido");

    const data = (await response.json()) as User;

    return { data, ok: true, error: "" };
  } catch (e) {
    return errorApi(e);
  }
}
