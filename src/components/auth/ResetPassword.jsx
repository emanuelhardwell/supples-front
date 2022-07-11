import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startResetPassword } from "../../store/slices/auth/authThunk";
import { useForm } from "../../hooks/useForm";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://www.instagram.com/emanuel.hardwell"
        target="_blank"
      >
        Emanuel Hardwell
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset] = useForm({
    email: "",
  });
  const navigate = useNavigate();

  const { email } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      return Swal.fire("Error", "Ingresa el correo", "info");
    }

    dispatch(startResetPassword(formValues));
    reset();
    navigate("/update-password");
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" gutterBottom>
            Restablecer contraseña
          </Typography>
          <Typography component="p" variant="body1" textAlign="center">
            Ingrese su dirección de correo electrónico a continuación y le
            enviaremos un enlace para restablecer su contraseña.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 2,
              "& .MuiTextField-root": { marginY: 1, width: "100%" },
              "& .MuiFormControl-root": { marginY: 1, width: "100%" },
            }}
          >
            <TextField
              required
              label="Correo"
              name="email"
              value={email}
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Restablecer
            </Button>

            <Grid container>
              <Grid item xs>
                <Link component={LinkRouter} to="/login" variant="body2">
                  Iniciar sesión
                </Link>
              </Grid>
              <Grid item>
                <Link component={LinkRouter} to="/register" variant="body2">
                  Crear una cuenta
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, mb: 4 }} />
      </Container>
    </>
  );
};
