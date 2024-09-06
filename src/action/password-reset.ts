"use server";

import { PASSWORD_RESET } from "@/functions/api";
import errorApi from "@/functions/error-api";

export default async function PasswordReset(state: {}, formData: FormData) {
  const password = formData.get("password") as string | null;
  const key = formData.get("key") as string | null;
  const login = formData.get("login") as string | null;

  try {
    if (!password || !key || !login) {
      throw new Error("Preencha todos os campos");
    }

    const { url } = PASSWORD_RESET();
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Erro ao resetar senha");

    return { data: null, ok: true, error: "" };
  } catch (e) {
    return errorApi(e);
  }
}
