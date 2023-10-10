import { createTheme } from '@mui/material/styles';

export const FONT_FAMILY =
  'Inter, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'; // sync with body font in base.scss

export const theme = createTheme({
  typography: {
    fontFamily: FONT_FAMILY,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: 'standard',
      },
    },
  },
});
