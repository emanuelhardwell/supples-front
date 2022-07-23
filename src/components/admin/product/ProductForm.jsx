import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "../../../hooks/useForm";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import {
  productClearActive,
  productModalClose,
  productModalOpen,
} from "../../../store/slices/product/productSlice";
import {
  startProductAdd,
  startProductUpdate,
} from "../../../store/slices/product/productThunk";
import { PhotoCamera } from "@mui/icons-material";

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
  description: "",
  price: "",
  categoryId: "",
};

export const ProductForm = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset, setFormValues] =
    useForm(initialState);
  const { name, description, price, categoryId } = formValues;

  const { modalOpen, productActive, productCategories } = useSelector(
    (state) => state.product
  );

  const [image, setImage] = useState("");

  const handleOpen = () => dispatch(productModalOpen());
  const handleClose = () => {
    dispatch(productModalClose());
    dispatch(productClearActive());
    reset();
    setImage("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name === "" ||
      name.length < 4 ||
      description === "" ||
      description.length < 4
    ) {
      return Swal.fire(
        "Info",
        "El nombre y descripción debe ser mayor a 3 letras",
        "info"
      );
    }

    if (price < 50) {
      return Swal.fire("Info", "El precio mínimo es $ 50", "info");
    }

    if (categoryId === "") {
      return Swal.fire("Info", "Seleccione una categoría", "info");
    }

    if (image === "") {
      return Swal.fire("Info", "Agrege una imagen", "info");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("image", image);

    if (productActive) {
      dispatch(startProductUpdate(formData, productActive.id));
    } else {
      dispatch(startProductAdd(formData));
    }

    handleClose();
  };

  useEffect(() => {
    if (productActive) {
      setFormValues(productActive);
    } else {
      setFormValues(initialState);
    }
  }, [productActive, setFormValues]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { xs: "center", sm: "center" },
      }}
    >
      <div>
        <Button sx={{ mb: 2 }} variant="contained" onClick={handleOpen}>
          Agregar producto
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
                  Agregar producto
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
                    label="Nombre del producto"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                  />

                  <TextField
                    required
                    label="Descripción"
                    name="description"
                    value={description}
                    onChange={handleInputChange}
                  />

                  <TextField
                    required
                    type="number"
                    label="Precio"
                    name="price"
                    value={price}
                    onChange={handleInputChange}
                  />

                  <FormControl>
                    <InputLabel id="select-label">Categoría</InputLabel>
                    <Select
                      labelId="select-label"
                      id="select"
                      label="Categoría"
                      name="categoryId"
                      value={categoryId}
                      onChange={handleInputChange}
                    >
                      {productCategories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Button
                      variant="contained"
                      color="success"
                      component="label"
                    >
                      Elegir imagen
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </Button>
                    <IconButton
                      color="success"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input hidden accept="image/*" type="file" />
                      <PhotoCamera />
                    </IconButton>
                  </Stack>

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
    </Box>
  );
};
