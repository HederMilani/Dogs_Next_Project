"use server";

import errorApi from "@/functions/error-api";
import { USER_POST } from "@/functions/api";
import Login from "@/action/login";

export default async function UserPost(state: {}, formData: FormData) {
  const username = formData.get("username") as string | null;
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  try {
    if (!username || !email || !password) {
      throw new Error("Preencha todos os campos");
    }
    const { url } = USER_POST();
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Email ou usuário já existente");

    const data = await response.json();

    const { ok } = await Login({ ok: false, error: "", data: null }, formData);
    if (!ok) throw new Error("Erro ao logar");

    return { data, ok: true, error: "" };
  } catch (e) {
    return errorApi(e);
  }
}
