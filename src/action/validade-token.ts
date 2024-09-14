"use server";

import { TOKEN_VALIDATE_POST } from "@/functions/api";
import { cookies } from "next/headers";
import errorApi from "@/functions/error-api";

export default async function ValidateToken() {
  const token = cookies().get("token")?.value;

  try {
    if (!token) throw new Error("Você precisa estar logado");

    const { url } = TOKEN_VALIDATE_POST();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Token inválido");

    return { ok: true, error: null, data: null };
  } catch (e) {
    return errorApi(e);
  }
}
