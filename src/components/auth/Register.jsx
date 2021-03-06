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
import { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as LinkRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { startRegister } from "../../store/slices/auth/authThunk";
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

export const Register = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset] = useForm({
    name: "",
    lastname: "",
    lastname2: "",
    email: "",
    password: "",
    password2: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { name, lastname, lastname2, email, password, password2 } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      name.trim() === "" ||
      lastname.trim() === "" ||
      lastname2.trim() === "" ||
      email.trim() === ""
    ) {
      return Swal.fire("Error", "Ingresa todos los datos", "error");
    }

    if (password !== password2) {
      return Swal.fire("Error", "Las contraseñas no coinciden", "error");
    }
    dispatch(startRegister({ name, lastname, lastname2, email, password }));
    reset();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
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
          <Typography component="h1" variant="h5">
            Crea tu cuenta
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
              required
              label="Nombre"
              name="name"
              value={name}
              onChange={handleInputChange}
            />

            <TextField
              required
              label="Apellido paterno"
              name="lastname"
              value={lastname}
              onChange={handleInputChange}
            />

            <TextField
              required
              label="Apellido materno"
              name="lastname2"
              value={lastname2}
              onChange={handleInputChange}
            />

            <TextField
              required
              label="Correo"
              name="email"
              value={email}
              onChange={handleInputChange}
            />

            <FormControl variant="outlined" required>
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                label="Contraseña"
                name="password"
                value={password}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      //   onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl variant="outlined" required>
              <InputLabel htmlFor="outlined-adornment-password2">
                Repetir contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password2"
                type={showPassword ? "text" : "password"}
                label="Repetir contraseña"
                name="password2"
                value={password2}
                onChange={handleInputChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Registrarse
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={LinkRouter} to="/login" variant="body2">
                  {"¿Ya tienes una cuenta? Iniciar sesión"}
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
