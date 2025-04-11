import {
  Badge,
  Box,
  Card,
  CloseButton,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";

export default function SearchDropDown({ data, setSearchTerm }) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    setSearchTerm("");
    navigate(`/manga/${id}`);
  };
  return (
    <Box
      position={"absolute"}
      top={"100%"}
      right={"0"}
      bg={"blackAlpha.800"}
      py={2}
      rounded={"lg"}
      transition={"all"}
      transitionDuration={"fast"}
    >
      <CloseButton
        onClick={() => setSearchTerm("")}
        float={"right"}
        variant={"ghost"}
        size={"md"}
      />
      <Stack
        flexDir={"row"}
        w={{ base: "300px", lg: "500px" }}
        h={"500px"}
        overflow={"scroll"}
        flexFlow={"wrap"}
        rounded={"md"}
        scrollbar={"hidden"}
      >
        {data?.map((manga) => (
          <Card.Root
            key={manga.id}
            bg={"transparent"}
            border={"none"}
            flexDirection="row"
            overflow="hidden"
            h={"120px"}
            w={"98%"}
            px={2}
            my={2}
            onClick={() => handleClick(manga.id)}
            cursor={"pointer"}
          >
            <Image
              rounded={"sm"}
              objectFit="cover"
              maxW="100px"
              minW="100px"
              src={manga?.coverUrl}
              alt={manga?.title}
            />
            <Box>
              <Card.Body>
                <Card.Title lineClamp={1}>{manga?.title}</Card.Title>
                <Card.Description lineClamp={1}>
                  {manga?.description}
                </Card.Description>
                <HStack mt="4">
                  <Badge>{manga?.attributes.year}</Badge>
                  <Badge>{manga?.attributes.status}</Badge>
                </HStack>
              </Card.Body>
            </Box>
          </Card.Root>
        ))}
        {data && <Text ml={4}>Press enter to see more...</Text>}
      </Stack>
    </Box>
  );
}
