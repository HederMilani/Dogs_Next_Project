"use client";

import React from "react";
import styles from "./conta-header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UseMedia from "@/hooks/use-media";
import AdicionarIcons from "@/icons/adicionar-icons";
import FeedIcon from "@/icons/feed-icon";
import EstatisticasIcon from "@/icons/estatisticas-icon";
import SairIcon from "@/icons/sair-icon";

function getTitle(pathname: string) {
  switch (pathname) {
    case "/conta/estatisticas":
      return "Estatísticas";
    case "/conta/postar":
      return "Adicionar Fotos";
    default:
      return "Minhas Fotos";
  }
}

export default function ContaHeader() {
  const mobile = UseMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const pathname = usePathname();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  function handleClick() {
    // userLogout();
  }

  return (
    <header className={styles.header}>
      <h1 className="title">{getTitle(pathname)}</h1>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}
      >
        <Link href="/conta" className={pathname === "/conta" ? "active" : ""}>
          <FeedIcon />
          {mobile && "Minhas Fotos"}
        </Link>
        <Link
          href="/conta/estatisticas"
          className={pathname === "/conta/estatisticas" ? "active" : ""}
        >
          <EstatisticasIcon />
          {mobile && "Estatísticas"}
        </Link>
        <Link
          href="/conta/postar"
          className={pathname === "/conta/postar" ? "active" : ""}
        >
          <AdicionarIcons />
          {mobile && "Adicionar Fotos"}
        </Link>
        <button onClick={handleClick}>
          <SairIcon />
          {mobile && "Sair"}
        </button>
      </nav>
    </header>
  );
}
