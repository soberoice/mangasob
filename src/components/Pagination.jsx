import React, { useEffect, useState } from "react";
import { ButtonGroup, IconButton, Pagination, Center } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useManga } from "./contexts/MangaProvider";

export default function PaginationList({ totalResults, searchterm }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { search } = useManga();
  useEffect(() => {
    search(currentPage, searchterm);
  }, [currentPage]);

  return (
    <Center>
      <Pagination.Root
        count={totalResults}
        pageSize={20}
        page={currentPage}
        onPageChange={(e) => setCurrentPage(e.page)}
      >
        <ButtonGroup mt={4} variant="ghost" size="sm">
          <Pagination.PrevTrigger asChild>
            <IconButton aria-label="Previous page">
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton
                key={page.value}
                variant={page.value === currentPage ? "outline" : "ghost"}
                onClick={() => setCurrentPage(page.value)}
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton aria-label="Next page">
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Center>
  );
}
