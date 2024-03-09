import {
  Modal,
  Box,
  Button,
  Typography,
  Grid,
  Avatar,
  styled,
  Badge,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider.jsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "76%", sm: "50%", md: "35%" },
  height: { xs: "70%", sm: "70%", md: "75%" },
  bgcolor: "#1b0137",
  borderRadius: "13px",
  border: "1px #1b0137 solid",
  overflowX: "hidden",
  p: 3,
  display: "flex",
  flexDirection: "column",
};

const SmallAvatar = styled(Avatar)(() => ({
  width: 20,
  height: 20,
  backgroundColor: "#32c671",
}));

const SelectProfileModal = ({ open, handleClose, profileImage, onClick }) => {
  const theme = useTheme();
  const { getCustomUser } = useAuth();

  const [imageIdx, setImageIdx] = useState(-1);
  useEffect(() => {
    profileImage?.forEach((it, index) => {
      if (it.url === getCustomUser()?.profile) {
        setImageIdx(index);
      }
    });
  }, [profileImage, open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          timeout: 500,
          style: {
            backgroundColor: "rgba(180,150,160,0.1)",
            backdropFilter: "blur(3px)",
          },
        },
      }}
    >
      <Box sx={style}>
        <Typography color={"#fff"} variant={"h4"}>
          Select Profile Image
        </Typography>
        <Box
          mt={3}
          p={3}
          height={"85%"}
          sx={{
            overflowY: "auto",
          }}
        >
          <Grid container spacing={2}>
            {profileImage?.map((it, index) => (
              <Grid
                item
                key={index}
                xs={3}
                md={4}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 3,
                  cursor: "pointer",
                }}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    index !== imageIdx ? null : (
                      <SmallAvatar src="/src/assets/greenTick.svg" />
                    )
                  }
                >
                  <Avatar
                    src={`/src/assets/profiles/${it.url}`}
                    onClick={() => {
                      setImageIdx(index);
                    }}
                    sx={{
                      height: 60,
                      width: 60,
                    }}
                  />
                </Badge>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button
            size={"medium"}
            variant={"outlined"}
            onClick={handleClose}
            sx={{
              border: "1px #3182ce solid",
              color: "#3182ce",
            }}
          >
            Cancel
          </Button>

          <Button
            size={"medium"}
            variant={"contained"}
            onClick={() => {
              handleClose();
              if (imageIdx !== -1) {
                onClick(imageIdx);
              }
            }}
            sx={{
              backgroundColor: theme.palette.secondary.dark,
              color: "#fff",
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SelectProfileModal;
