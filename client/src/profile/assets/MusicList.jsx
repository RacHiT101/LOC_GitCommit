import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import MusicNote from "../../../assets/music-note.svg";

export default function MusicList({ musics }) {
  return (
    <Box padding={2}>
      <List>
        {musics?.map((music, index) => (
          <ListItem key={index} sx={{ padding: 1.5 }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#9f8fb4",
                borderRadius: "0.5vw",
                padding: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <ListItemIcon>
                  <img
                    src={MusicNote}
                    alt="Music Note"
                    style={{ width: "50px" }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: "bold", color: "black" }}
                    >
                      {music?.name}
                    </Typography>
                  }
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ListItemText
                  primary={
                    <Typography variant="h5" sx={{ color: "black" }}>
                      {"By " + music?.artist}
                    </Typography>
                  }
                />
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
