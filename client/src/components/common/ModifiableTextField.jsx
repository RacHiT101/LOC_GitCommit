import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

const ModifiableTextField = ({ label, value, onSubmitChange }) => {
  const [isModifying, setIsModifying] = useState(false);
  const [formValue, setFormValue] = useState(value);

  return (
    <Box
      sx={{
        backgroundColor: `#401f6a`,
        borderRadius: "10px",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {!isModifying && (
        <>
          <Typography sx={{ color: "white", fontSize: "20px" }}>
            {value}
          </Typography>
          <Box sx={{ position: "absolute", top: 4, left: 6, color: "white" }}>
            <Typography>{label}</Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              right: 2,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <IconButton onClick={() => setIsModifying(true)}>
              <EditIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </>
      )}
      {isModifying && (
        <TextField
          autoFocus
          onBlur={() => {
            setIsModifying(false);
            onSubmitChange(formValue);
          }}
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          sx={{
            height: "100%",
            "& .MuiInputBase-root": {
              height: "100%",
            },
            "& input": {
              width: "100%",
              height: "100%",
              color: "white",
            },
            "& fieldset": {
              border: "none",
            },
          }}
        />
      )}
    </Box>
  );
};

export default ModifiableTextField;
