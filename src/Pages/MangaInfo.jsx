import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useManga } from "../components/contexts/MangaProvider";
import { Image } from "@chakra-ui/react";

export default function MangaInfo() {
  const { id } = useParams();
  const { mangaInfo, getMangaInfo } = useManga();

  useEffect(() => {
    getMangaInfo(id);
  }, [id]);
  return (
    <div>
      <Image src={mangaInfo?.coverUrl} />
    </div>
  );
}
