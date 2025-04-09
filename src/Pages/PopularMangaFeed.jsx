import React, { useEffect, useState } from "react";
import { useManga } from "../components/contexts/MangaProvider";
import MangaList from "../components/MangaList";
import PaginationList from "../components/Pagination";
import { Stack } from "@chakra-ui/react";

export default function PopularMangaFeed() {
  const [offset, setOffset] = useState(0);
  const { popularMangaList, getPopularManga, itemNumber } = useManga();
  useEffect(() => {
    getPopularManga(offset, 20);
  }, [offset]);
  return (
    <Stack mt={10} w={"full"} minH={"80vh"} justifyContent={"space-between"}>
      <MangaList data={popularMangaList} />
      <PaginationList
        totalResults={itemNumber}
        setOffset={setOffset}
        pageSize={20}
      />
    </Stack>
  );
}
