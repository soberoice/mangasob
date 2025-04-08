import { Box, Center, Heading, Skeleton, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import MangaList from "../components/MangaList";
import { useManga } from "../components/contexts/MangaProvider";
import PaginationList from "../components/Pagination";

export default function SearchFeed() {
  const { searchterm } = useParams();
  const { searchResults, search, itemNumber } = useManga();
  useEffect(() => {
    search(0, searchterm);
  }, [searchterm]);
  return (
    <Stack mt={10} w={"full"} minH={"80vh"} justifyContent={"space-between"}>
      {console.log(searchResults)}
      <Box>
        {searchResults?.length ? (
          <Stack p={4} direction={"row"} justify={"space-between"}>
            <Heading size={"2xl"}>Search Results For: {searchterm} </Heading>
          </Stack>
        ) : (
          <Skeleton p={4} height="10" width="70%" />
        )}
        <Center w={"full"}>
          <MangaList data={searchResults} />
        </Center>
      </Box>
      <PaginationList totalResults={itemNumber} searchterm={searchterm} />
    </Stack>
  );
}
