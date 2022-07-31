import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteSweetAlert } from "../../helpers/deleteSweetAlert";
import { startCartDelete } from "../../store/slices/cart/cartThunk";

export const CartDelete = ({ id }) => {
  const dispatch = useDispatch();

  const deleteCartItem = async (id) => {
    const result = await deleteSweetAlert();

    if (!result) {
      return null;
    }

    dispatch(startCartDelete(id));
  };

  return (
    <>
      <Tooltip title="Eliminar">
        <IconButton onClick={() => deleteCartItem(id)}>
          <DeleteIcon color="error" />
        </IconButton>
      </Tooltip>
    </>
  );
};
