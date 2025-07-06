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
          <p>Select Fiat Value</p>
          <Box>
            {fiatOptions?.map((option, index) => {
              const isSelected = option?.symbol === fiatSelected;
              return (
                <p
                  key={`key${index}`}
                  className={isSelected ? "selected" : ""}
                  onClick={() => {
                    if (option?.symbol && !isSelected) {
                      dispatch(setFiatKeys({ selected: option.symbol }));
                    }
                    setFiatMenuOpen(false);
                  }}
                >
                  {option?.label || "N/A"}
                </p>
              );
            })}
          </Box>
        </Box>
      }
    >
      <Box>
        <p>{fiatSelected}</p>
        <FaChevronDown />
      </Box>
    </Dropdown>
  );
};

export default FiatSelect;
