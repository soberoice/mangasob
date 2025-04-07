import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const MangaContext = createContext();

export const useManga = () => useContext(MangaContext);

export const MangaProvider = ({ children }) => {
  const [popularMangaList, setPopularMangaList] = useState([]);
  const [mangaInfo, setMangaInfo] = useState();

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
            attributes: manga.attributes,
          };
        })
      );

      // Filter out any null entries
      setPopularMangaList(mangaData.filter((m) => m !== null));
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };
  const getMangaInfo = async (id) => {
    try {
      const proxyBase = "https://corsproxy-psi.vercel.app/api/proxy?url=";
      const targetBase = "https://api.mangadex.org";

      const params = new URLSearchParams({
        "includes[]": "cover_art",
      });

      const fullUrl = `${proxyBase}${encodeURIComponent(
        `${targetBase}/manga/${id}?${params}`
      )}`;

      const resp = await axios.get(`${fullUrl}`);
      console.log(resp);

      const info = resp.data.data;
      const coverRel = info.relationships.find(
        (rel) => rel.type === "cover_art"
      );

      if (!coverRel) return null;

      const fileName = coverRel.attributes.fileName;
      const isProd = window.location.hostname !== "localhost";

      const coverUrl = isProd
        ? `${proxyBase}https://uploads.mangadex.org/covers/${info.id}/${fileName}.512.jpg`
        : `https://uploads.mangadex.org/covers/${info.id}/${fileName}.512.jpg`;

      const mangaData = {
        id: info.id,
        title: info.attributes.title?.en ?? "No English Title",
        description: info.attributes.description?.en ?? "No English Title",
        coverUrl: coverUrl,
        attributes: info.attributes,
      };

      // Filter out any null entries
      setMangaInfo(mangaData);
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };
  //   useEffect(() => {
  //     getMangaDetails("32d76d19-8a05-4db0-9fc2-e0b0648fe9d0");
  //   }, []);

  return (
    <MangaContext.Provider
      value={{ getPopularManga, popularMangaList, getMangaInfo, mangaInfo }}
    >
      {children}
    </MangaContext.Provider>
  );
};
