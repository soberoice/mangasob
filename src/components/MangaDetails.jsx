import React, { useEffect } from "react";
import {
  Badge,
  Box,
  Breadcrumb,
  Center,
  Heading,
  HStack,
  Image,
  Separator,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import MangaExtraDetails from "./MangaExtraDetails";
import MangaEpisodeDrower from "./MangaEpisodeDrower";
import { useManga } from "./contexts/MangaProvider";
import { FaRegStar } from "react-icons/fa";
import { MdBookmarkAdded } from "react-icons/md";
import MangaList from "./MangaList";

export default function MangaDetails({ data }) {
  const { getMangaList, getMangaStats, stats, mangaList } = useManga();
  useEffect(() => {
    getMangaStats(data?.id);
    getMangaList();
  }, [data?.id]);

  return (
    <div>
      <Box w={"100%"}>
        <Box
          backgroundImage={`url(${data?.coverUrl})`}
          position={"fixed"}
          zIndex={-10}
          w={"100%"}
          h={"100vh"}
          backgroundSize={"cover"}
        ></Box>
        <Stack
          direction={{ base: "column", lg: "row" }}
          background={"rgba(31, 31, 31, 0.42)"}
          backdropFilter="blur(20px)"
          p={10}
        >
          <Stack
            w={{ base: "100%", lg: "80%" }}
            gap={10}
            direction={{ base: "column", md: "row" }}
          >
            <Center w={{ base: "100%", lg: "25%" }}>
              {data && (
                <Box
                  background={"rgba(0, 0, 0, 0.56)"}
                  p={5}
                  rounded={"2xl"}
                  backdropFilter="blur(20px)"
                >
                  <Image
                    src={`${data?.coverUrl}`}
                    rounded={"lg"}
                    alt={data?.title}
                    maxH={"400px"}
                  />
                </Box>
              )}
            </Center>
            <Center w={{ base: "100%", lg: "65%" }}>
              <Stack w={"full"}>
                <Heading>{data?.title}</Heading>
                {data && (
                  <Breadcrumb.Root w={"70%"} size={"sm"}>
                    <Breadcrumb.List>
                      <Breadcrumb.Item>
                        <Breadcrumb.Link href="/" w={"35px"}>
                          Home
                        </Breadcrumb.Link>
                      </Breadcrumb.Item>
                      <Breadcrumb.Separator />
                      <Breadcrumb.Item>
                        <Breadcrumb.CurrentLink>
                          {data?.title}
                        </Breadcrumb.CurrentLink>
                      </Breadcrumb.Item>
                    </Breadcrumb.List>
                  </Breadcrumb.Root>
                )}
                {data?.attributes?.publicationDemographic && (
                  <HStack wrap={"wrap"}>
                    <Badge>{data?.attributes?.publicationDemographic}</Badge>
                  </HStack>
                )}
                <Box h={"200px"} w={"full"} overflow={"scroll"}>
                  <Text>{data?.description}</Text>
                </Box>
                <HStack>
                  <Badge size={"lg"} display={"flex"}>
                    <MdBookmarkAdded /> {stats?.follows}
                  </Badge>
                  <Badge size={"lg"} display={"flex"}>
                    <FaRegStar /> {stats?.rating.average.toFixed(1)}
                  </Badge>
                </HStack>
                {data && <MangaEpisodeDrower mangaid={data?.id} />}
              </Stack>
            </Center>
          </Stack>
          <Separator orientation={{ base: "horizontal", lg: "vertical" }} />

          <Center w={{ base: "100%", lg: "20%" }}>
            <MangaExtraDetails data={data} />
          </Center>
        </Stack>
        <Stack py={10} px={{ base: 5, lg: 10 }} w={"100%"} bgColor={"black"}>
          {mangaList?.length ? (
            <Stack p={4} direction={"row"} justify={"space-between"}>
              <Heading size={"2xl"}>Read More </Heading>
            </Stack>
          ) : (
            <Skeleton p={4} height="15" width="20%" />
          )}

          <MangaList data={mangaList} />
        </Stack>
      </Box>
    </div>
  );
}
