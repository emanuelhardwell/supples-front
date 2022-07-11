import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "@mui/material";
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
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startUpdatePassword } from "../../store/slices/auth/authThunk";
import { useNavigate } from "react-router-dom";
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

export const UpdatePassword = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset] = useForm({
    token: "",
    password: "",
    password1: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { token, password, password1 } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      token.trim() === "" ||
      password.trim() === "" ||
      password1.trim() === ""
    ) {
      return Swal.fire("Error", "Ingresa el token y la contraseña", "info");
    }

    if (password !== password1) {
      return Swal.fire("Error", "Las contraseñas no coinciden", "info");
    }

    dispatch(startUpdatePassword({ password, token }));
    reset();
    navigate("/login");
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
            Restablecer la contraseña
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
              label="Token"
              name="token"
              value={token}
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
              <InputLabel htmlFor="outlined-adornment-password1">
                Repetir contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password1"
                type={showPassword ? "text" : "password"}
                label="Repetir contraseña"
                name="password1"
                value={password1}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
            >
              Guardar contraseña
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5, mb: 4 }} />
      </Container>
    </>
  );
};
