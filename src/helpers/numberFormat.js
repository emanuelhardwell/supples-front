export const numberFormat = (num) => {
  let numberFormatMoney = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  return numberFormatMoney.format(num);
};
