import Swal from "sweetalert2";

export const deleteSweetAlert = async () => {
  const result = await Swal.fire({
    title: "¿Está seguro de eliminarlo?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "¡Sí, bórralo!",
  });

  if (result.isConfirmed) {
    return true;
  } else {
    return false;
  }
};
