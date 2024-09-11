"use client";

import styles from "./feed-photo.module.css";
import FeedPhoto from "@/components/feed/feed-photo";
import { Photo } from "@/types/photo";
import React from "react";
import PhotosGet from "@/action/photos-get";
import Loading from "@/components/helper/loading";

type FeedProps = {
  photos: Photo[];
  user?: 0 | string;
};

export default function Feed({ photos, user = 0 }: FeedProps) {
  const [photoFeed, setPhotoFeed] = React.useState<Photo[]>(photos);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [infinity, setInfinity] = React.useState(photos.length >= 6);
  const fetching = React.useRef(false);

  function infiniteScroll() {
    if (fetching.current) return;
    fetching.current = true;
    setLoading(true);
    setTimeout(() => {
      setPage((page) => page + 1);
      fetching.current = false;
      setLoading(false);
    }, 1000);
  }

  React.useEffect(() => {
    if (page === 1) return;
    async function fetchPhotos(page: number, user: 0 | string) {
      const actionData = await PhotosGet({ page, user }, { cache: "no-cache" });
      if (actionData && actionData.data !== null) {
        const { data } = actionData;
        setPhotoFeed((prev) => [...prev, ...data]);
        if (data.length < 6) {
          setInfinity(false);
        }
      } else {
        setInfinity(false);
      }
    }
    fetchPhotos(page, user);
  }, [page]);

  React.useEffect(() => {
    if (infinity) {
      window.addEventListener("scroll", infiniteScroll);
      window.addEventListener("wheel", infiniteScroll);
    } else {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    }
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    };
  }, [infinity]);

  return (
    <section className="container mainContainer">
      <FeedPhoto photos={photoFeed} />
      <div className={styles.loadingWrapper}>{loading && <Loading />}</div>
    </section>
  );
}
