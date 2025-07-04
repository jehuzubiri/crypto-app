import { useTheme, Theme } from "@mui/material";
import { BreakpointsKeyType } from "@/models/Theme.model";

const mediaQuery = (key: BreakpointsKeyType) => {
  const theme = useTheme<Theme>();

  return {
    MOBILE_S: key === 'between' ? theme.breakpoints.between('xs', 'sm') : theme.breakpoints[key]('xs'),
    MOBILE: key === 'between' ? theme.breakpoints.between('sm', 'md') : theme.breakpoints[key]('sm'),
    TABLET: key === 'between' ? theme.breakpoints.between('md', 'lg') : theme.breakpoints[key]('md'),
    LAPTOP: key === 'between' ? theme.breakpoints.between('lg', 'xl') : theme.breakpoints[key]('lg'),
    DESKTOP: theme.breakpoints.up('xl')
  };
};

export default mediaQuery;