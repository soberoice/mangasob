import { Switch, Box, Image, Stack, Text, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MangaEpisodeDrower from "../components/MangaEpisodeDrower";
import { useManga } from "../components/contexts/MangaProvider";
import { FaArrowsAltH, FaArrowsAltV } from "react-icons/fa";

export default function MangaView() {
  const [isHorizontal, setIsHorizontal] = useState(false);
  const { id, chapter, title, mangaid } = useParams();
  const { getPages, pages } = useManga();
  useEffect(() => {
    getPages(id);
  }, [id]);
  return (
    <Center flexDir={"column"}>
      <Stack
        position={"sticky"}
        top={"50px"}
        bg={"black"}
        w={"full"}
        h="70px"
        p={2}
        direction={"row"}
        margin={4}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text w={"30%"} truncate>
          {chapter}: {title}
        </Text>
        <Switch.Root
          w={"30%"}
          checked={isHorizontal}
          onCheckedChange={(e) => setIsHorizontal(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Label>
            <FaArrowsAltV />
          </Switch.Label>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>
            <FaArrowsAltH />
          </Switch.Label>
        </Switch.Root>
        {pages && <MangaEpisodeDrower mangaid={mangaid} />}
      </Stack>

      <Stack
        direction={isHorizontal ? "row-reverse" : "column"}
        overflow={isHorizontal ? "auto" : "unset"}
        maxH={isHorizontal ? "100%" : "unset"}
        maxW={
          isHorizontal
            ? { base: "100%", md: "55%", lg: "30%" }
            : { base: "100%", md: "55%", lg: "30%" }
        }
        whiteSpace={isHorizontal ? "nowrap" : "normal"}
        gap={isHorizontal ? 4 : 0}
        flexShrink={0}
      >
        {pages?.map((page, index) => (
          <Image
            key={index}
            alt={`Page ${index + 1}`}
            maxW={isHorizontal ? "100%" : "800px"}
            objectFit="contain"
            src={`https://corsproxy-psi.vercel.app/api/proxy?url=${page}`}
          />
        ))}
      </Stack>
    </Center>
  );
}
