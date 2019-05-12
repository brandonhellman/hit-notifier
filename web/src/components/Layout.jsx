import React from 'react';

import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    display: `flex`,
  },
};

function Layout({ classes, children }) {
  return (
    <div className={classes.root}>
      <CssBaseline />
      {children}
    </div>
  );
}

export default withStyles(styles)(Layout);
