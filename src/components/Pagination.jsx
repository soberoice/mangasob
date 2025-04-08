import React, { useState } from "react";
import { ButtonGroup, IconButton, Pagination, Center } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function PaginationList({ totalResults, setOffset }) {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <Center>
      <Pagination.Root
        count={totalResults}
        pageSize={20}
        defaultPage={1}
        page={currentPage}
        onPageChange={(e) => {
          setCurrentPage(e.page);
          setOffset(20 * (e.page - 1));
        }}
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
                onClick={() => {
                  setCurrentPage(page.value);
                  setOffset(20 * (page.value - 1));
                }}
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
