import Feed from "@/components/feed/feed";
import PhotosGet from "@/action/photos-get";

export default async function Home() {
  const { data } = await PhotosGet();

  return (
    <section className="container mainContainer">
      {data?.length && <Feed photos={data} />}
    </section>
  );
}
