import { Box, Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createContext, useCallback, useContext, useState } from "react";

const context = createContext((message, options) => {});

const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  // array of { text: string, onClick: () => void, closeOnClick: boolean }
  const [options, setOptions] = useState([]);
  const [openTextNotification, setOpenTextNotification] = useState(false);
  const [openOptionNotification, setOpenOptionNotification] = useState(false);

  const notify = useCallback(
    (message, option) => {
      setMessage(message);
      if (!option) {
        setOpenTextNotification(true);
      } else {
        setOptions(option);
        setOpenOptionNotification(true);
      }
    },
    [setOpenTextNotification, setMessage]
  );

  return (
    <context.Provider value={notify}>
      {children}
      <Snackbar
        open={openTextNotification}
        autoHideDuration={6000}
        onClose={() => setOpenTextNotification(false)}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#fff",
            color: "#000",
            paddingY: 1,
            paddingX: 2,
            fontSize: 16,
          },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={message}
        action={
          <IconButton
            size="medium"
            color="inherit"
            onClick={() => setOpenTextNotification(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <Snackbar
        open={openOptionNotification}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={message}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#fff",
            color: "#000",
            paddingY: 1,
            paddingX: 2,
            fontSize: 16,
          },
        }}
        action={
          <Box>
            {options?.map(({ text, onClick, closeOnClick }) => (
              <Button
                onClick={() => {
                  onClick();
                  if (closeOnClick) {
                    setOpenOptionNotification(false);
                  }
                }}
              >
                {text}
              </Button>
            ))}
            <IconButton
              size="small"
              color="inherit"
              onClick={() => setOpenOptionNotification(false)}
              sx={{ pl: 1 }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        }
      />
    </context.Provider>
  );
};

export default NotificationProvider;

export const useNotification = () => useContext(context);