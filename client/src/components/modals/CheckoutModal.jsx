import {
    Box,
    Modal,
    Typography,
    Fade,
    Backdrop,
    IconButton,
    Stack,
    Button,
    useTheme,
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import assetMoney from "../../assets/asset-money-icon.svg";
  import AssetLabel from "../../profile/assets/AssetLabel.jsx";
  import { useModal } from "../../providers/CheckoutModalProvider.jsx";
  import ModalProductCard from "../../products/ModalProductCard.jsx";
  import { LoadingButton } from "@mui/lab";
  import { useState } from "react";
  
  /*
     This modal will be used for the whole app, You can get a below 5 variables from useModal function
        open,
        handleClose,
        handleOpen,
        content,
        setContent,
     you can use these by this way const {open,content,...} = useModal()
     the content and setContent will used for set up the different UI inside the modal,
     it has these attributes:
        title: "",
        imageTitle: "",
        image: null,
        cost: 0,
        money: 0,
        type: 0,
        hasProduct,
        onClick: () => {},
     everytime you want to open the modal, you should setContent first and then call handleOpen function
     the type attribute is used to choose the which type product card you want to set, if the type is 0
     that means the modal will display for background image, if type is 1, it is for music, 2 is for profile image
   */
  
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
    p: 1,
  };
  
  const CheckoutModal = () => {
    const { open, handleClose, content } = useModal();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
  
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
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
        <Fade in={open}>
          <Box sx={style}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              height={"100%"}
              width={"100%"}
            >
              <Box display={"flex"} flexDirection={"row-reverse"}>
                <IconButton onClick={handleClose}>
                  <CloseIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Box>
              <Box pl={2.5} height={"6%"}>
                <Typography variant={"h5"} color={"#fff"} fontWeight={500}>
                  {content.title}
                </Typography>
              </Box>
              <Box p={2.5} height={"50%"} width={"100%"}>
                <ModalProductCard
                  title={content?.imageTitle}
                  image={content?.image}
                  value={content?.type}
                />
              </Box>
              <Box pl={2.5}>
                <Typography
                  variant={"body1"}
                  sx={{
                    color: "#fff",
                    fontWeight: 550,
                  }}
                >{`$ ${content?.cost}`}</Typography>
              </Box>
              <Stack
                p={2.5}
                direction={"row"}
                spacing={6}
                height={"15%"}
                width={"100%"}
              >
                <Box>
                  <Typography color={"#fff"}>Your Total Coins:</Typography>
                </Box>
                <Box height={"95%"} width={"33%"}>
                  <AssetLabel image={assetMoney} value={content?.money} />
                </Box>
              </Stack>
              <Box
                px={2.5}
                py={1}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Button
                  size={"large"}
                  variant={"outlined"}
                  onClick={handleClose}
                  sx={{
                    border: "1px #3182ce solid",
                    color: "#3182ce",
                  }}
                >
                  Cancel
                </Button>
                {content?.hasProduct || content?.cost > content?.money ? (
                  <Typography
                    variant={"h5"}
                    color={"#fff"}
                    fontWeight={650}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    {content?.hasProduct
                      ? "You already have this product"
                      : "You do not have enough funds"}
                  </Typography>
                ) : (
                  <LoadingButton
                    loading={loading}
                    size={"large"}
                    variant={"contained"}
                    onClick={async () => {
                      setLoading(true);
                      await content.onClick();
                      setLoading(false);
                    }}
                    sx={{
                      backgroundColor: theme.palette.secondary.dark,
                      color: "#fff",
                    }}
                  >
                    Apply
                  </LoadingButton>
                )}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    );
  };
  
  export default CheckoutModal;
  