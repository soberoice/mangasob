import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [mangaList, setMangaList] = useState([]);

  const getManga = async () => {
    try {
      const proxy = "https://corsproxy-psi.vercel.app/api/proxy?url=";
      const baseUrl = `${proxy}https://api.mangadex.org`;

      const resp = await axios.get(`${baseUrl}/manga`, {
        params: {
          limit: 10,
          include: ["author", "artist", "cover_art"],
        },
      });

      const mangaData = await Promise.all(
        resp.data.data.map(async (manga) => {
          const coverRel = manga.relationships.find(
            (rel) => rel.type === "cover_art"
          );

          if (!coverRel) return null;

          const coverResp = await axios.get(`${baseUrl}/cover/${coverRel.id}`);
          const fileName = coverResp.data.data.attributes.fileName;
          const isProd = window.location.hostname !== "localhost";

          const coverUrl = isProd
            ? `https://images.weserv.nl/?url=https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`
            : `https://uploads.mangadex.org/covers/${manga.id}/${fileName}.256.jpg`;

          return {
            id: manga.id,
            title: manga.attributes.title?.en ?? "No English Title",
            coverUrl: coverUrl,
          };
        })
      );

      // Filter out any null entries
      setMangaList(mangaData.filter((m) => m !== null));
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };

  useEffect(() => {
    getManga();
  }, []);

  return (
    <>
      <h1>Manga List</h1>
      {console.log(mangaList)}
      {mangaList.map((manga) => (
        <div key={manga.id} style={{ marginBottom: "20px" }}>
          {manga.coverUrl ? (
            <img src={manga.coverUrl} alt={manga.title} width="150" />
          ) : (
            <p>No cover available</p>
          )}
          <p>{manga.title}</p>
        </div>
      ))}
    </>
  );
}

export default App;
