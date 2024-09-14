import styles from "@/components/footer.module.css";
import Image from "next/image";

export default async function Footer() {
  return (
    <footer className={`${styles.footer}`}>
      <Image src="/assets/dogs-footer.svg" alt="Dogs" width={28} height={22} />
      <p>Dogs. Alguns direitos reservados.</p>
    </footer>
  );
}
