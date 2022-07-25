import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductSearch = ({ setSearchQuery, page, initialState }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(search);
    if (page === 1 && search === "") {
      navigate(``);
    } else if (page !== 1 && search === "") {
      navigate(`?page=${page}`);
    } else if (page === 1 && search !== "") {
      navigate(`?name=${search}`);
    } else if (page !== 1 && search !== "") {
      navigate(`?page=${page}&name=${search}`);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", sm: "center" },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: -1,
            "& .MuiTextField-root": { marginY: 1, width: "100%" },
            "& .MuiFormControl-root": { marginY: 1, width: "100%" },
          }}
        >
          <TextField
            size="small"
            label="Buscar"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </Box>
    </>
  );
};
