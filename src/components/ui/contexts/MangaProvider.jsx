import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const MangaContext = createContext();

export const useManga = () => useContext(MangaContext);

export const MangaProvider = ({ children }) => {
  const [popularMangaList, setPopularMangaList] = useState([]);

  const getPopularManga = async (page, limit) => {
    try {
      const proxyBase = "https://corsproxy-psi.vercel.app/api/proxy?url=";
      const targetBase = "https://api.mangadex.org";

      const params = new URLSearchParams({
        offset: page,
        limit: limit,
        "includes[]": "cover_art",
        "order[followedCount]": "desc",
      });

      const fullUrl = `${proxyBase}${encodeURIComponent(
        `${targetBase}/manga?${params}`
      )}`;

      const resp = await axios.get(`${fullUrl}`);

      const mangaData = await Promise.all(
        resp.data.data.map((manga) => {
          const coverRel = manga.relationships.find(
            (rel) => rel.type === "cover_art"
          );

          if (!coverRel) return null;

          const fileName = coverRel.attributes.fileName;
          const isProd = window.location.hostname !== "localhost";

          const coverUrl = isProd
            ? `${proxyBase}https://uploads.mangadex.org/covers/${manga.id}/${fileName}`
            : `https://uploads.mangadex.org/covers/${manga.id}/${fileName}`;

          return {
            id: manga.id,
            title: manga.attributes.title?.en ?? "No English Title",
            description: manga.attributes.description?.en ?? "No English Title",
            coverUrl: coverUrl,
          };
        })
      );

      // Filter out any null entries
      setPopularMangaList(mangaData.filter((m) => m !== null));
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };
  //   useEffect(() => {
  //     getPopularManga();
  //   }, []);

  return (
    <MangaContext.Provider value={{ popularMangaList, getPopularManga }}>
      {children}
    </MangaContext.Provider>
  );
};
