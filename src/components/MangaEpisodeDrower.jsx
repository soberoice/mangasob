import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useManga } from "./contexts/MangaProvider";
import PaginationList from "./Pagination";

export default function MangaEpisodeDrower({ mangaid }) {
  const navigate = useNavigate();
  const { getChapters, chapters, itemNumber } = useManga();
  const [offset, setOffset] = useState(0);
  const handleClick = (id, mangaid, chapter, title) => {
    navigate(`/read/${mangaid}/${id}/${chapter}/${title}`);
  };

  useEffect(() => {
    getChapters(offset, mangaid);
  }, [mangaid, offset]);

  return (
    <Drawer.Root size={{ base: "xs", lg: "md" }}>
      {console.log(chapters)}
      <Drawer.Trigger asChild>
        <Button mt={4} colorScheme="teal" size="md" w={10}>
          <FaBookOpen />
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <PaginationList
              totalResults={itemNumber}
              setOffset={setOffset}
              pageSize={100}
            />
            <Drawer.Header>
              <Drawer.Title>Episodes</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body w="90%">
              <VStack w="full" wrap={"wrap"}>
                {chapters?.map((episode) => (
                  <Button
                    onClick={() =>
                      handleClick(
                        episode.id,
                        mangaid,
                        episode.chapterNumber,
                        episode.title
                      )
                    }
                    w="100%"
                    key={episode?.id}
                    p={2}
                    justifyContent={"space-between"}
                  >
                    <Text
                      textAlign={"left"}
                      fontWeight={"bold"}
                      fontSize={"lg"}
                    >
                      {episode?.chapterNumber}
                    </Text>
                    <Text textAlign={"left"} maxW={"85%"} w={"85%"} truncate>
                      {episode?.title}
                    </Text>
                  </Button>
                ))}
              </VStack>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="md" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
