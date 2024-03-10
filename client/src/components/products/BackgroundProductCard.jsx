import * as React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MoneyIcon from "../../assets/asset-money-icon.png";
import { Box } from "@mui/material";
import PurchaseButton from "./PurchaseButton.jsx";
import StyledCard from "../common/StyleCard.jsx";


const BackgroundProductCard = ({ value, productName, image, productId }) => {
  return (
    <StyledCard
      className="w-96"
      sx={{
        maxWidth: 350,
        borderRadius: 3,
        background: `linear-gradient(to right, rgba(50, 0, 60, 0.7), rgba(0, 0, 20, 0.7))`,
          boxShadow: "3px 3px 2px 1px rgba(255,255,255,0.2)",
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
            className="text-white"
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
              className="text-white"
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
