import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#400A71",
      main: "#290451",
      dark: "#1E143D",
    },
    secondary: {
      main: "#a79cbc",
      dark: "#7012D3",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        fullWidth: true,
        size: "small",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        sx: {
          fontSize: "14px",
          color: "#1E143D",
          fontWeight: "bold",
          verticalAlign: "bottom",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#ff1a1a",
          height: "20px",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 14,
    },
  },
});

export default theme;
