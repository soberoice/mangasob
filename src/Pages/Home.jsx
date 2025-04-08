import React, { useEffect } from "react";
import PopularManga from "../components/PopularManga";
import PopularMangaList from "../components/PopularMangaList";
import MangaList from "../components/MangaList";
import { useManga } from "../components/contexts/MangaProvider";
import { Box, Heading, Skeleton, Stack } from "@chakra-ui/react";
import RecentlyAdded from "../components/RecentlyAdded";
import { Link } from "react-router";

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
          {mangaList?.length ? (
            <Stack p={4} direction={"row"} justify={"space-between"} w={"97%"}>
              <Heading size={"2xl"}>More Popular </Heading>
              <Link>More</Link>
            </Stack>
          ) : (
            <Skeleton height="5" width="100%" />
          )}
          <MangaList data={mangaList} />
        </Box>
        <Box w={{ base: "100%", lg: "30%" }}>
          <RecentlyAdded />
        </Box>
      </Stack>
    </Box>
  );
}
