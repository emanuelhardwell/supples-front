import { Pagination, PaginationItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const ProductPagination = ({
  numberOfPages,
  currentPage,
  searchQuery,
}) => {
  return (
    <>
      <Pagination
        sx={{ display: "flex", justifyContent: "center" }}
        count={numberOfPages}
        page={currentPage}
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`${
              item.page === 1 && searchQuery === ""
                ? ""
                : item.page !== 1 && searchQuery === ""
                ? `?page=${item.page}`
                : item.page === 1 && searchQuery !== ""
                ? `?name=${searchQuery}`
                : `?page=${item.page}&name=${searchQuery}`
            }`}
            {...item}
          />
        )}
      />
    </>
  );
};
