import PhotoGet from "@/action/photo-get";
import PhotoContent from "@/components/photo/photo-content";
import { notFound } from "next/navigation";

type PageParams = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: PageParams) {
  const { data } = await PhotoGet(params.id);
  if (!data) return notFound();
  return {
    title: `${data.photo.title} | Dogs`,
    description: `Foto de ${data.photo.author} no Dogs`,
  };
}

export default async function FotoIdPage({ params }: PageParams) {
  const { data } = await PhotoGet(params.id);

  if (!data) return notFound();
  return (
    <section className="container mainContainer">
      <PhotoContent data={data} single={true} />
    </section>
  );
}
