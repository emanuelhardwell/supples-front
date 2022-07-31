import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { numberFormat } from "../../helpers/numberFormat";
import { Avatar, Paper, Typography } from "@mui/material";
import { CartDelete } from "./CartDelete";

function subtotal(rows) {
  return rows
    .map((row) => row.CartItem.quantity * row.price)
    .reduce((sum, row) => sum + row, 0);
}

export const CartTable = ({ cartItems }) => {
  return (
    <>
      <Typography
        fontWeight="bold"
        component="h1"
        variant="h6"
        textAlign="center"
        paddingTop="10px"
      >
        Carrito
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell align="right">Imagen</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Suma</TableCell>
              <TableCell align="right">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems?.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Avatar
                    alt={row.name}
                    src={row.imageUrl}
                    sx={{
                      width: 70,
                      height: 70,
                      objectFit: "contain",
                    }}
                    variant="square"
                  />
                </TableCell>
                <TableCell align="right">{row.CartItem.quantity}</TableCell>
                <TableCell align="right">{numberFormat(row.price)}</TableCell>
                <TableCell align="right">
                  {numberFormat(row.price * row.CartItem.quantity)}
                </TableCell>
                <TableCell align="right">
                  <CartDelete id={row.CartItem.id} />
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={3} />
              <TableCell colSpan={2}>
                <strong>Subtotal</strong>
              </TableCell>
              <TableCell align="right">
                <strong>
                  {cartItems && numberFormat(subtotal(cartItems))}
                </strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
