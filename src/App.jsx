import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const title = "Kanojyo to Himitsu to Koimoyou";

  const getManga = async () => {
    try {
      const baseUrl = "https://proxy.hoppscotch.io/https://api.mangadex.org";
      const resp = await axios.get(`${baseUrl}/manga`, {
        params: { title },
      });

      setData(resp.data.data);
      console.log(resp.data.data);
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };

  useEffect(() => {
    getManga();
  }, []);

  return (
    <>
      {data.map((item) => (
        <p className="read-the-docs" key={item.id}>
          {item?.attributes?.title?.en ?? "No English Title"}
        </p>
      ))}
    </>
  );
}

export default App;
