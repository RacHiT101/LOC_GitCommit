import { Grid, Box } from "@mui/material";
import BackgroundCard from "./BackgroundCard.jsx";

export default function BackgroundGrid({ images }) {
  return (
    <Box padding={3} sx={{ width: "100%" }}>
      <Grid container spacing={3}>
        {images?.map((image, index) => (
          <Grid key={index} item xs={12} sm={4} mb={3}>
            <BackgroundCard
              image={`src/assets/backgrounds/${image?.url}`}
              isSelectable={false}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}