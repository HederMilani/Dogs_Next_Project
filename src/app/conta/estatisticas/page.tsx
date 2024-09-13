import { Metadata } from "next";
import StatsGet from "@/action/stats-get";
import dynamic from "next/dynamic";

const ContaEstatiticas = dynamic(
  () => import("@/components/conta/estats/conta-estatiticas"),
  {
    loading: () => <p>Carregando...</p>,
    ssr: false,
  },
);

export const metadata: Metadata = {
  title: "Estatisticas | Dogs",
  description: "Estatisticas do site",
};

export default async function EstatisticasPage() {
  const { data } = await StatsGet();

  if (!data) return null;
  return (
    <section className="animeLeft">
      {data.length === 0 ? (
        <p>Nenhum dado encontrado</p>
      ) : (
        <ContaEstatiticas data={data} />
      )}
    </section>
  );
}
