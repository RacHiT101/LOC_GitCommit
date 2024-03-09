import Page from "../containers/Page.jsx";
import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
// import TabUnstyled from "@mui/base/TabUnstyled";
// import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
// import TabsListUnstyled from "@mui/base/TabsListUnstyled";
// import { TabPanelUnstyled } from "@mui/base";
// import TabsUnstyled from "@mui/base/TabsUnstyled";
import ProductContainer from "../components/products/ProductContainer.jsx";
import { Tab, TabPanel } from "@mui/base";

const MarketplacePage = () => {
  

  // const TabsList = styled(TabsListUnstyled)(
  //   ({ theme }) => `
  // min-width: 400px;
  // margin-bottom: 2px;
  // margin-left:32px;
  // margin-top:30px;
  // display: flex;
  // background-color:transparent;
  // `
  // );

  // const TabPanel = styled(TabPanelUnstyled)`
  //   width: 100%;
  //   font-family: "Rubik", "Nexa", "sans-serif";
  //   font-size: 0.875rem;
  // `;
  return (
    <Page title={"Marketplace"}>
      <>
        <Box className="mb-10 w-full">
          <div>
            <div defaultValue={0} selectionFollowsFocus>
              <div>
                <div>Background</div>
                <div>Profile Photo</div>
                <div>Music</div>
              </div>
              <div value={0}>
                <ProductContainer value={0} />
              </div>
              <div value={1}>
                <ProductContainer value={1} />
              </div>
              <div value={2}>
                <ProductContainer value={2} />
              </div>
            </div>
          </div>
        </Box>
      </>
    </Page>
  );
};

export default MarketplacePage;
