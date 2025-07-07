import React from "react";
import { Box, useTheme } from "@mui/material";
import { TbFileBitcoin } from "react-icons/tb";
import { MergedThemeOptions } from "@/models/Theme.model";

const useStyles = () => {
  const theme: MergedThemeOptions = useTheme();
  const isLightMode = theme.palette?.mode === "light";

  return {
    ...theme?.cxFlexBox?.colCenterCenter,
    height: "19.125rem",
    width: "100%",
    gap: "1rem",
    "& > p": {
      ...theme.cxTypography.paragraph,
      color: theme.palette?.text,
    },
    "& > svg": {
      color: theme.palette?.grey?.[isLightMode ? 400 : 400],
      height: "5rem",
      width: "5rem",
    },
  };
};

const Empty: React.FC<{
  searchActive: boolean;
  activeTab: "all" | "portfolio";
}> = ({ searchActive, activeTab }) => {
  const style = useStyles();

  return (
    <Box sx={style}>
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
