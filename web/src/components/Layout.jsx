import React from 'react';
import { connect } from 'react-redux';

import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: `flex`,
  },
};

function Layout({ classes, children, type }) {
  const theme = createMuiTheme({
    palette: {
      type,
    },
    typography: {
      useNextVariants: true,
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        {children}
      </div>
    </MuiThemeProvider>
  );
}

function mapStateToProps(state) {
  return {
    type: state.settings.dark ? `dark` : `light`,
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    null,
  )(Layout),
);
