import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  right: {
    marginLeft: `auto`,
  },
};

function Header({ classes }) {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" color="inherit">
          HIT Notifier
        </Typography>

        <Typography className={classes.right} color="inherit">
          Turkers Connected: 100
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Header);
