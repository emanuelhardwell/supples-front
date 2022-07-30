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
  let number = Number(num);
  return `${number.toFixed(2)}`;
}

// function priceRow(quantity, price) {
//   return quantity * price;
// }

// function createRow(desc, quantity, price) {
//   const sum = priceRow(quantity, price);
//   return { desc, quantity, price, sum };
// }

function subtotal(items) {
  return items.map(({ sum }) => sum).reduce((sum, i) => sum + i, 0);
}

const rows = [
  {
    name: "Giant Sports Performance Series 100% Whey Isolate | 25 gr de Proteína Completa Derivada únicamente de Whey Protein Isolate 90% WPI |Solo 2 g de Carbohidratos",
    price: "649.01",
    imageUrl:
      "https://res.cloudinary.com/emanuel-hardwell/image/upload/v1658628631/supples/dzbebpzqlge2cxrauqx8.jpg",
    CartItem: {
      id: 2,
      cartId: 2,
      productId: 1,
      quantity: 1,
    },
  },
  {
    name: "FORZAGEN | Proteína Forzawhey-Pro | 100% Whey Protein | 5 lb (2,27 kg) | 69 Servicios x Envase | Delicioso Sabor a Chocolate | 25 g de Proteína de Suero por Servicio | Bajo en Carbohidratos",
    price: "1289.00",
    imageUrl:
      "https://res.cloudinary.com/emanuel-hardwell/image/upload/v1658628813/supples/oewfe9vnedqbavi9pvra.jpg",
    CartItem: {
      id: 1,
      cartId: 2,
      productId: 2,
      quantity: 2,
    },
  },
  {
    name: "Glutamina | Glutamine | 90 porciones de 5 g c/u | 100% glutamina | Sin saborizantes | Sin excipientes | Post entrenamiento",
    price: "635.00",
    imageUrl:
      "https://res.cloudinary.com/emanuel-hardwell/image/upload/v1658630109/supples/bhk5ljpv0homefg3oi8z.jpg",
    CartItem: {
      id: 4,
      cartId: 2,
      productId: 14,
      quantity: 5,
    },
  },
  {
    name: "German American Technology Mezcla de Proteínas y Aminoácidos Glutamine, 300 g",
    price: "449.00",
    imageUrl:
      "https://res.cloudinary.com/emanuel-hardwell/image/upload/v1658630196/supples/xtbcllbvrjkwnsu4mx0h.jpg",
    CartItem: {
      id: 5,
      cartId: 2,
      productId: 16,
      quantity: 3,
    },
  },
  {
    name: "L-CARNITINE CAPSULE 1,200 100 caps",
    price: "399.00",
    imageUrl:
      "https://res.cloudinary.com/emanuel-hardwell/image/upload/v1658630578/supples/av9zbzvmb78asq65xfof.jpg",
    CartItem: {
      id: 3,
      cartId: 2,
      productId: 21,
      quantity: 4,
    },
  },
  {
    name: "L-Carnitina Platinum 1000 mg |4 en 1| +Vinagre de Manzana | +CLA | +Cetonas de frambuesa | Testrol | 90 Caps",
    price: "423.47",
    imageUrl:
      "https://res.cloudinary.com/emanuel-hardwell/image/upload/v1658630687/supples/bjsadv4gqhrpjzlnqwrc.jpg",
    CartItem: {
      id: 6,
      cartId: 2,
      productId: 23,
      quantity: 3,
    },
  },
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
                      <TableRow key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="right">
                          {row?.CartItem?.quantity}
                        </TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">
                          {ccyFormat(row.price)}
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
