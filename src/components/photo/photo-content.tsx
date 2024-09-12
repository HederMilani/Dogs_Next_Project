"use client";

import styles from "./photo-content.module.css";
import Link from "next/link";
import { useUser } from "@/context/user-context";
import PhotoDelete from "@/components/photo/photo-delete";
import Image from "next/image";
import { PhotoWithComments } from "@/types/photo";
import PhotoComments from "@/components/photo/photo-comments";

export default function PhotoContent({
  data,
  single,
}: {
  data: PhotoWithComments;
  single?: boolean;
}) {
  const { photo, comments } = data;
  const { user } = useUser();

  return (
    <div className={`${styles.photo} ${single ? styles.single : ""} animeLeft`}>
      <div className={styles.img}>
        <Image alt={photo.title} src={photo.src} width={1000} height={1000} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user && user.username === photo.author ? (
              <PhotoDelete id={`${photo.id}`} />
            ) : (
              <Link href={`/conta/${photo.author}`}>@{photo.author}</Link>
            )}
            <span className={styles.visualizacoes}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link href={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
      </div>
      <PhotoComments
        id={String(photo.id)}
        comments={comments}
        single={single}
      />
    </div>
  );
}
