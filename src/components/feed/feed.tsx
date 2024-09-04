import FeedPhoto from "@/components/feed/feed-photo";
import { Photo } from "@/types/photo";

type FeedProps = {
  photos: Photo[];
};

export default function Feed({ photos }: FeedProps) {
  return (
    <section className="container mainContainer">
      <h1 className="title">Feed</h1>
      <FeedPhoto photos={photos} />
    </section>
  );
}
