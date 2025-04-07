import React, { useEffect } from "react";
import PopularManga from "../components/PopularManga";
import PopularMangaList from "../components/PopularMangaList";
import MangaList from "../components/MangaList";
import { useManga } from "../components/contexts/MangaProvider";
import { Box, Stack } from "@chakra-ui/react";
import RecentlyAdded from "../components/RecentlyAdded";

export default function Home() {
  const { mangaList, getMangaList } = useManga();
  useEffect(() => {
    getMangaList();
  }, []);
  return (
    <Box w={"100%"}>
      <PopularManga />
      <Stack w={"100%"} direction={{ base: "column", lg: "row" }}>
        <Box w={{ base: "100%", lg: "70%" }}>
          <PopularMangaList />
          <MangaList data={mangaList} />
        </Box>
        <Box w={{ base: "100%", lg: "30%" }}>
          <RecentlyAdded />
        </Box>
      </Stack>
    </Box>
  );
}
