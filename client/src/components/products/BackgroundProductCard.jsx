import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MoneyIcon from "../../assets/asset-money-icon.svg";
import { Box } from "@mui/material";
import PurchaseButton from "./PurchaseButton.jsx";
import StyledCard from "../common/StyleCard.jsx";

/**
 * A background product card contains the background image, background name, the money it
 * costs to purchase the background, and the purchase button to purchase the background product.
 */

const BackgroundProductCard = ({ value, productName, image, productId }) => {
  return (
    <StyledCard
      className="w-96"
      sx={{
        maxWidth: 350,
        borderRadius: 3,
        background: "rgba(255, 255, 255, .5)",
        backdropFilter: "blur(5px)",
        ":hover": {
          boxShadow: 20, // theme.shadows[20]
        },
      }}
    >
      <CardMedia sx={{ height: 350 }} image={image} title="Product Card" />
      <Box className="mx-2 mb-2">
        <CardContent className="-mb-4 -mt-1">
          <Typography
            gutterBottom
            variant="h4"
            fontWeight="bold"
            component="div"
          >
            {productName}
          </Typography>
        </CardContent>
        <CardActions className="flex flex-row justify-between">
          <Box className="flex flex-row justify-between space-x-1">
            <img src={MoneyIcon} alt={"Dollar Icon"} className="w-5 h-5" />
            <Typography
              gutterBottom
              variant="h5"
              fontWeight="bold"
              component="div"
            >
              {value}
            </Typography>
          </Box>
          <PurchaseButton
            title={productName}
            image={image}
            cost={value}
            productId={productId}
            type={0}
          />
        </CardActions>
      </Box>
    </StyledCard>
  );
};

export default BackgroundProductCard;
