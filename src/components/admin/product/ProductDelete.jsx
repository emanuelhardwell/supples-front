import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import { deleteSweetAlert } from "../../../helpers/deleteSweetAlert";
import { startProductDelete } from "../../../store/slices/product/productThunk";

export const ProductDelete = ({ id }) => {
  const dispatch = useDispatch();

  const deleteProduct = async (id) => {
    const result = await deleteSweetAlert();

    if (!result) {
      return null;
    }

    dispatch(startProductDelete(id));
  };

  return (
    <>
      <Tooltip title="Eliminar">
        <IconButton onClick={() => deleteProduct(id)}>
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>
    </>
  );
};
