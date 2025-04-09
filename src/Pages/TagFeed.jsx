import React, { useEffect, useState } from "react";
import { useManga } from "../components/contexts/MangaProvider";
import { useParams } from "react-router";
import { Box, Center, Heading, Skeleton, Stack } from "@chakra-ui/react";
import MangaList from "../components/MangaList";
import PaginationList from "../components/Pagination";

export default function TagFeed() {
  const [offset, setOffset] = useState(0);
  const { name, id } = useParams();
  const { getMangaTagList, mangaList, itemNumber } = useManga();
  useEffect(() => {
    getMangaTagList(offset, id);
  }, []);
  return (
    <Stack mt={10} w={"full"} minH={"80vh"} justifyContent={"space-between"}>
      <Box>
        {mangaList?.length ? (
          <Stack p={4} direction={"row"} justify={"space-between"}>
            <Heading size={"2xl"}>Search Results For: {name} </Heading>
          </Stack>
        ) : (
          <Skeleton p={4} height="10" width="70%" />
        )}
        <Center w={"full"}>
          <MangaList data={mangaList || []} />
        </Center>
      </Box>
      <PaginationList
        totalResults={itemNumber}
        setOffset={setOffset}
        pageSize={20}
      />
    </Stack>
  );
}
