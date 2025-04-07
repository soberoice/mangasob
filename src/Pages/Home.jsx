import React from "react";
import PopularManga from "../components/PopularManga";
import PopularMangaList from "../components/PopularMangaList";

export default function Home() {
  return (
    <div>
      <PopularManga />
      <PopularMangaList />
    </div>
  );
}
