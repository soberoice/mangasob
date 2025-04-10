import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  CloseButton,
  Dialog,
  IconButton,
  Input,
  Popover,
  Portal,
} from "@chakra-ui/react";
import { useManga } from "./contexts/MangaProvider";
import { useNavigate } from "react-router";
import { FaTag } from "react-icons/fa";
export default function TagsContainer() {
  const { tagsList, getTagsList } = useManga();
  const [searchTerm, setSearchTerm] = useState();
  const navigat = useNavigate();
  const handleClick = (name, id) => {
    navigat(`/tag/${name}/${id}`);
  };
  useEffect(() => {
    getTagsList(searchTerm);
  }, [searchTerm]);
  return (
    <Popover.Root scrollBehavior="inside" size={{ base: "sm", lg: "lg" }}>
      <Popover.Trigger asChild>
        <IconButton variant="outline" size={"sm"}>
          <FaTag />
        </IconButton>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body
              minH={"225px"}
              display={"flex"}
              flexDir={"column"}
              gap={2}
            >
              <Popover.Title fontWeight={"bold"} fontSize={"xl"}>
                Tags
              </Popover.Title>
              <Box maxH={"150px"} overflow={"scroll"}>
                {tagsList?.map((tag) => (
                  <Popover.Trigger
                    key={tag?.id}
                    onClick={() => handleClick(tag.name, tag.id)}
                  >
                    <Badge
                      cursor={"pointer"}
                      size={"lg"}
                      m={"2px"}
                      variant={"solid"}
                      height={"30px"}
                    >
                      {tag?.name}
                    </Badge>
                  </Popover.Trigger>
                ))}
              </Box>
              <Input
                mt={"auto"}
                placeholder="Search tags"
                size="md"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
