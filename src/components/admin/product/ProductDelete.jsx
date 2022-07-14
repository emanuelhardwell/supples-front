import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startProductDelete } from "../../../store/slices/product/productThunk";

export const ProductDelete = ({ id }) => {
  const dispatch = useDispatch();

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "¿Está seguro de eliminarlo?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
    });

    if (!result.isConfirmed) {
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
