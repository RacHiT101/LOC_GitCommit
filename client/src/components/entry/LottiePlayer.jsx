import React, { useMemo } from "react"
import { Box } from "@mui/material"
import Lottie from "lottie-react"

/**
 * This is used for the animation on the intro screen.
 */

const LottiePlayer = ({ animationData, adjustSize = 1, sx = {} }) => {
  const transformValue = useMemo(() => {
    if (typeof adjustSize === "number") {
      return `scale(${adjustSize})`
    } else {
      const res = {}
      Object.entries(adjustSize).map(
        ([key, value]) =>
          (res[key] = `scale(${value})`)
      )
      return res
    }
  }, [adjustSize])

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        transform: transformValue,
        ...sx
      }}
    >
      <Lottie animationData={animationData} />
    </Box>
  )
}

export default LottiePlayer
