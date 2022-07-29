import { Container, CssBaseline, Grid, Paper } from "@mui/material";
import React from "react";
import { Navbar } from "../ui/Navbar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(quantity, price) {
  return quantity * price;
}

function createRow(desc, quantity, price) {
  const sum = priceRow(quantity, price);
  return { desc, quantity, price, sum };
}

function subtotal(items) {
  return items.map(({ sum }) => sum).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export const CartScreen = () => {
  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="xl">
        <Paper
          style={{ marginTop: "20px", marginBottom: "20px" }}
          elevation={6}
        >
          <Grid container>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={3}>
                        Details
                      </TableCell>
                      <TableCell align="right">Price</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Desc</TableCell>
                      <TableCell align="right">Qty.</TableCell>
                      <TableCell align="right">Unit</TableCell>
                      <TableCell align="right">Sum</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.desc}>
                        <TableCell>{row.desc}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">
                          {ccyFormat(row.sum)}
                        </TableCell>
                      </TableRow>
                    ))}

                    <TableRow>
                      <TableCell rowSpan={3} />
                      <TableCell colSpan={2}>Subtotal</TableCell>
                      <TableCell align="right">
                        {ccyFormat(invoiceSubtotal)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tax</TableCell>
                      <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
                        0
                      )} %`}</TableCell>
                      <TableCell align="right">
                        {ccyFormat(invoiceTaxes)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell align="right">
                        {ccyFormat(invoiceTotal)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};
