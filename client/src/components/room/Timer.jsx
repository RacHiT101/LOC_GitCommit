import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const Timer = ({ duration, onFinish }) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      let time;
      setTime((prev) => {
        time = Math.max(0, prev - 1);
        return time;
      });
      if (time <= 1) {
        clearInterval(this);
        onFinish();
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box>
      <Typography variant={"h5"} sx={{ color: "white" }}>
        {new Date(time * 1000).toISOString().substring(11, 19)}
      </Typography>
    </Box>
  );
};

export default Timer;
