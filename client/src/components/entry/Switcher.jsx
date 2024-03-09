import React, { useState } from "react"
import { Box, Typography } from "@mui/material";

/**
 * This is the switcher used to switch between the states.
 */

const Switcher = ({ options, onStatusChange, currentOption }) => {

  const [status, setStatus] = useState(currentOption)

  return (
    <Box
      sx={{
        display: "flex"
      }}
    >
      {options.map((option) => (
        <Box
          key={option}
          onClick={() => {
            setStatus(option)
            onStatusChange(option)
          }}
          sx={{
            flex: 1,
            backgroundColor: option === status ? "primary.dark" : "transparent",
            color: option === status ? "white" : "black",
            paddingY: 1,
            borderRadius: "10000px",
            textAlign: "center",
            "&:hover": {
              color: option !== status ? "primary.main" : "white",
              cursor: "pointer",
            }
          }}
        >
          <Typography>
            {option}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}


export default Switcher
