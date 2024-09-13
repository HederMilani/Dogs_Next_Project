import PhotosGet from "@/action/photos-get";
import Feed from "@/components/feed/feed";

type PageParams = {
  params: {
    user: string;
  };
};

export default async function PerfilUserPage({ params }: PageParams) {
  const { data } = await PhotosGet();

  if (!data) return null;
  return (
    <section className="container mainContainer">
      <h1 className="title">{params.user.toLocaleUpperCase()}</h1>
      <Feed user={params.user} photos={data} />
    </section>
  );
}
