import React, { useEffect } from "react";
import { Badge, Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useManga } from "./contexts/MangaProvider";
import { useNavigate } from "react-router";
import { FaTag } from "react-icons/fa";
export default function TagsContainer() {
  const { tagsList, getTagsList } = useManga();
  const navigat = useNavigate();
  const handleClick = (name, id) => {
    navigat(`/tag/${name}/${id}`);
  };
  useEffect(() => {
    getTagsList();
  }, []);
  return (
    <Dialog.Root placement={"center"} scrollBehavior="inside" size="sm">
      <Dialog.Trigger asChild>
        <Button variant="outline" size={"sm"} w={"30px"}>
          <FaTag />
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Tags</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
            <Dialog.Body display={"flex"} flexWrap={"wrap"} gap={2}>
              {tagsList?.map((tag) => (
                <Badge
                  onClick={() => handleClick(tag.name, tag.id)}
                  cursor={"pointer"}
                  size={"lg"}
                  variant={"solid"}
                >
                  {tag.name}
                </Badge>
              ))}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
