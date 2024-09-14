"use client";

import React from "react";
import styles from "./photo-comments-form.module.css";
import EnviarIcon from "@/icons/enviar-icon";
import { useFormState, useFormStatus } from "react-dom";
import CommentsPost from "@/action/comments-post";
import ErrorMessage from "@/components/helper/error-message";
import { Comment } from "@/types/photo";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <button disabled className={styles.button}>
          Enviando...
        </button>
      ) : (
        <button className={styles.button}>
          <EnviarIcon />
        </button>
      )}
    </>
  );
}

export default function PhotoCommentsForm({
  id,
  setCommentsList,
  single,
}: {
  id: string;
  setCommentsList: React.Dispatch<React.SetStateAction<Comment[]>>;
  single?: boolean;
}) {
  const [comment, setComment] = React.useState("");
  const [state, action] = useFormState(CommentsPost, {
    data: null,
    ok: false,
    error: "",
  });

  React.useEffect(() => {
    if (state.ok && state.data) {
      setCommentsList((comments) => {
        return [...comments, state.data];
      });
      setComment("");
    }
  }, [state, setComment]);

  return (
    <form
      action={action}
      className={`${styles.form} ${single ? styles.single : ""}`}
    >
      <textarea
        className={styles.textarea}
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        id="comment"
        name="comment"
        placeholder="Comente..."
      />
      <input type="hidden" name="id" value={id} />
      <FormButton />
      <ErrorMessage error={state.error} />
    </form>
  );
}
