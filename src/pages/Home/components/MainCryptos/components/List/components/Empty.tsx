import React from "react";
import { Box } from "@mui/material";
import { TbFileBitcoin } from "react-icons/tb";

const Empty: React.FC<{
  searchActive: boolean;
  activeTab: "all" | "portfolio";
}> = ({ searchActive, activeTab }) => {
  return (
    <Box className="t-row-empty">
      <TbFileBitcoin />
      <p>
        {searchActive
          ? "No Search Result"
          : activeTab === "portfolio"
          ? "Add your first crypto now!"
          : "No Data"}
      </p>
    </Box>
  );
};

export default React.memo(Empty);
