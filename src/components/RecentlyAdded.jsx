import {
  Box,
  Card,
  Center,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useManga } from "./contexts/MangaProvider";

export default function RecentlyAdded() {
  const { newAdded, newAddedManga } = useManga();
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/manga/${id}`);
  };

  useEffect(() => {
    newAddedManga(0, 10);
  }, []);
  return (
    <Center w={"100%"}>
      <Stack w={"100%"} mt={10} p={4}>
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
                  onClick={() => handleClick(manga?.id)}
                  key={manga?.id}
                >
                  {/* {console.log(manga?.coverUrl)} */}
                  <Image
                    objectFit="cover"
                    maxW="100px"
                    minW="100px"
                    minH={"150px"}
                    src={manga?.coverUrl}
                    alt={manga?.title}
                  />
                  <Box pb={"4"} w={"90%"}>
                    <Card.Body>
                      <Card.Title mb="2" lineClamp={1}>
                        {manga?.title}
                      </Card.Title>
                      <Card.Description w={"90%"} lineClamp={2}>
                        {manga?.description}
                      </Card.Description>
                    </Card.Body>
                    <Card.Footer
                      display={"flex"}
                      justifyContent={"space-between"}
                      w={"100%"}
                    >
                      <Text fontWeight="lighter" fontSize="xs">
                        {manga?.attributes?.year}
                      </Text>
                      <Text fontWeight="lighter" fontSize="xs">
                        {manga?.attributes?.status}
                      </Text>
                    </Card.Footer>
                  </Box>
                </Card.Root>
              );
            })
          : numbers.map((num) => (
              <Card.Root
                cursor="pointer"
                overflow="hidden"
                minW="52vh"
                h={150}
                key={num}
              >
                <Skeleton Height="100%" minW="100%" />
              </Card.Root>
            ))}
      </Stack>
    </Center>
  );
}
