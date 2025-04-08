import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useManga } from "../components/contexts/MangaProvider";
import { Image } from "@chakra-ui/react";
import MangaDetails from "../components/MangaDetails";

export default function MangaInfo() {
  const { id } = useParams();
  const { mangaInfo, getMangaInfo } = useManga();

  useEffect(() => {
    getMangaInfo(id);
  }, [id]);
  return (
    <div>
      <MangaDetails data={mangaInfo} />
    </div>
  );
}
