import { Box, TextField } from "@mui/material";
import React from "react";

export const ProductSearch = ({ search, setSearch, handleSubmit }) => {
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
