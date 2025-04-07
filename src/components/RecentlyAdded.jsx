import {
  Box,
  Card,
  Center,
  Heading,
  Image,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useManga } from "./contexts/MangaProvider";

export default function RecentlyAdded() {
  const { newAdded, newAddedManga } = useManga();
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  useEffect(() => {
    newAddedManga(0, 10);
  }, []);
  return (
    <Center>
      <Stack mt={10} p={4}>
        {/* {console.log(data)} */}
        {newAdded?.length ? (
          <Stack direction={"row"} justify={"space-between"}>
            <Heading size={"2xl"}>RecentlyAdded</Heading>
            <Link>More</Link>
          </Stack>
        ) : (
          <Skeleton height="5" width="100%" />
        )}
        {newAdded?.length
          ? newAdded?.map((manga) => {
              return (
                <Card.Root
                  flexDirection="row"
                  cursor="pointer"
                  overflow="hidden"
                  maxW="100%"
                  maxH={150}
                  cursore={"pointer"}
                  //   onClick={() => handleclick(manga?.id)}
                  key={manga?.id}
                >
                  {/* {console.log(manga?.coverUrl)} */}
                  <Box w={"200px"}>
                    <Image
                      objectFit="cover"
                      minW="100px"
                      src={manga?.coverUrl}
                      alt={manga?.title}
                    />
                  </Box>
                  <Stack direction={"row"} w="full">
                    <Card.Body>
                      <Card.Title mb="2" lineClamp={1}>
                        {manga?.title}
                      </Card.Title>
                      {/* <Card.Description lineClamp={1}>
                        {manga?.altTitles[0]?.ja ||
                          manga?.altTitles[2]?.ja ||
                          manga?.altTitles[0]?.ko ||
                          manga?.altTitles[0]?.zh ||
                          manga?.altTitles[1]?.ja}
                      </Card.Description> */}
                    </Card.Body>
                    {/* <Card.Footer marginLeft={"auto"}>
                      <Text fontWeight={"bold"} fontSize={"4xl"}>
                        {manga.title}
                      </Text>
                    </Card.Footer> */}
                  </Stack>
                </Card.Root>
              );
            })
          : numbers.map((num) => (
              <Card.Root
                flexDirection="row"
                cursor="pointer"
                overflow="hidden"
                size={"sm"}
                w="full"
                h={150}
                key={num}
              >
                <Skeleton aspectRatio={4 / 1.4} Height="100%" W="100%" />
              </Card.Root>
            ))}
      </Stack>
    </Center>
  );
}
