import React, { useEffect } from "react";
import PopularManga from "../components/PopularManga";
import PopularMangaList from "../components/PopularMangaList";
import MangaList from "../components/MangaList";
import { useManga } from "../components/contexts/MangaProvider";

export default function Home() {
  const { mangaList, getMangaList } = useManga();
  useEffect(() => {
    getMangaList();
  }, []);
  return (
    <div>
      <PopularManga />
      <PopularMangaList />
      <MangaList data={mangaList} />
    </div>
  );
}
