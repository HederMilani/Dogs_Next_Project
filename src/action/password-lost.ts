"use server";

import errorApi from "@/functions/error-api";
import { PASSWORD_LOST } from "@/functions/api";

export default async function PasswordLost(state: {}, formData: FormData) {
  const login = formData.get("login") as string | null;
  const urlLocal = formData.get("url") as string | null;

  try {
    if (!login) throw new Error("Preencha o campo");

    const { url } = PASSWORD_LOST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, url: urlLocal }),
    });
    if (!response.ok) throw new Error("Email/Usuário não encontrado");

    return { data: null, ok: true, error: "" };
  } catch (e) {
    return errorApi(e);
  }
}
