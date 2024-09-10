import { Photo } from "@/types/photo";
import Link from "next/link";
import Image from "next/image";
import styles from "@/components/feed/feed-photo.module.css";

type FeedProps = {
  photos: Photo[];
};

export default function FeedPhoto({ photos }: FeedProps) {
  return (
    <section>
      <ul className={`animeLeft ${styles.feed}`}>
        {photos.map((photo, i) => (
          <li className={styles.photo} key={photo.id + i}>
            <Link href={`/foto/${photo.id}`} scroll={false}>
              <Image
                src={photo.src}
                alt={photo.title}
                width={1500}
                height={1500}
                sizes="80vw"
              />
              <span className={styles.visualizacao}>{photo.acessos}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
