import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import {
  productModalOpen,
  productSetActive,
} from "../../../store/slices/product/productSlice";

export const ProductUpdate = ({ product }) => {
  const dispatch = useDispatch();

  const updateProduct = (product) => {
    dispatch(productSetActive(product));
    dispatch(productModalOpen());
  };

  return (
    <>
      <Tooltip title="Editar">
        <IconButton onClick={() => updateProduct(product)}>
          <EditIcon color="success" />
        </IconButton>
      </Tooltip>
    </>
  );
};
