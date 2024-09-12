"use client";

import React from "react";
import styles from "./photo-comments.module.css";
import { useUser } from "@/context/user-context";
import { Comment } from "@/types/photo";
import PhotoCommentsForm from "@/components/photo/photo-comments-form";

export default function PhotoComments({
  id,
  comments,
  single,
}: {
  id: string;
  comments: Comment[];
  single?: boolean;
}) {
  const { user } = useUser();
  const [commentsList, setCommentsList] = React.useState(() => comments);
  const commentsSection = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    if (commentsSection.current) {
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    }
  }, [commentsList]);

  return (
    <div>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${single ? styles.single : ""}`}
      >
        {commentsList.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {user && (
        <PhotoCommentsForm
          id={id}
          setCommentsList={setCommentsList}
          single={single}
        />
      )}
    </div>
  );
}
