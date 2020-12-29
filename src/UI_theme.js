import { createMuiTheme } from '@material-ui/core/styles';
import {  blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
      secondary: {
        main: blue[500],
      },
    },
  });

export default theme