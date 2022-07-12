import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useForm } from "../../../hooks/useForm";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  startCategoryAdd,
  startCategoryUpdate,
} from "../../../store/slices/category/categoryThunk";
import {
  categoryClearActive,
  categoryModalClose,
  categoryModalOpen,
} from "../../../store/slices/category/categorySlice";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialState = {
  name: "",
};

export const CategoryForm = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset, setFormValues] =
    useForm(initialState);
  const { name } = formValues;

  const { modalOpen, categoryActive } = useSelector((state) => state.category);
  const handleOpen = () => dispatch(categoryModalOpen());
  const handleClose = () => {
    dispatch(categoryModalClose());
    dispatch(categoryClearActive());
    reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || name.length < 4) {
      return Swal.fire(
        "Info",
        "El nombre de la categoría debe ser mayor a 3 letras",
        "info"
      );
    }

    if (categoryActive) {
      dispatch(startCategoryUpdate({ name }, categoryActive.id));
    } else {
      dispatch(startCategoryAdd(formValues));
    }

    handleClose();
  };

  useEffect(() => {
    if (categoryActive) {
      setFormValues(categoryActive);
    } else {
      setFormValues(initialState);
    }
  }, [categoryActive, setFormValues]);

  return (
    <div>
      <Button sx={{ mb: 2 }} variant="contained" onClick={handleOpen}>
        Agregar categoria
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="h2">
                Agregar categoría
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  mt: 1,
                  "& .MuiTextField-root": { marginY: 1, width: "100%" },
                  "& .MuiFormControl-root": { marginY: 1, width: "100%" },
                }}
              >
                <TextField
                  autoFocus
                  required
                  label="Nombre de la categoría"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                >
                  Guardar
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
