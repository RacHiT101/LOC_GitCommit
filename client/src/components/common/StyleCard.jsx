import { styled } from "@mui/system";
import Card from "@mui/material/Card";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "transform 0.15s ease-in-out",
  "&:hover": { transform: "scale3d(1.02, 1.02, 1)", boxShadow: 100 },
}));

export default StyledCard;
