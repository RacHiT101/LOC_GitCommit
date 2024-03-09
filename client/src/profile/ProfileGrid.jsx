import { Grid, Avatar } from "@mui/material";

export default function ProfileGrid({ images }) {
  return (
    <Grid container padding={3} spacing={3}>
      {images?.map((image, index) => (
        <Grid
          key={index}
          item
          xs={6}
          sm={4}
          md={3}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Avatar
            alt="Profile Image"
            src={`src/assets/profiles/${image.url}`}
            sx={{ borderRadius: "50%", height: 70, width: 70 }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
