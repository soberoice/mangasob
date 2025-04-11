import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const MangaContext = createContext();

export const useManga = () => useContext(MangaContext);

export const MangaProvider = ({ children }) => {
  const [popularMangaList, setPopularMangaList] = useState([]); // LST OF POPULAR MANGA
  const [mangaInfo, setMangaInfo] = useState(); // MANGA DETAILS
  const [mangaList, setMangaList] = useState(); // LIST MANGA
  const [newAdded, setNewAdded] = useState(); // LIST OF MANGA WITH NEW EPISODES
  const [searchResults, setSearchResults] = useState(); // LIST OF MANGA SEARCH RESULTS
  const [itemNumber, setItemNumber] = useState(); // THE NUMBER OF ITEMS GIVEN IN THE RESULTS
  const [chapters, setChapters] = useState(); //LIST OF CHAPTER INFO
  const [pages, setPages] = useState();
  const [tagsList, setTagsList] = useState();
  const [stats, setStats] = useState();

  // FUNCTION TO GET POPULAR MANGA
  const getPopularManga = async (page, limit) => {
    try {
      setPopularMangaList();
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
      setItemNumber(resp.data.total);

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
            title:
              manga.attributes.altTitles?.find((t) => t.en)?.en ||
              manga.attributes.title?.en ||
              "No",
            description: manga.attributes.description?.en ?? null,
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

  // FUNCTION TO GET A LIST OF OTHER POPULAR MANGA
  const getMangaList = async () => {
    setMangaList();
    try {
      const proxyBase = "https://corsproxy-psi.vercel.app/api/proxy?url=";
      const targetBase = "https://api.mangadex.org";

      const params = new URLSearchParams({
        offset: 15,
        limit: 20,
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
            ? `${proxyBase}https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`
            : `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`;

          return {
            id: manga.id,
            title:
              manga.attributes.altTitles?.find((t) => t.en)?.en ||
              manga.attributes.title?.en ||
              "No",
            description: manga.attributes.description?.en ?? "No English Title",
            coverUrl: coverUrl,
            attributes: manga.attributes,
          };
        })
      );

      // Filter out any null entries
      setMangaList(mangaData.filter((m) => m !== null));
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };

  //FUNCTION TO GET A MANGA INFO BY PASSING THE ID
  const getMangaInfo = async (id) => {
    setMangaInfo();
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
      // console.log(resp);

      const info = resp.data.data;
      const coverRel = info.relationships.find(
        (rel) => rel.type === "cover_art"
      );

      if (!coverRel) return null;

      const fileName = coverRel.attributes.fileName;
      const isProd = window.location.hostname !== "localhost";

      const coverUrl = isProd
        ? `${proxyBase}https://uploads.mangadex.org/covers/${info.id}/${fileName}.256.jpg`
        : `https://uploads.mangadex.org/covers/${info.id}/${fileName}.256.jpg`;

      const mangaData = {
        id: info.id,
        title:
          info.attributes.altTitles?.find((t) => t.en)?.en ||
          info.attributes.title?.en ||
          "No",
        description: info.attributes.description?.en ?? "No English Title",
        coverUrl: coverUrl,
        attributes: info.attributes,
      };

      setMangaInfo(mangaData);
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };

  //FUNCTION TO GET LATEST MANGA ENTRIES
  const newAddedManga = async (page, limit) => {
    setNewAdded();
    try {
      setNewAdded();
      const proxyBase = "https://corsproxy-psi.vercel.app/api/proxy?url=";
      const targetBase = "https://api.mangadex.org";

      const params = new URLSearchParams({
        offset: page,
        limit: limit,
        "includes[]": "cover_art",
        "order[latestUploadedChapter]": "desc",
      });

      const fullUrl = `${proxyBase}${encodeURIComponent(
        `${targetBase}/manga/?${params}`
      )}`;

      const resp = await axios.get(`${fullUrl}`);
      // console.log(resp);

      const mangaData = await Promise.all(
        resp.data.data.map((manga) => {
          const coverRel = manga.relationships.find(
            (rel) => rel.type === "cover_art"
          );

          if (!coverRel) return null;

          const fileName = coverRel.attributes.fileName;
          const isProd = window.location.hostname !== "localhost";

          const coverUrl = isProd
            ? `${proxyBase}https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`
            : `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`;

          return {
            id: manga.id,
            title:
              manga.attributes.altTitles?.find((t) => t.en)?.en ||
              manga.attributes.title?.en ||
              "No",
            description: manga.attributes.description?.en ?? "No English Title",
            coverUrl: coverUrl,
            attributes: manga.attributes,
          };
        })
      );

      setNewAdded(mangaData);
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };

  // FUNCTION TO GET SEARCH RESULTS
  const search = async (page, limit, searchTerm) => {
    setSearchResults();
    try {
      const proxyBase = "https://corsproxy-psi.vercel.app/api/proxy?url=";
      const targetBase = "https://api.mangadex.org";

      const params = new URLSearchParams({
        title: searchTerm,
        offset: page,
        limit: limit,
        "includes[]": "cover_art",
        "order[followedCount]": "desc",
      });

      const fullUrl = `${proxyBase}${encodeURIComponent(
        `${targetBase}/manga?${params}`
      )}`;

      const resp = await axios.get(`${fullUrl}`);
      // console.log(resp.data.total);
      setItemNumber(resp.data.total);

      const mangaData = await Promise.all(
        resp.data.data.map((manga) => {
          const coverRel = manga.relationships.find(
            (rel) => rel.type === "cover_art"
          );

          if (!coverRel) return null;

          const fileName = coverRel.attributes.fileName;
          const isProd = window.location.hostname !== "localhost";

          const coverUrl = isProd
            ? `${proxyBase}https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`
            : `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`;

          return {
            id: manga.id,
            title:
              manga.attributes.altTitles?.find((t) => t.en)?.en ||
              manga.attributes.title?.en ||
              "No English Title",
            description: manga.attributes.description?.en ?? "No English Title",
            coverUrl: coverUrl,
            attributes: manga.attributes,
          };
        })
      );

      // Filter out any null entries
      setSearchResults(mangaData.filter((m) => m !== null));
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };

  // FUNCTION TO FETCH MANGA CHAPTERS
  const getChapters = async (offset, id) => {
    setChapters();

    try {
      const proxyBase = "https://corsproxy-psi.vercel.app/api/proxy?url=";
      const targetBase = "https://api.mangadex.org";
      const mangaId = id;

      const params = new URLSearchParams({
        offset: offset,
        limit: 100,
        "translatedLanguage[]": "en",
        "order[chapter]": "asc",
        includeExternalUrl: 0,
      });

      const fullUrl = `${proxyBase}${encodeURIComponent(
        `${targetBase}/manga/${mangaId}/feed?${params}`
      )}`;

      const resp = await axios.get(fullUrl);
      // console.log(resp.data);

      setItemNumber(resp.data.total); // total number of chapters

      const mangaData = resp.data.data.map((chapter) => {
        return {
          attributes: chapter.attributes,
          id: chapter.id,
          title:
            chapter.attributes.title || `Chapter ${chapter.attributes.chapter}`,
          chapterNumber: chapter.attributes.chapter,
          language: chapter.attributes.translatedLanguage,
          createdAt: chapter.attributes.publishAt,
          scanGroup:
            chapter.relationships.find((rel) => rel.type === "scanlation_group")
              ?.attributes?.name ?? "Unknown",
        };
      });

      setChapters(mangaData); // 👈 set cleaned-up chapters
    } catch (error) {
      console.error("Error fetching manga chapters:", error);
    }
  };

  // FETCH CHAPTER PAGES
  const getPages = async (id) => {
    setPages(); // Clear current pages

    try {
      const proxyBase = "https://corsproxy-psi.vercel.app/api/proxy?url=";
      const targetBase = "https://api.mangadex.org";
      const chapterId = id;

      const fullUrl = `${proxyBase}${encodeURIComponent(
        `${targetBase}/at-home/server/${chapterId}`
      )}`;

      const resp = await axios.get(fullUrl);

      const { baseUrl, chapter } = resp.data;

      const imageUrls = chapter.dataSaver.map((fileName) => {
        return `${baseUrl}/data-saver/${chapter.hash}/${fileName}`;
      });

      setPages(imageUrls); // 👈 Array of full page image URLs
    } catch (error) {
      console.error("Error fetching manga pages:", error);
    }
  };

  // FETCH MANGA UNDER A CERTAIN TAG
  const getMangaTagList = async (page, id) => {
    setMangaList();
    try {
      const proxyBase = "https://corsproxy-psi.vercel.app/api/proxy?url=";
      const targetBase = "https://api.mangadex.org";

      const params = new URLSearchParams({
        offset: page,
        limit: 20,
        "includes[]": "cover_art",
        "includedTags[]": id,
      });

      const fullUrl = `${proxyBase}${encodeURIComponent(
        `${targetBase}/manga?${params}`
      )}`;

      const resp = await axios.get(`${fullUrl}`);
      setItemNumber(resp.data.total);

      const mangaData = await Promise.all(
        resp.data.data.map((manga) => {
          const coverRel = manga.relationships.find(
            (rel) => rel.type === "cover_art"
          );

          if (!coverRel) return null;

          const fileName = coverRel.attributes.fileName;
          const isProd = window.location.hostname !== "localhost";

          const coverUrl = isProd
            ? `${proxyBase}https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`
            : `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`;

          return {
            id: manga.id,
            title:
              manga.attributes.altTitles?.find((t) => t.en)?.en ||
              manga.attributes.title?.en ||
              "No",
            description: manga.attributes.description?.en ?? "No English Title",
            coverUrl: coverUrl,
            attributes: manga.attributes,
          };
        })
      );

      // Filter out any null entries
      setMangaList(mangaData.filter((m) => m !== null));
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };

  const getTagsList = async (searchTerm) => {
    setTagsList();

    try {
      const proxyBase = "https://corsproxy-psi.vercel.app/api/proxy?url=";
      const targetBase = "https://api.mangadex.org";
      const params = new URLSearchParams({
        "order[followedCount]": "desc",
      });
      const fullUrl = `${proxyBase}${encodeURIComponent(
        `${targetBase}/manga/tag?${params}`
      )}`;

      const resp = await axios.get(`${fullUrl}`);
      setItemNumber(resp.data.total);

      const tagsData = await Promise.all(
        resp.data.data.map((tag) => {
          const tagName = tag?.attributes?.name?.en;
          if (searchTerm) {
            if (tagName?.toLowerCase().includes(searchTerm.toLowerCase())) {
              return {
                id: tag.id,
                name: tagName,
              };
            }
            return null;
          } else {
            return {
              id: tag.id,
              name: tag.attributes.name.en,
            };
          }
        })
      );

      // Filter out any null entries
      setTagsList(tagsData.filter((m) => m !== null));
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };
  const getMangaStats = async (id) => {
    if (!id) {
      return;
    }
    setStats();

    try {
      const proxyBase = "https://corsproxy-psi.vercel.app/api/proxy?url=";
      const targetBase = "https://api.mangadex.org";
      const fullUrl = `${proxyBase}${encodeURIComponent(
        `${targetBase}/statistics/manga/${id}`
      )}`;

      const resp = await axios.get(`${fullUrl}`);
      const mangaData = resp.data.statistics[id];

      // Filter out any null entries
      setStats(mangaData);
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };
  //   useEffect(() => {
  //     getMangaDetails("32d76d19-8a05-4db0-9fc2-e0b0648fe9d0");
  //   }, []);

  return (
    <MangaContext.Provider
      value={{
        getPopularManga,
        popularMangaList,
        getMangaInfo,
        mangaInfo,
        getMangaList,
        mangaList,
        newAddedManga,
        newAdded,
        search,
        searchResults,
        itemNumber,
        getChapters,
        chapters,
        getPages,
        pages,
        getMangaTagList,
        getTagsList,
        tagsList,
        getMangaStats,
        stats,
      }}
    >
      {children}
    </MangaContext.Provider>
  );
};
