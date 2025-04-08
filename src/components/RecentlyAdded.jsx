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
    <Center W="90%">
      <Stack mt={10} p={4} W="100%">
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
                  onClick={() => handleClick(manga?.id)}
                  key={manga?.id}
                >
                  {/* {console.log(manga?.coverUrl)} */}
                  <Box w={"150px"}>
                    <Image
                      objectFit="cover"
                      minW="100px"
                      minH={"150px"}
                      src={manga?.coverUrl}
                      alt={manga?.title}
                    />
                  </Box>
                  <Card.Body justifyContent={"space-evenly"}>
                    <Card.Title mb="2" lineClamp={1}>
                      {manga?.title}
                    </Card.Title>
                    <Card.Description
                      display={"flex"}
                      flexDir={"column"}
                      gap={2}
                    >
                      <Text
                        width={{ base: "120px", sm: "250px" }}
                        lineClamp={2}
                      >
                        {manga?.description}
                      </Text>
                      <Box
                        display={"flex"}
                        flexDir={"row"}
                        justifyContent={"space-between"}
                      >
                        <Text fontWeight="lighter" fontSize="xs">
                          {manga?.attributes?.year}
                        </Text>
                        <Text fontWeight="lighter" fontSize="xs">
                          {manga?.attributes?.status}
                        </Text>
                      </Box>
                    </Card.Description>
                  </Card.Body>
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
