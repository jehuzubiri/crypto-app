import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { Dropdown } from "@/components/General";
import { setFiatKeys } from "@/redux/slices/App.slice";
import useStyles from "../../../useLayoutStyles";

const FiatSelect: React.FC<{
  fiatMenuOpen: boolean;
  setFiatMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ fiatMenuOpen, setFiatMenuOpen }) => {
  const dispatch = useDispatch();
  const { fiatKeys } = useSelector((state: RootState) => state.app);

  const style = useStyles({});
  const fiatSelected = fiatKeys?.selected || "USD";
  const fiatOptions =
    useMemo(() => Object.values(fiatKeys?.menu || {}), [fiatKeys?.menu]) || [];

  return (
    <Dropdown
      className="fiat-dropdown"
      open={fiatMenuOpen}
      setOpen={setFiatMenuOpen}
      content={
        <Box sx={style.headerFiatMenu}>
          <Typography>Select Fiat Value</Typography>
          <Box>
            {fiatOptions?.map((option, index) => (
              <Typography
                key={`key${index}`}
                className={fiatSelected === option?.symbol ? "selected" : ""}
                onClick={() => {
                  if (option?.symbol) {
                    dispatch(setFiatKeys({ selected: option.symbol }));
                    setFiatMenuOpen(false);
                  }
                }}
              >
                {option?.label || "N/A"}
              </Typography>
            ))}
          </Box>
        </Box>
      }
    >
      <Box>
        <Typography>{fiatSelected}</Typography>
        <FaChevronDown />
      </Box>
    </Dropdown>
  );
};

export default FiatSelect;
