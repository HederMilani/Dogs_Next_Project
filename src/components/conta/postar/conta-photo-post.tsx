"use client";

import styles from "./conta-photo-post.module.css";
import { useFormState, useFormStatus } from "react-dom";
import Button from "@/components/form/button";
import React from "react";
import Input from "@/components/form/input";
import ErrorMessage from "@/components/helper/error-message";
import PhotoPost from "@/action/photo-post";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled>Enviando...</Button>
      ) : (
        <Button>Enviar</Button>
      )}
    </>
  );
}

export default function ContaPhotoPost() {
  const [img, setImg] = React.useState("");
  const [state, action] = useFormState(PhotoPost, {
    ok: false,
    error: "",
    data: null,
  });

  function handleImageChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files) {
      setImg(URL.createObjectURL(target.files[0]));
    }
  }

  return (
    <section className={styles.photoPost}>
      <form action={action}>
        <Input label="Nome" name="nome" type="text" />
        <Input label="Peso" name="peso" type="number" />
        <Input label="Idade" name="idade" type="number" />
        <input
          type="file"
          name="img"
          id="img"
          className={styles.file}
          onChange={handleImageChange}
        />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <div>
        <div
          className={styles.preview}
          style={{ backgroundImage: `url(${img})` }}
        />
      </div>
    </section>
  );
}
