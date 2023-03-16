import ReactDOM from "react-dom/client";
import App from "./App";
import React from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    type: "dark",
    mode: "dark",
    primary: {
      main: "#00ffe4",
    },
    secondary: {
      main: "#e600ff",
    },
    success: {
      main: "#00ff66",
    },
    error: {
      main: "#ff0019",
    },
    info: {
      main: "#0099ff",
    },
    warning: {
      main: "#ffc300",
    },
    background: {
      default: "#303030",
      paper: "#424242",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// export default function FilledTextFields() {
//   return (

//       <CssBaseline />
//       <TextField id="myfilled-name" label="Name" variant="filled" />

//   );
// }
