"use server";

import { cookies } from "next/headers";
import errorApi from "@/functions/error-api";
import { TOKEN_POST } from "@/functions/api";

export default async function Login(state: {}, formData: FormData) {
  const username = formData.get("username") as string | null;
  const password = formData.get("password") as string | null;

  try {
    if (!username || !password) {
      throw new Error("Preencha todos os campos");
    }

    const { url } = TOKEN_POST();
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Usuário/Senha inválidos");

    const data = await response.json();
    cookies().set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
    });
    return { data: null, ok: true, error: "" };
  } catch (e) {
    return errorApi(e);
  }
}
