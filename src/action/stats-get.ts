import { cookies } from "next/headers";
import { STATS_GET } from "@/functions/api";
import errorApi from "@/functions/error-api";

export type StatsData = {
  id: number;
  title: string;
  acessos: string;
};

export default async function StatsGet() {
  const token = cookies().get("token")?.value;

  try {
    if (!token) throw new Error("Você precisa estar logado");

    const { url } = STATS_GET();
    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 10,
        tags: ["stats"],
      },
    });
    if (!response.ok) throw new Error("Erro ao pegar os dados");

    const data = (await response.json()) as StatsData[];

    return {
      data,
      ok: true,
      error: null,
    };
  } catch (e) {
    return errorApi(e);
  }
}
