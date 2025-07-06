import { useRef, ReactNode, MouseEvent } from "react";
import {
  Box,
  Popper,
  Paper,
  ClickAwayListener,
  PopperPlacementType,
  useTheme,
} from "@mui/material";
import { MergedThemeOptions } from "@/models/Theme.model";

const useStyles = () => {
  const theme: MergedThemeOptions = useTheme();

  return {
    root: {
      zIndex: 999,
      maxWidth: "30rem",
      position: "absolute",
    },
    content: {
      backgroundColor: theme.palette?.background?.default,
      borderRadius: "0.5rem",
      overflow: "hidden",
      padding: "1rem",
    },
    button: {
      cursor: "pointer",
    },
  };
};

interface DropdownProps {
  children: ReactNode;
  placement?: PopperPlacementType;
  offset?: [number, number];
  content?: ReactNode | null;
  open: boolean;
  className?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  placement = "bottom-end",
  offset = [0, 8],
  content = <Box>Lorem ipsum</Box>,
  open,
  setOpen,
  className = "",
}) => {
  const style = useStyles();
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => setOpen((prev) => !prev);

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    if (
      anchorRef.current &&
      event.target instanceof Node &&
      anchorRef.current.contains(event.target)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    // @ts-ignore
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className={className} display="inline-block" ref={anchorRef}>
        <Box sx={style.button} onClick={handleToggle}>
          {children}
        </Box>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement={placement}
          disablePortal
          sx={style.root}
          modifiers={[
            {
              name: "offset",
              options: { offset },
            },
          ]}
        >
          <Paper elevation={3} sx={style.content}>
            {content}
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default Dropdown;
