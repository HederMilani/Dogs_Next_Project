import { Metadata } from "next";
import UserGet from "@/action/user-get";
import PhotosGet from "@/action/photos-get";
import Feed from "@/components/feed/feed";

export const metadata: Metadata = {
  title: "Conta | Dogs",
  description: "Página de conta do site.",
};

export default async function ContaPage() {
  const { data: user } = await UserGet();
  const { data, error } = await PhotosGet({ user: user?.username });

  return (
    <div className="animeLeft">
      {data?.length ? (
        <Feed photos={data} />
      ) : (
        <div>
          <p
            style={{ color: "#444", fontSize: "1.25rem", marginBottom: "1rem" }}
          >
            Nenhuma foto encontrada.
          </p>
        </div>
      )}
    </div>
  );
}
