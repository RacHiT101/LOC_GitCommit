import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import { useCallback } from "react";
import { useModal } from "../../providers/CheckoutModalProvider.jsx";
import { useAuth } from "../../providers/AuthProvider.jsx";
import { useNotification } from "../../providers/NotificationProvider.jsx";
import { useMutation } from "../../hooks/useMutation.js";
import { HTTP_METHOD } from "../../hooks/http-methods.js";

/**
 * A purchase button which can be used on the pruduct cards.
 */

const PurchaseButton = ({ title, type, image, cost, productId }) => {
  const { handleOpen, setContent, handleClose } = useModal();
  const { getCustomUser, reFetchUserData } = useAuth();
  const notify = useNotification();

  const { isLoading, run } = useMutation(`users/purchase`, HTTP_METHOD.POST);

  const ColorButton = styled(Button)(() => ({
    backgroundColor: "#400A71",
    textTransform: "unset !important",
    fontSize: 14,
    fontFamily: "Rubik",
    "&:hover": {
      opacity: "0.6",
      transform: "scale(1.05)",
    },
  }));

  const handleClick = useCallback(() => {
    setContent({
      hasProduct: getCustomUser().assets.includes(productId),
      title: "Check out",
      imageTitle: `purchase "${title}" now`,
      image: image,
      cost: cost,
      money: getCustomUser()?.coins,
      type: type,
      onClick: async () => {
        try {
          await run({
            query: {
              userId: getCustomUser()._id,
              productId: productId,
            },
          });
          await reFetchUserData();
          if (!isLoading) {
            notify("Purchase successfully");
            handleClose();
          }
        } catch (e) {
          if (e.response.status === 400) {
            notify("You don't have enough coins");
          } else {
            notify("You already have this product");
          }
        }
      },
    });
    handleOpen();
  }, []);

  return (
    <ColorButton size="small" onClick={handleClick}>
      Purchase
    </ColorButton>
  );
};

export default PurchaseButton;
