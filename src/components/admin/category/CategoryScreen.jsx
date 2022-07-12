import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  categoryModalOpen,
  categorySetActive,
} from "../../../store/slices/category/categorySlice";
import {
  startCategoryDelete,
  startCategoryGet,
} from "../../../store/slices/category/categoryThunk";
import { Navbar } from "../../ui/Navbar";
import { CategoryForm } from "./CategoryForm";

export const CategoryScreen = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(startCategoryGet());
  }, [dispatch]);

  const deleteCategoryAll = (rowsDeleted) => {
    // array of all ids to to be deleted
    const idsToDelete = rowsDeleted.data.map((d) => categories[d.dataIndex].id);
    console.log(idsToDelete);
  };

  const deleteCategory = async (id) => {
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

    dispatch(startCategoryDelete(id));
  };

  const updateCategory = (id) => {
    const categoryNow = categories.filter((category) => category.id === id);

    dispatch(categorySetActive(categoryNow[0]));
    dispatch(categoryModalOpen());
  };

  const colums = [
    {
      name: "id",
      label: "Id",
      options: {
        filter: false,
        sort: true,
      },
    },
    { name: "name", label: "Nombre", options: { filter: false, sort: true } },

    {
      name: "acciones",
      label: "ACCIONES",
      options: {
        filter: false,
        sort: false,
        empty: true,

        customBodyRender: (value, tableMeta, updateValue) => (
          <>
            <Tooltip title="Eliminar" placement="top">
              <IconButton
                sx={{ m: "2px" }}
                variant="contained"
                size="small"
                onClick={() => {
                  deleteCategory(tableMeta.rowData[0]);
                }}
                aria-label="delete"
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>

            <Tooltip title="Actualizar" placement="top">
              <IconButton
                sx={{ m: "2px" }}
                variant="contained"
                size="small"
                onClick={() => {
                  updateCategory(tableMeta.rowData[0]);
                }}
                aria-label="update"
              >
                <EditIcon color="success" />
              </IconButton>
            </Tooltip>
          </>
        ),
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    print: false,
    download: false,
    selectableRows: "none",
    responsive: "standard",
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 100],
    onRowsDelete: (rowsDeleted, data, dataIndex) => {
      deleteCategoryAll(rowsDeleted);
    },
  };

  return (
    <>
      <Navbar />
      <CssBaseline />
      <Container maxWidth="xl" sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
        <Grid container sx={{ pt: 2 }}>
          <Grid item xs={12}>
            <Typography
              component="h1"
              variant="h5"
              textAlign="center"
              gutterBottom
            >
              Categorías para los productos
            </Typography>
            <CategoryForm />

            <MUIDataTable
              title={"Tabla de categorías"}
              columns={colums}
              data={categories}
              options={options}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
